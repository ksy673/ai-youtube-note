'use client';

import { useState } from 'react';
import { Youtube, Sparkles, Copy, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Summarizer() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSummarize = async (e) => {
    e.preventDefault();
    setError('');
    setSummary('');
    
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      setError('올바른 유튜브 링크를 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ youtubeUrl: url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '요약을 가져오는 중 오류가 발생했습니다.');
      }

      setSummary(data.summary);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!summary) return;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="glass-card">
      <form onSubmit={handleSummarize} className="input-group">
        <input
          type="url"
          className="input-field"
          placeholder="https://www.youtube.com/watch?v=..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          disabled={isLoading}
        />
        <button type="submit" className="btn-primary" disabled={isLoading || !url}>
          {isLoading ? (
            <>
              <div className="spinner"></div>
              <span>AI가 타이핑 중...</span>
            </>
          ) : (
            <>
              <Sparkles size={20} />
              <span>핵심 요약하기</span>
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="error-message">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {summary && (
        <div className="result-container">
          <div className="result-header">
            <h2 className="result-title">
               요약 결과
            </h2>
            <button 
              onClick={copyToClipboard}
              className="btn-secondary"
              title="클립보드에 복사"
            >
              {copied ? <CheckCircle2 size={16} color="var(--success-color)" /> : <Copy size={16} />}
              <span>{copied ? '복사됨!' : '복사'}</span>
            </button>
          </div>
          <div className="result-content">
            {summary}
          </div>
        </div>
      )}
    </div>
  );
}
