import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaLeaf, FaCloudRain, FaSun, FaRecycle, FaArrowRight, FaLightbulb, FaTh } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'

import newLandscape from '../../assets/lancape.jpg.jpeg'
import newRainwater from '../../assets/rainwater.jpg.jpeg'
import newSolar from '../../assets/solar panel.jpg.jpeg'
import newWaste from '../../assets/WhatsApp Image 2026-05-17 at 16.41.22.jpeg'
import newLighting from '../../assets/lighting.jpg'
import newFlooring from '../../assets/red-floor.jpg'

const SERVICES = [
  {
    id: 'landscape',
    icon: <FaLeaf />,
    label: 'Landscape',
    title: 'Landscape Development',
    subtitle: 'Designing with Nature',
    desc: 'We design and develop attractive outdoor spaces that enhances both the beauty and environmental value of residential properties. Our approach integrates native flora with modern aesthetics.',
    items: ['Garden planning and development', 'Landscape design', 'Green space planning'],
    impact: '100% Eco-Design',
    images: [newLandscape],
    accent: '#3F7A4F',
    lightBg: 'from-green-500/10 to-emerald-500/10',
  },
  {
    id: 'rainwater',
    icon: <FaCloudRain />,
    label: 'Rainwater',
    title: 'Rainwater Harvesting',
    subtitle: 'Conserving Every Drop',
    desc: 'Rainwater harvesting helps conserve water and recharge groundwater resources. Our integrated collection systems ensure long-term water security for every residence we build.',
    items: ['Rainwater collection systems', 'Groundwater recharge solutions', 'Water conservation planning'],
    impact: '50,000L+ Stored',
    images: [newRainwater],
    accent: '#3B82F6',
    lightBg: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    id: 'solar',
    icon: <FaSun />,
    label: 'Solar Energy',
    title: 'Solar Energy Solutions',
    subtitle: 'Powering the Future',
    desc: 'We provide renewable energy solutions that help reduce electricity costs and environmental impact. Clean, silent, and sustainable energy for modern residences.',
    items: ['Solar panel installation', 'Solar energy system planning', 'Renewable energy integration'],
    impact: '95% Energy Saving',
    images: [newSolar],
    accent: '#F59E0B',
    lightBg: 'from-yellow-500/10 to-orange-500/10',
  },
  {
    id: 'waste',
    icon: <FaRecycle />,
    label: 'Waste Mgmt.',
    title: 'Waste Management',
    subtitle: 'Circular Living',
    desc: 'Responsible waste management improves environmental health and sustainability. We implement systems that turn waste into resources, supporting a clean living environment.',
    items: ['Waste segregation systems', 'Composting solutions', 'Sustainable waste planning'],
    impact: 'Zero Waste Goal',
    images: [newWaste],
    accent: '#8B7355',
    lightBg: 'from-amber-500/10 to-stone-500/10',
  },
  {
    id: 'lighting',
    icon: <FaLightbulb />,
    label: 'Lighting',
    title: 'Smart Lighting',
    subtitle: 'Illuminate Thoughtfully',
    desc: 'Energy-efficient lighting design that transforms spaces while minimising power consumption. We integrate smart controls, LED systems, and natural light strategies for beautiful, sustainable living.',
    items: ['LED & energy-efficient fixtures', 'Smart lighting controls', 'Natural light optimisation'],
    impact: '80% Energy Saved',
    images: [newLighting],
    accent: '#D4A017',
    lightBg: 'from-yellow-400/10 to-amber-300/10',
  },
  {
    id: 'flooring',
    icon: <FaTh />,
    label: 'Flooring',
    title: 'Traditional Flooring',
    subtitle: 'Heritage Underfoot',
    desc: 'We bring back the timeless beauty of traditional Tamil flooring — Athangudi tiles, oxide flooring, and natural stone finishes that keep homes cool, durable, and rooted in culture.',
    items: ['Athangudi tile installation', 'Oxide & lime floor finishing', 'Natural stone & granite laying'],
    impact: 'Timeless Craft',
    images: [newFlooring],
    accent: '#A0522D',
    lightBg: 'from-amber-700/10 to-stone-600/10',
  },
]

