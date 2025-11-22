# MakeFastResume

An AI-powered resume tailoring tool that helps job seekers customize their resumes for specific job postings in minutes.

## Features

- **Resume Upload & Parsing**: Upload your resume as PDF, automatically parsed and structured using Claude AI
- **Job Board Integration**: Fetch job descriptions from 6+ major job boards (Greenhouse, SmartRecruiters, YCombinator, AshbyHQ, Paylocity, Jobvite)
- **AI-Powered Tailoring**: Claude AI optimizes your resume by:
  - Rewriting work experience to emphasize relevant skills
  - Reordering skills to match job requirements
  - Adding relevant keywords for ATS optimization
  - Maintaining authenticity and truthfulness
- **Professional PDF Generation**: Export tailored resumes as clean, professional PDFs
- **LocalStorage Persistence**: Save your resume and tailored versions locally
- **TypeScript**: Full type safety throughout
- **Optimized for Vercel**: Serverless-ready deployment

## Supported Job Boards

### ✅ Production Ready (Works on Vercel)

- **Greenhouse** (greenhouse.io) - Perfect support
- **SmartRecruiters** (smartrecruiters.com) - Full support
- **YCombinator** (ycombinator.com) - Full support
- **AshbyHQ** (ashbyhq.com) - Extracts from embedded data
- **Paylocity** (paylocity.com) - Full support
- **Jobvite** (jobvite.com) - Full support

### ⚠️ Developer Mode Only (Requires Puppeteer - Local Dev)

- **Workday** (myworkdayjobs.com) - Enable Developer Mode
- **Reval** (reval.site) - Enable Developer Mode
- **Lever** (lever.co) - Enable Developer Mode

### ❌ Not Supported

- **ServiceNow** (careers.servicenow.com) - Blocks automated requests

See [JOB_BOARDS_SUPPORT.md](./JOB_BOARDS_SUPPORT.md) for detailed compatibility matrix and implementation notes.

## Getting Started

### Prerequisites

1. Get an Anthropic API key from [https://console.anthropic.com/](https://console.anthropic.com/)
2. Create a `.env.local` file in the root directory:

```bash
ANTHROPIC_API_KEY=your_api_key_here
```

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Usage Flow

1. **Upload Resume**: Upload your current resume as a PDF
2. **Enter Job URL**: Paste the URL of a job posting
3. **AI Tailoring**: Claude analyzes and optimizes your resume
4. **Download**: Get your tailored resume as a professional PDF

### Production Build

```bash
npm run build
npm start
```

**Note:** Make sure to set `ANTHROPIC_API_KEY` in your production environment variables.

## Deploy to Vercel

The easiest way to deploy this Next.js app is with Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with default settings

The app is optimized for serverless deployment with no additional configuration needed.

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** Vercel (serverless)

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── fetch-job/
│   │       └── route.ts      # API endpoint for fetching jobs
│   ├── page.tsx              # Main UI component
│   └── layout.tsx
└── types/
    └── job.ts                # TypeScript type definitions
```

## How It Works

1. User enters a job posting URL
2. API route fetches the HTML from the server (bypassing CORS)
3. Client-side JavaScript parses the HTML and extracts:
   - Job title from `<h1>`, JSON-LD, or `<title>` tags
   - Job description from multiple potential selectors
4. User can download as text file or copy to clipboard

## API Route

The `/api/fetch-job` endpoint:
- Accepts POST requests with a `url` parameter
- Detects and rejects dynamic sites with helpful error messages
- Returns the raw HTML for static job boards
- Includes proper User-Agent headers for compatibility

## License

MIT
