'use client';

import { useState } from 'react';
import { FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import type { Resume } from '@/types/resume';

interface ResumeTextInputProps {
  onResumeUploaded: (resume: Resume) => void;
  onClearResume?: () => void;
  existingResume?: Resume | null;
}

export default function ResumeTextInput({ onResumeUploaded, onClearResume, existingResume }: ResumeTextInputProps) {
  const [resumeText, setResumeText] = useState('');
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState('');

  const handleParse = async () => {
    if (!resumeText.trim()) {
      setError('Please enter your resume text');
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
      onResumeUploaded(resume);
    } catch (err) {
      console.error('Parse error:', err);
      setError(err instanceof Error ? err.message : 'Failed to parse resume');
    } finally {
      setParsing(false);
    }
  };

  if (existingResume) {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-green-900 mb-1">Resume Loaded</h3>
            <p className="text-sm text-green-800 mb-3">
              {existingResume.name} • {existingResume.email}
            </p>
            <button
              onClick={() => {
                setResumeText('');
                setError('');
                onClearResume?.();
              }}
              className="text-sm text-green-700 hover:text-green-900 underline"
            >
              Enter a different resume
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border-2 border-gray-300 rounded-lg p-6">
        <div className="flex items-start gap-3 mb-4">
          <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium text-gray-900">Paste Your Resume</h3>
            <p className="text-sm text-gray-600 mt-1">
              Copy and paste the text content of your resume below. Include all sections: contact info, experience, education, skills, etc.
            </p>
          </div>
        </div>

        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your resume text here...

Example:
John Doe
john@example.com | (555) 123-4567 | LinkedIn: linkedin.com/in/johndoe

EXPERIENCE
Software Engineer at TechCorp
Jan 2020 - Present
• Built scalable web applications...
• Led team of 5 developers...

EDUCATION
BS Computer Science, University Name
Graduated: May 2019

SKILLS
JavaScript, React, Node.js, Python..."
          className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm resize-none"
        />

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleParse}
            disabled={parsing || !resumeText.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
          >
            {parsing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Parsing Resume...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                Parse Resume
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-medium">Error</p>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> For best results, copy the text directly from your PDF or Word document.
          Make sure to include all sections and preserve formatting as much as possible.
        </p>
      </div>
    </div>
  );
}
