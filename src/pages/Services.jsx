import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiArrowUpRight, FiPhone, FiCheck } from 'react-icons/fi'
import { FaLeaf, FaCloudRain, FaSun, FaRecycle, FaLightbulb, FaTh } from 'react-icons/fa'
import { MdArchitecture, MdOutlineEngineering } from 'react-icons/md'
import { BsHouseDoor } from 'react-icons/bs'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import FAQSection from '../components/FAQSection'
import { Helmet } from 'react-helmet-async'

import imgRes   from '../../assets/Residential_construction.jpg'
import imgPmc   from '../../assets/pmc.jpeg'
import imgReno  from '../../assets/renovation.jpg.jpeg'
import imgSolar from '../../assets/solar panel.jpg.jpeg'
import imgRain  from '../../assets/rainwater.jpg.jpeg'
import imgFloor from '../../assets/red-floor.jpg'
import imgLight from '../../assets/lighting.jpg'
import imgLand  from '../../assets/lancape.jpg.jpeg'
import imgHero  from '../../assets/pexels-kawserhamid-176342.jpg'

// ─── Data ─────────────────────────────────────────────────────────────────────
const ADD_ONS = [
  { icon: FaLeaf,      label: 'Landscape Development', img: imgLand,  desc: 'Lawn planning, garden beds, hardscaping — outdoor spaces designed to grow with your home.' },
  { icon: FaCloudRain, label: 'Rainwater Harvesting',  img: imgRain,  desc: 'Rooftop collection, storage tanks, recharge pits — water security built in from day one.' },
  { icon: FaSun,       label: 'Solar Integration',     img: imgSolar, desc: 'Rooftop solar at design stage — maximising generation with smart panel placement.' },
  { icon: FaTh,        label: 'Heritage Flooring',     img: imgFloor, desc: 'Athangudi tiles, lime plaster, stone finishes — cool, beautiful, and rooted in culture.' },
  { icon: FaLightbulb, label: 'Smart Lighting',        img: imgLight, desc: 'Layered lighting — ambient, task, accent — planned during construction, not retrofitted.' },
  { icon: FaRecycle,   label: 'Waste Systems',         img: null,     desc: 'Composting zones, segregation areas, and waste chutes — sustainable living by design.' },
]

const SERVICES = [
  {
    id: 'residential',
    num: '01',
    label: 'Residential Construction',
    short: 'Residential',
    headline: ['Build with', 'Precision.'],
    tagline: 'Custom homes built with precision, heritage & heart.',
    body: "From independent houses to premium villas, we handle every phase — foundation to finishing — with Vastu-compliant layouts, specified materials, and craftsmanship rooted in Tamil Nadu's architectural tradition.",
    img: imgRes,
    accent: '#C9754A',
    icon: BsHouseDoor,
    features: ['Custom House Design & Build', 'Luxury Villa Construction', 'Vastu-Compliant Layouts', 'Specified Material Sourcing', 'Structural Integrity Guarantee', 'Interior Finishing & Handover'],
  },
  {
    id: 'pmc',
    num: '02',
    label: 'Project Management',
    short: 'PMC',
    headline: ['Managed with', 'Discipline.'],
    tagline: 'Expert oversight from groundbreaking to key handover.',
    body: 'Our Project Management Consultancy covers the full build lifecycle — planning, procurement, supervision, and handover. We act as your trusted on-site representative so your project finishes on time, on budget, with no surprises.',
    img: imgPmc,
    accent: '#4A7C6F',
    icon: MdOutlineEngineering,
    features: ['Budget & Timeline Management', 'Contractor Coordination', 'Specification Compliance', 'Risk Mitigation', 'Progress Reporting', 'Handover & Documentation'],
  },
  {
    id: 'renovation',
    num: '03',
    label: 'Renovation',
    short: 'Renovation',
    headline: ['Transform', 'Every Space.'],
    tagline: 'Breathe new life into every space you love.',
    body: "Whether it's a single room or a complete structural overhaul, our renovation service brings modern design, structural confidence, and Vastu-aligned redesigns — managed without disrupting your daily life.",
    img: imgReno,
    accent: '#7B6B9E',
    icon: MdArchitecture,
    features: ['Structural Upgrades', 'Interior Remodelling', 'Vastu Realignment', 'Kitchen & Bath Renovation', 'Flooring & Facade Upgrades', 'Phase-Wise Delivery'],
  },
]

