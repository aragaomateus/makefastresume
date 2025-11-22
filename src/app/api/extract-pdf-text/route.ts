import { NextRequest, NextResponse } from 'next/server';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

/**
 * Extract PDF Text API Route
 *
 * Receives a PDF file as base64 and extracts the text content.
 * Uses pdfjs-dist legacy build for Node.js/serverless environments.
 */

// Set worker source to empty string to disable worker in serverless
// @ts-ignore
pdfjsLib.GlobalWorkerOptions.workerSrc = '';

export async function POST(req: NextRequest) {
  try {
    const { pdfBase64 } = await req.json();

    if (!pdfBase64) {
      return NextResponse.json(
        { error: 'PDF data is required' },
        { status: 400 }
      );
    }

    // Convert base64 to Uint8Array
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');
    const pdfData = new Uint8Array(pdfBuffer);

    // Load PDF document with legacy build (disable worker in serverless)
    const loadingTask = pdfjsLib.getDocument({
      data: pdfData,
      useSystemFonts: true,
      verbosity: 0,
      isEvalSupported: false,
      useWorkerFetch: false,
    });
    const pdf = await loadingTask.promise;

    let fullText = '';

    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n\n';
    }

    const data = {
      text: fullText.trim(),
      numpages: pdf.numPages,
    };

    return NextResponse.json({
      success: true,
      text: data.text,
      pages: data.numpages,
    });
  } catch (error) {
    console.error('PDF extraction error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to extract text from PDF',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
