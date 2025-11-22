'use client';

import { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ChevronRight, CheckCircle, FileText, Briefcase, Wand2, Download } from 'lucide-react';
import ResumeTextInput from '@/components/ResumeTextInput';
import JobUrlInput from '@/components/JobUrlInput';
import ResumePDF from '@/components/ResumePDF';
import { ResumeStorage } from '@/lib/storage';
import type { Resume, TailoredResume } from '@/types/resume';
import type { JobData } from '@/types/job';

type Step = 'upload' | 'job' | 'tailor' | 'download';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [resume, setResume] = useState<Resume | null>(null);
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [tailoredResume, setTailoredResume] = useState<TailoredResume | null>(null);
  const [tailoring, setTailoring] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [tokenUsage, setTokenUsage] = useState<any>(null);

  // Load existing resume on mount
  useEffect(() => {
    const existingResume = ResumeStorage.getResume();
    if (existingResume) {
      setResume(existingResume);
    }
  }, []);

  const handleResumeUploaded = (uploadedResume: Resume) => {
    setResume(uploadedResume);
    ResumeStorage.saveResume(uploadedResume);
    setTimeout(() => setCurrentStep('job'), 1000);
  };

  const handleJobFetched = (job: JobData) => {
    setJobData(job);
    setCurrentStep('tailor');
  };

  const handleTailorResume = async () => {
    if (!resume || !jobData) return;

    setTailoring(true);

    try {
      const response = await fetch('/api/tailor-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume,
          jobDescription: jobData.content,
          jobTitle: jobData.title,
          jobUrl: jobData.url,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to tailor resume');
      }

      const { tailoredResume: tailored, explanation: exp, usage } = await response.json();

      setTailoredResume(tailored);
      setExplanation(exp);
      setTokenUsage(usage);
      ResumeStorage.saveTailoredResume(tailored);
      setCurrentStep('download');
    } catch (error) {
      console.error('Tailoring error:', error);
      alert('Failed to tailor resume. Please try again.');
    } finally {
      setTailoring(false);
    }
  };

  const steps = [
    { id: 'upload', label: 'Upload Resume', icon: FileText },
    { id: 'job', label: 'Job Details', icon: Briefcase },
    { id: 'tailor', label: 'Tailor Resume', icon: Wand2 },
    { id: 'download', label: 'Download', icon: Download },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">MakeFastResume</h1>
          <p className="text-gray-600 mt-1">Tailor your resume for any job in minutes</p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center transition-colors
                        ${isCompleted ? 'bg-green-600' : isCurrent ? 'bg-blue-600' : 'bg-gray-300'}
                      `}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Icon className={`w-6 h-6 ${isCurrent ? 'text-white' : 'text-gray-500'}`} />
                      )}
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium ${
                        isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-gray-400 -mx-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {currentStep === 'upload' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Your Resume</h2>
              <p className="text-gray-600 mb-6">
                Paste the text of your current resume. We'll parse it with AI and use it as the foundation for tailored versions.
              </p>
              <ResumeTextInput
                onResumeUploaded={handleResumeUploaded}
                onClearResume={() => setResume(null)}
                existingResume={resume}
              />
            </div>
          )}

          {currentStep === 'job' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Job Details</h2>
              <p className="text-gray-600 mb-6">
                Paste the URL of the job posting you want to apply for. We'll extract the job description automatically.
              </p>
              <JobUrlInput
                onJobFetched={handleJobFetched}
                existingJobData={jobData}
                onClearJob={() => setJobData(null)}
              />

              {!jobData && (
                <div className="mt-6">
                  <button
                    onClick={() => setCurrentStep('upload')}
                    className="w-full py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Back to Resume Upload
                  </button>
                </div>
              )}
            </div>
          )}

          {currentStep === 'tailor' && jobData && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Tailor</h2>
              <p className="text-gray-600 mb-6">
                Review the job details and click "Tailor Resume" to optimize your resume for this position.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{jobData.title}</h3>
                <a
                  href={jobData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline mb-4 block"
                >
                  {jobData.url}
                </a>
                <div className="max-h-96 overflow-y-auto border border-gray-200 rounded p-4 bg-white">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{jobData.content}</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {jobData.content.length} characters • Scroll to read full description
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleTailorResume}
                  disabled={tailoring}
                  className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-semibold text-lg flex items-center justify-center gap-2"
                >
                  {tailoring ? (
                    <>
                      <Wand2 className="w-5 h-5 animate-pulse" />
                      Tailoring Resume...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Tailor Resume with AI
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setCurrentStep('job');
                    setJobData(null);
                  }}
                  disabled={tailoring}
                  className="w-full py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Back to Job Details
                </button>
              </div>
            </div>
          )}

          {currentStep === 'download' && tailoredResume && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Tailored Resume is Ready!</h2>
              <p className="text-gray-600 mb-6">
                We've optimized your resume for this position. Download it below and review the changes.
              </p>

              {explanation && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-900">
                    <strong>Changes Made:</strong> {explanation}
                  </p>
                </div>
              )}

              {tokenUsage && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">API Usage</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs text-gray-700">
                    <div>
                      <span className="font-medium">Input Tokens:</span> {tokenUsage.inputTokens.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Output Tokens:</span> {tokenUsage.outputTokens.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Total Tokens:</span> {tokenUsage.totalTokens.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Estimated Cost:</span> ${tokenUsage.estimatedCost}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    (Input: ${tokenUsage.costBreakdown.input} • Output: ${tokenUsage.costBreakdown.output})
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <PDFDownloadLink
                  document={<ResumePDF resume={tailoredResume} />}
                  fileName={(() => {
                    const name = tailoredResume.name.replace(/\s+/g, '_');
                    // Use company from jobData if available, otherwise extract from URL
                    const company = jobData?.company
                      ? jobData.company.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '')
                      : 'Company';
                    const position = tailoredResume.jobTitle
                      .replace(/\s+/g, '_')
                      .replace(/[^a-zA-Z0-9_-]/g, '');
                    return `${name}_resume_${company}_${position}.pdf`;
                  })()}
                  className="block w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg text-center"
                >
                  {({ loading }) => (loading ? 'Generating PDF...' : 'Download Tailored Resume')}
                </PDFDownloadLink>

                <button
                  onClick={() => {
                    setCurrentStep('job');
                    setJobData(null);
                    setTailoredResume(null);
                  }}
                  className="block w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Tailor for Another Job
                </button>

                <button
                  onClick={() => {
                    setCurrentStep('upload');
                    setResume(null);
                    setJobData(null);
                    setTailoredResume(null);
                  }}
                  className="block w-full py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Start Over with New Resume
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
