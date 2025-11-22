import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://makefastresume.com'),
  title: {
    default: "MakeFastResume - AI-Powered Resume Tailoring",
    template: "%s | MakeFastResume"
  },
  description: "Get 3x more interviews with AI-tailored resumes. Optimize your resume for each job in minutes with our advanced AI technology powered by Claude Sonnet 4.",
  keywords: ["resume tailoring", "AI resume", "ATS optimization", "resume optimization", "job application", "resume builder", "tailored resume", "resume keywords", "applicant tracking system", "Claude AI"],
  authors: [{ name: "MakeFastResume" }],
  creator: "MakeFastResume",
  publisher: "MakeFastResume",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://makefastresume.com',
    title: 'MakeFastResume - AI-Powered Resume Tailoring',
    description: 'Get 3x more interviews with AI-tailored resumes. Optimize your resume for each job in minutes.',
    siteName: 'MakeFastResume',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MakeFastResume - AI Resume Tailoring',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MakeFastResume - AI-Powered Resume Tailoring',
    description: 'Get 3x more interviews with AI-tailored resumes. Optimize your resume for each job in minutes.',
    images: ['/og-image.png'],
    creator: '@makefastresume',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when you get them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
