import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

interface BlogLayoutProps {
  title: string;
  description: string;
  readTime: string;
  date: string;
  children: React.ReactNode;
}

export default function BlogLayout({ title, description, readTime, date, children }: BlogLayoutProps) {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "datePublished": date,
    "dateModified": date,
    "author": {
      "@type": "Organization",
      "name": "MakeFastResume"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MakeFastResume",
      "logo": {
        "@type": "ImageObject",
        "url": "https://makefastresume.com/logo.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": typeof window !== 'undefined' ? window.location.href : 'https://makefastresume.com/blog'
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
      />
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              <Image src="/icon.svg" alt="MakeFastResume Logo" width={32} height={32} className="w-8 h-8" />
              MakeFastResume
            </Link>
            <Link
              href="/tailor"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-sm hover:shadow-md"
            >
              Try It Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-10 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <header className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">{title}</h1>
          <p className="text-2xl text-gray-600 mb-8 leading-relaxed">{description}</p>
          <div className="flex gap-8 text-base text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {readTime}
            </div>
          </div>
        </header>

        <div className="prose prose-xl max-w-none
          prose-headings:font-bold
          prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:text-gray-900 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-4
          prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-gray-900
          prose-h4:text-2xl prose-h4:mt-8 prose-h4:mb-4 prose-h4:text-gray-800
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
          prose-li:text-gray-700 prose-li:text-lg prose-li:leading-relaxed prose-li:mb-3
          prose-ul:my-8 prose-ol:my-8
          prose-ul:space-y-3 prose-ol:space-y-3
          prose-strong:text-gray-900 prose-strong:font-bold
          prose-em:text-gray-800 prose-em:italic
          prose-a:text-blue-600 prose-a:no-underline prose-a:font-semibold hover:prose-a:underline hover:prose-a:text-blue-700
          prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
          prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-6 prose-pre:my-8
          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:my-8 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-gray-700
          prose-hr:my-12 prose-hr:border-gray-300
          prose-table:my-8 prose-th:bg-gray-100 prose-th:font-bold prose-th:text-gray-900 prose-td:text-gray-700
          prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
        ">
          {children}
        </div>

        {/* CTA */}
        <div className="mt-20 p-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border-2 border-blue-200 shadow-lg">
          <h3 className="text-3xl font-bold text-gray-900 mb-5">Ready to Tailor Your Resume?</h3>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Try MakeFastResume today and get your first tailored resume in minutes.
          </p>
          <Link
            href="/tailor"
            className="inline-block px-10 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold text-lg shadow-md hover:shadow-xl hover:scale-105"
          >
            Get Started Free
          </Link>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm">© 2025 MakeFastResume. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
