import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

/**
 * PUPPETEER-ENABLED API ROUTE
 *
 * This route uses Puppeteer to render JavaScript-heavy job boards.
 *
 * ⚠️ FOR LOCAL DEVELOPMENT ONLY ⚠️
 * This will NOT work on Vercel due to:
 * - 50MB deployment size limit (Puppeteer + Chromium exceeds this)
 * - Serverless function timeout constraints
 * - Memory/CPU limitations
 *
 * To use this route, change the fetch URL in page.tsx from:
 *   '/api/fetch-job' to '/api/fetch-job-puppeteer'
 */

async function fetchWithPuppeteer(url: string): Promise<string> {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();

    // Set a realistic user agent
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });

    // Navigate to the page
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Wait for common job description elements to load
    await Promise.race([
      page.waitForSelector('[data-automation-id="jobPostingDescription"]', { timeout: 5000 }).catch(() => null),
      page.waitForSelector('.job-description', { timeout: 5000 }).catch(() => null),
      page.waitForSelector('.description', { timeout: 5000 }).catch(() => null),
      new Promise(resolve => setTimeout(resolve, 3000)) // Fallback wait
    ]);

    const html = await page.content();

    return html;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function fetchWithFetch(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.text();
}

const ALWAYS_USE_PUPPETEER_PATTERNS = [
  'myworkdayjobs.com',
  'workday.com',
  'lever.co',
  'reval.site',
  'careers.servicenow.com'
];

const shouldUsePuppeteer = (url: string): boolean => {
  return ALWAYS_USE_PUPPETEER_PATTERNS.some(pattern => url.includes(pattern));
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, forcePuppeteer } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    let html: string;

    // Use Puppeteer if forced or if URL matches known dynamic sites
    if (forcePuppeteer || shouldUsePuppeteer(url)) {
      console.log('Using Puppeteer to fetch:', url);
      html = await fetchWithPuppeteer(url);
    } else {
      console.log('Using regular fetch for:', url);
      html = await fetchWithFetch(url);
    }

    return NextResponse.json({ html });

  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch job description',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
