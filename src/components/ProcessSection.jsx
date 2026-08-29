import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const STEPS = [
  {
    num: 1,
    label: 'INITIAL',
    sub: 'With Client',
    color: '#7A5C3A',
    highlight: '#C9A96E',
    link: '/contact',
    cta: 'Start Planning',
    desc: 'Understanding your needs, site analysis, planning, budget & timeline.',
    keyPoints: [],
    icon: (c) => (
      <svg viewBox="0 0 48 48" fill="none" stroke={c} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <circle cx="17" cy="14" r="6" />
        <circle cx="33" cy="12" r="5" />
        <path d="M4 40c0-7.2 5.8-13 13-13s13 5.8 13 13" />
        <path d="M33 23c5.5 1.5 10 6.2 10 13" />
      </svg>
    ),
  },
  {
    num: 2,
    label: 'KARR',
    sub: 'Construction & PMC',
    color: '#8B3A1A',
    highlight: '#C9603A',
    link: '/karr',
    cta: 'Explore KARR',
    desc: 'Strong foundation. Quality materials. Skilled execution. On-time delivery.',
    keyPoints: [],
    icon: (c) => (
      <svg viewBox="0 0 48 48" fill="none" stroke={c} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="6" y="28" width="8" height="8" rx="1" />
        <rect x="20" y="28" width="8" height="8" rx="1" />
        <rect x="34" y="28" width="8" height="8" rx="1" />
        <rect x="6" y="16" width="8" height="8" rx="1" />
        <rect x="20" y="16" width="8" height="8" rx="1" />
        <path d="M3 38h42M24 9v7" />
        <path d="M13 9l11-6 11 6" />
      </svg>
    ),
  },
  {
    num: 3,
    label: 'CHOLAI',
    sub: 'Sustainable & Green',
    color: '#2D5C3A',
    highlight: '#4A8C5A',
    link: '/cholai',
    cta: 'Explore Cholai',
    desc: 'Landscape design, rainwater harvesting, solar energy & waste management.',
    keyPoints: [],
    icon: (c) => (
      <svg viewBox="0 0 48 48" fill="none" stroke={c} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M24 6c0 0-15 9-15 23a15 15 0 0030 0C39 15 24 6 24 6z" />
        <path d="M24 22v14" />
        <path d="M16 28l8-8 8 8" />
        <path d="M17 18c2-3 5-5 7-5" />
      </svg>
    ),
  },
  {
    num: 4,
    label: 'FINAL',
    sub: 'Building with Client',
    color: '#5A4010',
    highlight: '#C9920A',
    link: '/projects',
    cta: 'See Our Work',
    desc: 'A quality home delivered with trust, care & long-term support.',
    keyPoints: [],
    icon: (c) => (
      <svg viewBox="0 0 48 48" fill="none" stroke={c} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M6 42V22L24 7l18 15v20" />
        <rect x="17" y="29" width="14" height="13" rx="1" />
        <path d="M14 22v-3M34 22v-3" />
      </svg>
    ),
  },
]

