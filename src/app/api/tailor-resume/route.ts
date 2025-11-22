import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import type { Resume, TailoredResume } from '@/types/resume';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    const { resume, jobDescription, jobTitle, jobUrl } = await req.json();

    if (!resume || !jobDescription) {
      return NextResponse.json(
        { error: 'Resume and job description are required' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      );
    }

    const prompt = `You are an expert resume tailoring specialist. You need to optimize a resume for a specific job posting while maintaining authenticity, truthfulness, and the original resume's format and length.

ORIGINAL RESUME:
${JSON.stringify(resume, null, 2)}

TARGET JOB POSTING:
Title: ${jobTitle}
Description: ${jobDescription}

YOUR TASK:
Tailor this resume to maximize relevance for the target job. Follow these STRICT guidelines:

1. **CRITICAL FORMATTING RULES** (DO NOT VIOLATE):
   - Maintain the EXACT same structure and section order as the original resume
   - Keep the resume length identical (if original is 1 page, tailored must be 1 page)
   - Preserve the visual density and conciseness of the original
   - Do NOT expand bullets or add unnecessary words
   - Do NOT restructure sections or change the layout

2. **Rewrite Work Experience Bullets** (STRICT RULES):
   - Start each bullet with EXACTLY ONE action verb (NEVER use "and" to combine two verbs like "Developed and maintained")
   - Each bullet point should describe ONE clear accomplishment or responsibility
   - NEVER combine unrelated achievements in the same bullet (e.g., don't mix mentoring with technical work)
   - Keep bullet points concise - similar length to the original
   - Use keywords from the job description naturally but don't force them
   - Maintain truthfulness - don't fabricate connections between unrelated accomplishments
   - Keep dates, companies, and job titles exactly as they are

3. **Adjust Skills Section** (MINIMAL CHANGES):
   - Only reorder skills to put the most relevant ones first
   - Do NOT add a verbose skills paragraph or expand the section
   - Keep the same format as the original (comma-separated list, tags, etc.)
   - Only add skills that are genuinely implied by their explicit experience

4. **Preserve Authenticity**:
   - Never add false experience or qualifications
   - Never combine or conflate separate achievements
   - Keep exact same level of detail as original
   - Don't make bullets wordier or add buzzwords unnecessarily

5. **ATS Optimization**:
   - Incorporate relevant keywords from job description naturally
   - Use technical terms that match the job posting
   - Keep it human-readable and concise

Return a JSON object with:
{
  "tailoredResume": {
    // The complete Resume object with all fields, tailored for this job
    // MUST maintain same structure and conciseness as original
  },
  "changes": {
    "experienceModified": true/false,
    "skillsReordered": true/false,
    "summaryCustomized": true/false,
    "keywordsAdded": ["keyword1", "keyword2"]
  },
  "explanation": "Brief explanation of key changes made (2-3 sentences)"
}

Return ONLY valid JSON, no markdown formatting.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8192,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const response = message.content[0];
    if (response.type === 'text') {
      let jsonText = response.text.trim();

      // Remove markdown code blocks if present
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```\n?/g, '');
      }

      const result = JSON.parse(jsonText);

      // Calculate token usage and cost
      const inputTokens = message.usage.input_tokens;
      const outputTokens = message.usage.output_tokens;
      const totalTokens = inputTokens + outputTokens;

      // Claude Sonnet 4 pricing (as of Jan 2025)
      // Input: $3 per MTok, Output: $15 per MTok
      const inputCost = (inputTokens / 1_000_000) * 3;
      const outputCost = (outputTokens / 1_000_000) * 15;
      const totalCost = inputCost + outputCost;

      // Construct the complete TailoredResume object
      const tailoredResume: TailoredResume = {
        ...result.tailoredResume,
        jobUrl: jobUrl || '',
        jobTitle: jobTitle || '',
        jobDescription: jobDescription,
        tailoredDate: new Date().toISOString(),
        changes: result.changes,
        lastUpdated: new Date().toISOString(),
      };

      return NextResponse.json({
        success: true,
        tailoredResume,
        explanation: result.explanation,
        usage: {
          inputTokens,
          outputTokens,
          totalTokens,
          estimatedCost: totalCost.toFixed(4),
          costBreakdown: {
            input: inputCost.toFixed(4),
            output: outputCost.toFixed(4)
          }
        }
      });
    }

    throw new Error('Failed to tailor resume with Claude');
  } catch (error) {
    console.error('Resume tailoring error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to tailor resume',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
