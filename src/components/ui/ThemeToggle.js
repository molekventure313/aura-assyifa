'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('esyifaa-theme') || localStorage.getItem('esyifaa-theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, []);

  const toggleTheme = (newTheme) => {
    if (theme === newTheme) return;
    setTheme(newTheme);
    localStorage.setItem('esyifaa-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    if (newTheme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  };

  return (
    <div 
      style={{ 
        display: 'inline-flex',
        alignItems: 'center',
        background: theme === 'light' ? '#E2E8F0' : '#12151E', 
        border: theme === 'light' ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.1)', 
        borderRadius: '6px', 
        padding: '2px',
        gap: '2px'
      }}
    >
      {/* Light Mode Button (Matahari SVG) */}
      <button
        type="button"
        title="Mod Terang (Light Mode)"
        onClick={() => toggleTheme('light')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '0.3rem 0.55rem',
          borderRadius: '4px',
          fontSize: '0.725rem',
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          background: theme === 'light' ? '#FFFFFF' : 'transparent',
          color: theme === 'light' ? '#0F172A' : '#6B7280',
          boxShadow: theme === 'light' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <span>Terang</span>
      </button>

      {/* Dark Mode Button (Bulan Sabit SVG) */}
      <button
        type="button"
        title="Mod Gelap (Dark Mode)"
        onClick={() => toggleTheme('dark')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '0.3rem 0.55rem',
          borderRadius: '4px',
          fontSize: '0.725rem',
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          background: theme === 'dark' ? '#1F2432' : 'transparent',
          color: theme === 'dark' ? '#34D399' : '#64748B',
          boxShadow: theme === 'dark' ? '0 1px 3px rgba(0,0,0,0.3)' : 'none'
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        <span>Gelap</span>
      </button>
    </div>
  );
}