const ease = [0.22, 1, 0.36, 1]

// ─── Hero parallax bg ─────────────────────────────────────────────────────────
function HeroBg() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <img src={imgHero} alt="" className="w-full h-full object-cover object-center" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a]" />
    </div>
  )
}

// ─── Service row — editorial full-width layout ────────────────────────────────
function ServiceRow({ svc, index }) {
  const [open, setOpen] = useState(false)
  const flip = index % 2 !== 0 // alternate image side
  const Icon = svc.icon

  return (
    <div className="border-t border-white/[0.07]">
      {/* ── Number + label row ── */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[540px] ${flip ? '' : ''}`}>

        {/* Image panel */}
        <div className={`relative overflow-hidden bg-[#111] h-[300px] lg:h-auto ${flip ? 'lg:order-2' : ''}`}>
          <img
            src={svc.img}
            alt={svc.label}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          {flip
            ? <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/30" />
            : <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
          }

          {/* Ghost number */}
          <div
            className="absolute bottom-0 right-4 text-[clamp(7rem,15vw,14rem)] font-black leading-none tracking-tighter select-none pointer-events-none"
            style={{ color: 'rgba(255,255,255,0.04)' }}
          >
            {svc.num}
          </div>

          {/* Service label pill */}
          <div className="absolute top-6 left-6">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 text-[9px] font-black tracking-[0.3em] uppercase backdrop-blur-md rounded-sm"
              style={{ background: `${svc.accent}22`, color: svc.accent, border: `1px solid ${svc.accent}40` }}
            >
              <Icon size={10} /> {svc.short}
            </span>
          </div>
        </div>

        {/* Content panel */}
        <div className={`bg-[#0e0e0e] flex flex-col justify-between px-8 md:px-14 lg:px-16 py-14 lg:py-20 ${flip ? 'lg:order-1' : ''}`}>
          <div>
            {/* Index */}
            <p
              className="text-[10px] font-black tracking-[0.4em] uppercase mb-8 flex items-center gap-3"
              style={{ color: svc.accent }}
            >
              <span className="w-8 h-[1px] inline-block" style={{ background: svc.accent }} />
              Service {svc.num}
            </p>

            {/* Headline */}
            <h2 className="text-[clamp(2.6rem,5vw,5rem)] font-black text-white tracking-tighter leading-[0.92] mb-6">
              {svc.headline[0]}<br />
              <span className="text-transparent" style={{ WebkitTextStroke: `2px ${svc.accent}` }}>
                {svc.headline[1]}
              </span>
            </h2>

            {/* Tagline */}
            <p className="text-[14px] font-light italic mb-5 leading-snug" style={{ color: `${svc.accent}bb` }}>
              "{svc.tagline}"
            </p>

            {/* Body */}
            <p className="text-[14px] text-white/55 font-light leading-[1.85] mb-8 max-w-[50ch]">
              {svc.body}
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-10">
              {svc.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: svc.accent }} />
                  <span className="text-[12px] text-white/65 font-light">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap items-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-[10px] font-black tracking-[0.2em] uppercase text-white rounded-sm transition-all duration-300 hover:opacity-85 hover:-translate-y-0.5"
              style={{ background: svc.accent, boxShadow: `0 8px 28px ${svc.accent}35` }}
            >
              Get Free Quote <FiArrowRight size={12} />
            </Link>
            <a
              href="tel:+916385062939"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-[10px] font-bold tracking-[0.2em] uppercase border border-white/15 text-white/70 rounded-sm transition-all duration-300 hover:border-white/35 hover:text-white"
            >
              <FiPhone size={11} /> Call Now
            </a>
            <button
              onClick={() => setOpen(o => !o)}
              className="ml-auto inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer"
              style={{ color: open ? svc.accent : 'rgba(255,255,255,0.35)' }}
            >
              {open ? 'Hide' : "What's included"}
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-300"
                style={{ borderColor: open ? svc.accent : 'rgba(255,255,255,0.15)' }}
              >
                <FiArrowRight
                  size={10}
                  className="transition-transform duration-300"
                  style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', color: open ? svc.accent : 'rgba(255,255,255,0.35)' }}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Add-Ons drawer ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease }}
            style={{ overflow: 'hidden' }}
          >
            <div className="bg-[#f8f6f2] px-8 md:px-14 lg:px-16 py-14">
              {/* Drawer header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                  <p
                    className="text-[9px] font-black tracking-[0.4em] uppercase mb-2.5 flex items-center gap-2"
                    style={{ color: svc.accent }}
                  >
                    <span className="w-6 h-[1px] inline-block" style={{ background: svc.accent }} />
                    Included With {svc.short}
                  </p>
                  <h3 className="text-[clamp(1.5rem,3vw,2.4rem)] font-black text-[#111] tracking-tight leading-snug">
                    6 Add-Ons. One Contract.
                  </h3>
                </div>
                <p className="text-[12px] text-black/50 font-light leading-relaxed max-w-[38ch] md:text-right">
                  Every sustainability and finishing service is planned at design stage — not retrofitted later.
                </p>
              </div>

              {/* 3-col grid of add-on cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {ADD_ONS.map((addon, i) => {
                  const AIcon = addon.icon
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.07, ease }}
                      className="group bg-white border border-black/[0.06] overflow-hidden rounded-none hover:shadow-xl transition-all duration-500"
                    >
                      {/* Image */}
                      <div className="h-44 overflow-hidden relative bg-[#f0ede8]">
                        {addon.img ? (
                          <img
                            src={addon.img} alt={addon.label} loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center"
                            style={{ background: `${svc.accent}09` }}
                          >
                            <AIcon style={{ color: svc.accent, fontSize: '3rem', opacity: 0.18 }} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>

                      {/* Text */}
                      <div className="p-5">
                        <div className="flex items-center gap-2.5 mb-3">
                          <div
                            className="w-7 h-7 flex items-center justify-center flex-shrink-0"
                            style={{ color: svc.accent }}
                          >
                            <AIcon size={14} />
                          </div>
                          <h4 className="text-[13px] font-black text-[#111] tracking-tight">{addon.label}</h4>
                        </div>
                        <div className="w-6 h-[1.5px] mb-3" style={{ background: svc.accent }} />
                        <p className="text-[12px] text-black/55 font-light leading-relaxed">{addon.desc}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Services() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen overflow-x-hidden font-sans">
      <Helmet>
        <title>Construction Services Tamil Nadu | Karrcholai Construction</title>
        <meta name="description" content="Karrcholai offers residential construction, PMC, and renovation in Tamil Nadu — each with landscape, solar, rainwater, heritage flooring, lighting and waste systems built in." />
        <link rel="canonical" href="https://karrcholai.com/services" />
      </Helmet>

      <Navbar />

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-[#0a0a0a]">
        <HeroBg />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-14 lg:px-20
          pb-[clamp(56px,9vw,96px)] pt-[clamp(140px,22vh,200px)]">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[#C9754A] text-[10px] font-black tracking-[0.45em] uppercase mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-[1px] bg-[#C9754A] inline-block" />
            What We Deliver
          </motion.p>

          {/* Main heading — editorial style matching About page */}
          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.25, ease }}
              className="text-[clamp(4rem,10vw,10rem)] font-black text-white leading-[0.88] tracking-tighter"
            >
              SERVICES
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.38, ease }}
              className="text-[clamp(4rem,10vw,10rem)] font-black leading-[0.88] tracking-tighter text-transparent"
              style={{ WebkitTextStroke: '2px rgba(255,255,255,0.22)' }}
            >
              THAT BUILD.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="text-white/55 text-[14px] md:text-base font-light leading-relaxed max-w-lg mb-14"
          >
            Three service pillars — Residential, PMC, Renovation — each delivered with solar, rainwater, landscape, heritage flooring, smart lighting, and waste systems built in from day one.
          </motion.p>

          {/* Three service quick-jump rows */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-0 border border-white/[0.07] mb-16 max-w-2xl"
          >
            {SERVICES.map((s, i) => {
              const SI = s.icon
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={e => {
                    e.preventDefault()
                    document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className={`group flex-1 flex items-center gap-3 px-5 py-4 transition-all duration-300
                    ${i < SERVICES.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-white/[0.07]' : ''}
                    hover:bg-white/[0.04]`}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border border-white/[0.1] group-hover:border-white/25 transition-all duration-300"
                    style={{ color: s.accent }}>
                    <SI size={14} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-white tracking-wide">{s.short}</p>
                    <p className="text-[9px] text-white/40 uppercase tracking-[0.2em]">Service {s.num}</p>
                  </div>
                  <FiArrowUpRight size={13} className="ml-auto text-white/20 group-hover:text-white/60 transition-colors duration-300" />
                </a>
              )
            })}
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.8 }}
            className="flex gap-10 md:gap-20 flex-wrap pt-7 border-t border-white/[0.06]"
          >
            {[['12+', 'Years on Site'], ['200+', 'Projects Delivered'], ['3', 'Core Services'], ['6', 'Add-Ons Included']].map(([v, l]) => (
              <div key={l}>
                <p className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black text-white leading-none tracking-tighter">{v}</p>
                <p className="text-[9px] text-white/45 mt-1.5 uppercase tracking-[0.22em]">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-1 hidden md:flex"
        >
          <span className="text-white/50 text-[9px] tracking-[0.35em] uppercase rotate-90 origin-center mb-3">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-4 h-7 border border-white/30 rounded-full flex justify-center pt-1"
          >
            <div className="w-0.5 h-2 bg-white/55 rounded-full" />
          </motion.div>
        </motion.div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════
          INTRO STATEMENT — full-bleed dark band
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0e0e0e] border-t border-white/[0.05] px-6 md:px-14 lg:px-20 py-16 md:py-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-20">
          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease }}
              className="text-[clamp(1.8rem,4vw,3.5rem)] font-black text-white tracking-tighter leading-[1.05]"
            >
              One team.<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(201,117,74,0.7)' }}>One contract.</span><br />
              All delivered.
            </motion.h2>
          </div>
          <div className="flex-1 lg:max-w-[480px]">
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.12, ease }}
              className="text-white/60 text-[14px] md:text-[15px] font-light leading-[1.9] mb-8"
            >
              From foundation to handover, Karrcholai coordinates every contractor, every inspection, every decision — so nothing falls between the cracks. Every service comes with 6 sustainability and finishing add-ons built in, not bolted on.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.24 }}
              className="flex flex-wrap gap-3"
            >
              {['Vastu-Compliant', 'Tamil Nadu-Based', 'End-to-End', 'Transparent Pricing'].map((tag) => (
                <span key={tag} className="text-[10px] font-bold tracking-[0.18em] uppercase px-4 py-2 border border-white/[0.1] text-white/55 rounded-sm">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════
          6 ADD-ONS OVERVIEW — light cream panel
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#f8f6f2] px-6 md:px-14 lg:px-20 py-16 md:py-24 border-t border-black/[0.06]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[#C9754A] text-[9px] font-black tracking-[0.45em] uppercase mb-3 flex items-center gap-3"
              >
                <span className="w-7 h-[1px] bg-[#C9754A] inline-block" />
                Always Included
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.08 }}
                className="text-[clamp(2rem,4.5vw,3.8rem)] font-black text-[#0e0e0e] tracking-tighter leading-[0.95]"
              >
                6 Add-Ons.<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(0,0,0,0.2)' }}>Built In.</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="text-[13px] text-black/50 font-light leading-[1.85] max-w-[40ch] md:text-right"
            >
              Not extras. Not optional upgrades. These six services come with every Residential, PMC, and Renovation project — planned at design stage, executed under one contract.
            </motion.p>
          </div>

          {/* 6 cards — 3 col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/[0.07]">
            {ADD_ONS.map((addon, i) => {
              const AIcon = addon.icon
              const accents = ['#4E8B5F', '#3B7EC8', '#D4900A', '#C9754A', '#D4900A', '#4E8B5F']
              const ac = accents[i]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-[#f8f6f2] hover:bg-white transition-colors duration-400 p-8 group"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-11 h-11 flex items-center justify-center rounded-sm"
                      style={{ background: `${ac}12`, color: ac }}
                    >
                      <AIcon size={18} />
                    </div>
                    <span className="text-[10px] font-black tracking-[0.3em] text-black/18">0{i + 1}</span>
                  </div>
                  <h3 className="text-[14px] font-black text-[#111] tracking-tight mb-2">{addon.label}</h3>
                  <div className="w-5 h-[1.5px] mb-3 transition-all duration-300 group-hover:w-8" style={{ background: ac }} />
                  <p className="text-[12px] text-black/55 font-light leading-[1.8]">{addon.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════
          THREE MAIN SERVICES — full editorial rows
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a]">
        {/* Section label */}
        <div className="max-w-7xl mx-auto px-6 md:px-14 lg:px-20 pt-16 md:pt-24 pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[#C9754A] text-[9px] font-black tracking-[0.45em] uppercase mb-3 flex items-center gap-3"
              >
                <span className="w-7 h-[1px] bg-[#C9754A] inline-block" />
                Core Services
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.08 }}
                className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white tracking-tighter leading-[1.02]"
              >
                Choose Your Service.<br />
                <span className="text-white/35">We Handle the Rest.</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.14 }}
              className="text-[12px] text-white/45 font-light leading-relaxed max-w-[34ch] md:text-right"
            >
              Tap "What's included" on any service to reveal all 6 add-ons.
            </motion.p>
          </div>
        </div>

        {/* Service rows */}
        {SERVICES.map((svc, i) => (
          <div key={svc.id} id={svc.id}>
            <ServiceRow svc={svc} index={i} />
          </div>
        ))}
      </section>


      {/* ══════════════════════════════════════════════════════════════════════
          PROCESS — numbered steps, dark
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0e0e0e] border-t border-white/[0.05] px-6 md:px-14 lg:px-20 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[#C9754A] text-[9px] font-black tracking-[0.45em] uppercase mb-3 flex items-center gap-3"
              >
                <span className="w-7 h-[1px] bg-[#C9754A] inline-block" />
                Our Process
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.08 }}
                className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white tracking-tighter leading-[1.02]"
              >
                From First Call.<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.22)' }}>To Key Handover.</span>
              </motion.h2>
            </div>
          </div>

          {/* Steps — horizontal divider list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/[0.07]">
            {[
              { step: '01', title: 'Discovery Call',     desc: 'We understand your site, brief, budget, and timeline — no obligation, no pressure.' },
              { step: '02', title: 'Design & Planning',  desc: 'Vastu-compliant layout, material spec, and sustainability planning done together.' },
              { step: '03', title: 'Build & Supervise',  desc: 'Our team manages every contractor, every inspection, every milestone.' },
              { step: '04', title: 'Handover & Support', desc: 'Full documentation, snag resolution, and ongoing support after you move in.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease }}
                className={`p-8 md:p-10 group hover:bg-white/[0.03] transition-colors duration-400
                  ${i < 3 ? 'border-b md:border-b-0 md:border-r border-white/[0.07]' : ''}`}
              >
                <div className="text-[clamp(3rem,5vw,5rem)] font-black leading-none tracking-tighter mb-6 select-none"
                  style={{ color: 'rgba(201,117,74,0.1)' }}>
                  {item.step}
                </div>
                <div className="w-6 h-[1.5px] bg-[#C9754A] mb-4 transition-all duration-300 group-hover:w-10" />
                <h3 className="text-[14px] font-black text-white tracking-tight mb-3">{item.title}</h3>
                <p className="text-[12px] text-white/50 font-light leading-[1.85]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════
          FINAL CTA — full-bleed dark
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] border-t border-white/[0.05] px-6 md:px-14 lg:px-20 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-0 left-1/3 w-[600px] h-[300px] rounded-full blur-[140px] opacity-[0.07]"
              style={{ background: '#C9754A' }} />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
              <div>
                <motion.p
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-[#C9754A] text-[9px] font-black tracking-[0.45em] uppercase mb-5 flex items-center gap-3"
                >
                  <span className="w-7 h-[1px] bg-[#C9754A] inline-block" />
                  Ready to Begin?
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.1, ease }}
                  className="text-[clamp(3rem,7vw,7rem)] font-black text-white tracking-tighter leading-[0.88]"
                >
                  Let's build<br />
                  <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.25)' }}>
                    something
                  </span><br />
                  worth living in.
                </motion.h2>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.22 }}
                className="flex flex-col gap-4 lg:items-end"
              >
                <p className="text-[13px] text-white/50 font-light leading-relaxed max-w-[36ch] lg:text-right">
                  One team, no middlemen, no surprises — from first conversation to the day you get your keys.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <Link to="/contact"
                    className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#C9754A] text-white text-[10px] font-black tracking-[0.22em] uppercase transition-all hover:opacity-85 hover:-translate-y-0.5 rounded-sm shadow-[0_14px_40px_rgba(201,117,74,0.3)]"
                  >
                    Start a Project <FiArrowRight size={12} />
                  </Link>
                  <Link to="/projects"
                    className="inline-flex items-center gap-2 px-7 py-4 border border-white/15 text-[10px] font-bold tracking-[0.22em] uppercase text-white/65 transition-all hover:border-white/30 hover:text-white rounded-sm"
                  >
                    View Our Work
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="bg-[#f8f6f2]">
        <FAQSection
          dark={false}
          accent="#C9754A"
          subtitle="Common Questions"
          title="Everything You Need to Know"
          faqs={[
            { q: 'Do you provide house construction from foundation to handover?', a: 'Yes. Karrcholai handles the complete build lifecycle — from site analysis and foundation work through structural build, finishing, and final key handover. You get one team, one contract, and a single point of contact throughout.' },
            { q: 'What is PMC in construction?', a: 'PMC stands for Project Management Consultancy. We act as your on-site representative — managing contractors, budgets, timelines, material procurement, workmanship inspections, and documentation.' },
            { q: 'What does your renovation service cover?', a: 'Our renovation service covers structural upgrades, interior remodelling, Vastu realignment, kitchen and bathroom renovation, flooring replacement, facade work, and phase-wise expansion.' },
            { q: 'Are sustainable features like solar and rainwater harvesting included?', a: 'Yes — all six add-ons (landscape, rainwater, solar, heritage flooring, smart lighting, and waste systems) are planned at design stage and built into the main contract. Not retrofitted. Not extras.' },
            { q: 'Which areas of Tamil Nadu do you serve?', a: 'We serve Karur, Chennai, Coimbatore, Madurai, Trichy, Erode, and surrounding areas across Tamil Nadu.' },
            { q: 'Do you offer Vastu-compliant design?', a: 'Yes. Every residential layout is reviewed against Vastu Shastra and Manaiyadi Sastram principles — auspicious orientations, door placements, and dimensions alongside modern engineering.' },
            { q: 'How long does residential construction take?', a: 'A standard independent house typically takes 10–16 months from groundbreaking to handover. We provide a detailed milestone timeline at the start of every project.' },
          ]}
        />
      </div>

      <UnifiedFooter />
    </div>
  )
}
