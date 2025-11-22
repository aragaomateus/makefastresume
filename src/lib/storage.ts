import { Resume, TailoredResume } from '@/types/resume';

const RESUME_STORAGE_KEY = 'makefastresume_user_resume';
const TAILORED_RESUMES_KEY = 'makefastresume_tailored_resumes';

export const ResumeStorage = {
  // Save original resume
  saveResume(resume: Resume): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(resume));
  },

  // Get original resume
  getResume(): Resume | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(RESUME_STORAGE_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data) as Resume;
    } catch {
      return null;
    }
  },

  // Check if resume exists
  hasResume(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(RESUME_STORAGE_KEY) !== null;
  },

  // Delete resume
  deleteResume(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(RESUME_STORAGE_KEY);
  },

  // Save a tailored resume
  saveTailoredResume(tailoredResume: TailoredResume): void {
    if (typeof window === 'undefined') return;
    const existing = this.getTailoredResumes();
    existing.push(tailoredResume);
    localStorage.setItem(TAILORED_RESUMES_KEY, JSON.stringify(existing));
  },

  // Get all tailored resumes
  getTailoredResumes(): TailoredResume[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(TAILORED_RESUMES_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data) as TailoredResume[];
    } catch {
      return [];
    }
  },

  // Get a specific tailored resume by job URL
  getTailoredResumeByJobUrl(jobUrl: string): TailoredResume | null {
    const tailored = this.getTailoredResumes();
    return tailored.find((r) => r.jobUrl === jobUrl) || null;
  },

  // Delete a tailored resume
  deleteTailoredResume(jobUrl: string): void {
    if (typeof window === 'undefined') return;
    const tailored = this.getTailoredResumes();
    const filtered = tailored.filter((r) => r.jobUrl !== jobUrl);
    localStorage.setItem(TAILORED_RESUMES_KEY, JSON.stringify(filtered));
  },

  // Clear all data
  clearAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(RESUME_STORAGE_KEY);
    localStorage.removeItem(TAILORED_RESUMES_KEY);
  },
};
