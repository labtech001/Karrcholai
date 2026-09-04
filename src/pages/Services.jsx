import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPhone, FiChevronDown, FiCheck } from 'react-icons/fi'
import { FaLeaf, FaCloudRain, FaSun, FaTh } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import FAQSection from '../components/FAQSection'
import { Helmet } from 'react-helmet-async'

import imgPmc   from '../../assets/pmc.jpeg'
import imgRes   from '../../assets/Residential_construction.jpg'
import imgSolar from '../../assets/solar panel.jpg.jpeg'
import imgRain  from '../../assets/rainwater.jpg.jpeg'
import imgFloor from '../../assets/red-floor.jpg'
import imgLand  from '../../assets/lancape.jpg.jpeg'
import imgHero  from '../../assets/pexels-kawserhamid-176342.jpg'

// ─── Data ─────────────────────────────────────────────────────────────────────

const PMC_STEPS = [
  { n: '01', t: 'Understand Your Requirements',     b: 'We begin by understanding your lifestyle, priorities, budget, site conditions and expectations — establishing a practical direction before construction starts.' },
  { n: '02', t: 'Plan Before Execution',            b: 'We review drawings, specifications, quantities and construction sequence to identify potential issues before they become site problems.' },
  { n: '03', t: 'Coordinate the Work',              b: 'We coordinate architects, structural consultants, contractors, suppliers and specialist teams — maintaining the right sequence and reducing conflicts on site.' },
  { n: '04', t: 'Monitor Site Execution',           b: 'Regular observation of workmanship, dimensions, materials and construction practices at important stages. Our experience helps identify issues early.' },
  { n: '05', t: 'Manage Materials & Wastage',       b: 'We monitor material requirements, usage and wastage to support better resource utilisation, cost awareness and responsible construction.' },
  { n: '06', t: 'Monitor Quality',                  b: 'Stage-wise checking and consistent attention to workmanship — identifying and addressing issues during construction, not after.' },
  { n: '07', t: 'Track Progress & Decisions',       b: 'We keep you informed about important activities, requirements, issues and decisions so the project progresses with clarity.' },
  { n: '08', t: 'Coordinate CHOLAI Solutions',      b: 'We integrate landscape, rainwater harvesting, traditional flooring and solar solutions into the project — considered alongside the building, not as afterthoughts.', cholai: true },
  { n: '09', t: 'Resolve Construction Challenges',  b: 'Unexpected site conditions, coordination issues and changes can occur. Our practical experience helps assess situations and work toward solutions on cost, quality and time.' },
  { n: '10', t: 'Support Through Handover',         b: 'Our involvement continues through finishing stages, final inspections and necessary corrections — bringing the project to an organised handover.' },
]

const TURNKEY_STEPS = [
  { n: '01', t: 'Requirement & Project Planning',        b: 'We understand your requirements, lifestyle, priorities, budget and site conditions — establishing a practical direction for your project.' },
  { n: '02', t: 'Design & Technical Coordination',       b: 'We coordinate with architects, structural consultants and other professionals to align drawings, specifications and technical requirements with site execution.' },
  { n: '03', t: 'Estimation & Material Planning',        b: 'We review project quantities and material needs to support better cost awareness, planned procurement and reduced material wastage.' },
  { n: '04', t: 'Construction Execution',                b: 'From foundation and structural work to masonry, plastering and other major construction activities — executed according to the planned sequence.' },
  { n: '05', t: 'Electrical & Plumbing Coordination',    b: 'We coordinate MEP services with construction activities to ensure proper integration at the required stages.' },
  { n: '06', t: 'Finishing Works',                       b: 'We coordinate flooring, painting, doors, windows, sanitary fixtures and other finishing activities according to the approved requirements.' },
  { n: '07', t: 'CHOLAI — Better Living Solutions',      b: 'Landscape, rainwater harvesting, traditional flooring and solar energy — considered as part of the project rather than added only after construction is complete.', cholai: true },
  { n: '08', t: 'Site Coordination & Quality Monitoring', b: 'We monitor site progress, coordinate different teams and observe important stages of workmanship to identify issues and support timely corrections.' },
  { n: '09', t: 'Material & Waste Management',           b: 'We plan material requirements, monitor usage and work to reduce avoidable wastage — supporting both cost efficiency and responsible construction.' },
  { n: '10', t: 'Final Inspection & Handover',           b: 'We coordinate final inspections, identify pending works and corrections, and support the completion process through to handover.' },
]

