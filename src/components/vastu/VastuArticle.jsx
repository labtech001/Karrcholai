import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../../context/LanguageContext';

const TERRA  = '#B85C38';
const FOREST = '#2D4B37';
const GOLD   = '#c9a84c';
const INK    = '#1A1A1A';
const CREAM  = '#FAF9F6';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay },
});

/* ── Eight directional lords ── */
const DIRECTIONS_EN = [
  { dir: 'N',  symbol: '↑', lord: 'Kubera',   gift: 'Wealth & Prosperity' },
  { dir: 'NE', symbol: '↗', lord: 'Ishanya',  gift: 'Wisdom & Clarity' },
  { dir: 'E',  symbol: '→', lord: 'Indra',    gift: 'Power & Success' },
  { dir: 'SE', symbol: '↘', lord: 'Agni',     gift: 'Energy & Health' },
  { dir: 'S',  symbol: '↓', lord: 'Yama',     gift: 'Discipline & Order' },
  { dir: 'SW', symbol: '↙', lord: 'Niruthi',  gift: 'Stability & Strength' },
  { dir: 'W',  symbol: '←', lord: 'Varuna',   gift: 'Flow & Creativity' },
  { dir: 'NW', symbol: '↖', lord: 'Vayu',     gift: 'Air & Vitality' },
];

const DIRECTIONS_TA = [
  { dir: 'வ',   symbol: '↑', lord: 'குபேரன்',    gift: 'செல்வம் & வளம்' },
  { dir: 'வ-வ', symbol: '↗', lord: 'ஈசானியன்',   gift: 'ஞானம் & தெளிவு' },
  { dir: 'கி',  symbol: '→', lord: 'இந்திரன்',   gift: 'வலிமை & வெற்றி' },
  { dir: 'கி-தெ',symbol: '↘', lord: 'அக்னி',     gift: 'ஆற்றல் & ஆரோக்கியம்' },
  { dir: 'தெ',  symbol: '↓', lord: 'யமன்',       gift: 'ஒழுக்கம் & நியதி' },
  { dir: 'தெ-மே',symbol: '↙', lord: 'நிருதி',    gift: 'நிலைப்பாடு & திடம்' },
  { dir: 'மே',  symbol: '←', lord: 'வருணன்',     gift: 'ஓட்டம் & படைப்பாற்றல்' },
  { dir: 'வ-மே',symbol: '↖', lord: 'வாயு',       gift: 'காற்று & உயிர்ப்பு' },
];

