'use client';

import { FileText, Target, Sparkles, CheckCircle } from 'lucide-react';

export default function ProductMockups() {
  return (
    <div className="product-mockups-section">
      <div className="mockups-grid">
        {/* Step 1: Paste Resume */}
        <div className="mockup-card">
          <div className="mockup-icon-wrapper">
            <FileText className="mockup-icon" size={32} />
          </div>
          <div className="step-badge">Step 1</div>
          <h3 className="mockup-title">Paste Your Resume</h3>

          <div className="mockup-window">
            <div className="mockup-header">
              <div className="mockup-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="mockup-window-title">Resume Input</span>
            </div>
            <div className="mockup-content">
              <div className="mockup-text-area">
                <div className="mockup-text-line">WORK EXPERIENCE</div>
                <div className="mockup-text-line">Senior Software Engineer</div>
                <div className="mockup-text-line bullet">• Led team projects...</div>
                <div className="mockup-text-line bullet">• Improved efficiency...</div>
                <div className="mockup-text-line bullet">• Worked on backend...</div>
              </div>
              <div className="mockup-status success">
                <CheckCircle size={16} />
                <span>Resume parsed successfully</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Add Job URL */}
        <div className="mockup-card">
          <div className="mockup-icon-wrapper">
            <Target className="mockup-icon" size={32} />
          </div>
          <div className="step-badge">Step 2</div>
          <h3 className="mockup-title">Add Job URL</h3>

          <div className="mockup-window">
            <div className="mockup-header">
              <div className="mockup-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="mockup-window-title">Job Analysis</span>
            </div>
            <div className="mockup-content">
              <div className="mockup-url-input">
                <div className="url-bar">linkedin.com/jobs/senior-software-engineer...</div>
              </div>
              <div className="mockup-analysis">
                <div className="analysis-item">
                  <div className="analysis-icon">🔍</div>
                  <div>Analyzing job requirements...</div>
                </div>
                <div className="analysis-item success">
                  <CheckCircle size={14} />
                  <div>47 keywords identified</div>
                </div>
                <div className="analysis-item success">
                  <CheckCircle size={14} />
                  <div>Skills matched: Python, AWS, Docker</div>
                </div>
                <div className="keyword-tags">
                  <span className="keyword-tag">Python</span>
                  <span className="keyword-tag">AWS</span>
                  <span className="keyword-tag">CI/CD</span>
                  <span className="keyword-tag">Agile</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Download */}
        <div className="mockup-card">
          <div className="mockup-icon-wrapper">
            <Sparkles className="mockup-icon" size={32} />
          </div>
          <div className="step-badge">Step 3</div>
          <h3 className="mockup-title">Download & Apply</h3>

          <div className="mockup-window">
            <div className="mockup-header">
              <div className="mockup-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="mockup-window-title">Tailored Resume</span>
            </div>
            <div className="mockup-content">
              <div className="mockup-pdf-preview">
                <div className="pdf-icon">📄</div>
                <div className="pdf-info">
                  <div className="pdf-name">resume_senior_engineer.pdf</div>
                  <div className="pdf-stats">
                    <div className="stat-item">
                      <CheckCircle size={14} />
                      <span>ATS Score: 94/100</span>
                    </div>
                    <div className="stat-item">
                      <CheckCircle size={14} />
                      <span>32 keywords optimized</span>
                    </div>
                    <div className="stat-item">
                      <CheckCircle size={14} />
                      <span>Ready to apply</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="mockup-download-btn">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-mockups-section {
          padding: 2rem 0;
        }

        .mockups-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .mockups-grid {
            grid-template-columns: 1fr;
          }
        }

        .mockup-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .mockup-icon-wrapper {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
        }

        .mockup-icon {
          color: white;
        }

        .step-badge {
          font-size: 0.75rem;
          font-weight: 600;
          color: #2563eb;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .mockup-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1.5rem;
        }

        .mockup-window {
          width: 100%;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        .mockup-header {
          background: #f9fafb;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .mockup-dots {
          display: flex;
          gap: 0.375rem;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .dot.red {
          background: #ef4444;
        }

        .dot.yellow {
          background: #f59e0b;
        }

        .dot.green {
          background: #10b981;
        }

        .mockup-window-title {
          font-size: 0.75rem;
          color: #6b7280;
          font-weight: 500;
        }

        .mockup-content {
          padding: 1.5rem;
        }

        .mockup-text-area {
          background: #f9fafb;
          padding: 1rem;
          border-radius: 8px;
          text-align: left;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        .mockup-text-line {
          color: #374151;
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }

        .mockup-text-line.bullet {
          color: #6b7280;
          font-size: 0.8125rem;
        }

        .mockup-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .mockup-status.success {
          background: #ecfdf5;
          color: #059669;
        }

        .mockup-url-input {
          margin-bottom: 1rem;
        }

        .url-bar {
          background: #f9fafb;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          border: 2px solid #e5e7eb;
          font-size: 0.875rem;
          color: #6b7280;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .mockup-analysis {
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .analysis-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .analysis-item.success {
          color: #059669;
          font-weight: 500;
        }

        .analysis-icon {
          font-size: 1.25rem;
        }

        .keyword-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .keyword-tag {
          background: #dbeafe;
          color: #1e40af;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .mockup-pdf-preview {
          background: #f9fafb;
          padding: 1.5rem;
          border-radius: 8px;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .pdf-icon {
          font-size: 2.5rem;
        }

        .pdf-info {
          flex: 1;
          text-align: left;
        }

        .pdf-name {
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.75rem;
          font-size: 0.875rem;
        }

        .pdf-stats {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #059669;
          font-size: 0.8125rem;
          font-weight: 500;
        }

        .mockup-download-btn {
          width: 100%;
          background: #2563eb;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .mockup-download-btn:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3);
        }
      `}</style>
    </div>
  );
}
