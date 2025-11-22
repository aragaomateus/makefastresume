'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import type { Resume } from '@/types/resume';

interface ResumeUploadProps {
  onResumeUploaded: (resume: Resume) => void;
  existingResume?: Resume | null;
}

export default function ResumeUpload({ onResumeUploaded, existingResume }: ResumeUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess(false);

    try {
      // Convert PDF to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const base64 = reader.result?.toString().split(',')[1];
        if (!base64) throw new Error('Failed to read file');

        // Step 1: Extract text from PDF
        const extractResponse = await fetch('/api/extract-pdf-text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pdfBase64: base64 }),
        });

        if (!extractResponse.ok) {
          throw new Error('Failed to extract text from PDF');
        }

        const { text } = await extractResponse.json();

        // Step 2: Parse resume with Claude
        const parseResponse = await fetch('/api/parse-resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resumeText: text }),
        });

        if (!parseResponse.ok) {
          throw new Error('Failed to parse resume');
        }

        const { resume } = await parseResponse.json();

        setSuccess(true);
        onResumeUploaded(resume);
      };

      reader.onerror = () => {
        throw new Error('Failed to read file');
      };
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload resume');
      setUploading(false);
    }
  }, [onResumeUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    disabled: uploading,
  });

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
                setSuccess(false);
                onResumeUploaded(existingResume);
              }}
              className="text-sm text-green-700 hover:text-green-900 underline"
            >
              Upload a different resume
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-4">
          {uploading ? (
            <>
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
              <div>
                <p className="text-lg font-medium text-gray-900">Processing your resume...</p>
                <p className="text-sm text-gray-500 mt-1">This may take a few seconds</p>
              </div>
            </>
          ) : success ? (
            <>
              <CheckCircle className="w-12 h-12 text-green-600" />
              <div>
                <p className="text-lg font-medium text-gray-900">Resume uploaded successfully!</p>
                <p className="text-sm text-gray-500 mt-1">Proceeding to next step...</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Drag and drop your PDF resume, or click to browse
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <FileText className="w-4 h-4" />
                <span>PDF format only • Max 10MB</span>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-medium">Upload Error</p>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
