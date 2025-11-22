'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Target, CheckCircle, Sparkles, FileText, Clock } from 'lucide-react';

export default function LandingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "MakeFastResume",
    "url": "https://makefastresume.com",
    "description": "AI-powered resume tailoring service that helps job seekers get 3x more interviews by optimizing resumes for each job application",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "AI-powered resume optimization",
      "ATS keyword optimization",
      "Automated job description analysis",
      "PDF resume generation",
      "Unlimited resume tailoring"
    ],
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0",
    "operatingSystem": "Any"
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MakeFastResume",
    "url": "https://makefastresume.com",
    "logo": "https://makefastresume.com/logo.svg",
    "description": "AI-powered resume tailoring service",
    "sameAs": [
      "https://twitter.com/makefastresume"
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              <Image src="/icon.svg" alt="MakeFastResume Logo" width={32} height={32} className="w-8 h-8" />
              MakeFastResume
            </Link>
            <div className="flex gap-6 items-center">
              <Link href="/blog" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Blog
              </Link>
              <Link
                href="/tailor"
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-sm hover:shadow-md"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Get 3x More Interviews with
            <span className="text-blue-600 block mt-2"> AI-Tailored Resumes</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Stop sending the same resume to every job. Our AI optimizes your resume for each position in minutes,
            helping you beat ATS systems and land more interviews.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/tailor"
              className="px-10 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold text-lg flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Start Tailoring Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/blog/why-tailored-resumes-work"
              className="px-10 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold text-lg shadow-md"
            >
              See How It Works
            </Link>
          </div>
          <p className="mt-8 text-base text-gray-600 font-medium">
            ✓ Free to use  ✓ No credit card required  ✓ Results in minutes
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Are You Making These Resume Mistakes?
            </h2>
            <p className="text-lg text-gray-600">
              Most job seekers lose opportunities before a human ever sees their resume
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border-2 border-red-200 rounded-lg bg-red-50">
              <div className="text-4xl mb-4">❌</div>
              <h3 className="font-semibold text-lg mb-2">Generic Resume</h3>
              <p className="text-gray-600 text-sm">
                Sending the same resume to every job means you're missing 70% of ATS keywords and failing to match job requirements.
              </p>
            </div>

            <div className="p-6 border-2 border-red-200 rounded-lg bg-red-50">
              <div className="text-4xl mb-4">❌</div>
              <h3 className="font-semibold text-lg mb-2">ATS Rejection</h3>
              <p className="text-gray-600 text-sm">
                75% of resumes never reach a human recruiter because Applicant Tracking Systems filter them out for missing keywords.
              </p>
            </div>

            <div className="p-6 border-2 border-red-200 rounded-lg bg-red-50">
              <div className="text-4xl mb-4">❌</div>
              <h3 className="font-semibold text-lg mb-2">Hours Wasted</h3>
              <p className="text-gray-600 text-sm">
                Manually customizing resumes takes 2-3 hours per application, limiting how many jobs you can apply to effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tailor Your Resume in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600">
              Our AI does the heavy lifting while you focus on landing interviews
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-blue-600 font-bold mb-3 text-sm uppercase tracking-wide">Step 1</div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">Paste Your Resume</h3>
              <p className="text-gray-600 leading-relaxed">
                Copy and paste your current resume. Our AI parses it and extracts all your experience, skills, and achievements.
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-blue-600 font-bold mb-3 text-sm uppercase tracking-wide">Step 2</div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">Add Job URL</h3>
              <p className="text-gray-600 leading-relaxed">
                Paste the job posting URL. We automatically extract requirements, keywords, and what the employer is looking for.
              </p>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-blue-600 font-bold mb-3 text-sm uppercase tracking-wide">Step 3</div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">Download & Apply</h3>
              <p className="text-gray-600 leading-relaxed">
                Get your optimized resume in seconds. Download the PDF and apply with confidence, knowing it's perfectly tailored.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-gray-600">
              Claude Sonnet 4 ensures your resume stands out for all the right reasons
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-5 p-7 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all bg-white">
              <CheckCircle className="w-7 h-7 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">ATS-Optimized Keywords</h3>
                <p className="text-gray-600 leading-relaxed">
                  Automatically identifies and incorporates relevant keywords from job descriptions to pass Applicant Tracking Systems.
                </p>
              </div>
            </div>

            <div className="flex gap-5 p-7 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all bg-white">
              <CheckCircle className="w-7 h-7 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Smart Experience Reframing</h3>
                <p className="text-gray-600 leading-relaxed">
                  Rewrites your bullet points to emphasize the most relevant skills and achievements for each specific role.
                </p>
              </div>
            </div>

            <div className="flex gap-5 p-7 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all bg-white">
              <CheckCircle className="w-7 h-7 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Maintains Authenticity</h3>
                <p className="text-gray-600 leading-relaxed">
                  Never fabricates experience. Only highlights and reframes what you've actually accomplished in your career.
                </p>
              </div>
            </div>

            <div className="flex gap-5 p-7 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all bg-white">
              <CheckCircle className="w-7 h-7 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Professional Formatting</h3>
                <p className="text-gray-600 leading-relaxed">
                  Generates clean, ATS-friendly PDFs that look great both in automated systems and to human recruiters.
                </p>
              </div>
            </div>

            <div className="flex gap-5 p-7 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all bg-white">
              <Clock className="w-7 h-7 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Minutes, Not Hours</h3>
                <p className="text-gray-600 leading-relaxed">
                  What used to take 2-3 hours of manual work now happens in under 5 minutes with better results.
                </p>
              </div>
            </div>

            <div className="flex gap-5 p-7 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all bg-white">
              <Zap className="w-7 h-7 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">Unlimited Tailoring</h3>
                <p className="text-gray-600 leading-relaxed">
                  Create as many tailored versions as you need. Apply to 10, 20, or 100 jobs with optimized resumes for each.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Join Thousands of Successful Job Seekers
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">3x</div>
              <p className="text-gray-600">More interview callbacks</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">75%</div>
              <p className="text-gray-600">Pass ATS systems</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">5min</div>
              <p className="text-gray-600">Average tailoring time</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start tailoring your resume for free. No credit card required.
          </p>
          <Link
            href="/tailor"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">MakeFastResume</h3>
              <p className="text-sm">AI-powered resume tailoring for modern job seekers.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog/why-tailored-resumes-work" className="hover:text-white">Why Tailored Resumes Work</Link></li>
                <li><Link href="/blog/beat-ats-systems" className="hover:text-white">Beat ATS Systems</Link></li>
                <li><Link href="/blog/resume-optimization-guide" className="hover:text-white">Optimization Guide</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tailor" className="hover:text-white">Resume Tailor</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
            © 2025 MakeFastResume. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