const CholaiHomeSection = () => {
  const [active, setActive] = useState(0)
  const [imgIdx, setImgIdx] = useState(0)
  const [mobilePopup, setMobilePopup] = useState(false)
  const current = SERVICES[active]

  useEffect(() => {
    setImgIdx(0)
    const timer = setInterval(() => {
      setImgIdx(prev => (prev + 1) % current.images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [active, current.images.length])

  // Lock body scroll when popup open
  useEffect(() => {
    if (mobilePopup) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobilePopup])

  const handleTabClick = (i) => {
    setActive(i)
    if (window.innerWidth < 768) {
      setMobilePopup(true)
    }
  }

  return (
    <section className="py-24 md:py-36 bg-[#1C1C1A] text-white overflow-hidden relative">
      {/* Ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: current.accent }}
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none bg-secondary/20"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-5"
            >
              <span className="w-12 h-px bg-secondary" />
              <span className="text-secondary font-black text-[10px] tracking-[0.5em] uppercase">Division II · Cholai Sustainability</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="leading-none tracking-tighter"
            >
              <span className="block text-5xl md:text-7xl font-black">CHOLAI</span>
              <span
                className="block font-black"
                style={{
                  fontFamily: '"Noto Serif Tamil", "Latha", "Tamil MN", serif',
                  fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
                  color: '#3F7A4F',
                  letterSpacing: '0.03em',
                  lineHeight: 1.2,
                }}
              >
                சோலை
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl italic text-white/45">Solutions.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-xs"
          >
            <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
              The Cholai division focuses on environmental friendly responsible solution — creating sustainable, self-sufficient homes for a greener tomorrow.
            </p>
            <Link to="/cholai">
              <button className="group flex items-center gap-3 text-white/65 font-black text-[10px] tracking-[0.3em] uppercase hover:text-white transition-colors">
                Explore Cholai <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* ── Tab switcher ── */}
        <div className="flex gap-2 mb-12 bg-white/5 border border-white/10 rounded-2xl p-2 w-fit flex-wrap">
          {SERVICES.map((srv, i) => (
            <button
              key={srv.id}
              onClick={() => handleTabClick(i)}
              className={`px-5 py-3 rounded-xl text-[10px] font-black tracking-[0.25em] uppercase transition-all duration-300 flex items-center gap-2 ${
                active === i
                  ? 'bg-white text-[#1C1C1A] shadow-lg'
                  : 'text-white/60 hover:text-white/90'
              }`}
            >
              <span className={active === i ? 'text-[#1C1C1A]' : ''} style={{ color: active === i ? '#1C1C1A' : srv.accent, opacity: active === i ? 1 : 0.8 }}>
                {srv.icon}
              </span>
              {srv.label}
            </button>
          ))}
        </div>

        {/* ── Main Content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch"
          >
            {/* Left: Content */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-10">
              <div>
                {/* Icon + subtitle */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg"
                    style={{ background: `${current.accent}20`, color: current.accent }}>
                    {current.icon}
                  </div>
                  <span className="font-black text-[10px] tracking-[0.4em] uppercase" style={{ color: current.accent }}>
                    {current.subtitle}
                  </span>
                </div>

                <h3 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                  {current.title.split(' ')[0]}{' '}
                  <br />
                  <span className="text-white/45 italic">
                    {current.title.split(' ').slice(1).join(' ')}
                  </span>
                </h3>

                <p className="text-white/65 text-base font-light leading-relaxed max-w-lg">
                  {current.desc}
                </p>
              </div>

              {/* Service Items */}
              <div className="space-y-3">
                <p className="text-[10px] font-black tracking-widest uppercase text-white/55 mb-4">What We Offer</p>
                {current.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: current.accent }} />
                    <span className="text-white/70 text-sm font-light group-hover:text-white transition-colors">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Mission statement */}
              <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.03]">
                <p className="text-[10px] font-black tracking-widest uppercase mb-2" style={{ color: current.accent }}>
                  Our Mission
                </p>
                <p className="text-white/70 text-sm font-light leading-relaxed italic">
                  "The Cholai division focuses on environmental friendly responsible solution that help reduce dependency on conventional resources and support sustainable management at our planet for future generations."
                </p>
              </div>

              <Link to="/cholai">
                <motion.button
                  whileHover={{ x: 8 }}
                  className="group flex items-center gap-4 text-[10px] font-black tracking-[0.4em] uppercase text-white/55 hover:text-white transition-colors w-fit"
                >
                  Discover All Solutions
                  <FaArrowRight className="transition-transform group-hover:translate-x-2" style={{ color: current.accent }} />
                </motion.button>
              </Link>
            </div>

            {/* Right: Image with impact badge */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                {/* Auto-cycling image */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${active}-${imgIdx}`}
                    src={current.images[imgIdx]}
                    alt={current.title}
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-auto object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/80 via-transparent to-transparent pointer-events-none" />

                {/* Glow frame */}
                <div
                  className="absolute -inset-1 rounded-[2.5rem] blur-xl opacity-20 pointer-events-none -z-10"
                  style={{ background: `linear-gradient(135deg, ${current.accent}, transparent)` }}
                />

                {/* Image dots */}
                {current.images.length > 1 && (
                  <div className="absolute top-6 right-6 flex gap-2">
                    {current.images.map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                        style={{ background: i === imgIdx ? '#fff' : 'rgba(255,255,255,0.3)' }}
                      />
                    ))}
                  </div>
                )}

                {/* Impact badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/55 text-[9px] font-black tracking-widest uppercase mb-1">Impact</p>
                      <p className="text-3xl font-black text-white leading-none" style={{ color: current.accent }}>
                        {current.impact}
                      </p>
                    </div>

                    {/* Pill badge */}
                    <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                      <span className="text-white text-[9px] font-black tracking-widest uppercase">100% Sustainable</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>


      </div>

      {/* ── Mobile Popup (bottom sheet) ── */}
      <AnimatePresence>
        {mobilePopup && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setMobilePopup(false)}
            />

            {/* Bottom sheet */}
            <motion.div
              key="sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="fixed bottom-0 left-0 right-0 z-[60] md:hidden rounded-t-[2rem] overflow-hidden"
              style={{ background: '#1C1C1A', maxHeight: '88vh' }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(88vh - 28px)' }}>

                {/* Header strip */}
                <div
                  className="px-6 py-4 flex items-center justify-between"
                  style={{ borderBottom: `1px solid ${current.accent}30` }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-base"
                      style={{ background: `${current.accent}25`, color: current.accent }}
                    >
                      {current.icon}
                    </div>
                    <div>
                      <p className="text-[9px] font-black tracking-[0.4em] uppercase" style={{ color: current.accent }}>
                        {current.subtitle}
                      </p>
                      <p className="text-white text-lg font-black leading-tight">{current.title}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobilePopup(false)}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 text-xl leading-none"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                {/* Image */}
                <div className="px-6 pt-5">
                  <div className="relative rounded-2xl overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`mob-${active}-${imgIdx}`}
                        src={current.images[imgIdx]}
                        alt={current.title}
                        loading="lazy"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        className="w-full h-52 object-cover"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-white/50 text-[9px] font-black tracking-widest uppercase mb-0.5">Impact</p>
                      <p className="text-2xl font-black leading-none" style={{ color: current.accent }}>{current.impact}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="px-6 pt-5">
                  <p className="text-white/65 text-sm font-light leading-relaxed">
                    {current.desc}
                  </p>
                </div>

                {/* What we offer */}
                <div className="px-6 pt-5">
                  <p className="text-[10px] font-black tracking-widest uppercase text-white/50 mb-3">What We Offer</p>
                  <div className="space-y-2.5">
                    {current.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: current.accent }} />
                        <span className="text-white/70 text-sm font-light">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mission + CTA */}
                <div className="px-6 pt-5 pb-8">
                  <div className="p-4 rounded-2xl border bg-white/[0.03]" style={{ borderColor: `${current.accent}25` }}>
                    <p className="text-[9px] font-black tracking-widest uppercase mb-2" style={{ color: current.accent }}>
                      Our Mission
                    </p>
                    <p className="text-white/65 text-xs font-light leading-relaxed italic">
                      "The Cholai division focuses on environmental friendly responsible solution that help reduce dependency on conventional resources and support sustainable management at our planet for future generations."
                    </p>
                  </div>

                  <Link to="/cholai" onClick={() => setMobilePopup(false)}>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      className="mt-5 w-full py-4 rounded-2xl font-black text-[11px] tracking-[0.3em] uppercase flex items-center justify-center gap-3 text-[#1C1C1A]"
                      style={{ background: current.accent }}
                    >
                      Discover All Solutions
                      <FaArrowRight />
                    </motion.button>
                  </Link>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  )
}

export default CholaiHomeSection
