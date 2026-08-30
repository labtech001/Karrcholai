import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import karrImg from '../../assets/pic4.png'
import cholaiImg from '../../assets/pic5.png'

const karrFeatures = [
  'Turnkey House Construction',
  'Structural Site Work',
  'Renovation & House Extensions',
  'Site Execution & Supervision',
  'On-Site Inspection & Sign-Off',
]

const cholaiFeatures = [
  'Garden Planning & Development',
  'Landscape Design',
  'Rainwater Harvesting Systems',
  'Solar Panel Installation',
  'Waste Management Solutions',
]

// ── Mobile card ───────────────────────────────────────────────────────────────
function MobilePanel({ image, accent, division, title, subtitle, features, link }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative w-full overflow-hidden" style={{ height: '320px' }}>
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="flex items-center gap-3 mb-2">
          <span className="h-px w-8 block" style={{ background: accent }} />
          <p className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: accent }}>{division}</p>
        </div>
        <h2 className="text-3xl font-light text-white leading-tight mb-3">
          {title}<br /><span className="font-bold">{subtitle}</span>
        </h2>
        <button
          onClick={() => setOpen(v => !v)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
        >
          {open ? 'Less' : 'Explore'} <FiArrowRight size={12} className={`transition-transform ${open ? 'rotate-90' : ''}`} />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden mt-3"
            >
              <div className="grid grid-cols-1 gap-y-1.5 mb-4">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/80 text-xs">
                    <FiCheckCircle size={11} style={{ color: accent, flexShrink: 0 }} />
                    {f}
                  </div>
                ))}
              </div>
              <Link to={link}>
                <button className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full text-xs font-bold hover:opacity-90 transition-opacity">
                  Learn More <FiArrowRight size={11} />
                </button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
const KarrCholaiSection = () => {
  const [hovered, setHovered] = useState(null)

  return (
    <section className="w-full bg-[#050505] font-sans">

      {/* ── MOBILE (< lg) — stacked cards, always visible ── */}
      <div className="lg:hidden flex flex-col">
        <MobilePanel
          image={karrImg}
          accent="#DB7F50"
          division="Division 01"
          title="Karr"
          subtitle="Construction"
          features={karrFeatures}
          link="/karr"
        />
        <div className="h-px w-full bg-white/10" />
        <MobilePanel
          image={cholaiImg}
          accent="#41634A"
          division="Division 02"
          title="Cholai"
          subtitle="Environment"
          features={cholaiFeatures}
          link="/karr"
        />
      </div>

      {/* ── DESKTOP (lg+) — original hover expand ── */}
      <div className="hidden lg:flex h-[75vh] min-h-[550px] overflow-hidden relative">

        {/* Central badge */}
        <AnimatePresence>
          {!hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center gap-3"
            >
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
              <div className="w-14 h-14 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white text-[9px] tracking-[0.2em] uppercase font-medium">
                Explore
              </div>
              <div className="w-px h-16 bg-gradient-to-t from-transparent via-white/40 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Karr panel */}
        <motion.div
          onMouseEnter={() => setHovered('karr')}
          onMouseLeave={() => setHovered(null)}
          animate={{ width: hovered === 'karr' ? '70%' : hovered === 'cholai' ? '30%' : '50%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-full overflow-hidden cursor-pointer group border-r border-white/10"
        >
          <motion.div
            animate={{ scale: hovered === 'karr' ? 1.05 : 1.15 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img src={karrImg} className="w-full h-full object-cover" alt="Karr" />
            <div className={`absolute inset-0 transition-all duration-700 ${hovered === 'karr' ? 'bg-gradient-to-t from-[#111]/95 via-[#111]/50 to-transparent' : 'bg-black/70'}`} />
          </motion.div>
          <div className="absolute inset-0 p-12 xl:p-16 flex flex-col justify-center z-10">
            <motion.div animate={{ opacity: hovered === 'cholai' ? 0 : 1 }} transition={{ duration: 0.5 }} className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-[#DB7F50] block" />
                <p className="text-[#DB7F50] text-sm uppercase tracking-[0.3em] font-medium">Division 01</p>
              </div>
              <h2 className="text-5xl xl:text-6xl font-light text-white leading-[1.1]">
                Karr <br /><span className="font-bold">Construction</span>
              </h2>
              <AnimatePresence>
                {hovered === 'karr' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5 }} className="overflow-hidden mt-4">
                    <p className="text-white/80 max-w-lg text-base leading-relaxed mb-6 font-light">
                      Forging structural integrity and architectural brilliance. We deliver turnkey building solutions built to stand the test of time.
                    </p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-8 max-w-2xl">
                      {karrFeatures.map((f, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }} className="flex items-center gap-3 text-white/90">
                          <FiCheckCircle className="text-[#DB7F50] shrink-0" />
                          <span className="text-sm font-light">{f}</span>
                        </motion.div>
                      ))}
                    </div>
                    <Link to="/karr">
                      <button className="group/btn flex items-center gap-3 bg-white text-black px-7 py-3 rounded-full text-sm font-medium hover:bg-[#DB7F50] hover:text-white transition-all duration-300">
                        Explore Karr <FiArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                      </button>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>

        {/* Cholai panel */}
        <motion.div
          onMouseEnter={() => setHovered('cholai')}
          onMouseLeave={() => setHovered(null)}
          animate={{ width: hovered === 'cholai' ? '70%' : hovered === 'karr' ? '30%' : '50%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-full overflow-hidden cursor-pointer group"
        >
          <motion.div
            animate={{ scale: hovered === 'cholai' ? 1.05 : 1.15 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img src={cholaiImg} className="w-full h-full object-cover" alt="Cholai" />
            <div className={`absolute inset-0 transition-all duration-700 ${hovered === 'cholai' ? 'bg-gradient-to-t from-[#0a110d]/95 via-[#0a110d]/50 to-transparent' : 'bg-black/70'}`} />
          </motion.div>
          <div className="absolute inset-0 p-12 xl:p-16 flex flex-col justify-center z-10">
            <motion.div animate={{ opacity: hovered === 'karr' ? 0 : 1 }} transition={{ duration: 0.5 }} className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-[#41634A] block" />
                <p className="text-[#41634A] text-sm uppercase tracking-[0.3em] font-medium">Division 02</p>
              </div>
              <h2 className="text-5xl xl:text-6xl font-light text-white leading-[1.1]">
                Cholai <br /><span className="font-bold">Environment</span>
              </h2>
              <AnimatePresence>
                {hovered === 'cholai' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.5 }} className="overflow-hidden mt-4">
                    <p className="text-white/80 max-w-lg text-base leading-relaxed mb-6 font-light">
                      Cultivating sustainable living spaces. From landscape design to renewable energy systems, we harmonize nature with modern living.
                    </p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-8 max-w-2xl">
                      {cholaiFeatures.map((f, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }} className="flex items-center gap-3 text-white/90">
                          <FiCheckCircle className="text-[#41634A] shrink-0" />
                          <span className="text-sm font-light">{f}</span>
                        </motion.div>
                      ))}
                    </div>
                    <Link to="/karr">
                      <button className="group/btn flex items-center gap-3 bg-white text-black px-7 py-3 rounded-full text-sm font-medium hover:bg-[#41634A] hover:text-white transition-all duration-300">
                        Explore Cholai <FiArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                      </button>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default KarrCholaiSection
