'use client';

import { useState, useEffect } from 'react';
import { Lock, Unlock } from 'lucide-react';

export default function AuthWrapper({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (res.ok) {
        setIsAuthenticated(true);
        // We temporarily store it in sessionStorage so we can pass it to /api/summarize 
        // without keeping it forever. It clears when the tab closes.
        sessionStorage.setItem('temp_auth_token', password);
      } else {
        const data = await res.json();
        setError(data.error || '비밀번호가 틀렸습니다.');
      }
    } catch (err) {
      setError('서버 연결에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) return null;

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="glass-card" style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: 'rgba(127, 0, 255, 0.2)', padding: '1rem', borderRadius: '50%' }}>
          <Lock size={32} color="#E100FF" />
        </div>
      </div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 600 }}>비밀번호 잠금</h2>
      <p className="subtitle" style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>
        개인용 요약 봇입니다. 접근 비밀번호를 입력해주세요.
      </p>
      
      <form onSubmit={handleLogin} className="input-group">
        <input
          type="password"
          className="input-field"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? <div className="spinner" style={{ width: '20px', height: '20px' }}></div> : <Unlock size={20} />}
          <span>{isLoading ? '확인 중...' : '잠금 해제'}</span>
        </button>
      </form>
      
      {error && (
        <div className="error-message" style={{ marginTop: '1rem' }}>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
