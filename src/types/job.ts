export interface JobData {
  title: string;
  company?: string;
  content: string;
  url: string;
}

export interface FetchJobResponse {
  html: string;
}

export interface FetchJobError {
  error: string;
  details?: string;
  isDynamic?: boolean;
}