/* ─────────────────────────────────────────────
   ARROW CONNECTOR
───────────────────────────────────────────── */
function Arrow({ color }) {
  return (
    <div className="flex items-center flex-1 mx-1">
      <div className="flex-1 h-px" style={{ background: color, opacity: 0.45 }} />
      <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5 shrink-0" style={{ color }}>
        <path d="M1 7h10M8 3.5L11.5 7 8 10.5"
          stroke="currentColor" strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SINGLE STEP CARD
───────────────────────────────────────────── */
function StepCard({ step, index, total, inView }) {
  const isLast = index === total - 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1 flex flex-col"
      style={{ borderRight: !isLast ? '1px solid rgba(139,115,85,0.18)' : 'none' }}
    >
      {/* ── TOP BLOCK ── */}
      <div className="flex flex-col items-center text-center px-6 pt-10 pb-8">
        {/* Icon circle */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110"
          style={{ background: `${step.highlight}18`, padding: 14 }}
        >
          {step.icon(step.color)}
        </div>

        {/* Phase label */}
        <h3
          className="font-black text-2xl sm:text-[26px] tracking-[0.12em] leading-none"
          style={{ color: step.color }}
        >
          {step.label}
        </h3>

        {/* Sub label */}
        <p
          className="text-[11px] font-semibold tracking-[0.22em] uppercase mt-2"
          style={{ color: step.color, opacity: 0.6 }}
        >
          {step.sub}
        </p>

        {/* Thin decorative rule */}
        <div
          className="w-10 h-px mt-5"
          style={{ background: step.highlight, opacity: 0.45 }}
        />
      </div>

      {/* ── DIVIDER LINE (full width) ── */}
      <div style={{ height: 1, background: 'rgba(139,115,85,0.12)' }} />

      {/* ── BOTTOM BLOCK ── */}
      <div className="flex flex-col items-center text-center px-6 pt-7 pb-10 flex-1">

        {/* Step number row with connectors */}
        <div className="flex items-center w-full mb-6">
          {index > 0
            ? <div className="flex-1 h-px opacity-35"
                style={{ background: STEPS[index - 1].highlight }} />
            : <div className="flex-1" />
          }

          <div
            className="w-11 h-11 rounded-full flex items-center justify-center font-black
              text-white text-base shrink-0 mx-3 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${step.color}, ${step.highlight})` }}
          >
            {step.num}
          </div>

          {!isLast
            ? <Arrow color={step.highlight} />
            : <div className="flex-1" />
          }
        </div>

        {/* Description */}
        <p
          className="text-[13.5px] leading-[1.75] font-light"
          style={{ color: '#3D2E1A', maxWidth: 190 }}
        >
          {step.desc}
        </p>

        {/* CTA */}
        <Link
          to={step.link}
          className="mt-6 inline-flex items-center gap-2 text-[10px] font-black
            tracking-[0.28em] uppercase transition-opacity duration-200 hover:opacity-50"
          style={{ color: step.color }}
        >
          {step.cta}
          <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3">
            <path d="M1 7h10M8 3.5L11.5 7 8 10.5"
              stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────── */
function SectionHeader({ inView }) {
  return (
    <div className="w-full px-6 md:px-16 pt-16 pb-2">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-3"
          >
            <span className="w-10 h-px" style={{ background: '#B85C38' }} />
            <span className="text-[10px] font-black tracking-[0.42em] uppercase"
              style={{ color: '#B85C38' }}>
              How We Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black leading-[0.92] tracking-tight"
            style={{ color: '#1a1a1a' }}
          >
            From{' '}
            <span style={{ color: '#B85C38' }}>Vision</span>
            <br />
            to{' '}
            <span style={{ color: '#3D6B47' }}>Home.</span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-sm font-light leading-relaxed max-w-xs md:text-right"
          style={{ color: '#6B5040' }}
        >
          Four deliberate steps — every phase guided by expertise, transparency
          and genuine care for the families we build for.
        </motion.p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function ProcessSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      aria-label="Our Building Process"
      className="w-full overflow-hidden"
      style={{ background: '#F5F0E8' }}
    >
      {/* Header */}
      <SectionHeader inView={inView} />

      {/* Thin rule */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 mt-10 mb-0">
        <div style={{ height: 1, background: 'rgba(139,115,85,0.15)' }} />
      </div>

      {/* ── 4 Panels ── */}
      <div className="flex flex-col sm:flex-row w-full border-t-0">
        {STEPS.map((step, i) => (
          <StepCard
            key={step.num}
            step={step}
            index={i}
            total={STEPS.length}
            inView={inView}
          />
        ))}
      </div>

      {/* Bottom full-width rule */}
      <div style={{ height: 1, background: 'rgba(139,115,85,0.15)' }} />

      {/* ── Tagline ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className="flex items-center justify-center gap-5 py-5"
        style={{ background: '#EDE8DC' }}
      >
        <div className="h-px w-16 sm:w-28" style={{ background: '#8B7355' }} />
        <p
          className="text-[10px] sm:text-[11px] font-semibold tracking-[0.35em] uppercase text-center"
          style={{ color: '#8B7355' }}
        >
          From Stone to Oasis — We Build Better Living
        </p>
        <div className="h-px w-16 sm:w-28" style={{ background: '#8B7355' }} />
      </motion.div>
    </section>
  )
}
