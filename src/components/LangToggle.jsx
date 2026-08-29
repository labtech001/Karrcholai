import React from 'react';
import { useLang } from '../context/LanguageContext';

/* ─────────────────────────────────────────────────
   Language Toggle  — compact pill, responsive
   Mobile: icon + short label, smaller padding
   Desktop: icon + full label
───────────────────────────────────────────────── */
export default function LangToggle({ style = {} }) {
  const { lang, setLang } = useLang();
  const isTamil = lang === 'ta';

  return (
    <>
      <style>{`
        .lang-toggle-label-full  { display: inline; }
        .lang-toggle-label-short { display: none; }
        @media (max-width: 600px) {
          .lang-toggle-label-full  { display: none; }
          .lang-toggle-label-short { display: inline; }
          .lang-toggle-btn { padding: 5px 11px !important; font-size: 10px !important; gap: 5px !important; }
          .lang-toggle-icon { font-size: 12px !important; }
        }
      `}</style>
      <button
        className="lang-toggle-btn"
        onClick={() => setLang(isTamil ? 'en' : 'ta')}
        title={isTamil ? 'Switch to English' : 'தமிழில் படிக்க'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          padding: '6px 14px',
          borderRadius: 24,
          border: `1.5px solid ${isTamil ? '#2D4B37' : 'rgba(26,26,26,0.15)'}`,
          background: isTamil ? '#2D4B37' : '#fff',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: '0.1em',
          color: isTamil ? '#fff' : '#1A1A1A',
          fontFamily: 'Barlow, sans-serif',
          boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
          whiteSpace: 'nowrap',
          ...style,
        }}
      >
        <span className="lang-toggle-icon" style={{ fontSize: 13, lineHeight: 1 }}>
          {isTamil ? '🇬🇧' : '🌐'}
        </span>
        <span className="lang-toggle-label-full">
          {isTamil ? 'English' : 'தமிழ்'}
        </span>
        <span className="lang-toggle-label-short">
          {isTamil ? 'EN' : 'த'}
        </span>
      </button>
    </>
  );
}
