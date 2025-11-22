import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

/**
 * Parse Resume API Route
 *
 * This endpoint receives a PDF file (as base64 or buffer), extracts the text,
 * and uses Claude to structure it into a Resume object.
 */

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

async function extractStructuredResume(resumeText: string) {
  const prompt = `You are a resume parser. Extract structured information from the following resume text and return it as JSON.

Resume Text:
${resumeText}

Please extract and return a JSON object with this structure:
{
  "name": "Full Name",
  "email": "email@example.com",
  "phone": "phone number",
  "location": "City, State",
  "linkedin": "linkedin URL if present",
  "github": "github URL if present",
  "website": "personal website if present",
  "summary": "professional summary or objective if present",
  "skills": ["skill1", "skill2", "skill3"],
  "experience": [
    {
      "company": "Company Name",
      "position": "Job Title",
      "location": "City, State",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY or Present",
      "bullets": ["achievement 1", "achievement 2"]
    }
  ],
  "education": [
    {
      "institution": "University Name",
      "degree": "Degree Type",
      "field": "Field of Study",
      "location": "City, State",
      "graduationDate": "MM/YYYY",
      "gpa": "GPA if mentioned",
      "honors": ["honor1", "honor2"]
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "Brief description",
      "technologies": ["tech1", "tech2"],
      "bullets": ["detail 1", "detail 2"]
    }
  ],
  "certifications": ["cert1", "cert2"],
  "awards": ["award1", "award2"]
}

Important:
- Only include fields that are present in the resume
- Preserve the exact wording from the resume
- Keep bullet points concise and impactful
- Return ONLY valid JSON, no markdown formatting`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const response = message.content[0];
  if (response.type === 'text') {
    // Extract JSON from response (handle markdown code blocks)
    let jsonText = response.text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }

    const parsedData = JSON.parse(jsonText);
    return {
      ...parsedData,
      lastUpdated: new Date().toISOString(),
    };
  }

  throw new Error('Failed to parse resume with Claude');
}

export async function POST(req: NextRequest) {
  try {
    const { resumeText } = await req.json();

    if (!resumeText || resumeText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      );
    }

    const resume = await extractStructuredResume(resumeText);

    return NextResponse.json({
      success: true,
      resume,
      rawText: resumeText,
    });
  } catch (error) {
    console.error('Resume parsing error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to parse resume',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
