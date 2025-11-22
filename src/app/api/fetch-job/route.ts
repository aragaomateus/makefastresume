import { NextRequest, NextResponse } from 'next/server';

const DYNAMIC_SITE_PATTERNS = [
  'myworkdayjobs.com',
  'workday.com',
  'lever.co',
  'reval.site',
  'careers.servicenow.com',
  'royalcaribbeangroup.com'
];

const isDynamicSite = (url: string): boolean => {
  return DYNAMIC_SITE_PATTERNS.some(pattern => url.includes(pattern));
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Check if this is a known dynamic site that requires JavaScript rendering
    if (isDynamicSite(url)) {
      return NextResponse.json(
        {
          error: 'Dynamic site detected',
          details: 'This job board uses JavaScript to load content and is not currently supported. Please try copying the job description directly from your browser, or use job boards like Greenhouse that work with this tool.',
          isDynamic: true
        },
        { status: 400 }
      );
    }

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

    const html = await response.text();

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
