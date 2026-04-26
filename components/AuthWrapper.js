'use client';

import { useState, useEffect } from 'react';
import { Lock, Unlock } from 'lucide-react';

export default function AuthWrapper({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedPassword = localStorage.getItem('app_password');
    // We don't verify it with the server right away to save API calls.
    // We just assume if it's there, they pass the gate.
    // If the server rejects it later during summarization, we'll clear it.
    if (savedPassword) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.length > 0) {
      localStorage.setItem('app_password', password);
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('비밀번호를 입력해주세요.');
    }
  };

  // Listen for 'auth_error' event from children (Summarizer) to clear password
  useEffect(() => {
    const handleAuthError = () => {
      localStorage.removeItem('app_password');
      setIsAuthenticated(false);
      setError('비밀번호가 올바르지 않거나 변경되었습니다.');
    };
    window.addEventListener('auth_error', handleAuthError);
    return () => window.removeEventListener('auth_error', handleAuthError);
  }, []);

  if (!isClient) return null; // Avoid hydration mismatch

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
        />
        <button type="submit" className="btn-primary">
          <Unlock size={20} />
          <span>잠금 해제</span>
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
