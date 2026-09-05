import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiArrowRight, FiPhone, FiChevronDown, FiCheck,
  FiMonitor, FiMapPin, FiTruck
} from 'react-icons/fi'
import { FaLeaf, FaCloudRain, FaSun, FaRecycle } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import FAQSection from '../components/FAQSection'
import { Helmet } from 'react-helmet-async'

import imgHero      from '../../assets/pexels-kawserhamid-176342.jpg'
import imgBuild     from '../../assets/Residential_construction.jpg'
import imgManage    from '../../assets/pmc.jpeg'
import imgComplete  from '../../assets/renovation.jpg.jpeg'
import imgSolar     from '../../assets/solar panel.jpg.jpeg'
import imgRain      from '../../assets/rainwater.jpg.jpeg'
import imgLand      from '../../assets/lancape.jpg.jpeg'
import imgFloor     from '../../assets/red-floor.jpg'
import imgConstruct from '../../assets/construction.jpg'

// ─── Shared fade-up variant ───────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: 'easeOut' },
}

// ─── Hero parallax bg ─────────────────────────────────────────────────────────
function HeroBg() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <img src={imgHero} alt="" className="w-full h-full object-cover object-center" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/60 via-[#1a1a1a]/30 to-[#1a1a1a]/85" />
    </div>
  )
}

