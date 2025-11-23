'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Loader2, Upload, ArrowRight } from 'lucide-react';
import type { Resume } from '@/types/resume';
import { ResumeStorage } from '@/lib/storage';

export default function InlineResumeUpload() {
  const router = useRouter();
  const [resumeText, setResumeText] = useState('');
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState('');

  const handleParse = async () => {
    if (!resumeText.trim()) {
      setError('Please paste your resume text');
      return;
    }

    setParsing(true);
    setError('');

    try {
      const response = await fetch('/api/parse-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || 'Failed to parse resume');
      }

      const { resume } = await response.json();

      // Save to localStorage
      ResumeStorage.saveResume(resume);

      // Redirect to tailor page
      router.push('/tailor');
    } catch (err) {
      console.error('Parse error:', err);
      setError(err instanceof Error ? err.message : 'Failed to parse resume');
    } finally {
      setParsing(false);
    }
  };

  return (
    <div className="inline-resume-upload">
      <div className="upload-container">
        <div className="upload-header">
          <h3>Paste Your Resume to Get Started</h3>
          <p>Copy and paste your resume text below, then we'll optimize it for your job</p>
        </div>

        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your resume text here...

Example:
John Doe
john@example.com | (555) 123-4567

EXPERIENCE
Software Engineer at Company
• Led development of...
• Improved performance by..."
          className="resume-textarea"
          rows={8}
        />

        <div className="upload-actions">
          <button
            onClick={handleParse}
            disabled={parsing || !resumeText.trim()}
            className="upload-button"
          >
            {parsing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Start Tailoring
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="upload-error">
            <p>{error}</p>
          </div>
        )}

        <div className="upload-footer">
          <p>✓ Free to use  ✓ No credit card required  ✓ Results in minutes</p>
        </div>
      </div>

      <style jsx>{`
        .inline-resume-upload {
          width: 100%;
          max-width: 100%;
        }

        .upload-container {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          border: 2px solid #e5e7eb;
        }

        .upload-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .upload-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .upload-header p {
          font-size: 1rem;
          color: #64748b;
          margin: 0;
        }

        .resume-textarea {
          width: 100%;
          padding: 1rem;
          border: 2px solid #d1d5db;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          font-family: 'Courier New', monospace;
          color: #374151;
          resize: vertical;
          transition: all 0.2s;
          min-height: 200px;
        }

        .resume-textarea:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .resume-textarea::placeholder {
          color: #9ca3af;
        }

        .upload-actions {
          margin-top: 1.5rem;
          display: flex;
          justify-content: center;
        }

        .upload-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2.5rem;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 0.75rem;
          font-size: 1.125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);
        }

        .upload-button:hover:not(:disabled) {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.4);
        }

        .upload-button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .upload-error {
          margin-top: 1rem;
          padding: 1rem;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 0.5rem;
          text-align: center;
        }

        .upload-error p {
          color: #dc2626;
          font-weight: 500;
          margin: 0;
        }

        .upload-footer {
          margin-top: 1.5rem;
          text-align: center;
        }

        .upload-footer p {
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
          margin: 0;
        }

        @media (max-width: 768px) {
          .upload-container {
            padding: 1.5rem;
          }

          .upload-header h3 {
            font-size: 1.25rem;
          }

          .upload-button {
            width: 100%;
            justify-content: center;
            font-size: 1rem;
            padding: 0.875rem 2rem;
          }
        }
      `}</style>
    </div>
  );
}
