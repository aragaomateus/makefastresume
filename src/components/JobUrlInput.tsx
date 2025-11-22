'use client';

import { useState } from 'react';
import { Loader2, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import type { JobData } from '@/types/job';

interface JobUrlInputProps {
  onJobFetched: (jobData: JobData) => void;
  existingJobData?: JobData | null;
  onClearJob?: () => void;
  usePuppeteer?: boolean;
}

export default function JobUrlInput({ onJobFetched, existingJobData, onClearJob, usePuppeteer = false }: JobUrlInputProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualTitle, setManualTitle] = useState('');
  const [manualCompany, setManualCompany] = useState('');
  const [manualDescription, setManualDescription] = useState('');

  const extractJobContent = (htmlString: string, jobUrl: string): Omit<JobData, 'url'> => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    // Try to extract from AshbyHQ's window.__appData
    const scripts = doc.querySelectorAll('script');
    for (const script of Array.from(scripts)) {
      const scriptContent = script.textContent || '';
      if (scriptContent.includes('window.__appData')) {
        try {
          const match = scriptContent.match(/window\.__appData\s*=\s*({[\s\S]*?});/);
          if (match) {
            const appData = JSON.parse(match[1]);
            if (appData.jobPosting) {
              const posting = appData.jobPosting;
              return {
                title: posting.title || 'Job Description',
                content: posting.descriptionHtml
                  ?.replace(/<[^>]*>/g, '\n')
                  .replace(/\n\s*\n\s*\n/g, '\n\n')
                  .replace(/[ \t]+/g, ' ')
                  .trim() || ''
              };
            }
          }
        } catch (e) {
          // Continue
        }
      }
    }

    // Try JSON-LD
    const jsonLdScripts = doc.querySelectorAll('script[type="application/ld+json"]');
    for (const script of Array.from(jsonLdScripts)) {
      try {
        const data = JSON.parse(script.textContent || '');
        if (data['@type'] === 'JobPosting') {
          return {
            title: data.title || '',
            content: data.description?.replace(/<[^>]*>/g, '\n').replace(/\n\s*\n\s*\n/g, '\n\n').trim() || ''
          };
        }
      } catch (e) {
        // Continue
      }
    }

    // Remove unwanted elements
    const elementsToRemove = doc.querySelectorAll(
      'script, style, nav, footer, header, ' +
      '.application-form, form, button, input, select, textarea, ' +
      '[class*="footer"], [class*="Footer"], [id*="footer"], ' +
      '[class*="privacy"], [class*="cookie"], ' +
      '[class*="share"], [class*="social"], ' +
      '[class*="alert"], [class*="apply"], [class*="navigation"], ' +
      '[class*="sidebar"], [class*="related-jobs"]'
    );
    elementsToRemove.forEach(el => el.remove());

    // Extract title and company
    let jobTitle = '';
    let company = '';

    const h1 = doc.querySelector('h1');
    if (h1) {
      jobTitle = h1.textContent?.trim() || '';
    } else {
      const titleTag = doc.querySelector('title');
      if (titleTag) {
        jobTitle = titleTag.textContent?.trim().split('|')[0].trim() || '';
      }
    }

    // Try to extract company name from common selectors
    const companySelectors = [
      '.company-name',
      '[class*="company"]',
      '[data-qa="company-name"]',
      'meta[property="og:site_name"]',
      '.employer-name'
    ];

    for (const selector of companySelectors) {
      const element = doc.querySelector(selector);
      if (element) {
        if (selector.startsWith('meta')) {
          company = element.getAttribute('content') || '';
        } else {
          company = element.textContent?.trim() || '';
        }
        if (company && company.length > 2 && company.length < 100) break;
      }
    }

    // If no company found, try to extract from URL
    if (!company) {
      const urlPatterns = [
        /jobs\.([^.]+)\.com/i,           // jobs.company.com
        /careers\.([^.]+)\.com/i,        // careers.company.com
        /([^.]+)\.greenhouse\.io/i,      // company.greenhouse.io
        /smartrecruiters\.com\/([^/]+)/i, // smartrecruiters.com/company
        /boards\.greenhouse\.io\/([^/]+)/i, // boards.greenhouse.io/company
      ];

      for (const pattern of urlPatterns) {
        const match = jobUrl.match(pattern);
        if (match && match[1]) {
          company = match[1]
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase());
          break;
        }
      }
    }

    // Site-specific extraction
    let textContent = '';
    const containers = [
      // Royal Caribbean and similar ATS systems
      '.jdp-job-description-card',
      '.job-description-content',
      '.jdp-job-description',
      // Common job board selectors
      '.jobad-container',
      '.job-description',
      '.ycdc-job-posting',
      '.jv-job-detail',
      '.job-description-wrapper',
      '[data-qa="job-description"]',
      '.job-details',
      // Generic fallbacks
      '#content',
      '.content',
      'main',
      '[role="main"]'
    ];

    for (const selector of containers) {
      const element = doc.querySelector(selector);
      if (element) {
        textContent = element.textContent || '';
        if (textContent.length > 200) break;
      }
    }

    // If still no content, try to get all visible text from body
    if (textContent.length < 200) {
      const body = doc.querySelector('body');
      if (body) {
        textContent = body.textContent || '';
      }
    }

    return {
      title: jobTitle || 'Job Description',
      company: company || undefined,
      content: textContent.replace(/\n\s*\n\s*\n/g, '\n\n').replace(/[ \t]+/g, ' ').trim()
    };
  };

  const fetchJob = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const apiEndpoint = usePuppeteer ? '/api/fetch-job-puppeteer' : '/api/fetch-job';

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, forcePuppeteer: usePuppeteer }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.isDynamic && errorData.details) {
          setError(errorData.details);
        } else {
          setError(errorData.details || errorData.error || 'Failed to fetch');
        }
        return;
      }

      const { html } = await response.json();
      const extracted = extractJobContent(html, url);

      const jobData: JobData = {
        ...extracted,
        url: url
      };

      onJobFetched(jobData);
      setUrl(''); // Clear the input after successful fetch
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch job description');
    } finally {
      setLoading(false);
    }
  };

  if (existingJobData) {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-green-900 mb-1">Job Fetched</h3>
            <p className="text-sm text-green-800 mb-2">
              {existingJobData.title}
            </p>
            <a
              href={existingJobData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline mb-3 block"
            >
              {existingJobData.url}
            </a>
            <button
              onClick={() => {
                setUrl('');
                setError('');
                onClearJob?.();
              }}
              className="text-sm text-green-700 hover:text-green-900 underline"
            >
              Try a different job
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Posting URL
        </label>
        <div className="flex gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://job-boards.greenhouse.io/company/jobs/..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            onKeyDown={(e) => e.key === 'Enter' && fetchJob()}
          />
          <button
            onClick={fetchJob}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2 whitespace-nowrap"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Fetching...
              </>
            ) : (
              <>
                <ExternalLink className="w-5 h-5" />
                Fetch Job
              </>
            )}
          </button>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Paste the URL of the job posting you want to tailor your resume for
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-red-800 font-medium">Error</p>
            <p className="text-red-700 text-sm mt-1">{error}</p>
            {error.includes('not currently supported') && (
              <button
                onClick={() => setShowManualInput(true)}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Enter job description manually instead
              </button>
            )}
          </div>
        </div>
      )}

      {!showManualInput && (
        <div className="text-center">
          <button
            onClick={() => setShowManualInput(true)}
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Or paste job description manually
          </button>
        </div>
      )}

      {showManualInput && (
        <div className="border-2 border-gray-300 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Manual Job Entry</h3>
            <button
              onClick={() => {
                setShowManualInput(false);
                setManualTitle('');
                setManualCompany('');
                setManualDescription('');
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={manualCompany}
              onChange={(e) => setManualCompany(e.target.value)}
              placeholder="e.g., NBCUniversal"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <input
              type="text"
              value={manualTitle}
              onChange={(e) => setManualTitle(e.target.value)}
              placeholder="e.g., Senior Software Engineer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              value={manualDescription}
              onChange={(e) => setManualDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                if (!manualTitle.trim() || !manualDescription.trim() || !manualCompany.trim()) {
                  setError('Please enter company name, job title, and description');
                  return;
                }
                const jobData: JobData = {
                  title: manualTitle,
                  company: manualCompany,
                  content: manualDescription,
                  url: url || 'manually-entered'
                };
                onJobFetched(jobData);
                setShowManualInput(false);
                setManualTitle('');
                setManualCompany('');
                setManualDescription('');
                setUrl('');
              }}
              disabled={!manualTitle.trim() || !manualDescription.trim() || !manualCompany.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Use This Job Description
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
