export interface WorkExperience {
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string; // or "Present"
  bullets: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  location?: string;
  graduationDate: string;
  gpa?: string;
  honors?: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies?: string[];
  link?: string;
  bullets?: string[];
}

export interface Resume {
  // Personal Info
  name: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  website?: string;

  // Summary
  summary?: string;

  // Skills
  skills: string[]; // Array of skills
  skillCategories?: {
    category: string;
    skills: string[];
  }[];

  // Experience
  experience: WorkExperience[];

  // Education
  education: Education[];

  // Projects (optional)
  projects?: Project[];

  // Additional sections
  certifications?: string[];
  awards?: string[];

  // Metadata
  originalPdfText?: string; // Full text from original PDF
  lastUpdated: string;
}

export interface TailoredResume extends Resume {
  jobUrl: string;
  jobTitle: string;
  jobDescription: string;
  tailoredDate: string;
  changes: ResumeChanges;
}

export interface ResumeChanges {
  experienceModified: boolean;
  skillsReordered: boolean;
  summaryCustomized: boolean;
  keywordsAdded: string[];
}

export interface ParsedResumeResult {
  success: boolean;
  resume?: Resume;
  error?: string;
  rawText?: string;
}
