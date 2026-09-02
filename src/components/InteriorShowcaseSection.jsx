import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import archViz from '../../assets/asthetic parts/A Importância dos Desenhos Arquitetônicos na Prática Profissional_.jpg'

const InteriorShowcaseSection = () => {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="w-full bg-[#0d0c0b] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-16 py-20 md:py-28">

        {/* ── Header text above image ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 text-[#B85C38] text-[9px] font-black tracking-[0.5em] uppercase mb-6"
        >
          <span className="w-7 h-px bg-[#B85C38]" />
          Design &amp; Build
        </motion.p>

        {/* ── Two column layout: text left, image right ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

          {/* Left — copy */}
          <div className="lg:w-[45%] shrink-0">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-[3.2rem] lg:text-[3.8rem] font-black text-white leading-[1.04] tracking-tight mb-7"
            >
              Every great home<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8d5c8] to-[#B85C38]">
                starts with<br />a vision.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.22 }}
              className="text-white/45 text-sm md:text-base font-light leading-relaxed max-w-sm mb-10"
            >
              We translate your idea into precise plans, then build with
              discipline — from the first sketch to the final finish.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex items-center gap-5"
            >
              <Link
                to="/contact"
                className="group relative overflow-hidden bg-[#B85C38] text-[10px] font-black tracking-[0.22em] uppercase px-7 py-3.5 rounded-sm hover:shadow-[0_0_24px_rgba(184,92,56,0.5)] hover:-translate-y-px transition-all duration-300 flex items-center gap-2.5"
                style={{ color: '#ffffff' }}
              >
                <span className="relative z-10" style={{ color: '#ffffff' }}>Start a Project</span>
                <svg className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none" />
              </Link>

              <Link
                to="/projects"
                className="text-white/45 hover:text-white text-[10px] font-bold tracking-[0.25em] uppercase transition-colors duration-300"
              >
                Our Work →
              </Link>
            </motion.div>

            {/* decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-14 w-24 h-px bg-gradient-to-r from-[#B85C38] to-transparent origin-left"
            />
          </div>

          {/* Right — full image, no crop */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-[55%] w-full"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_40px_80px_-10px_rgba(0,0,0,0.6)]">
              <img
                src={archViz}
                alt="Architectural drawings in professional practice — Karrcholai Construction"
                className="w-full block object-cover object-bottom"
                style={{ height: '55vh', maxHeight: '520px' }}
                loading="lazy"
                decoding="async"
              />
              {/* subtle vignette on image edges */}
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.35)] rounded-2xl pointer-events-none" />
              {/* bottom-right label badge */}
              <div className="absolute bottom-5 right-5 bg-black/50 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full">
                <span className="text-white/70 text-[9px] font-bold tracking-[0.35em] uppercase">Architectural Drawings</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default InteriorShowcaseSection