/* ── All text content keyed by language ── */
const CONTENT = {
  en: {
    pullQuote: `"It is due to the movement of stars and planets. Our ancestors — the wise and the ascetics — discovered that this magnetic power causes harm to humans, and they created these scriptures to save humanity from its impact."`,
    pullQuoteSource: 'Ancient Vastu Scripture',

    section2Label: 'The Cosmic Origin',
    section2p1: 'The great sages observed that the universe is not static. The constant motion of celestial bodies generates invisible forces — magnetic in nature — that permeate every corner of the Earth, including the spaces where humans live, work, and rest.',
    section2p2: 'Rather than accept this influence as fate, they sought to understand it, master it, and codify a way to live in harmony with it. The result was the Vastu Shastras — an ancient science encoded into scripture.',

    shieldLabel: 'Why Were the Vastu Shastras Written?',
    shieldHeading: <>They were not written as architectural guidelines.<br />They were written as a shield.</>,
    shieldBody: 'The sages understood that unaligned structures would place families in the path of harmful cosmic forces. By aligning a home according to the scriptures, those forces could be redirected into sources of peace and prosperity — and every room, every door, every direction carries that responsibility.',

    magnetLabel: 'The Magnet Principle',
    cards: [
      { icon: '🧲', label: 'The Law', text: 'No matter how many pieces a magnet is broken into, each small part retains the full nature of the original magnet.' },
      { icon: '🏠', label: 'The Truth', text: 'A small home built correctly carries the same completeness and blessing as a large one. Size does not determine goodness — alignment does.' },
    ],

    directionsLabel: 'The Eight Directions & Their Lords',
    directionsIntro: 'Vastu recognises eight directional forces — each presided over by a divine lord. When a home is built in harmony with these directions, it invites their blessings from all eight quarters.',
    directions: DIRECTIONS_EN,

    closingLabel: 'What This Means For Your Plot',
    closingBody: 'Before you build, understand your land. The shape of the plot, its direction relative to roads, the slope of the terrain — all of these are Vastu considerations that the ancient scriptures address in detail.',
    closingBody2: 'At Karrcholai, our Vastu consultant integrates these principles from the very first design stage — not as an afterthought, but as the foundation of the plan itself. Because a home built with the stars in its favour is not just a structure.',
    closingFinal: 'It is a blessing.',
  },
  ta: {
    pullQuote: `"நட்சத்திரங்கள் மற்றும் கோள்களின் இயக்கத்தால் தான் இது நடக்கிறது. நம் முன்னோர்கள் — ஞானிகளும், தவசிகளும் — இந்த காந்த சக்தி மனிதர்களுக்கு தீங்கு செய்கிறது என்பதை கண்டுபிடித்தனர். அதன் தாக்கத்திலிருந்து மனித இனத்தை காக்க இந்த சாஸ்திரங்களை படைத்தனர்."`,
    pullQuoteSource: 'பண்டைய வாஸ்து சாஸ்திரம்',

    section2Label: 'பிரபஞ்சத்தின் தோற்றம்',
    section2p1: 'பெரும் முனிவர்கள் கவனித்தனர் — பிரபஞ்சம் நிலையானது அல்ல. வான் கோள்களின் இடையறாத இயக்கம் கண்ணுக்கு தெரியாத சக்திகளை உருவாக்குகிறது — காந்த இயல்புடையவை — அவை மனிதர்கள் வாழும், வேலை செய்யும், ஓய்வெடுக்கும் இடங்கள் உட்பட பூமியின் ஒவ்வொரு மூலையிலும் நிரம்பி இருக்கின்றன.',
    section2p2: 'இந்த தாக்கத்தை விதியாக ஏற்றுக்கொள்ளாமல், அவர்கள் அதை புரிந்துகொண்டு, மிளிர்ந்து, அதனுடன் இணக்கமாக வாழும் வழியை வகுத்தனர். அதன் விளைவே வாஸ்து சாஸ்திரம் — சாஸ்திரமாக பதிவு செய்யப்பட்ட ஒரு பண்டைய அறிவியல்.',

    shieldLabel: 'வாஸ்து சாஸ்திரம் ஏன் எழுதப்பட்டது?',
    shieldHeading: <>அவை கட்டடக்கலை வழிகாட்டுதல்களாக எழுதப்படவில்லை.<br />அவை ஒரு கவசமாக எழுதப்பட்டன.</>,
    shieldBody: 'வீடுகள் தவறான திசையில் கட்டப்பட்டால், குடும்பங்கள் தீங்கான விண்வெளி சக்திகளின் பாதையில் அகப்படும் என்பதை முனிவர்கள் புரிந்துகொண்டனர். சாஸ்திரப்படி வீட்டை திசைப்படுத்தினால், அந்த சக்திகளை அமைதி மற்றும் செழிப்பின் ஆதாரங்களாக மாற்றலாம் — ஒவ்வொரு அறையும், ஒவ்வொரு கதவும், ஒவ்வொரு திசையும் அந்த பொறுப்பை சுமக்கின்றன.',

    magnetLabel: 'காந்தக் கொள்கை',
    cards: [
      { icon: '🧲', label: 'விதி', text: 'ஒரு காந்தம் எத்தனை துண்டுகளாக உடைந்தாலும், ஒவ்வொரு சிறிய பகுதியும் அசல் காந்தத்தின் முழு தன்மையை தக்க வைத்துக்கொள்கிறது.' },
      { icon: '🏠', label: 'உண்மை', text: 'சரியாக கட்டப்பட்ட சிறிய வீடு, பெரிய வீட்டின் அதே நிறைவையும் ஆசீர்வாதத்தையும் கொண்டிருக்கும். அளவு நன்மையை தீர்மானிக்காது — திசைப்படுத்துதல் தான் தீர்மானிக்கிறது.' },
    ],

    directionsLabel: 'எட்டு திசைகளும் அவற்றின் அதிபதிகளும்',
    directionsIntro: 'வாஸ்து எட்டு திசை சக்திகளை அங்கீகரிக்கிறது — ஒவ்வொன்றும் ஒரு தெய்வீக அதிபதியால் தலைமையேற்கப்படுகிறது. எட்டு திசைகளுடனும் இணக்கமாக கட்டப்பட்ட வீடு, எட்டு பக்கங்களிலிருந்தும் அவர்களின் ஆசீர்வாதங்களை அழைக்கிறது.',
    directions: DIRECTIONS_TA,

    closingLabel: 'உங்கள் மனையின் பொருள் என்ன?',
    closingBody: 'கட்டும் முன்பு, உங்கள் நிலத்தை புரிந்துகொள்ளுங்கள். மனையின் வடிவம், சாலைகளுடன் தொடர்புடைய திசை, நிலத்தின் சரிவு — இவை அனைத்தும் பண்டைய சாஸ்திரங்கள் விரிவாக கையாளும் வாஸ்து கருத்துகள்.',
    closingBody2: 'கார்ர்சோலையில், எங்கள் வாஸ்து ஆலோசகர் இந்த கொள்கைகளை மிகவும் முதல் வடிவமைப்பு கட்டத்திலிருந்தே ஒருங்கிணைக்கிறார் — பின்னர் சேர்க்கப்படுவதாக அல்ல, திட்டத்தின் அடிப்படையாக. ஏனென்றால் நட்சத்திரங்களின் ஆதரவுடன் கட்டப்பட்ட வீடு வெறும் கட்டிடமல்ல.',
    closingFinal: 'அது ஒரு ஆசீர்வாதம்.',
  },
};

