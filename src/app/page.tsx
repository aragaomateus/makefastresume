'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Target, CheckCircle, Sparkles, FileText, Clock } from 'lucide-react';
import ResumeTransformationPreview from '@/components/ResumeTransformationPreview';
import ProductMockups from '@/components/ProductMockups';
import InlineResumeUpload from '@/components/InlineResumeUpload';

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
      <nav className="bg-white sticky top-0 z-50 shadow-sm">
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
            <span className="text-blue-600">Tailor Your Resume</span> for Every Job in 3 Minutes
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Paste your resume and job URL. Our AI optimizes it for ATS systems and hiring managers. Download instantly.
          </p>

          {/* Resume Transformation Preview */}
          <div className="mb-12">
            <ResumeTransformationPreview />
          </div>

          {/* Inline Resume Upload */}
          <div className="max-w-3xl mx-auto mb-8">
            <InlineResumeUpload />
          </div>

          <div className="flex justify-center items-center gap-4 mb-6">
            <Link
              href="/blog/why-tailored-resumes-work"
              className="text-blue-600 hover:text-blue-700 font-semibold underline transition-colors"
            >
              See How It Works →
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tailor Your Resume in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600">
              Our AI does the heavy lifting while you focus on landing interviews
            </p>
          </div>

          <ProductMockups />
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 border-2 border-orange-200 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              75% of resumes never reach a human recruiter
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Generic resumes get filtered out by ATS systems. Manually customizing takes 2-3 hours per job. We fix both problems in 3 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why MakeFastResume Works
            </h2>
            <p className="text-lg text-gray-600">
              Powered by Advanced AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">ATS-Optimized</h3>
              <p className="text-gray-600 leading-relaxed">
                Automatically identifies and incorporates job-specific keywords to pass Applicant Tracking Systems.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">3 Minutes</h3>
              <p className="text-gray-600 leading-relaxed">
                What used to take 2-3 hours of manual work now happens in under 5 minutes with better results.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Unlimited Use</h3>
              <p className="text-gray-600 leading-relaxed">
                Create as many tailored versions as you need. Apply to 10, 20, or 100 jobs with optimized resumes for each.
              </p>
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
