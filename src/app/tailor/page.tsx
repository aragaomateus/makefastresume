'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ChevronRight, CheckCircle, FileText, Briefcase, Wand2, Download, Home as HomeIcon } from 'lucide-react';
import ResumeTextInput from '@/components/ResumeTextInput';
import JobUrlInput from '@/components/JobUrlInput';
import ResumePDF from '@/components/ResumePDF';
import { ResumeStorage } from '@/lib/storage';
import type { Resume, TailoredResume } from '@/types/resume';
import type { JobData } from '@/types/job';

type Step = 'upload' | 'job' | 'tailor' | 'download';

export default function TailorPage() {
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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              <Image src="/icon.svg" alt="MakeFastResume Logo" width={32} height={32} className="w-8 h-8" />
              MakeFastResume
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <HomeIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <Link
                href="/blog"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps - Modern card-based design */}
        <div className="mb-12 bg-white rounded-2xl shadow-md p-8 border border-gray-200">
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div
                  key={step.id}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-200 ${
                    isCurrent
                      ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                      : isCompleted
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-all ${
                        isCompleted
                          ? 'bg-green-600 shadow-md'
                          : isCurrent
                          ? 'bg-blue-600 shadow-lg'
                          : 'bg-gray-300'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-7 h-7 text-white" />
                      ) : (
                        <Icon className={`w-7 h-7 ${isCurrent ? 'text-white' : 'text-gray-500'}`} />
                      )}
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        isCurrent ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                      <ChevronRight
                        className={`w-6 h-6 ${
                          isCompleted ? 'text-green-500' : isCurrent ? 'text-blue-500' : 'text-gray-300'
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content - Improved card design */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
          {currentStep === 'upload' && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Upload Your Resume</h2>
                <p className="text-lg text-gray-600">
                  Paste the text of your current resume. Our AI will parse it and use it as the foundation for tailored versions.
                </p>
              </div>
              <ResumeTextInput
                onResumeUploaded={handleResumeUploaded}
                onClearResume={() => setResume(null)}
                existingResume={resume}
              />
            </div>
          )}

          {currentStep === 'job' && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Add Job Details</h2>
                <p className="text-lg text-gray-600">
                  Paste the URL of the job posting. We'll automatically extract the job description and requirements.
                </p>
              </div>
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
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Review & Tailor</h2>
                <p className="text-lg text-gray-600">
                  Review the job details below and click "Tailor Resume" to optimize your resume with AI.
                </p>
              </div>

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
              <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Your Tailored Resume is Ready!</h2>
                <p className="text-lg text-gray-600">
                  We've optimized your resume for this position. Download it below and start applying.
                </p>
              </div>

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