export default function VastuArticle() {
  const { lang } = useLang();
  const t = CONTENT[lang] || CONTENT.en;

  return (
    <div style={{ fontFamily: 'Barlow, sans-serif', color: INK }}>

      {/* ── SECTION 1 — Opening pull quote ── */}
      <motion.div {...fadeUp(0)} style={{
        borderLeft: `3px solid ${GOLD}`,
        paddingLeft: 28,
        margin: '48px 0 56px',
      }}>
        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
          fontWeight: 500,
          lineHeight: 1.7,
          color: INK,
          fontStyle: 'italic',
          margin: 0,
        }}>
          {t.pullQuote}
        </p>
        <p style={{ marginTop: 14, fontSize: 11, fontWeight: 900, letterSpacing: '0.35em', textTransform: 'uppercase', color: TERRA }}>
          {t.pullQuoteSource}
        </p>
      </motion.div>

      {/* ── SECTION 2 — Cosmic origin ── */}
      <motion.div {...fadeUp(0.05)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <span style={{ fontSize: 22, lineHeight: 1 }}>✦</span>
          <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.5em', textTransform: 'uppercase', color: TERRA, margin: 0 }}>
            {t.section2Label}
          </p>
        </div>
        <p style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', lineHeight: 1.85, color: 'rgba(26,26,26,0.72)', marginBottom: 18 }}>
          {t.section2p1}
        </p>
        <p style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', lineHeight: 1.85, color: 'rgba(26,26,26,0.72)', marginBottom: 0 }}>
          {t.section2p2}
        </p>
      </motion.div>

      {/* ── DIVIDER ── */}
      <motion.div {...fadeUp(0.05)} style={{ margin: '52px 0', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(26,26,26,0.08)' }} />
        <span style={{ color: GOLD, fontSize: 16 }}>◈</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(26,26,26,0.08)' }} />
      </motion.div>

      {/* ── SECTION 3 — Dark callout: The Shield ── */}
      <motion.div {...fadeUp(0.05)} style={{
        background: INK,
        borderRadius: 4,
        padding: 'clamp(32px, 5vw, 52px)',
        margin: '0 0 52px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '16px 16px', pointerEvents: 'none' }} />
        <p style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.5em', textTransform: 'uppercase', color: TERRA, marginBottom: 18, position: 'relative' }}>
          {t.shieldLabel}
        </p>
        <p style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)', fontWeight: 700, color: '#fff', lineHeight: 1.55, marginBottom: 20, position: 'relative' }}>
          {t.shieldHeading}
        </p>
        <p style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1rem)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, margin: 0, position: 'relative' }}>
          {t.shieldBody}
        </p>
      </motion.div>

      {/* ── SECTION 4 — Magnet principle ── */}
      <motion.div {...fadeUp(0.05)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <span style={{ fontSize: 22, lineHeight: 1 }}>✦</span>
          <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.5em', textTransform: 'uppercase', color: TERRA, margin: 0 }}>
            {t.magnetLabel}
          </p>
        </div>
      </motion.div>

      {/* Two-column highlight */}
      <motion.div {...fadeUp(0.07)} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 2,
        margin: '0 0 52px',
      }}>
        {t.cards.map((card, i) => (
          <div key={i} style={{
            background: i === 0 ? `${FOREST}10` : `${TERRA}0d`,
            border: `1px solid ${i === 0 ? FOREST : TERRA}22`,
            padding: 28,
          }}>
            <span style={{ fontSize: 28, display: 'block', marginBottom: 14 }}>{card.icon}</span>
            <p style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.4em', textTransform: 'uppercase', color: i === 0 ? FOREST : TERRA, marginBottom: 10 }}>{card.label}</p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(26,26,26,0.7)', margin: 0 }}>{card.text}</p>
          </div>
        ))}
      </motion.div>

      {/* ── DIVIDER ── */}
      <motion.div {...fadeUp(0.05)} style={{ margin: '0 0 52px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(26,26,26,0.08)' }} />
        <span style={{ color: GOLD, fontSize: 16 }}>◈</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(26,26,26,0.08)' }} />
      </motion.div>

      {/* ── SECTION 5 — Eight directions grid ── */}
      <motion.div {...fadeUp(0.05)} style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
          <span style={{ fontSize: 22, lineHeight: 1 }}>✦</span>
          <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.5em', textTransform: 'uppercase', color: TERRA, margin: 0 }}>
            {t.directionsLabel}
          </p>
        </div>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(26,26,26,0.65)', margin: '14px 0 28px' }}>
          {t.directionsIntro}
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, marginBottom: 52 }}>
        {t.directions.map((d, i) => (
          <motion.div
            key={d.dir}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            style={{
              background: '#fff',
              border: '1px solid rgba(26,26,26,0.07)',
              padding: '20px 16px',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: 20, fontWeight: 900, color: GOLD, margin: '0 0 4px', lineHeight: 1 }}>{d.symbol}</p>
            <p style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.2em', color: INK, margin: '0 0 6px' }}>{d.dir}</p>
            <p style={{ fontSize: 11, fontWeight: 700, color: FOREST, margin: '0 0 6px' }}>{d.lord}</p>
            <p style={{ fontSize: 10, color: 'rgba(26,26,26,0.45)', margin: 0, lineHeight: 1.4 }}>{d.gift}</p>
          </motion.div>
        ))}
      </div>

      {/* ── SECTION 6 — Gold full-bleed closing callout ── */}
      <motion.div {...fadeUp(0.05)} style={{
        background: `linear-gradient(135deg, ${FOREST} 0%, #1a3322 100%)`,
        borderRadius: 4,
        padding: 'clamp(36px, 6vw, 60px)',
        margin: '0 0 8px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05,
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.15) 8px, rgba(255,255,255,0.15) 9px)`,
          pointerEvents: 'none' }} />
        <p style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.5em', textTransform: 'uppercase', color: GOLD, marginBottom: 18, position: 'relative' }}>
          {t.closingLabel}
        </p>
        <p style={{ fontSize: 'clamp(1rem, 2.2vw, 1.25rem)', color: '#fff', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 24px', fontWeight: 400, position: 'relative' }}>
          {t.closingBody}
        </p>
        <div style={{ width: 40, height: 1, background: `${GOLD}60`, margin: '0 auto 24px', position: 'relative' }} />
        <p style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 480, margin: '0 auto', position: 'relative' }}>
          {t.closingBody2}
        </p>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 700, color: GOLD, marginTop: 20, position: 'relative' }}>
          {t.closingFinal}
        </p>
      </motion.div>

    </div>
  );
}
