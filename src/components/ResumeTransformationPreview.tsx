'use client';

import { useState, useEffect } from 'react';

export default function ResumeTransformationPreview() {
  const [currentStep, setCurrentStep] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showHighlight, setShowHighlight] = useState(false);

  const transformationSteps = [
    {
      before: "Managed team projects and improved efficiency",
      after: "Led cross-functional agile team of 8 engineers, implementing CI/CD pipeline that reduced deployment time by 40%",
      keywords: ["agile", "CI/CD", "deployment"]
    },
    {
      before: "Worked on backend systems",
      after: "Architected scalable microservices using Python and AWS, handling 10M+ daily requests with 99.9% uptime",
      keywords: ["Python", "AWS", "microservices"]
    },
    {
      before: "Improved customer satisfaction",
      after: "Increased customer NPS score from 42 to 68 by implementing data-driven product features based on user feedback analysis",
      keywords: ["NPS", "data-driven", "user feedback"]
    }
  ];

  const currentTransformation = transformationSteps[currentStep];

  useEffect(() => {
    // Cycle through steps every 6 seconds
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % transformationSteps.length);
      setTypedText('');
      setShowHighlight(false);
    }, 6000);

    return () => clearInterval(stepInterval);
  }, []);

  useEffect(() => {
    // Typing animation
    if (typedText.length < currentTransformation.after.length) {
      const timeout = setTimeout(() => {
        setTypedText(currentTransformation.after.slice(0, typedText.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      // Show keyword highlights after typing completes
      const highlightTimeout = setTimeout(() => {
        setShowHighlight(true);
      }, 500);
      return () => clearTimeout(highlightTimeout);
    }
  }, [typedText, currentTransformation]);

  const highlightKeywords = (text: string, keywords: string[]) => {
    if (!showHighlight) return text;

    let highlightedText = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      highlightedText = highlightedText.replace(
        regex,
        `<span class="keyword-highlight">${keyword}</span>`
      );
    });
    return highlightedText;
  };

  return (
    <div className="resume-transformation-preview">
      <div className="transformation-container">
        <div className="transformation-side before-side">
          <div className="side-label">Generic Resume</div>
          <div className="resume-bullet before-bullet">
            • {currentTransformation.before}
          </div>
        </div>

        <div className="transformation-arrow">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              d="M13 5l7 7-7 7M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="arrow-label">AI Optimization</div>
        </div>

        <div className="transformation-side after-side">
          <div className="side-label">Tailored Resume</div>
          <div className="resume-bullet after-bullet">
            • <span
                dangerouslySetInnerHTML={{
                  __html: highlightKeywords(typedText, currentTransformation.keywords)
                }}
              />
            <span className="typing-cursor">|</span>
          </div>
        </div>
      </div>

      <div className="step-indicators">
        {transformationSteps.map((_, index) => (
          <div
            key={index}
            className={`step-dot ${index === currentStep ? 'active' : ''}`}
          />
        ))}
      </div>

      <style jsx>{`
        .resume-transformation-preview {
          padding: 2rem 1rem;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          max-width: 100%;
          margin: 2rem auto;
        }

        .transformation-container {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 1.5rem;
          align-items: center;
        }

        @media (max-width: 768px) {
          .transformation-container {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .transformation-arrow {
            transform: rotate(90deg);
            margin: 0.5rem 0;
          }
        }

        .transformation-side {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .side-label {
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .before-side .side-label {
          color: #6b7280;
        }

        .after-side .side-label {
          color: #2563eb;
        }

        .resume-bullet {
          padding: 1rem;
          border-radius: 0.5rem;
          font-size: 0.95rem;
          line-height: 1.6;
          min-height: 120px;
          display: flex;
          align-items: center;
        }

        .before-bullet {
          background: #f3f4f6;
          color: #6b7280;
          border: 2px solid #e5e7eb;
        }

        .after-bullet {
          background: #eff6ff;
          color: #1e293b;
          border: 2px solid #3b82f6;
          position: relative;
        }

        :global(.keyword-highlight) {
          background: #fef3c7;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-weight: 600;
          color: #92400e;
          transition: all 0.3s ease;
        }

        .typing-cursor {
          display: inline-block;
          width: 2px;
          height: 1.2em;
          background: #2563eb;
          margin-left: 2px;
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        .transformation-arrow {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: #2563eb;
        }

        .arrow-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #2563eb;
          white-space: nowrap;
        }

        .step-indicators {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }

        .step-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #d1d5db;
          transition: all 0.3s ease;
        }

        .step-dot.active {
          background: #2563eb;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
