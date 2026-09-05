import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiArrowRight, FiPhone, FiChevronDown, FiCheck,
  FiMonitor, FiMapPin, FiTruck, FiStar
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
  transition: { duration: 0.7, ease: 'easeOut' },
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/70 via-[#1a1a1a]/40 to-[#1a1a1a]/90" />
    </div>
  )
}

// ─── Accordion ────────────────────────────────────────────────────────────────
function Accordion({ steps, dark = true }) {
  const [open, setOpen] = useState(null)
  const textBase  = dark ? 'text-white/60' : 'text-[#1a1a1a]/60'
  const textActive= dark ? 'text-white'    : 'text-[#1a1a1a]'
  const divider   = dark ? 'divide-white/[0.07]' : 'divide-[#1a1a1a]/[0.07]'
  const bodyText  = dark ? 'text-white/60' : 'text-[#1a1a1a]/60'

  return (
    <div className={`divide-y ${divider}`}>
      {steps.map((s, i) => {
        const active = open === i
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(active ? null : i)}
              className="w-full flex items-center gap-4 py-3.5 text-left cursor-pointer select-none"
            >
              <span className={`text-[9px] font-black tracking-widest flex-shrink-0 w-7 transition-colors duration-200 ${active ? 'text-[#B85C38]' : dark ? 'text-white/20' : 'text-[#1a1a1a]/20'}`}>
                {s.n}
              </span>
              <span className={`flex-1 text-[13px] font-bold transition-colors duration-200 ${active ? textActive : textBase}`}>
                {s.t}
              </span>
              <FiChevronDown
                size={12}
                className={`flex-shrink-0 transition-all duration-200 ${active ? 'text-[#B85C38]' : dark ? 'text-white/20' : 'text-[#1a1a1a]/20'}`}
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
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className={`text-[12px] font-light ${bodyText} leading-relaxed pb-3.5 pl-11 pr-4`}>{s.b}</p>
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
  { n: '07', t: 'Sustainable Features',             b: 'Landscape, rainwater harvesting, traditional flooring and solar energy — considered as part of the project, not afterthoughts.' },
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
  { n: '01', t: 'Site Assessment',                 b: 'We visit and assess the existing construction — understanding what has been built, what is pending and current conditions.' },
  { n: '02', t: 'Existing Work Evaluation',         b: 'Identifying what is structurally sound, what needs repair, and what can be retained vs. reworked.' },
  { n: '03', t: 'Remaining Work Calculation',       b: 'We calculate the remaining scope of work required to bring the home to a finished, livable condition.' },
  { n: '04', t: 'Sustainable Feature Planning',     b: 'We identify where landscape, rainwater, solar and waste management solutions can be incorporated effectively.' },
  { n: '05', t: 'Detailed Scope-Based Estimate',    b: 'A clear, itemised estimate based on the actual assessed scope — not a generic per-sq.ft. rate.' },
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
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-[#B85C38] z-[100] origin-left" style={{ scaleX }} />

      <Navbar />

      {/* ════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════ */}
      <section className="relative w-full flex items-center overflow-hidden bg-[#1a1a1a]" style={{ minHeight: '100svh' }}>
        <HeroBg />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 w-full">

          <motion.span
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-5 block"
          >
            KARRCHOLAI — Services
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="font-black text-[clamp(3rem,7.5vw,7rem)] text-white leading-[0.95] tracking-tighter mb-6 max-w-4xl"
          >
            Your Home.<br />
            <span className="text-white/40">Your Stage.</span><br />
            Our <span className="text-[#B85C38]">Expertise.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-white/65 text-base md:text-lg font-light leading-relaxed max-w-lg mb-10"
          >
            Whether you are starting from scratch, currently building, or need to finish what&apos;s
            already been started — KARRCHOLAI has a service built for your exact situation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="flex flex-wrap gap-3 mb-16"
          >
            {[
              { id: 'build-detail',    label: '01 — Build My Home' },
              { id: 'manage-detail',   label: '02 — Manage My Home' },
              { id: 'complete-detail', label: '03 — Complete My Home' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[11px] font-bold tracking-wider uppercase rounded-full transition-all duration-300 hover:bg-[#B85C38] hover:border-[#B85C38] hover:-translate-y-0.5 cursor-pointer"
              >
                {s.label} <FiArrowRight size={10} />
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="flex flex-wrap gap-8 md:gap-14 pt-8 border-t border-white/10 max-w-2xl"
          >
            {[['12+', 'Years on Site'], ['200+', 'Projects'], ['3', 'Services'], ['4', 'CHOLAI Solutions']].map(([v, l]) => (
              <div key={l}>
                <p className="font-black text-[clamp(1.6rem,3vw,2.5rem)] text-white leading-none tracking-tighter">{v}</p>
                <p className="text-[9px] text-white/45 mt-1.5 uppercase tracking-widest">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-[9px] tracking-widest uppercase font-bold">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-[1px] h-10 bg-gradient-to-b from-[#B85C38] to-transparent"
          />
        </motion.div>
      </section>


      {/* ════════════════════════════════════════════
          2. THREE SERVICES OVERVIEW
      ════════════════════════════════════════════ */}
      <section className="bg-[#fdfbf7] py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <motion.div {...fadeUp}>
              <span className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-3 block">Where Are You?</span>
              <h2 className="font-black text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.95] tracking-tighter">
                A service for<br />
                <span className="text-[#1a1a1a]/35">your exact stage.</span>
              </h2>
            </motion.div>
            <motion.p {...fadeUp} className="text-[#1a1a1a]/60 text-sm max-w-xs font-light leading-relaxed border-l-2 border-[#B85C38]/40 pl-5 md:mb-1">
              Tell us where you stand. We have a structured service for each stage of your home journey.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                num: '01', label: 'BUILD MY HOME', img: imgBuild,
                headline: 'Complete Construction Execution',
                quote: 'I have a plot. I want to build my house.',
                desc: 'Full construction from groundwork to handover — every team, every stage, one accountable contract.',
                includes: ['Construction execution', 'Contractor coordination', 'Site supervision', 'Quality monitoring', 'Finishing works', 'Handover'],
                href: 'build-detail',
                cta: 'See Full Details',
              },
              {
                num: '02', label: 'MANAGE MY HOME', img: imgManage,
                headline: 'Project Management Consultancy',
                quote: 'I am building. I need someone to professionally manage it.',
                desc: 'You own the project. We bring planning, coordination and site management to keep it on track.',
                includes: ['Project planning', 'Contractor coordination', 'Site supervision', 'Quality monitoring', 'Progress tracking', 'Client reporting'],
                href: 'manage-detail',
                cta: 'See Full Details',
              },
              {
                num: '03', label: 'COMPLETE MY HOME', img: imgComplete,
                headline: 'Complete, Improve & Live Better',
                quote: 'My house is incomplete. I want to finish and improve it.',
                desc: 'Assess existing work, complete remaining construction, and add sustainable features — all in one scope.',
                includes: ['Assessment of existing work', 'Remaining construction', 'Repair & alterations', 'Waterproofing', 'Sustainable features', 'Landscape & solar'],
                href: 'complete-detail',
                cta: 'See Full Details',
              },
            ].map((svc, i) => (
              <motion.div
                key={svc.num}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.65, delay: i * 0.1 }}
                className="group bg-white rounded-[24px] border border-[#1a1a1a]/6 hover:border-[#B85C38]/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden flex-shrink-0">
                  <img src={svc.img} alt={svc.headline}
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-[#1a1a1a]/15 to-transparent" />
                  <span className="absolute top-4 left-4 text-[9px] font-black tracking-widest uppercase text-[#B85C38] bg-[#1a1a1a]/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#B85C38]/40">
                    {svc.num}
                  </span>
                  <div className="absolute bottom-4 left-5 right-5">
                    <p className="text-[9px] font-black tracking-widest uppercase text-[#B85C38] mb-1">{svc.label}</p>
                    <h3 className="font-black text-white text-[17px] leading-tight tracking-tight">{svc.headline}</h3>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-6 gap-4">
                  <p className="text-[#1a1a1a]/55 text-[12px] italic leading-relaxed pl-3 border-l-2 border-[#B85C38]/30">
                    &ldquo;{svc.quote}&rdquo;
                  </p>
                  <p className="text-[#1a1a1a]/65 text-[13px] font-light leading-relaxed">{svc.desc}</p>

                  <div>
                    <p className="text-[9px] font-black tracking-widest uppercase text-[#B85C38] mb-2.5">Includes</p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {svc.includes.map((inc, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <FiCheck size={10} className="text-[#B85C38] flex-shrink-0" />
                          <span className="text-[12px] text-[#1a1a1a]/65 font-light">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-[#1a1a1a]/[0.06]">
                    <button
                      onClick={() => document.getElementById(svc.href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                      className="inline-flex items-center gap-2 text-[11px] font-black tracking-wider uppercase text-[#B85C38] cursor-pointer hover:gap-3 transition-all duration-300 group/btn"
                    >
                      {svc.cta}
                      <span className="w-5 h-5 rounded-full bg-[#B85C38]/15 group-hover/btn:bg-[#B85C38] flex items-center justify-center transition-all duration-300">
                        <FiArrowRight size={9} className="text-[#B85C38] group-hover/btn:text-white transition-colors duration-300" />
                      </span>
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
      <section id="build-detail" className="bg-[#1a1a1a]">
        {/* Section header strip */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-10 md:pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-3 block">01 — BUILD MY HOME</span>
              <h2 className="font-black text-[clamp(2.5rem,5.5vw,5rem)] text-white leading-[0.95] tracking-tighter">
                Complete<br />
                <span className="text-white/35">Construction.</span>
              </h2>
            </div>
            <p className="text-white/55 text-sm font-light leading-relaxed max-w-sm border-l-2 border-[#B85C38]/40 pl-5 md:mb-1">
              From the first column of steel to the last coat of paint — handled under one roof.
            </p>
          </div>
        </div>

        {/* Hero image — compact */}
        <div className="relative h-[40vh] md:h-[45vh] overflow-hidden">
          <img src={imgBuild} alt="Build My Home" className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
          {/* Stat badges over image */}
          <div className="absolute bottom-6 left-6 md:left-12 flex gap-4">
            {[['Turnkey', 'Delivery'], ['8', 'Stages'], ['1', 'Contract']].map(([v, l]) => (
              <div key={l} className="px-4 py-2.5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15">
                <p className="font-black text-white text-base leading-none">{v}</p>
                <p className="text-white/50 text-[10px] mt-0.5 uppercase tracking-wider">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* LEFT */}
            <motion.div {...fadeUp}>
              <p className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-4">What&apos;s Included</p>
              <h3 className="font-black text-2xl md:text-3xl text-white leading-tight tracking-tighter mb-4">
                From Groundwork to Handover —<br />
                <span className="text-white/35">Every step, every team.</span>
              </h3>
              <p className="text-white/60 text-sm font-light leading-relaxed mb-8">
                Planning, coordination and complete construction execution under one accountable contract.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 mb-8">
                {['Construction execution', 'Contractor coordination', 'Site supervision', 'Quality monitoring', 'Material coordination', 'Finishing works', 'CHOLAI solutions', 'Handover'].map((inc, i) => (
                  <div key={i} className="flex items-center gap-2.5 py-2.5 border-b border-white/[0.05] last:border-0">
                    <div className="w-5 h-5 rounded-full bg-[#B85C38]/20 flex items-center justify-center flex-shrink-0">
                      <FiCheck size={9} className="text-[#B85C38]" />
                    </div>
                    <span className="text-[13px] text-white/75 font-medium">{inc}</span>
                  </div>
                ))}
              </div>

              {/* Pricing card */}
              <div className="bg-white/[0.06] rounded-[20px] border border-white/10 p-5 mb-8">
                <p className="text-[#B85C38] font-black tracking-wider uppercase text-[9px] mb-2">Indicative Cost</p>
                <p className="font-black text-2xl md:text-3xl text-white leading-none tracking-tighter mb-1">
                  &#8377; 2,500 / sq.ft.*
                </p>
                <p className="text-white/40 text-[11px] mb-4">*Based on specifications, built-up area and site conditions.</p>
                <div className="grid grid-cols-2 gap-1">
                  {BUILD_COST_TABLE.map((row, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/[0.04] rounded-xl px-3 py-2">
                      <span className="text-[11px] text-white/60">{row.item}</span>
                      {row.ok
                        ? <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1"><FiCheck size={8} />✓</span>
                        : <span className="text-[10px] text-white/35 italic">{row.note}</span>
                      }
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/contact"
                  className="px-7 py-3.5 bg-[#B85C38] text-white text-[12px] font-bold tracking-wider uppercase hover:bg-[#a34e30] transition-colors duration-300 rounded-full"
                >
                  Start Building
                </Link>
                <a href="tel:+916385062939"
                  className="px-7 py-3.5 border border-white/25 text-white text-[12px] font-bold tracking-wider uppercase hover:bg-white/10 transition-all duration-300 rounded-full"
                >
                  Call Now
                </a>
              </div>
            </motion.div>

            {/* RIGHT — Process */}
            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }}>
              <p className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-4">Construction Process</p>
              <h3 className="font-black text-2xl md:text-3xl text-white leading-tight tracking-tighter mb-6">
                8 Stages.<br />
                <span className="text-white/35">Every step covered.</span>
              </h3>

              <div className="bg-white/[0.04] rounded-[20px] border border-white/[0.08] px-5 py-1 mb-6">
                <Accordion steps={BUILD_STEPS} dark={true} />
              </div>

              <Link to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/20 text-white text-[12px] font-bold tracking-wider uppercase rounded-full transition-all duration-300 hover:bg-[#B85C38] hover:border-[#B85C38]"
              >
                Request Detailed Estimate <FiArrowRight size={11} />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          4. MANAGE MY HOME — cream section
      ════════════════════════════════════════════ */}
      <section id="manage-detail" className="bg-[#fdfbf7]">
        {/* Section header strip */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-10 md:pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-3 block">02 — MANAGE MY HOME</span>
              <h2 className="font-black text-[clamp(2.5rem,5.5vw,5rem)] text-[#1a1a1a] leading-[0.95] tracking-tighter">
                Project Management<br />
                <span className="text-[#1a1a1a]/30">Consultancy.</span>
              </h2>
            </div>
            <p className="text-[#1a1a1a]/55 text-sm font-light leading-relaxed max-w-sm border-l-2 border-[#B85C38]/40 pl-5 md:mb-1">
              You stay in control. We keep the work organised, quality-checked and on schedule.
            </p>
          </div>
        </div>

        {/* Hero image — compact */}
        <div className="relative h-[40vh] md:h-[45vh] overflow-hidden">
          <img src={imgManage} alt="Manage My Home" className="absolute inset-0 w-full h-full object-cover object-center opacity-65" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fdfbf7]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] to-transparent" />
          <div className="absolute bottom-6 left-6 md:left-12 flex gap-4">
            {[['Your', 'Project'], ['Our', 'Management'], ['8', 'Stages']].map(([v, l]) => (
              <div key={l} className="px-4 py-2.5 bg-[#1a1a1a]/10 backdrop-blur-sm rounded-2xl border border-[#1a1a1a]/10">
                <p className="font-black text-[#1a1a1a] text-base leading-none">{v}</p>
                <p className="text-[#1a1a1a]/50 text-[10px] mt-0.5 uppercase tracking-wider">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* LEFT */}
            <motion.div {...fadeUp}>
              <p className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-4">What We Manage</p>
              <h3 className="font-black text-2xl md:text-3xl text-[#1a1a1a] leading-tight tracking-tighter mb-4">
                You own it.<br />
                <span className="text-[#1a1a1a]/30">We run it.</span>
              </h3>
              <p className="text-[#1a1a1a]/60 text-sm font-light leading-relaxed mb-8">
                Professional planning, coordination and site management — keeping your construction organised, controlled and on track while you stay informed.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 mb-8">
                {['Project planning', 'Contractor coordination', 'Site supervision', 'Quality monitoring', 'Progress tracking', 'Cost monitoring', 'Material coordination', 'Client reporting'].map((inc, i) => (
                  <div key={i} className="flex items-center gap-2.5 py-2.5 border-b border-[#1a1a1a]/[0.06] last:border-0">
                    <div className="w-5 h-5 rounded-full bg-[#B85C38]/15 flex items-center justify-center flex-shrink-0">
                      <FiCheck size={9} className="text-[#B85C38]" />
                    </div>
                    <span className="text-[13px] text-[#1a1a1a]/70 font-medium">{inc}</span>
                  </div>
                ))}
              </div>

              {/* Important callout */}
              <div className="p-4 bg-[#B85C38]/[0.07] rounded-[16px] border-l-3 border-[#B85C38] mb-8">
                <p className="font-black text-[9px] uppercase tracking-widest text-[#B85C38] mb-1.5">Important</p>
                <p className="text-[12px] text-[#1a1a1a]/65 font-light leading-relaxed">
                  <strong className="font-black text-[#1a1a1a]">Construction cost ≠ PMC fee.</strong>{' '}
                  The PMC fee covers professional planning, coordination, supervision, quality monitoring, progress tracking and reporting — separate from construction costs.
                </p>
              </div>

              {/* PMC Fee */}
              <div className="bg-white rounded-[20px] border border-[#1a1a1a]/8 p-5 mb-8">
                <p className="text-[#B85C38] font-black tracking-wider uppercase text-[9px] mb-4">PMC Fee Structure</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Option A', desc: 'Percentage of Project Cost', value: '10%', sub: 'of total project cost' },
                    { label: 'Option B', desc: 'Per Square Foot',            value: '₹100', sub: 'per sq.ft.' },
                  ].map((opt, i) => (
                    <div key={i} className="p-3.5 bg-[#fdfbf7] rounded-[14px] border border-[#1a1a1a]/6 hover:border-[#B85C38]/25 transition-colors duration-300">
                      <p className="text-[9px] font-black uppercase tracking-wider text-[#B85C38] mb-1">{opt.label}</p>
                      <p className="font-black text-xl text-[#1a1a1a] leading-none mb-0.5">{opt.value}</p>
                      <p className="text-[10px] text-[#1a1a1a]/45">{opt.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/contact"
                  className="px-7 py-3.5 bg-[#B85C38] text-white text-[12px] font-bold tracking-wider uppercase hover:bg-[#a34e30] transition-colors duration-300 rounded-full"
                >
                  Discuss PMC
                </Link>
                <a href="tel:+916385062939"
                  className="px-7 py-3.5 border border-[#1a1a1a]/25 text-[#1a1a1a] text-[12px] font-bold tracking-wider uppercase hover:border-[#1a1a1a]/50 transition-all duration-300 rounded-full"
                >
                  Call Now
                </a>
              </div>
            </motion.div>

            {/* RIGHT — PMC process */}
            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }}>
              <p className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-4">PMC Process</p>
              <h3 className="font-black text-2xl md:text-3xl text-[#1a1a1a] leading-tight tracking-tighter mb-6">
                8 Stages.<br />
                <span className="text-[#1a1a1a]/30">Complete oversight.</span>
              </h3>

              <div className="bg-white rounded-[20px] border border-[#1a1a1a]/8 px-5 py-1 mb-6 shadow-sm">
                <Accordion steps={PMC_STEPS} dark={false} />
              </div>

              <Link to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1a1a1a] text-white text-[12px] font-bold tracking-wider uppercase rounded-full transition-all duration-300 hover:bg-[#B85C38]"
              >
                Get a PMC Quote <FiArrowRight size={11} />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          5. COMPLETE MY HOME — dark section
      ════════════════════════════════════════════ */}
      <section id="complete-detail" className="bg-[#1a1a1a]">
        {/* Section header strip */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-10 md:pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-3 block">03 — COMPLETE MY HOME</span>
              <h2 className="font-black text-[clamp(2.5rem,5.5vw,5rem)] text-white leading-[0.95] tracking-tighter">
                Complete. <span className="text-[#B85C38]">Improve.</span><br />
                <span className="text-white/35">Live Better.</span>
              </h2>
            </div>
            <p className="text-white/50 text-sm font-light leading-relaxed max-w-sm border-l-2 border-[#B85C38]/40 pl-5 md:mb-1">
              Already started but unable to complete? We assess, plan and finish — with sustainability built in.
            </p>
          </div>
        </div>

        {/* Hero image — compact */}
        <div className="relative h-[40vh] md:h-[45vh] overflow-hidden">
          <img src={imgConstruct} alt="Complete My Home" className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
          <div className="absolute bottom-6 left-6 md:left-12 flex gap-4">
            {[['Assess', 'First'], ['Plan', 'Scope'], ['Complete', '& Improve']].map(([v, l]) => (
              <div key={l} className="px-4 py-2.5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15">
                <p className="font-black text-white text-base leading-none">{v}</p>
                <p className="text-white/50 text-[10px] mt-0.5 uppercase tracking-wider">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* LEFT */}
            <motion.div {...fadeUp}>
              <p className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-4">Scope of Work</p>
              <h3 className="font-black text-2xl md:text-3xl text-white leading-tight tracking-tighter mb-4">
                Every incomplete<br />
                <span className="text-white/35">home is different.</span>
              </h3>
              <p className="text-white/60 text-sm font-light leading-relaxed mb-8">
                We assess the existing construction, identify what&apos;s required and help complete the remaining work — while introducing practical sustainable features.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 mb-8">
                {['Assessment of existing work', 'Remaining construction', 'Repair & alteration works', 'Waterproofing', 'Landscape', 'Rainwater harvesting', 'Solar solutions', 'Waste management'].map((inc, i) => (
                  <div key={i} className="flex items-center gap-2.5 py-2.5 border-b border-white/[0.05] last:border-0">
                    <div className="w-5 h-5 rounded-full bg-[#B85C38]/20 flex items-center justify-center flex-shrink-0">
                      <FiCheck size={9} className="text-[#B85C38]" />
                    </div>
                    <span className="text-[13px] text-white/70 font-medium">{inc}</span>
                  </div>
                ))}
              </div>

              {/* Sustainable additions */}
              <div className="bg-white/[0.05] rounded-[20px] border border-white/[0.08] p-5 mb-8">
                <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-4">Sustainable Additions</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { Icon: FaLeaf,      label: 'Landscape',  color: '#22C55E' },
                    { Icon: FaCloudRain, label: 'Rainwater',  color: '#60A5FA' },
                    { Icon: FaSun,       label: 'Solar',      color: '#FBBF24' },
                    { Icon: FaRecycle,   label: 'Waste Mgmt', color: '#F97316' },
                  ].map(({ Icon, label, color }, i) => (
                    <div key={i} className="p-3.5 bg-white/[0.04] rounded-2xl border border-white/[0.08] flex flex-col items-center gap-2 text-center">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${color}20`, color }}>
                        <Icon size={14} />
                      </div>
                      <p className="text-[11px] font-bold text-white/70">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/contact"
                  className="px-7 py-3.5 bg-[#B85C38] text-white text-[12px] font-bold tracking-wider uppercase hover:bg-[#a34e30] transition-colors duration-300 rounded-full"
                >
                  Request Assessment
                </Link>
                <a href="tel:+916385062939"
                  className="px-7 py-3.5 border border-white/25 text-white text-[12px] font-bold tracking-wider uppercase hover:bg-white/10 transition-all duration-300 rounded-full"
                >
                  Call Now
                </a>
              </div>
            </motion.div>

            {/* RIGHT — Assessment process */}
            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }}>
              <p className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-4">Assessment Process</p>
              <h3 className="font-black text-2xl md:text-3xl text-white leading-tight tracking-tighter mb-6">
                We see it first.<br />
                <span className="text-white/35">Then we plan.</span>
              </h3>

              <div className="bg-white/[0.04] rounded-[20px] border border-white/[0.08] px-5 py-1 mb-6">
                <Accordion steps={COMPLETE_STEPS} dark={true} />
              </div>

              <div className="bg-[#B85C38]/[0.12] rounded-[20px] border border-[#B85C38]/25 p-5 mb-6">
                <p className="text-[#B85C38] font-black tracking-wider uppercase text-[9px] mb-2">Pricing Model</p>
                <p className="text-[13px] text-white/70 font-light leading-relaxed">
                  Every incomplete home has a different condition and scope. We assess first and prepare a{' '}
                  <strong className="text-white font-black">scope-based estimate</strong> — not a generic rate.
                </p>
              </div>

              <Link to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/20 text-white text-[12px] font-bold tracking-wider uppercase rounded-full transition-all duration-300 hover:bg-[#B85C38] hover:border-[#B85C38]"
              >
                Request Site Assessment <FiArrowRight size={11} />
              </Link>
            </motion.div>

          </div>
        </div>

        {/* ── Consultation sub-section inside Complete My Home ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-28">
          <div className="border-t border-white/[0.07] pt-14 md:pt-20">

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <motion.div {...fadeUp}>
                <span className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-3 block">Not Sure Where to Start?</span>
                <h2 className="font-black text-[clamp(2rem,4.5vw,4rem)] text-white leading-[0.95] tracking-tighter">
                  Professional Consultation<br />
                  <span className="text-white/30">from &#8377;1,000</span>
                </h2>
              </motion.div>
              <motion.p {...fadeUp} className="text-white/50 text-sm max-w-xs font-light leading-relaxed border-l-2 border-[#B85C38]/40 pl-5 md:mb-1">
                Get an experienced construction professional&apos;s opinion before your next decision.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">

              {/* Online */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="group p-7 bg-white/[0.04] rounded-[24px] border border-white/[0.08] hover:border-[#B85C38]/40 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-[#B85C38] group-hover:border-transparent transition-all duration-400">
                  <FiMonitor size={18} className="text-white/40 group-hover:text-white transition-colors duration-400" />
                </div>
                <p className="text-[#B85C38] font-black tracking-widest uppercase text-[9px] mb-1">Online Consultation</p>
                <p className="font-black text-[2rem] text-white leading-none tracking-tighter mb-0.5">&#8377;1,000</p>
                <p className="text-white/40 text-[11px] mb-5">Up to 60 minutes</p>

                <div className="space-y-2 mb-7 flex-1">
                  {['Construction planning', 'Construction cost advice', 'Contractor selection', 'Material selection', 'Quality concerns', 'Waterproofing', 'PMC requirements', 'Incomplete-house assessment'].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <FiCheck size={11} className="text-[#B85C38] flex-shrink-0 mt-0.5" />
                      <span className="text-[12px] text-white/60 font-light">{item}</span>
                    </div>
                  ))}
                </div>

                <Link to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white/10 text-white text-[11px] font-bold tracking-wider uppercase rounded-full transition-all duration-300 hover:bg-[#B85C38] border border-white/15 hover:border-[#B85C38]"
                >
                  Book Online — &#8377;1,000 <FiArrowRight size={10} />
                </Link>
              </motion.div>

              {/* Site Visit — featured */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                className="group relative p-7 bg-[#B85C38] rounded-[24px] border border-[#B85C38] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden flex flex-col"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(255,255,255,0.12),transparent_60%)] pointer-events-none" />
                <span className="absolute top-5 right-5 text-[8px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full bg-white text-[#B85C38]">
                  Recommended
                </span>
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
                  <FiMapPin size={18} className="text-white" />
                </div>
                <p className="text-white/80 font-black tracking-widest uppercase text-[9px] mb-1">Site Visit</p>
                <p className="font-black text-[2rem] text-white leading-none tracking-tighter mb-0.5">&#8377;2,000</p>
                <p className="text-white/70 text-[11px] mb-3">Per visit + travel expense &#8377;2,000</p>                <p className="text-white/80 text-[12px] font-light leading-relaxed mb-5">
                  See the problem. Understand the site. Recommend the solution.
                </p>

                <div className="space-y-2 mb-7 flex-1">
                  {['Physical site inspection', 'Discussion with homeowner', 'Review of visible construction', 'Identification of major concerns', 'Practical recommendations', 'Discussion of possible next steps'].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <FiCheck size={11} className="text-white flex-shrink-0 mt-0.5" />
                      <span className="text-[12px] text-white/80 font-light">{item}</span>
                    </div>
                  ))}
                </div>

                <Link to="/contact"
                  className="relative z-10 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white text-[#B85C38] text-[11px] font-bold tracking-wider uppercase rounded-full transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white"
                >
                  Book Site Visit — &#8377;2,000 <FiArrowRight size={10} />
                </Link>
              </motion.div>

              {/* Travel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                className="group p-7 bg-white/[0.04] rounded-[24px] border border-white/[0.08] hover:border-[#B85C38]/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-[#B85C38] group-hover:border-transparent transition-all duration-400">
                  <FiTruck size={18} className="text-white/40 group-hover:text-white transition-colors duration-400" />
                </div>
                <p className="text-white/40 font-black tracking-widest uppercase text-[9px] mb-1">Travel</p>
                <p className="font-black text-[2rem] text-white leading-none tracking-tighter mb-0.5">At Actual Cost</p>
                <p className="text-white/40 text-[11px] mb-5">Where applicable</p>

                <p className="text-white/60 text-[12px] font-light leading-relaxed mb-6 flex-1">
                  Travel expenses at actual cost — applicable for locations outside the standard service area.
                  Discussed and agreed before the visit.
                </p>

                <div className="p-4 bg-[#B85C38]/[0.15] rounded-[16px] border-l-[3px] border-[#B85C38]">
                  <p className="text-[11px] text-white/70 font-light leading-relaxed">
                    <strong className="font-black text-white">Service area:</strong> Karur, Chennai, Coimbatore, Madurai, Trichy, Erode and surrounding areas across Tamil Nadu.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-5 md:p-6 bg-white/[0.04] rounded-[18px] border border-white/[0.07] text-center max-w-3xl mx-auto"
            >
              <p className="text-[9px] font-black uppercase tracking-widest text-white/25 mb-2">Important Note</p>
              <p className="text-[12px] text-white/50 font-light leading-relaxed">
                Consultation and site-visit fees cover professional consultation and preliminary assessment only.
                Detailed drawings, structural design, BOQ preparation, quantity surveying, detailed estimation,
                testing, approvals and project execution / PMC services are charged separately.
              </p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          8. TRUST / STATS
      ════════════════════════════════════════════ */}
      <section className="bg-[#fdfbf7] py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.span {...fadeUp} className="text-[#B85C38] font-black tracking-widest uppercase text-[10px] mb-3 block">
              Why KARRCHOLAI
            </motion.span>
            <motion.h2 {...fadeUp} className="font-black text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tighter">
              Experience You<br />
              <span className="text-[#1a1a1a]/30">Can Trust.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {[
              { stat: '12+',  label: 'Years on Site',     desc: 'Practical Tamil Nadu construction — local materials, contractors, soil conditions.' },
              { stat: '200+', label: 'Projects Delivered', desc: 'Homes across Karur, Chennai, Coimbatore, Madurai, Trichy and Erode.' },
              { stat: '3',    label: 'Home Services',      desc: 'Build, Manage or Complete — a service for your exact stage.' },
              { stat: '4',    label: 'CHOLAI Solutions',   desc: 'Landscape, rainwater, solar and traditional materials — at design stage.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-6 bg-white rounded-[20px] border border-[#1a1a1a]/5 hover:border-[#B85C38]/40 hover:shadow-xl transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#B85C38] to-[#B85C38]/30 group-hover:w-full transition-all duration-700" />
                <p className="font-black text-[clamp(1.8rem,3vw,2.5rem)] text-[#1a1a1a] leading-none tracking-tighter mb-1.5">{item.stat}</p>
                <p className="text-[9px] font-black text-[#B85C38] tracking-widest uppercase mb-2.5">{item.label}</p>
                <p className="text-[11px] text-[#1a1a1a]/60 font-light leading-relaxed">{item.desc}</p>
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
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-7 bg-white rounded-[20px] border border-[#1a1a1a]/5 hover:border-[#B85C38]/40 hover:shadow-xl transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#B85C38] to-[#B85C38]/30 group-hover:w-full transition-all duration-700" />
                <div className="w-9 h-9 rounded-xl bg-[#B85C38]/10 flex items-center justify-center mb-5 group-hover:bg-[#B85C38] transition-colors duration-300">
                  <span className="font-black text-[10px] text-[#B85C38] group-hover:text-white transition-colors duration-300">{item.num}</span>
                </div>
                <h4 className="font-black text-[14px] text-[#1a1a1a] mb-2.5 tracking-tight group-hover:text-[#B85C38] transition-colors duration-300">{item.title}</h4>
                <p className="text-[12px] text-[#1a1a1a]/60 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          9. FINAL CTA
      ════════════════════════════════════════════ */}
      <section className="bg-[#2D4B37] py-20 md:py-28 px-6 overflow-hidden relative">
        <div className="absolute inset-0 stone-texture opacity-10 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <span className="text-white/45 font-black tracking-widest uppercase text-[10px] mb-4 block">Ready to Begin?</span>
            <h2 className="font-black text-[clamp(2.5rem,6vw,5.5rem)] text-white leading-[0.95] tracking-tighter mb-6">
              Start your<br />
              <span className="text-white/45">home journey.</span>
            </h2>
            <p className="text-white/60 font-light text-sm leading-relaxed max-w-md">
              KARRCHOLAI — Experience-led construction management for your home.
              One team, one contract, from first conversation to key handover.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.2 }} className="flex flex-col gap-3">
            <Link to="/contact"
              className="w-full py-4 bg-white text-[#1a1a1a] text-[12px] font-bold tracking-wider uppercase hover:bg-[#B85C38] hover:text-white transition-all duration-400 rounded-full text-center"
            >
              Start Your Project
            </Link>
            <Link to="/projects"
              className="w-full py-4 border border-white/25 text-white text-[12px] font-bold tracking-wider uppercase hover:bg-white/10 transition-all duration-300 rounded-full text-center"
            >
              View Our Work
            </Link>
            <a href="tel:+916385062939"
              className="w-full py-4 bg-white/10 text-white text-[12px] font-bold tracking-wider uppercase hover:bg-white/20 transition-all duration-300 rounded-full text-center inline-flex items-center justify-center gap-2"
            >
              <FiPhone size={12} /> Call Now
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