const CHOLAI_ITEMS = [
  { Icon: FaLeaf,      label: 'Landscape & Green Spaces',        img: imgLand,  desc: 'Planning outdoor areas that complement the home and create comfortable, usable green spaces.' },
  { Icon: FaCloudRain, label: 'Rainwater & Water Conservation',  img: imgRain,  desc: 'Planning systems to collect and manage rainwater responsibly and support better water use.' },
  { Icon: FaTh,        label: 'Traditional Flooring & Materials', img: imgFloor, desc: 'Athangudi tiles, lime plaster, natural stone — cool, beautiful and rooted in Tamil culture.' },
  { Icon: FaSun,       label: 'Solar Energy Solutions',           img: imgSolar, desc: 'Planning suitable solar solutions to support energy efficiency and responsible energy use.' },
]

// ─── Accordion (reusable for both services) ───────────────────────────────────
function Accordion({ steps, onDark = false }) {
  const [open, setOpen] = useState(null)
  const toggle = (i) => setOpen(open === i ? null : i)

  const borderColor    = onDark ? 'border-white/10'        : 'border-dark/[0.07]'
  const numColor       = (active) => onDark
    ? (active ? 'text-secondary' : 'text-white/20')
    : (active ? 'text-secondary' : 'text-dark/25')
  const titleColor     = (active) => onDark
    ? (active ? 'text-white' : 'text-white/60')
    : (active ? 'text-dark' : 'text-dark/60')
  const chevronColor   = (active) => onDark
    ? (active ? 'text-secondary' : 'text-white/20')
    : (active ? 'text-secondary' : 'text-dark/25')
  const bodyColor      = onDark ? 'text-white/45' : 'text-dark/55'

  return (
    <div className={`divide-y ${onDark ? 'divide-white/[0.08]' : 'divide-dark/[0.06]'}`}>
      {steps.map((s, i) => {
        const active = open === i
        return (
          <div key={i}>
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center gap-4 py-4 text-left cursor-pointer select-none"
            >
              <span className={`text-[9px] font-bold tracking-[0.35em] flex-shrink-0 transition-colors duration-200 ${numColor(active)}`}>
                {s.n}
              </span>
              <span className={`flex-1 font-sans text-[13px] font-semibold transition-colors duration-200 flex items-center gap-2 ${titleColor(active)}`}>
                {s.t}
                {s.cholai && (
                  <span className="text-[7px] font-bold tracking-[0.4em] uppercase px-2 py-0.5 rounded bg-primary/10 text-primary flex-shrink-0">
                    CHOLAI
                  </span>
                )}
              </span>
              <FiChevronDown
                size={13}
                className={`flex-shrink-0 transition-all duration-200 ${chevronColor(active)}`}
                style={{ transform: active ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>
            <AnimatePresence initial={false}>
              {active && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className={`font-sans text-[13px] font-light leading-relaxed pb-4 pl-10 pr-6 ${bodyColor}`}>
                    {s.b}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

// ─── CHOLAI expandable (cream bg) ─────────────────────────────────────────────
function CholaiExpand() {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-10 border-t border-dark/[0.07] pt-8">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-3 cursor-pointer group w-full text-left"
      >
        <span className="w-5 h-[1px] bg-primary/40 group-hover:w-8 transition-all duration-300" />
        <span className="font-sans text-[11px] font-bold tracking-[0.28em] uppercase text-dark/45 group-hover:text-primary transition-colors duration-300">
          CHOLAI Solutions Included
        </span>
        <FiChevronDown
          size={12}
          className="ml-auto text-dark/30 transition-all duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="exp"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pt-6 grid grid-cols-2 gap-3">
              {CHOLAI_ITEMS.map(({ Icon, label }, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 bg-primary/[0.04] rounded-xl border border-primary/10">
                  <Icon size={13} className="text-primary flex-shrink-0" />
                  <span className="font-sans text-[11px] font-semibold text-dark/65 leading-snug">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── CHOLAI expandable (dark bg) ──────────────────────────────────────────────
function CholaiExpandDark() {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-8 border-t border-white/[0.08] pt-7">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-3 cursor-pointer group w-full text-left"
      >
        <span className="w-5 h-[1px] bg-primary/50 group-hover:w-8 transition-all duration-300" />
        <span className="font-sans text-[11px] font-bold tracking-[0.28em] uppercase text-white/35 group-hover:text-primary transition-colors duration-300">
          CHOLAI Solutions Included
        </span>
        <FiChevronDown
          size={12}
          className="ml-auto text-white/25 transition-all duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="expd"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pt-5 grid grid-cols-2 gap-3">
              {CHOLAI_ITEMS.map(({ Icon, label }, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 bg-white/[0.05] rounded-xl border border-white/[0.08]">
                  <Icon size={13} className="text-primary flex-shrink-0" />
                  <span className="font-sans text-[11px] font-semibold text-white/55 leading-snug">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function Services() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <div ref={containerRef} className="bg-cream min-h-screen overflow-x-hidden text-dark selection:bg-secondary selection:text-white">
      <Helmet>
        <title>PMC & Turnkey Construction Services | KARRCHOLAI Tamil Nadu</title>
        <meta name="description" content="KARRCHOLAI offers experience-led Project Management Consultancy and Turnkey Construction in Tamil Nadu — with CHOLAI better-living solutions built in from day one." />
        <link rel="canonical" href="https://karrcholai.com/services" />
      </Helmet>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100] bg-secondary"
        style={{ scaleX }}
      />

      <Navbar />

      {/* ════════════════════════════════════════════════════
          1. HERO — full-bleed, left-aligned, like Karr/About
      ════════════════════════════════════════════════════ */}
      <section
        className="relative w-full flex items-center justify-center overflow-hidden bg-dark"
        style={{ minHeight: '100svh' }}
      >
        {/* Parallax bg */}
        <HeroBg />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-32 pb-20 flex flex-col items-start">

          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-secondary font-bold tracking-[0.55em] uppercase text-[10px] mb-5 block"
          >
            Experience-Led Construction
          </motion.span>

          {/* Lora serif heading — matches About page H1 exactly */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: 'easeOut' }}
            className="font-serif text-[clamp(3rem,8vw,7.5rem)] font-semibold text-white leading-[1.05] tracking-tight mb-6 max-w-3xl"
          >
            Build with<br />
            <em className="not-italic text-secondary">Confidence.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-sans text-white/60 text-[15px] font-light leading-relaxed max-w-[48ch] mb-10"
          >
            Building a home involves much more than construction work. It requires planning,
            coordination, cost awareness, material management, quality control and timely
            decisions at every stage. KARRCHOLAI brings{' '}
            <strong className="text-white/80 font-semibold">12+ years of practical site experience</strong>
            {' '}to manage all of it for you.
          </motion.p>

          {/* Quick-jump pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-3 mb-16"
          >
            {[
              { id: 'pmc',     label: 'Project Management (PMC)' },
              { id: 'turnkey', label: 'Turnkey Construction' },
            ].map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
                className="group inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-sans text-[11px] font-semibold tracking-[0.18em] uppercase rounded-full transition-all duration-300 hover:bg-white hover:text-dark hover:-translate-y-0.5"
              >
                {s.label}
                <FiArrowRight size={12} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </a>
            ))}
          </motion.div>

          {/* Stats row — same as Karr page */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.8 }}
            className="flex gap-10 md:gap-16 flex-wrap pt-8 border-t border-white/[0.12] w-full max-w-2xl"
          >
            {[['12+', 'Years on Site'], ['200+', 'Projects'], ['10', 'PMC Stages'], ['4', 'CHOLAI Solutions']].map(([v, l]) => (
              <div key={l}>
                <p className="font-sans text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-white leading-none">{v}</p>
                <p className="font-sans text-[9px] text-white/40 mt-1.5 uppercase tracking-[0.25em]">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-3"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-[1px] h-14 bg-gradient-to-b from-secondary to-transparent"
          />
        </motion.div>
      </section>


      {/* ════════════════════════════════════════════════════
          2. BRAND SPLIT — cream, two-panel, like About "Two names. One vision."
      ════════════════════════════════════════════════════ */}
      <section className="bg-cream py-20 md:py-28 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="max-w-2xl mb-14 md:mb-18">
            <motion.span
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-sans text-secondary font-bold tracking-[0.55em] uppercase text-[10px] mb-4 block"
            >
              Two Names. One Vision.
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="font-serif text-[clamp(2.2rem,5vw,4rem)] font-semibold text-dark leading-[1.1] tracking-tight"
            >
              KARR builds it.<br />
              CHOLAI makes it{' '}
              <em className="not-italic text-secondary">worth living in.</em>
            </motion.h2>
          </div>

          {/* Split panels — same layout as About KARR/CHOLAI */}
          <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-dark/[0.07] shadow-sm">

            {/* KARR — dark */}
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="relative bg-dark px-8 md:px-12 py-12 md:py-16 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(184,92,56,0.1),_transparent_65%)] pointer-events-none" />
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-[150px] font-bold text-white/[0.025] leading-none select-none pointer-events-none font-serif">K</div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center shadow-lg shadow-secondary/25 flex-shrink-0">
                    <span className="font-serif text-white font-semibold text-lg">K</span>
                  </div>
                  <div>
                    <span className="font-sans text-secondary text-[9px] font-bold uppercase tracking-[0.45em] block">KARR</span>
                    <span className="font-sans text-white text-[15px] font-semibold">Construction &amp; Project Management</span>
                  </div>
                </div>

                <p className="font-sans text-white/60 text-[14px] font-light leading-relaxed mb-8 max-w-md">
                  KARR is your complete home-building responsibility — from the first conversation
                  to the day you receive your keys. We coordinate planning, structure, civil work,
                  MEP, supervision and handover under a single accountable team.
                </p>

                <div className="space-y-0 divide-y divide-white/[0.07]">
                  {[
                    'Project Management Consultancy (PMC)',
                    'Turnkey Construction',
                    'Vastu & Manaiyadi Planning',
                    'Vendor & Contractor Coordination',
                    'Material & Cost Management',
                    'Documentation & Handover',
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-3 py-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                      <span className="font-sans text-[13px] text-white/65 font-light">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CHOLAI — cream/light */}
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              className="relative bg-[#f8f6f0] px-8 md:px-12 py-12 md:py-16 overflow-hidden border-t lg:border-t-0 lg:border-l border-dark/[0.07]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(45,75,55,0.06),_transparent_60%)] pointer-events-none" />
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-[150px] font-bold text-dark/[0.04] leading-none select-none pointer-events-none font-serif">C</div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-11 h-11 rounded-2xl bg-dark flex items-center justify-center shadow-xl shadow-dark/10 flex-shrink-0">
                    <span className="font-serif text-secondary font-semibold text-lg">C</span>
                  </div>
                  <div>
                    <span className="font-sans text-secondary text-[9px] font-bold uppercase tracking-[0.45em] block">CHOLAI</span>
                    <span className="font-sans text-dark text-[15px] font-semibold">Greenery &amp; Sustainability</span>
                  </div>
                </div>

                <p className="font-sans text-dark/60 text-[14px] font-light leading-relaxed mb-8 max-w-md">
                  CHOLAI is the better-living layer — sustainability solutions planned at design
                  stage, not retrofitted after construction. A home should not end with its walls.
                  CHOLAI extends it into spaces, resources and systems that make living better.
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    { icon: '🌿', label: 'Landscape & Green Spaces',       desc: 'Creating healthier outdoor environments' },
                    { icon: '💧', label: 'Rainwater & Water Conservation',  desc: 'Managing water responsibly from day one' },
                    { icon: '☀️', label: 'Solar Energy Solutions',           desc: 'Reducing dependence on conventional energy' },
                    { icon: '🏺', label: 'Traditional Flooring & Materials', desc: 'Athangudi tiles, lime plaster, stone finishes' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-dark/5 hover:border-secondary/25 hover:shadow-sm transition-all duration-300">
                      <span className="text-lg flex-shrink-0">{item.icon}</span>
                      <div>
                        <p className="font-sans text-[13px] font-semibold text-dark">{item.label}</p>
                        <p className="font-sans text-[11px] text-dark/50 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Closing strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="mt-8 p-6 rounded-2xl border border-secondary/15 bg-secondary/[0.04] text-center"
          >
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.4em] text-secondary">
              From Stone to Oasis — We Build Better Living
            </p>
          </motion.div>

        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          3. PMC — dark bg, two-column like Karr PMC section
      ════════════════════════════════════════════════════ */}
      <section id="pmc" className="bg-dark py-0 overflow-hidden">

        {/* Full-bleed image header */}
        <div className="relative h-[52vh] overflow-hidden">
          <img src={imgPmc} alt="Project Management Consultancy" className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/40" />
          <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-end pb-14">
            <motion.span
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sans text-secondary font-bold tracking-[0.55em] uppercase text-[10px] mb-3 block"
            >
              KARR — Service 01
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="font-serif text-[clamp(2.8rem,6vw,6rem)] font-semibold text-white leading-[1.05] tracking-tight"
            >
              Project Management<br />
              <em className="not-italic text-white/40">Consultancy</em>
            </motion.h2>
          </div>
        </div>

        {/* PMC content — 2 col */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left — narrative */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
            >
              <p className="font-sans text-white/65 text-[15px] font-light leading-relaxed mb-8">
                Our Project Management Consultancy is built on{' '}
                <strong className="text-white font-semibold">12+ years of practical construction experience</strong>.
                Our approach comes from working through real projects, understanding site conditions,
                coordinating different teams and addressing construction challenges as they arise.
              </p>

              {/* Pull quote */}
              <blockquote className="font-serif text-[15px] text-white/70 italic font-medium leading-relaxed border-l-2 border-secondary pl-5 mb-8">
                "We combine practical construction knowledge with structured planning, regular
                site monitoring and clear communication to keep your project moving in the
                right direction."
              </blockquote>

              {/* Approach chain */}
              <div className="mb-8">
                <p className="font-sans text-secondary text-[9px] font-bold uppercase tracking-[0.45em] mb-3 flex items-center gap-2">
                  <span className="w-5 h-[1px] bg-secondary" />
                  Our Approach
                </p>
                <div className="flex flex-wrap items-center gap-1">
                  {['Experience', 'Planning', 'Coordination', 'Monitoring', 'CHOLAI', 'Handover'].map((s, i, arr) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="font-sans text-[12px] font-semibold text-white/65">{s}</span>
                      {i < arr.length - 1 && <span className="text-secondary/40 text-[10px]">→</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Why experience box */}
              <div className="bg-white/[0.04] rounded-2xl border border-white/[0.08] p-6 mb-8">
                <p className="font-sans text-[9px] font-bold tracking-[0.4em] uppercase text-white/30 mb-3">Why Experience Matters</p>
                <p className="font-sans text-[13px] text-white/55 font-light leading-relaxed">
                  12+ years of practical construction helps us understand how decisions affect
                  the project — from work sequence and workmanship to materials, services,
                  landscape and long-term usability.{' '}
                  <span className="text-white/75 font-medium">Our experience becomes your support throughout.</span>
                </p>
              </div>

              {/* CTAs */}
              <div className="flex gap-3 flex-wrap">
                <Link to="/contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-secondary hover:bg-[#a34e30] text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-secondary/25"
                >
                  Discuss Your Project <FiArrowRight size={11} />
                </Link>
                <a href="tel:+916385062939"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 border border-white/20 text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-300 hover:bg-white hover:text-dark"
                >
                  <FiPhone size={11} /> Call Now
                </a>
              </div>
            </motion.div>

            {/* Right — accordion */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.7 }}
            >
              <div className="mb-6">
                <span className="font-sans text-secondary text-[9px] font-bold uppercase tracking-[0.45em] mb-2 block">How We Manage Your Project</span>
                <h3 className="font-serif text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold text-white leading-[1.1]">
                  10 Stages.<br />
                  <span className="text-white/30">Every Step Covered.</span>
                </h3>
              </div>

              <div className="bg-white/[0.04] rounded-2xl border border-white/[0.08] px-6 py-2">
                <Accordion steps={PMC_STEPS} onDark={true} />
              </div>

              <CholaiExpandDark />
            </motion.div>

          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          4. TURNKEY — cream bg, two-column
      ════════════════════════════════════════════════════ */}
      <section id="turnkey" className="bg-[#f8f6f3] py-0 overflow-hidden">

        {/* Full-bleed image header */}
        <div className="relative h-[52vh] overflow-hidden">
          <img src={imgRes} alt="Turnkey Construction" className="absolute inset-0 w-full h-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f8f6f3] via-[#f8f6f3]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8f6f3] via-transparent to-transparent" />
          <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-end pb-14">
            <motion.span
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sans text-secondary font-bold tracking-[0.55em] uppercase text-[10px] mb-3 block"
            >
              KARR — Service 02
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="font-serif text-[clamp(2.8rem,6vw,6rem)] font-semibold text-dark leading-[1.05] tracking-tight"
            >
              Turnkey<br />
              <em className="not-italic text-dark/30">Construction</em>
            </motion.h2>
          </div>
        </div>

        {/* Turnkey content — 2 col */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left — narrative */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
            >
              <p className="font-sans text-dark/65 text-[15px] font-light leading-relaxed mb-8">
                Building a home involves many decisions, professionals, materials and
                construction activities. Managing each part separately can become stressful
                and time-consuming.
                <br /><br />
                With KARRCHOLAI's Turnkey service, we coordinate the{' '}
                <strong className="text-dark font-semibold">complete construction journey</strong>
                {' '}— from understanding your requirements to execution, finishing and handover.
              </p>

              {/* Three pillars */}
              <div className="space-y-3 mb-8">
                {[
                  { label: 'One Point of Coordination', desc: "You don't have to manage every contractor, supplier and specialist independently." },
                  { label: 'One Connected Process',     desc: 'Every stage connects to the next — decisions made early protect cost, quality and time later.' },
                  { label: 'One Complete Environment',  desc: 'CHOLAI solutions are integrated into the project, not added as afterthoughts.' },
                ].map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="group flex gap-4 p-5 bg-white rounded-2xl border border-dark/[0.06] hover:border-secondary/25 hover:shadow-md transition-all duration-300"
                  >
                    <FiCheck size={15} className="text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans text-[13px] font-semibold text-dark mb-0.5">{p.label}</p>
                      <p className="font-sans text-[12px] text-dark/50 font-light leading-relaxed">{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Approach chain */}
              <div className="mb-8 p-5 bg-white rounded-2xl border border-dark/[0.06]">
                <p className="font-sans text-secondary text-[9px] font-bold uppercase tracking-[0.45em] mb-3 flex items-center gap-2">
                  <span className="w-5 h-[1px] bg-secondary" />
                  Turnkey Approach
                </p>
                <div className="flex flex-wrap items-center gap-1">
                  {['Understand', 'Plan', 'Coordinate', 'Build', 'Monitor', 'Integrate', 'Handover'].map((s, i, arr) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="font-sans text-[12px] font-semibold text-dark/60">{s}</span>
                      {i < arr.length - 1 && <span className="text-secondary/40 text-[10px]">→</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex gap-3 flex-wrap">
                <Link to="/contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-dark hover:bg-secondary text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-500 hover:-translate-y-0.5"
                >
                  Start a Turnkey Project <FiArrowRight size={11} />
                </Link>
                <a href="tel:+916385062939"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-dark/20 text-dark/65 font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-300 hover:border-dark/50 hover:text-dark"
                >
                  <FiPhone size={11} /> Call Now
                </a>
              </div>
            </motion.div>

            {/* Right — accordion */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.7 }}
            >
              <div className="mb-6">
                <span className="font-sans text-secondary text-[9px] font-bold uppercase tracking-[0.45em] mb-2 block">What We Manage</span>
                <h3 className="font-serif text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold text-dark leading-[1.1]">
                  From Planning.<br />
                  <span className="text-dark/30">To Handover.</span>
                </h3>
              </div>

              <div className="bg-white rounded-2xl border border-dark/[0.06] shadow-sm px-6 py-2">
                <Accordion steps={TURNKEY_STEPS} onDark={false} />
              </div>

              <CholaiExpand />
            </motion.div>

          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          5. CHOLAI — dark, image grid like About "Responsibility"
      ════════════════════════════════════════════════════ */}
      <section className="bg-[#0e0e0e] py-20 md:py-28 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
            >
              <span className="font-sans text-secondary font-bold tracking-[0.55em] uppercase text-[10px] mb-4 block">
                CHOLAI — Better Living
              </span>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] font-semibold text-white leading-[1.1] tracking-tight">
                Beyond Construction.<br />
                <em className="not-italic text-white/35">Better Living.</em>
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="font-sans text-white/50 text-[14px] font-light leading-relaxed max-w-[38ch] lg:text-right"
            >
              A home should not end with the building itself. Through CHOLAI, we plan the spaces,
              resources and systems that contribute to better living — at the right stage.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CHOLAI_ITEMS.map(({ Icon, label, img, desc }, i) => {
              const accents = ['#2D4B37', '#2563EB', '#B85C38', '#D97706']
              const ac = accents[i]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative bg-white/[0.03] rounded-2xl border border-white/[0.07] overflow-hidden hover:border-white/15 transition-all duration-500"
                >
                  {/* Hover bottom bar */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-600 ease-out"
                    style={{ background: ac }} />

                  <div className="h-44 overflow-hidden relative">
                    <img src={img} alt={label} loading="lazy"
                      className="w-full h-full object-cover opacity-55 group-hover:scale-105 group-hover:opacity-70 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/80 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${ac}25`, color: ac }}>
                      <Icon size={14} />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-sans text-[14px] font-semibold text-white mb-2">{label}</h3>
                    <div className="w-6 h-[2px] mb-3 transition-all duration-300 group-hover:w-10" style={{ background: ac }} />
                    <p className="font-sans text-[13px] text-white/45 font-light leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          6. TRUST / PROCESS — cream, cards like Karr page
      ════════════════════════════════════════════════════ */}
      <section className="bg-cream py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
            >
              <span className="font-sans text-secondary font-bold tracking-[0.55em] uppercase text-[10px] mb-4 block">
                Why Trust KARRCHOLAI
              </span>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] font-semibold text-dark leading-[1.1] tracking-tight">
                Engineering Expertise<br />
                <em className="not-italic text-secondary">You Can Trust.</em>
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="font-sans text-dark/55 text-[14px] font-light leading-relaxed max-w-[36ch] lg:text-right"
            >
              Three non-negotiable principles that guide every project we take on.
            </motion.p>
          </div>

          {/* Stat cards — same as Karr estimation cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { stat: '12+',  label: 'Years on Site',          desc: 'Practical Tamil Nadu construction — local materials, contractors, soil conditions.' },
              { stat: '200+', label: 'Projects Delivered',     desc: 'Homes across Karur, Chennai, Coimbatore, Madurai, Trichy and Erode.' },
              { stat: '1',    label: 'Contract, No Surprises', desc: 'Every contractor, material and milestone under one accountable agreement.' },
              { stat: '4',    label: 'CHOLAI Solutions',       desc: 'Landscape, rainwater, solar and traditional materials — all at design stage.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.09 }}
                className="group bg-white rounded-2xl p-6 md:p-8 border border-dark/[0.06] hover:border-secondary/30 hover:shadow-xl transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-secondary to-secondary/40 group-hover:w-full transition-all duration-700 ease-out" />
                <p className="font-sans text-[clamp(2rem,3.5vw,2.8rem)] font-bold text-dark leading-none mb-2">{item.stat}</p>
                <p className="font-sans text-[10px] font-bold text-secondary tracking-[0.25em] uppercase mb-3">{item.label}</p>
                <p className="font-sans text-[12px] text-dark/45 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Philosophy cards — same as About Core Philosophy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { num: '01', title: 'Structured Planning',     desc: 'Every successful project begins with thorough pre-construction planning — drawings, budgets and timelines reviewed before work begins.' },
              { num: '02', title: 'Stage-wise Quality',      desc: 'Work is checked against specifications at each critical stage — foundation, structure, MEP, finishing and handover.' },
              { num: '03', title: 'Transparent Cost',        desc: 'Detailed cost breakdowns and proactive updates on any variations. Our clients always know where their investment is going.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group bg-white rounded-2xl p-8 border border-dark/[0.06] hover:border-secondary/30 hover:shadow-xl transition-all duration-500 overflow-hidden relative"
              >
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-secondary to-secondary/40 group-hover:w-full transition-all duration-700 ease-out" />
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-secondary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary transition-colors duration-300">
                      <span className="font-sans text-[11px] font-bold text-secondary group-hover:text-white transition-colors duration-300">{item.num}</span>
                    </div>
                  </div>
                  <h4 className="font-sans text-[15px] font-bold text-dark mb-3 group-hover:text-secondary transition-colors duration-300">{item.title}</h4>
                  <p className="font-sans text-[13px] text-dark/55 font-light leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          7. FINAL CTA — dark, editorial like Karr
      ════════════════════════════════════════════════════ */}
      <section className="bg-dark py-24 md:py-36 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="absolute top-0 left-1/3 w-[500px] h-[300px] rounded-full blur-[140px] opacity-[0.07] bg-secondary pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full blur-[120px] opacity-[0.05] bg-primary pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-14">
            <div>
              <motion.span
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-sans text-secondary font-bold tracking-[0.55em] uppercase text-[10px] mb-6 block"
              >
                Ready to Begin?
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="font-serif text-[clamp(2.8rem,7vw,6.5rem)] font-semibold text-white leading-[1.05] tracking-tight"
              >
                Let's build<br />
                <em className="not-italic text-secondary">something</em><br />
                worth living in.
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.22 }}
              className="flex flex-col gap-5 lg:items-end"
            >
              <p className="font-sans text-white/45 text-[14px] font-light leading-relaxed max-w-[36ch] lg:text-right">
                KARRCHOLAI — Experience-led Project Management for your home.
                One team, one contract, from first conversation to key handover.
              </p>
              <div className="flex gap-3 flex-wrap lg:justify-end">
                <Link to="/contact"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-secondary hover:bg-[#a34e30] text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-300 hover:-translate-y-0.5 shadow-xl shadow-secondary/25"
                >
                  Start Your Project <FiArrowRight size={12} />
                </Link>
                <Link to="/projects"
                  className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 border border-white/20 text-white font-sans text-[10px] font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-300 hover:bg-white hover:text-dark"
                >
                  View Our Work
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          8. FAQ
      ════════════════════════════════════════════════════ */}
      <div className="bg-[#f8f6f3]">
        <FAQSection
          dark={false}
          accent="#B85C38"
          subtitle="Common Questions"
          title="Everything You Need to Know"
          faqs={[
            { q: 'What is the difference between KARR and CHOLAI?', a: 'KARR is the construction and project management layer — everything from planning through to key handover. CHOLAI is the better-living layer — landscape, rainwater harvesting, solar energy and traditional flooring. Both are coordinated together so these elements are planned from the start, not added as afterthoughts.' },
            { q: 'What is PMC in construction and why do I need it?', a: 'PMC stands for Project Management Consultancy. We act as your on-site representative — managing contractors, budgets, timelines, material procurement, workmanship inspections and documentation. It means you have an experienced person looking after your project at every stage.' },
            { q: 'What is the difference between PMC and Turnkey?', a: 'With PMC, we manage and supervise your project as a consultant — coordinating professionals you have appointed. With Turnkey, we take responsibility for the complete construction journey — coordinating everything from design and procurement through execution and handover. Both include CHOLAI solutions.' },
            { q: 'Are CHOLAI solutions like solar and rainwater harvesting extra cost?', a: 'CHOLAI solutions are planned as part of the project at design stage — this means they are coordinated efficiently without the premium of retrofitting. Whether selected elements become part of the contract depends on your priorities and budget, which we discuss at the start.' },
            { q: 'Do you offer Vastu-compliant construction in Tamil Nadu?', a: 'Yes. Every residential project is reviewed against Vastu Shastra and Manaiyadi Sastram — auspicious orientations, door placements and room proportions planned alongside modern structural engineering.' },
            { q: 'Which areas of Tamil Nadu do you serve?', a: 'We serve Karur, Chennai, Coimbatore, Madurai, Trichy, Erode and surrounding areas across Tamil Nadu.' },
            { q: 'How long does a turnkey home construction take?', a: 'A standard independent house typically takes 10–16 months from groundbreaking to handover. We provide a detailed milestone timeline at the start of every project.' },
          ]}
        />
      </div>

      <UnifiedFooter />
    </div>
  )
}

// ─── Parallax hero bg (needs its own scope for hooks) ────────────────────────
function HeroBg() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <img src={imgHero} alt="" className="w-full h-full object-cover object-center" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/40 to-dark/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-transparent to-dark" />
    </div>
  )
}
