import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';

export const metadata = {
  title: 'Resume Optimization Blog | MakeFastResume',
  description: 'Expert insights on resume tailoring, ATS optimization, and job search strategies to help you land more interviews.',
};

export default function BlogIndex() {
  const posts = [
    {
      slug: 'why-tailored-resumes-work',
      title: 'Why Tailored Resumes Get 3x More Interviews (2025 Data)',
      description: 'Discover why customizing your resume for each job application dramatically increases your interview callback rate.',
      readTime: '8 min read',
      category: 'Resume Strategy',
    },
    {
      slug: 'beat-ats-systems',
      title: 'How to Beat Applicant Tracking Systems (ATS) in 2025',
      description: 'Master the art of getting past ATS filters with these proven strategies that actually work.',
      readTime: '10 min read',
      category: 'ATS Optimization',
    },
    {
      slug: 'resume-optimization-guide',
      title: 'The 10-Minute Resume Optimization Strategy That Works',
      description: 'Learn the exact step-by-step process to optimize your resume for any job in just 10 minutes.',
      readTime: '12 min read',
      category: 'Practical Guide',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Resume Optimization Blog
          </h1>
          <p className="text-xl md:text-2xl text-gray-600">
            Expert insights on resume tailoring, ATS optimization, and job search strategies
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-400 transition-all hover:shadow-xl bg-white"
              >
                <div className="mb-4">
                  <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{post.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <Clock className="w-5 h-5" />
                    {post.readTime}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold hover:gap-3 transition-all"
                  >
                    Read More
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Resume?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Put these strategies into action with MakeFastResume
          </p>
          <Link
            href="/tailor"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm">© 2025 MakeFastResume. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