// ─── Dark accordion (white text on dark bg) ───────────────────────────────────
function DarkAccordion({ steps }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="divide-y divide-white/[0.07]">
      {steps.map((s, i) => {
        const active = open === i
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(active ? null : i)}
              className="w-full flex items-center gap-4 py-4 text-left cursor-pointer select-none"
            >
              <span className={`text-[9px] font-black tracking-widest flex-shrink-0 w-8 transition-colors duration-200 ${active ? 'text-[#B85C38]' : 'text-white/25'}`}>
                {s.n}
              </span>
              <span className={`flex-1 text-[13px] font-bold transition-colors duration-200 ${active ? 'text-white' : 'text-white/60'}`}>
                {s.t}
              </span>
              <FiChevronDown
                size={13}
                className={`flex-shrink-0 transition-all duration-200 ${active ? 'text-[#B85C38]' : 'text-white/25'}`}
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
                  <p className="text-[13px] font-light text-white/70 leading-relaxed pb-4 pl-12 pr-6">{s.b}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

// ─── Light accordion (dark text on cream bg) ──────────────────────────────────
function LightAccordion({ steps }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="divide-y divide-[#1a1a1a]/[0.07]">
      {steps.map((s, i) => {
        const active = open === i
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(active ? null : i)}
              className="w-full flex items-center gap-4 py-4 text-left cursor-pointer select-none"
            >
              <span className={`text-[9px] font-black tracking-widest flex-shrink-0 w-8 transition-colors duration-200 ${active ? 'text-[#B85C38]' : 'text-[#1a1a1a]/25'}`}>
                {s.n}
              </span>
              <span className={`flex-1 text-[13px] font-bold transition-colors duration-200 ${active ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/60'}`}>
                {s.t}
              </span>
              <FiChevronDown
                size={13}
                className={`flex-shrink-0 transition-all duration-200 ${active ? 'text-[#B85C38]' : 'text-[#1a1a1a]/25'}`}
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
                  <p className="text-[13px] font-light text-[#1a1a1a]/70 leading-relaxed pb-4 pl-12 pr-6">{s.b}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 'build-detail',
    num: '01',
    label: 'BUILD MY HOME',
    title: 'I have a plot. I want to build my house.',
    headline: 'Complete Construction Execution',
    sub: 'From Start to Handover',
    desc: 'Planning, coordination and complete construction execution for your new home — from the initial groundwork to finishing and handover.',
    img: imgBuild,
    includes: ['Construction execution', 'Contractor coordination', 'Site supervision', 'Quality monitoring', 'Material coordination', 'Finishing works', 'Handover'],
    cta: 'Explore Build My Home',
    href: 'build-detail',
  },
  {
    id: 'manage-detail',
    num: '02',
    label: 'MANAGE MY HOME',
    title: 'I am building my house. I need someone to professionally manage it.',
    headline: 'Project Management Consultancy',
    sub: 'For Your Construction',
    desc: 'You own the project. We bring professional planning, coordination and site management to keep your home construction organised, controlled and on track.',
    img: imgManage,
    includes: ['Project planning', 'Contractor coordination', 'Site supervision', 'Quality monitoring', 'Progress tracking', 'Cost monitoring', 'Material coordination', 'Client reporting'],
    cta: 'Explore Manage My Home',
    href: 'manage-detail',
  },
  {
    id: 'complete-detail',
    num: '03',
    label: 'COMPLETE MY HOME',
    title: 'My house is incomplete. I want to finish it and make it sustainable.',
    headline: 'Complete Your Incomplete Home',
    sub: 'Improve It for Better Living',
    desc: 'Already started but unable to complete? We assess existing work, identify what is required and complete the remaining construction while introducing sustainable features.',
    img: imgComplete,
    includes: ['Assessment of existing construction', 'Remaining construction works', 'Repair / alteration works', 'Waterproofing', 'Landscape', 'Rainwater harvesting', 'Solar', 'Waste-management solutions'],
    cta: 'Explore Complete My Home',
    href: 'complete-detail',
  },
]

const BUILD_COST_TABLE = [
  { item: 'Civil & structural works', ok: true },
  { item: 'Masonry & plastering',     ok: true },
  { item: 'Flooring',                 ok: true },
  { item: 'Doors & windows',          ok: true },
  { item: 'Electrical',               ok: true },
  { item: 'Plumbing',                 ok: true },
  { item: 'Painting',                 ok: true },
  { item: 'Basic sanitary fixtures',  ok: true },
  { item: 'Other specifications',     ok: false, note: 'As agreed' },
]

const BUILD_STEPS = [
  { n: '01', t: 'Requirement & Planning',             b: 'We understand your lifestyle, budget, site conditions and expectations — establishing a practical direction before any work begins.' },
  { n: '02', t: 'Design & Technical Coordination',    b: 'We coordinate with architects, structural consultants and other professionals to align drawings and specifications with site execution.' },
  { n: '03', t: 'Estimation & Material Planning',     b: 'We review quantities and material needs to support better cost awareness, planned procurement and reduced material wastage.' },
  { n: '04', t: 'Construction Execution',             b: 'From foundation and structural work to masonry, plastering and other major construction activities — executed in the right sequence.' },
  { n: '05', t: 'Electrical & Plumbing Coordination', b: 'We coordinate MEP services with construction activities to ensure proper integration at each required stage.' },
  { n: '06', t: 'Finishing Works',                    b: 'Flooring, painting, doors, windows, sanitary fixtures and other finishing activities coordinated to approved requirements.' },
  { n: '07', t: 'CHOLAI — Better Living',             b: 'Landscape, rainwater harvesting, traditional flooring and solar energy — considered as part of the project, not afterthoughts.' },
  { n: '08', t: 'Final Inspection & Handover',        b: 'We coordinate final inspections, identify pending corrections, and support the completion process through to handover.' },
]

const PMC_STEPS = [
  { n: '01', t: 'Understand Your Requirements',  b: 'We begin by understanding your lifestyle, priorities, budget, site conditions and expectations.' },
  { n: '02', t: 'Plan Before Execution',         b: 'We review drawings, specifications, quantities and construction sequence to identify potential issues before they reach site.' },
  { n: '03', t: 'Coordinate the Work',           b: 'We coordinate architects, consultants, contractors, suppliers and specialist teams — maintaining the right sequence.' },
  { n: '04', t: 'Monitor Site Execution',        b: 'Regular observation of workmanship, dimensions, materials and construction practices at important stages.' },
  { n: '05', t: 'Manage Materials & Wastage',    b: 'We monitor material requirements, usage and wastage to support better resource utilisation and cost awareness.' },
  { n: '06', t: 'Monitor Quality',               b: 'Stage-wise checking and consistent attention to workmanship — identifying and addressing issues during construction, not after.' },
  { n: '07', t: 'Track Progress & Decisions',    b: 'We keep you informed about important activities, requirements, issues and decisions so the project progresses with clarity.' },
  { n: '08', t: 'Support Through Handover',      b: 'Our involvement continues through finishing stages, final inspections and corrections — bringing the project to an organised handover.' },
]

const COMPLETE_STEPS = [
  { step: '01', label: 'Site Assessment' },
  { step: '02', label: 'Existing Work Evaluation' },
  { step: '03', label: 'Remaining Work Calculation' },
  { step: '04', label: 'Sustainable Feature Planning' },
  { step: '05', label: 'Detailed Scope-Based Estimate' },
]

// ─── Main export ──────────────────────────────────────────────────────────────
export default function Services() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <div ref={containerRef} className="bg-[#fdfbf7] min-h-screen overflow-x-hidden text-[#1a1a1a] selection:bg-[#B85C38] selection:text-white">
      <Helmet>
        <title>Services — Build, Manage & Complete Your Home | KARRCHOLAI</title>
        <meta name="description" content="KARRCHOLAI offers three home services: Build My Home (turnkey construction), Manage My Home (PMC), and Complete My Home (renovation + sustainability). Tamil Nadu." />
        <link rel="canonical" href="https://karrcholai.com/services" />
      </Helmet>

      {/* Scroll progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#B85C38] z-[100] origin-left" style={{ scaleX }} />

      <Navbar />

      {/* ════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════ */}
      <section className="relative w-full flex items-center overflow-hidden bg-[#1a1a1a]" style={{ minHeight: '100svh' }}>
        <HeroBg />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-24 w-full">

          <motion.span
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-6 block"
          >
            KARRCHOLAI — Services
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="font-black text-[clamp(3.2rem,8vw,7.5rem)] text-white leading-none tracking-tighter mb-6 max-w-4xl"
          >
            Your Home.<br />
            <span className="text-white/50">Your Stage.</span><br />
            Our <span className="text-[#B85C38]">Expertise.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/70 text-base md:text-lg font-light leading-relaxed max-w-xl mb-12"
          >
            Whether you are starting from scratch, currently building, or need to finish what&apos;s
            already been started — KARRCHOLAI has a service built for your exact situation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-wrap gap-3 mb-20"
          >
            {[
              { id: 'build-detail',    label: '01 — Build My Home' },
              { id: 'manage-detail',   label: '02 — Manage My Home' },
              { id: 'complete-detail', label: '03 — Complete My Home' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/25 text-white text-[11px] font-bold tracking-wider uppercase rounded-full transition-all duration-300 hover:bg-[#B85C38] hover:border-[#B85C38] hover:-translate-y-0.5 cursor-pointer"
              >
                {s.label}
                <FiArrowRight size={11} />
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.8 }}
            className="flex gap-10 md:gap-16 flex-wrap pt-8 border-t border-white/10 w-full max-w-2xl"
          >
            {[['12+', 'Years on Site'], ['200+', 'Projects'], ['3', 'Services'], ['4', 'CHOLAI Solutions']].map(([v, l]) => (
              <div key={l}>
                <p className="font-black text-[clamp(1.8rem,3.5vw,2.8rem)] text-white leading-none tracking-tighter">{v}</p>
                <p className="text-[9px] text-white/50 mt-1.5 uppercase tracking-wider">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-[1px] h-14 bg-gradient-to-b from-[#B85C38] to-transparent"
          />
        </motion.div>
      </section>


      {/* ════════════════════════════════════════════
          2. THREE SERVICE CARDS — cream bg
      ════════════════════════════════════════════ */}
      <section className="bg-[#fdfbf7] py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
            <motion.div {...fadeUp} className="max-w-xl">
              <span className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-4 block">Where Are You?</span>
              <h2 className="font-black text-4xl md:text-6xl leading-none tracking-tighter">
                A service for<br />
                <span className="text-[#1a1a1a]/40">your exact stage.</span>
              </h2>
            </motion.div>
            <motion.p {...fadeUp} className="text-[#1a1a1a]/70 text-base max-w-xs font-light border-l-2 border-[#B85C38]/40 pl-6">
              Tell us where you stand. We have a structured, professional service for each stage of your home journey.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}
                className="group bg-white rounded-[28px] border border-[#1a1a1a]/5 hover:border-[#B85C38]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img src={svc.img} alt={svc.headline}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/75 via-[#1a1a1a]/20 to-transparent" />
                  <div className="absolute top-4 left-5">
                    <span className="text-[9px] font-black tracking-wider uppercase text-[#B85C38] bg-[#1a1a1a]/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#B85C38]/40">
                      {svc.num}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-5 right-5">
                    <p className="text-[9px] font-black tracking-wider uppercase text-[#B85C38] mb-1">{svc.label}</p>
                    <h3 className="font-black text-white text-lg md:text-xl leading-tight tracking-tight">{svc.headline}</h3>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-6">
                  <p className="text-[#1a1a1a]/60 text-[12px] italic leading-relaxed mb-4 pl-4 border-l-2 border-[#B85C38]/25">
                    &ldquo;{svc.title}&rdquo;
                  </p>
                  <p className="text-[#1a1a1a]/70 text-[13px] font-light leading-relaxed mb-5">{svc.desc}</p>

                  <div className="mb-5">
                    <p className="text-[9px] font-black tracking-wider uppercase text-[#B85C38] mb-3">Includes</p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {svc.includes.slice(0, 6).map((inc, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <FiCheck size={10} className="text-[#B85C38] flex-shrink-0" />
                          <span className="text-[12px] text-[#1a1a1a]/70 font-light">{inc}</span>
                        </div>
                      ))}
                      {svc.includes.length > 6 && (
                        <span className="text-[11px] text-[#1a1a1a]/40 font-light pl-4">+ {svc.includes.length - 6} more</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-[#1a1a1a]/6">
                    <button
                      onClick={() => document.getElementById(svc.href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                      className="inline-flex items-center gap-2 text-[11px] font-black tracking-wider uppercase text-[#B85C38] cursor-pointer hover:gap-3 transition-all duration-300"
                    >
                      {svc.cta} <FiArrowRight size={11} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          3. BUILD MY HOME — dark section
      ════════════════════════════════════════════ */}
      <section id="build-detail" className="bg-[#1a1a1a] overflow-hidden">

        {/* Image header — FIX: opacity-70 + lighter gradient */}
        <div className="relative h-[60vh] overflow-hidden">
          <img src={imgBuild} alt="Build My Home"
            className="absolute inset-0 w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/80 via-[#1a1a1a]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
          <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-14">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-3"
            >
              01 — BUILD MY HOME
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="font-black text-[clamp(2.8rem,6vw,6rem)] text-white leading-none tracking-tighter"
            >
              Complete<br />
              <span className="text-white/40">Construction.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-white/70 text-sm font-light mt-3 max-w-md"
            >
              I have a plot. I want to build my house.
            </motion.p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

            {/* LEFT — Includes + CTAs */}
            <motion.div {...fadeUp}>
              <p className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-4">What&apos;s Included</p>
              <h3 className="font-black text-3xl md:text-4xl text-white leading-tight tracking-tighter mb-5">
                From Groundwork<br />
                <span className="text-white/35">to Handover.</span>
              </h3>
              <p className="text-white/70 text-base font-light leading-relaxed mb-8">
                Planning, coordination and complete construction execution — every activity, every team, every stage managed under one accountable contract.
              </p>

              <div className="mb-10">
                {SERVICES[0].includes.map((inc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 py-3 border-b border-white/[0.06] last:border-0"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#B85C38]/20 flex items-center justify-center flex-shrink-0">
                      <FiCheck size={11} className="text-[#B85C38]" />
                    </div>
                    <span className="text-[14px] text-white/80 font-bold">{inc}</span>
                  </motion.div>
                ))}
              </div>

              {/* FIX: Consistent buttons, no arbitrary tracking, no whitespace-nowrap */}
              <div className="flex flex-wrap gap-4 items-center mt-8">
                <Link to="/contact"
                  className="px-10 py-5 bg-[#B85C38] text-white text-sm font-bold tracking-wider uppercase hover:bg-[#a34e30] transition-all duration-500 rounded-full"
                >
                  Start Building
                </Link>
                <a href="tel:+916385062939"
                  className="px-10 py-5 border border-white/30 text-white text-sm font-bold tracking-wider uppercase hover:bg-white/10 transition-all duration-300 rounded-full"
                >
                  Call Now
                </a>
              </div>
            </motion.div>

            {/* RIGHT — Process + Pricing */}
            <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.15 }}>
              <p className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-4">Construction Process</p>
              <h3 className="font-black text-3xl md:text-4xl text-white leading-tight tracking-tighter mb-8">
                8 Stages.<br />
                <span className="text-white/35">Every Step Covered.</span>
              </h3>

              <div className="bg-white/5 rounded-[24px] border border-white/10 px-6 py-2 mb-8">
                <DarkAccordion steps={BUILD_STEPS} />
              </div>

              {/* Pricing card */}
              <div className="bg-white/5 rounded-[24px] border border-white/10 p-6 md:p-8">
                <p className="text-[#B85C38] font-black tracking-wider uppercase text-[10px] mb-3">Indicative Cost</p>
                <p className="font-black text-3xl md:text-4xl text-white leading-none tracking-tighter mb-1">
                  &#8377; ______ / sq.ft.*
                </p>
                <p className="text-white/50 text-[12px] mb-7">*Based on specifications, built-up area and site conditions.</p>

                <div className="divide-y divide-white/[0.06] mb-6">
                  {BUILD_COST_TABLE.map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-3">
                      <span className="text-[13px] text-white/70 font-light">{row.item}</span>
                      {row.ok
                        ? <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400"><FiCheck size={10} /> Included</span>
                        : <span className="text-[11px] text-white/50 italic">{row.note}</span>
                      }
                    </div>
                  ))}
                </div>

                <p className="text-[12px] text-white/60 font-light leading-relaxed mb-6">
                  Final construction cost is prepared based on your approved design, specifications, built-up area and site conditions.
                </p>

                <Link to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 border border-white/25 text-white text-sm font-bold tracking-wider uppercase rounded-full transition-all duration-300 hover:bg-[#B85C38] hover:border-[#B85C38]"
                >
                  Request Detailed Estimate <FiArrowRight size={11} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          4. MANAGE MY HOME — cream section
      ════════════════════════════════════════════ */}
      <section id="manage-detail" className="bg-[#fdfbf7] overflow-hidden">

        {/* Image header — FIX: opacity-70 + lighter gradient */}
        <div className="relative h-[60vh] overflow-hidden">
          <img src={imgManage} alt="Manage My Home"
            className="absolute inset-0 w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fdfbf7]/80 via-[#fdfbf7]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] via-transparent to-transparent" />
          <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-14">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-3"
            >
              02 — MANAGE MY HOME
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="font-black text-[clamp(2.8rem,6vw,6rem)] text-[#1a1a1a] leading-none tracking-tighter"
            >
              Project Management<br />
              <span className="text-[#1a1a1a]/30">Consultancy.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-[#1a1a1a]/70 text-sm font-light mt-3 max-w-md"
            >
              I am building my house. I need someone to professionally manage it.
            </motion.p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

            {/* LEFT — Includes + CTAs */}
            <motion.div {...fadeUp}>
              <p className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-4">What We Manage</p>
              <h3 className="font-black text-3xl md:text-4xl text-[#1a1a1a] leading-tight tracking-tighter mb-5">
                You own it.<br />
                <span className="text-[#1a1a1a]/30">We run it.</span>
              </h3>
              <p className="text-[#1a1a1a]/70 text-base font-light leading-relaxed mb-8">
                Professional planning, coordination and site management to keep your home construction organised, controlled and on track — while you stay informed.
              </p>

              <div className="mb-8">
                {SERVICES[1].includes.map((inc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 py-3 border-b border-[#1a1a1a]/[0.07] last:border-0"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#B85C38]/15 flex items-center justify-center flex-shrink-0">
                      <FiCheck size={11} className="text-[#B85C38]" />
                    </div>
                    <span className="text-[14px] text-[#1a1a1a]/80 font-bold">{inc}</span>
                  </motion.div>
                ))}
              </div>

              {/* Important callout */}
              <div className="p-5 bg-[#B85C38]/8 rounded-[20px] border-l-4 border-[#B85C38] mb-8">
                <p className="font-black text-[10px] uppercase tracking-wider text-[#B85C38] mb-2">Important</p>
                <p className="text-[13px] text-[#1a1a1a]/70 font-light leading-relaxed">
                  <strong className="font-black text-[#1a1a1a]">Construction cost ≠ PMC fee.</strong>{' '}
                  The PMC fee covers professional planning, coordination, site supervision, quality monitoring, progress tracking and reporting — separate from construction costs.
                </p>
              </div>

              {/* FIX: Consistent buttons */}
              <div className="flex flex-wrap gap-4 items-center mt-8">
                <Link to="/contact"
                  className="px-10 py-5 bg-[#B85C38] text-white text-sm font-bold tracking-wider uppercase hover:bg-[#a34e30] transition-all duration-500 rounded-full"
                >
                  Discuss PMC
                </Link>
                <a href="tel:+916385062939"
                  className="px-10 py-5 border border-[#1a1a1a]/30 text-[#1a1a1a] text-sm font-bold tracking-wider uppercase hover:border-[#1a1a1a]/60 transition-all duration-300 rounded-full"
                >
                  Call Now
                </a>
              </div>
            </motion.div>

            {/* RIGHT — PMC process + Fee */}
            <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.15 }}>
              <p className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-4">PMC Process</p>
              <h3 className="font-black text-3xl md:text-4xl text-[#1a1a1a] leading-tight tracking-tighter mb-8">
                8 Stages.<br />
                <span className="text-[#1a1a1a]/30">Complete Oversight.</span>
              </h3>

              <div className="bg-white rounded-[24px] border border-[#1a1a1a]/8 shadow-sm px-6 py-2 mb-8">
                <LightAccordion steps={PMC_STEPS} />
              </div>

              {/* Fee structure */}
              <div className="bg-white rounded-[24px] border border-[#1a1a1a]/8 shadow-sm p-6 md:p-8">
                <p className="text-[#B85C38] font-black tracking-wider uppercase text-[10px] mb-5">PMC Fee Structure</p>

                <div className="space-y-3 mb-6">
                  {[
                    { label: 'Option A', desc: 'Percentage of Project Cost', value: '___ %', sub: 'of total project cost' },
                    { label: 'Option B', desc: 'Per Square Foot',            value: '&#8377; ___', sub: 'per sq.ft.' },
                  ].map((opt, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[#fdfbf7] rounded-[16px] border border-[#1a1a1a]/6 hover:border-[#B85C38]/25 transition-colors duration-300">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-wider text-[#B85C38] mb-0.5">{opt.label}</p>
                        <p className="font-bold text-[14px] text-[#1a1a1a]">{opt.desc}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-black text-[1.4rem] text-[#1a1a1a] leading-none" dangerouslySetInnerHTML={{ __html: opt.value }} />
                        <p className="text-[10px] text-[#1a1a1a]/50 mt-0.5">{opt.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-[12px] text-[#1a1a1a]/70 font-light leading-relaxed mb-5">
                  The PMC fee covers professional planning, coordination, site supervision, quality monitoring, progress tracking and client reporting.
                </p>

                <Link to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-[#1a1a1a] text-white text-sm font-bold tracking-wider uppercase rounded-full transition-all duration-300 hover:bg-[#B85C38]"
                >
                  Get a PMC Quote <FiArrowRight size={11} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          5. COMPLETE MY HOME — dark section
      ════════════════════════════════════════════ */}
      <section id="complete-detail" className="bg-[#1a1a1a] overflow-hidden">

        {/* Image header — FIX: opacity-70 + lighter gradient */}
        <div className="relative h-[60vh] overflow-hidden">
          <img src={imgConstruct} alt="Complete My Home"
            className="absolute inset-0 w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/80 via-[#1a1a1a]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
          <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-14">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-3"
            >
              03 — COMPLETE MY HOME
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="font-black text-[clamp(2.8rem,6vw,6rem)] text-white leading-none tracking-tighter"
            >
              Complete. <span className="text-[#B85C38]">Improve.</span><br />
              <span className="text-white/40">Live Better.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-white/70 text-sm font-light mt-3 max-w-md"
            >
              My house is incomplete. I want to finish it and make it more sustainable.
            </motion.p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

            {/* LEFT — Scope + sustainable */}
            <motion.div {...fadeUp}>
              <p className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-4">Scope of Work</p>
              <h3 className="font-black text-3xl md:text-4xl text-white leading-tight tracking-tighter mb-5">
                Every incomplete<br />
                <span className="text-white/35">home is different.</span>
              </h3>
              <p className="text-white/70 text-base font-light leading-relaxed mb-8">
                We assess the existing construction, identify what is required and help complete the remaining work — while introducing practical sustainable features.
              </p>

              <div className="mb-8">
                {SERVICES[2].includes.map((inc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 py-3 border-b border-white/[0.06] last:border-0"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#B85C38]/20 flex items-center justify-center flex-shrink-0">
                      <FiCheck size={11} className="text-[#B85C38]" />
                    </div>
                    <span className="text-[14px] text-white/80 font-bold">{inc}</span>
                  </motion.div>
                ))}
              </div>

              {/* FIX: Sustainable additions — simple horizontal pill row, not ugly small boxes */}
              <div className="bg-white/5 rounded-[24px] border border-white/10 p-5 mb-8">
                <p className="text-[9px] font-black uppercase tracking-wider text-white/50 mb-4">Sustainable Additions</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { Icon: FaLeaf,      label: 'Landscape',    color: '#22C55E' },
                    { Icon: FaCloudRain, label: 'Rainwater',    color: '#60A5FA' },
                    { Icon: FaSun,       label: 'Solar',        color: '#FBBF24' },
                    { Icon: FaRecycle,   label: 'Waste Mgmt',   color: '#F97316' },
                  ].map(({ Icon, label, color }, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center flex flex-col items-center gap-2">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto" style={{ background: `${color}25`, color }}>
                        <Icon size={16} />
                      </div>
                      <p className="font-bold text-[12px] text-white/80 leading-tight">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FIX: Consistent buttons, mt-8 not auto-margin */}
              <div className="flex flex-wrap gap-4 items-center mt-8">
                <Link to="/contact"
                  className="px-10 py-5 bg-[#B85C38] text-white text-sm font-bold tracking-wider uppercase hover:bg-[#a34e30] transition-all duration-500 rounded-full"
                >
                  Request Assessment
                </Link>
                <a href="tel:+916385062939"
                  className="px-10 py-5 border border-white/30 text-white text-sm font-bold tracking-wider uppercase hover:bg-white/10 transition-all duration-300 rounded-full"
                >
                  Call Now
                </a>
              </div>
            </motion.div>

            {/* RIGHT — Assessment process + pricing */}
            <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.15 }}>
              <p className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-4">Assessment Process</p>
              <h3 className="font-black text-3xl md:text-4xl text-white leading-tight tracking-tighter mb-10">
                We see it first.<br />
                <span className="text-white/35">Then we plan.</span>
              </h3>

              <div className="mb-10">
                {COMPLETE_STEPS.map(({ step, label }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[#B85C38]/15 border border-[#B85C38]/35 flex items-center justify-center">
                        <span className="text-[10px] font-black text-[#B85C38]">{step}</span>
                      </div>
                      {i < COMPLETE_STEPS.length - 1 && (
                        <div className="w-[1px] h-8 bg-white/10 mt-1" />
                      )}
                    </div>
                    <div className="pt-2.5 pb-2">
                      <p className="font-bold text-[14px] text-white/80">{label}</p>
                      {i === COMPLETE_STEPS.length - 1 && (
                        <p className="text-[11px] text-[#B85C38] font-black mt-1">&#8595; Scope-based estimate prepared</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white/5 rounded-[24px] border border-white/10 p-6 mb-6">
                <p className="text-[#B85C38] font-black tracking-wider uppercase text-[10px] mb-3">Pricing Model</p>
                <p className="text-[14px] text-white/70 font-light leading-relaxed">
                  Every incomplete home has a different condition, remaining scope and requirement.
                  We assess first and prepare a{' '}
                  <strong className="text-white font-black">scope-based estimate</strong> — not a generic rate.
                </p>
              </div>

              <Link to="/contact"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 border border-white/25 text-white text-sm font-bold tracking-wider uppercase rounded-full transition-all duration-300 hover:bg-[#B85C38] hover:border-[#B85C38]"
              >
                Request Site Assessment <FiArrowRight size={11} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          6. CONSULTATION — white bg
      ════════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
            <motion.div {...fadeUp} className="max-w-xl">
              <span className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-4 block">Not Sure Where to Start?</span>
              <h2 className="font-black text-4xl md:text-6xl leading-none tracking-tighter">
                Professional Consultation<br />
                <span className="text-[#1a1a1a]/40">from &#8377;1,000</span>
              </h2>
            </motion.div>
            <motion.p {...fadeUp} className="text-[#1a1a1a]/70 text-base max-w-xs font-light border-l-2 border-[#B85C38]/40 pl-6">
              Get an experienced construction professional&apos;s opinion before you make your next decision.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

            {/* Online */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="group p-8 bg-[#fdfbf7] rounded-[28px] border border-[#1a1a1a]/5 hover:border-[#B85C38]/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col"
            >
              <div className="w-14 h-14 rounded-full bg-white border border-[#1a1a1a]/8 flex items-center justify-center mb-6 group-hover:bg-[#B85C38] group-hover:border-transparent transition-all duration-500">
                <FiMonitor size={20} className="text-[#1a1a1a]/40 group-hover:text-white transition-colors duration-500" />
              </div>
              <p className="text-[#B85C38] font-black tracking-wider uppercase text-[10px] mb-1">Online Consultation</p>
              <p className="font-black text-[2.2rem] text-[#1a1a1a] leading-none tracking-tighter mb-1">&#8377;1,000</p>
              <p className="text-[#1a1a1a]/50 text-[12px] mb-6">Up to 60 minutes</p>

              <div className="space-y-2.5 mb-8 flex-1">
                {['Construction planning', 'Construction cost advice', 'Contractor selection', 'Material selection', 'Quality concerns', 'Waterproofing', 'PMC requirements', 'Incomplete-house assessment'].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <FiCheck size={12} className="text-[#B85C38] flex-shrink-0 mt-0.5" />
                    <span className="text-[13px] text-[#1a1a1a]/70 font-light">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#1a1a1a] text-white text-sm font-bold tracking-wider uppercase rounded-full transition-all duration-300 hover:bg-[#B85C38] mt-auto"
              >
                Book Online — &#8377;1,000 <FiArrowRight size={10} />
              </Link>
            </motion.div>

            {/* Site Visit — featured dark */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative p-8 bg-[#1a1a1a] rounded-[28px] border border-white/[0.08] hover:border-[#B85C38]/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden flex flex-col"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_rgba(184,92,56,0.15),_transparent_60%)] pointer-events-none" />
              <div className="absolute top-5 right-5">
                <span className="text-[8px] font-black tracking-wider uppercase px-3 py-1.5 rounded-full bg-[#B85C38] text-white">Recommended</span>
              </div>
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:bg-[#B85C38] transition-colors duration-500">
                <FiMapPin size={20} className="text-white/60 group-hover:text-white transition-colors duration-500" />
              </div>
              <p className="text-[#B85C38] font-black tracking-wider uppercase text-[10px] mb-1">Site Visit</p>
              <p className="font-black text-[2.2rem] text-white leading-none tracking-tighter mb-1">&#8377;2,000</p>
              <p className="text-white/50 text-[12px] mb-4">Per visit + travel at actual cost</p>
              <p className="text-white/70 text-[13px] font-light leading-relaxed mb-6">
                See the problem. Understand the site. Recommend the solution.
              </p>

              <div className="space-y-2.5 mb-8 flex-1">
                {['Physical site inspection', 'Discussion with homeowner', 'Review of visible construction', 'Identification of major concerns', 'Practical recommendations', 'Discussion of possible next steps'].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <FiCheck size={12} className="text-[#B85C38] flex-shrink-0 mt-0.5" />
                    <span className="text-[13px] text-white/70 font-light">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/contact"
                className="relative z-10 w-full inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#B85C38] text-white text-sm font-bold tracking-wider uppercase rounded-full transition-all duration-300 hover:bg-[#a34e30] mt-auto"
              >
                Book Site Visit — &#8377;2,000 <FiArrowRight size={10} />
              </Link>
            </motion.div>

            {/* Travel */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="group p-8 bg-[#fdfbf7] rounded-[28px] border border-[#1a1a1a]/5 hover:border-[#B85C38]/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col"
            >
              <div className="w-14 h-14 rounded-full bg-white border border-[#1a1a1a]/8 flex items-center justify-center mb-6 group-hover:bg-[#B85C38] group-hover:border-transparent transition-all duration-500">
                <FiTruck size={20} className="text-[#1a1a1a]/40 group-hover:text-white transition-colors duration-500" />
              </div>
              <p className="font-black tracking-wider uppercase text-[10px] text-[#1a1a1a]/40 mb-1">Travel</p>
              <p className="font-black text-[2.2rem] text-[#1a1a1a] leading-none tracking-tighter mb-1">At Actual Cost</p>
              <p className="text-[#1a1a1a]/50 text-[12px] mb-6">Where applicable</p>

              <p className="text-[#1a1a1a]/70 text-[13px] font-light leading-relaxed mb-6 flex-1">
                Travel expenses at actual cost — applicable for locations outside the standard service area.
                Discussed and agreed before the visit.
              </p>

              <div className="p-4 bg-[#B85C38]/[0.08] rounded-[16px] border-l-4 border-[#B85C38] mt-auto">
                <p className="text-[12px] text-[#1a1a1a]/70 font-light leading-relaxed">
                  <strong className="font-black text-[#1a1a1a]">Service area:</strong> Karur, Chennai, Coimbatore, Madurai, Trichy, Erode and surrounding areas across Tamil Nadu.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 bg-[#fdfbf7] rounded-[20px] border border-[#1a1a1a]/6 text-center max-w-4xl mx-auto"
          >
            <p className="text-[9px] font-black uppercase tracking-wider text-[#1a1a1a]/40 mb-3">Important Note</p>
            <p className="text-[13px] text-[#1a1a1a]/70 font-light leading-relaxed">
              Consultation and site-visit fees cover professional consultation and preliminary assessment only.
              Detailed drawings, structural design, BOQ preparation, quantity surveying, detailed estimation,
              testing, approvals and project execution / PMC services are charged separately based on the agreed scope.
            </p>
          </motion.div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          7. CHOLAI — dark section with image cards
      ════════════════════════════════════════════ */}
      <section className="bg-[#1a1a1a] py-16 md:py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">

          <div className="mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
            <motion.div {...fadeUp}>
              <span className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-4 block">CHOLAI — Better Living</span>
              <h2 className="font-black text-4xl md:text-6xl text-white leading-none tracking-tighter">
                Beyond Construction.<br />
                <span className="text-white/35">A Home Worth Living In.</span>
              </h2>
            </motion.div>
            <motion.p {...fadeUp} className="text-white/70 text-base max-w-xs font-light border-l-2 border-[#B85C38]/40 pl-6">
              Integrated into every service — planned at design stage, not retrofitted after construction is complete.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { Icon: FaLeaf,      label: 'Landscape & Green Spaces',           img: imgLand,  desc: 'Planning outdoor areas that complement the home and create comfortable, usable green spaces.', color: '#22C55E' },
              { Icon: FaCloudRain, label: 'Rainwater & Water Conservation',     img: imgRain,  desc: 'Planning systems to collect and manage rainwater responsibly and support better water use.', color: '#60A5FA' },
              { Icon: FaSun,       label: 'Solar Energy Solutions',             img: imgSolar, desc: 'Planning suitable solar solutions to support energy efficiency and responsible energy use.', color: '#FBBF24' },
              { Icon: FaRecycle,   label: 'Traditional / Sustainable Materials', img: imgFloor, desc: 'Athangudi tiles, lime plaster, natural stone — cool, beautiful and rooted in Tamil culture.', color: '#F97316' },
            ].map(({ Icon, label, img, desc, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative rounded-[24px] overflow-hidden hover:-translate-y-1 transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={img} alt={label}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/30 to-transparent" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${color}30`, color }}>
                    <Icon size={16} />
                  </div>
                  <div className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                    style={{ background: color }} />
                </div>
                <div className="p-6 bg-white/[0.04] border border-white/[0.07] border-t-0 rounded-b-[24px]">
                  <h3 className="font-black text-[15px] text-white mb-2 tracking-tight">{label}</h3>
                  <p className="text-[13px] text-white/70 font-light leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          8. TRUST / STATS — cream bg
      ════════════════════════════════════════════ */}
      <section className="bg-[#fdfbf7] py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <motion.span {...fadeUp} className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-4 block">
              Why KARRCHOLAI
            </motion.span>
            <motion.h2 {...fadeUp} className="font-black text-4xl md:text-7xl leading-none tracking-tighter">
              Experience You<br />
              <span className="text-[#1a1a1a]/35">Can Trust.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {[
              { stat: '12+',  label: 'Years on Site',      desc: 'Practical Tamil Nadu construction — local materials, contractors, soil conditions.' },
              { stat: '200+', label: 'Projects Delivered',  desc: 'Homes across Karur, Chennai, Coimbatore, Madurai, Trichy and Erode.' },
              { stat: '3',    label: 'Home Services',       desc: 'Build, Manage or Complete — a service for your exact stage.' },
              { stat: '4',    label: 'CHOLAI Solutions',    desc: 'Landscape, rainwater, solar and traditional materials — at design stage.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.09 }}
                className="group p-6 md:p-8 bg-white rounded-[24px] border border-[#1a1a1a]/5 hover:border-[#B85C38]/40 hover:shadow-xl transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#B85C38] to-[#B85C38]/40 group-hover:w-full transition-all duration-700 ease-out" />
                <p className="font-black text-[clamp(2rem,3.5vw,2.8rem)] text-[#1a1a1a] leading-none tracking-tighter mb-2">{item.stat}</p>
                <p className="text-[10px] font-black text-[#B85C38] tracking-wider uppercase mb-3">{item.label}</p>
                <p className="text-[12px] text-[#1a1a1a]/70 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { num: '01', title: 'Structured Planning', desc: 'Every successful project begins with thorough pre-construction planning — drawings, budgets and timelines reviewed before work begins.' },
              { num: '02', title: 'Stage-wise Quality',  desc: 'Work is checked against specifications at each critical stage — foundation, structure, MEP, finishing and handover.' },
              { num: '03', title: 'Transparent Cost',    desc: 'Detailed cost breakdowns and proactive updates on any variations. Our clients always know where their investment is going.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group p-8 bg-white rounded-[24px] border border-[#1a1a1a]/5 hover:border-[#B85C38]/40 hover:shadow-xl transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#B85C38] to-[#B85C38]/40 group-hover:w-full transition-all duration-700 ease-out" />
                <div className="w-10 h-10 rounded-xl bg-[#B85C38]/10 flex items-center justify-center mb-5 group-hover:bg-[#B85C38] transition-colors duration-300">
                  <span className="font-black text-[11px] text-[#B85C38] group-hover:text-white transition-colors duration-300">{item.num}</span>
                </div>
                <h4 className="font-black text-[15px] text-[#1a1a1a] mb-3 group-hover:text-[#B85C38] transition-colors duration-300 tracking-tight">{item.title}</h4>
                <p className="text-[13px] text-[#1a1a1a]/70 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          9. FINAL CTA — green bg
      ════════════════════════════════════════════ */}
      <section className="bg-[#2D4B37] py-16 md:py-24 px-6 overflow-hidden relative">
        <div className="absolute inset-0 stone-texture opacity-10 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <span className="text-white/50 font-black tracking-widest uppercase text-[10px] mb-4 block">Ready to Begin?</span>
            <h2 className="font-black text-4xl md:text-7xl text-white leading-none tracking-tighter mb-6">
              Ready to begin<br />
              <span className="text-white/50">your project?</span>
            </h2>
            <p className="text-white/70 font-light text-base leading-relaxed max-w-md">
              KARRCHOLAI — Experience-led construction management for your home.
              One team, one contract, from first conversation to key handover.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.2 }} className="flex flex-col gap-4">
            <Link to="/contact"
              className="w-full py-5 bg-white text-[#1a1a1a] text-sm font-bold tracking-wider uppercase hover:bg-[#B85C38] hover:text-white transition-all duration-500 rounded-full text-center"
            >
              Start Your Project
            </Link>
            <Link to="/projects"
              className="w-full py-5 border-2 border-white/30 text-white text-sm font-bold tracking-wider uppercase hover:bg-white/10 transition-all duration-300 rounded-full text-center"
            >
              View Our Work
            </Link>
            <a href="tel:+916385062939"
              className="w-full py-5 bg-white/10 text-white text-sm font-bold tracking-wider uppercase hover:bg-white/20 transition-all duration-300 rounded-full text-center inline-flex items-center justify-center gap-2"
            >
              <FiPhone size={13} /> Call Now
            </a>
          </motion.div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          10. FAQ
      ════════════════════════════════════════════ */}
      <div className="bg-[#f8f6f3]">
        <FAQSection
          dark={false}
          accent="#B85C38"
          subtitle="Common Questions"
          title="Everything You Need to Know"
          faqs={[
            { q: 'What is the difference between Build, Manage and Complete My Home?', a: 'Build My Home is for those who have a plot and want full construction execution from start to handover. Manage My Home is for those already building who need a professional to plan, coordinate and supervise the project. Complete My Home is for incomplete homes that need remaining work finished, repairs, or sustainable improvements.' },
            { q: 'What does the Build My Home rate include?', a: 'The indicative rate covers civil and structural works, masonry, plastering, flooring, doors, windows, electrical, plumbing, painting and basic sanitary fixtures. Final cost is prepared based on your approved design, specifications, built-up area and site conditions.' },
            { q: 'Is the PMC fee separate from construction cost?', a: 'Yes. Construction cost and PMC fee are two separate things. The construction cost covers all material and labour. The PMC fee covers professional planning, coordination, site supervision, quality monitoring, progress tracking and reporting.' },
            { q: 'What does ₹1,000 / ₹2,000 consultation cover?', a: 'Consultation and site-visit fees cover professional consultation and preliminary assessment only. Detailed drawings, structural design, BOQ preparation, quantity surveying, detailed estimation, testing, approvals and project execution or PMC services are charged separately.' },
            { q: 'Are CHOLAI solutions included in all services?', a: 'CHOLAI solutions (landscape, rainwater harvesting, solar, traditional materials) are planned and coordinated as part of every service — at the right stage of your project, not retrofitted later. The specific solutions selected depend on your priorities and budget.' },
            { q: 'Which areas do you serve?', a: 'We serve Karur, Chennai, Coimbatore, Madurai, Trichy, Erode and surrounding areas across Tamil Nadu. Travel charges at actual cost apply for locations outside our standard service area.' },
            { q: 'How is the Complete My Home scope determined?', a: 'We first conduct a site assessment to evaluate the existing construction, identify remaining scope and understand what sustainable features can be added. A detailed scope-based estimate is then prepared — not a generic rate, because every incomplete home is different.' },
          ]}
        />
      </div>

      <UnifiedFooter />
    </div>
  )
}
