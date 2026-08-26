import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

/* ── Step data ──────────────────────────────────────────────── */
const STEPS = [
  {
    number: '1',
    brand: 'INITIAL',
    sub: 'WITH CLIENT',
    color: '#8B7355',          // warm tan
    accent: '#C9A96E',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <circle cx="15" cy="12" r="5" />
        <circle cx="28" cy="10" r="4" />
        <path d="M4 32c0-6 5-10 11-10s11 4 11 10" strokeLinecap="round" />
        <path d="M28 22c4 1 7 4 7 8" strokeLinecap="round" />
      </svg>
    ),
    description: 'Understanding your needs, site analysis, planning, budget & timeline.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80',
    link: '/contact',
    cta: 'Start Planning',
  },
  {
    number: '2',
    brand: 'KARR',
    sub: 'CONSTRUCTION & PMC',
    color: '#B85C38',
    accent: '#E07848',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="22" width="6" height="6" rx="1" />
        <rect x="17" y="22" width="6" height="6" rx="1" />
        <rect x="28" y="22" width="6" height="6" rx="1" />
        <rect x="6" y="12" width="6" height="6" rx="1" />
        <rect x="17" y="12" width="6" height="6" rx="1" />
        <path d="M4 32h32M20 8v4" strokeLinecap="round" />
        <path d="M12 8l8-5 8 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    description: 'Strong foundation. Quality materials. Skilled execution. On-time delivery.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
    link: '/karr',
    cta: 'Explore KARR',
  },
  {
    number: '3',
    brand: 'CHOLAI',
    sub: 'SUSTAINABLE & GREEN SOLUTIONS',
    color: '#4A7C59',
    accent: '#6BA87A',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 6c0 0-12 8-12 18a12 12 0 0024 0C32 14 20 6 20 6z" strokeLinejoin="round" />
        <path d="M20 20v12M14 26l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    description: 'Landscape design, rainwater harvesting, solar energy & waste management.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    link: '/cholai',
    cta: 'Explore CHOLAI',
  },
  {
    number: '4',
    brand: 'FINAL',
    sub: 'BUILDING WITH CLIENT',
    color: '#C9A020',
    accent: '#E8C040',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 34V18l14-12 14 12v16" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="15" y="24" width="10" height="10" rx="1" />
        <path d="M12 18v-2M28 18v-2" strokeLinecap="round" />
      </svg>
    ),
    description: 'A quality home delivered with trust, care & long-term support.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    link: '/projects',
    cta: 'See Our Work',
  },
]

/* ── Step Card ──────────────────────────────────────────────── */
function StepCard({ step, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
      className="relative flex flex-col group overflow-hidden rounded-none"
      style={{ flex: '1 1 0' }}
    >
      {/* Photo */}
      <div className="relative h-[320px] sm:h-[380px] lg:h-[420px] overflow-hidden">
        <img
          src={step.image}
          alt={`${step.brand} – ${step.sub}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient overlay — stronger at top for text, lighter at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.55) 100%)`,
          }}
        />

        {/* Top: Icon + Brand name */}
        <div className="absolute top-0 left-0 right-0 p-5 flex flex-col items-center text-center z-10">
          <div style={{ color: step.accent }} className="mb-2 drop-shadow-lg">
            {step.icon}
          </div>
          <h3
            className="text-white font-black text-xl sm:text-2xl tracking-widest leading-none"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}
          >
            {step.brand}
          </h3>
          <p
            className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mt-0.5"
            style={{ color: step.accent }}
          >
            {step.sub}
          </p>
        </div>

        {/* Divider line between panels (not on last) */}
        {index < STEPS.length - 1 && (
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-white/15 z-20" />
        )}
      </div>

      {/* Bottom: Step number + description + CTA */}
      <div
        className="flex flex-col flex-1 px-5 pt-5 pb-6"
        style={{ background: '#F8F5EF' }}
      >
        {/* Step number badge + arrow connector */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0 shadow-md"
            style={{ background: step.color }}
          >
            {step.number}
          </div>
          {index < STEPS.length - 1 && (
            <div className="flex-1 flex items-center gap-1">
              <div className="flex-1 h-px" style={{ background: step.accent, opacity: 0.5 }} />
              <svg
                className="w-3 h-3 shrink-0"
                viewBox="0 0 12 12"
                fill="none"
                style={{ color: step.accent }}
              >
                <path d="M1 6h9M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>

        <p className="text-[#4A3728] text-sm leading-relaxed flex-1">
          {step.description}
        </p>

        <Link
          to={step.link}
          className="mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all duration-300"
          style={{ color: step.color }}
          aria-label={`${step.cta} – ${step.brand}`}
        >
          {step.cta}
          <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
            <path d="M1 8h12M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </motion.div>
  )
}

/* ── Main section ───────────────────────────────────────────── */
export default function ProcessSection() {
  const taglineRef = useRef(null)
  const taglineInView = useInView(taglineRef, { once: true, margin: '-60px' })

  return (
    <section
      aria-label="Our Building Process"
      className="w-full overflow-hidden"
      style={{ background: '#F8F5EF' }}
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-16 pb-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[10px] font-bold tracking-[0.3em] uppercase"
          style={{ color: '#B85C38' }}
        >
          How We Work
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-2 text-3xl sm:text-4xl font-black text-[#1a1a1a] tracking-tight leading-tight"
        >
          Your Journey From <span style={{ color: '#B85C38' }}>Vision</span> to <span style={{ color: '#4A7C59' }}>Home</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-3 text-sm text-[#6B5744] max-w-xl mx-auto leading-relaxed"
        >
          From first consultation to handover — every step guided by expertise, transparency, and care.
        </motion.p>
      </div>

      {/* Cards grid — 4 columns on lg, 2 on md, 1 on sm */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#E8E0D4] overflow-hidden rounded-lg shadow-xl">
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom tagline */}
      <div
        ref={taglineRef}
        className="border-t border-[#DDD5C8] py-5 px-6 text-center"
        style={{ background: '#F0EBE1' }}
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={taglineInView ? { opacity: 1, letterSpacing: '0.35em' } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-[11px] sm:text-xs font-semibold text-[#8B7355] uppercase"
        >
          From Stone to Oasis —&nbsp; We Build Better Living
        </motion.p>
      </div>
    </section>
  )
}
