import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiArrowRight, FiPhone, FiCheck, FiChevronDown,
  FiMonitor, FiMapPin, FiTruck
} from 'react-icons/fi'
import { FaLeaf, FaCloudRain, FaSun, FaRecycle } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import FAQSection from '../components/FAQSection'
import { Helmet } from 'react-helmet-async'

import imgHero     from '../../assets/pexels-kawserhamid-176342.jpg'
import imgBuild    from '../../assets/Residential_construction.jpg'
import imgManage   from '../../assets/pmc.jpeg'
import imgComplete from '../../assets/renovation.jpg.jpeg'

/* ─── tiny helpers ─────────────────────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: 'easeOut' },
}

/* ─── Process step accordion ────────────────────────────────── */
function Steps({ items, dark = false }) {
  const [open, setOpen] = useState(0)
  const divideColor = dark ? 'divide-white/[0.07]' : 'divide-[#e8e4df]'
  const numInactive = dark ? 'bg-white/10 text-white/35' : 'bg-[#f0ece6] text-[#1a1a1a]/40'
  const titleInactive = dark ? 'text-white/70' : 'text-[#1a1a1a]/75'
  const chevronBase = dark ? 'text-white/25' : 'text-[#1a1a1a]/25'
  const bodyText = dark ? 'text-white/50' : 'text-[#1a1a1a]/55'

  return (
    <div className={`divide-y ${divideColor}`}>
      {items.map((s, i) => {
        const on = open === i
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(on ? -1 : i)}
              className="w-full flex items-center gap-4 py-4 text-left cursor-pointer"
            >
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black flex-shrink-0 transition-colors duration-200 ${on ? 'bg-[#B85C38] text-white' : numInactive}`}>
                {i + 1}
              </span>
              <span className={`flex-1 text-[14px] font-semibold transition-colors duration-200 ${on ? 'text-[#B85C38]' : titleInactive}`}>
                {s.t}
              </span>
              <FiChevronDown size={14} className={`flex-shrink-0 transition-all duration-200 ${on ? 'rotate-180 text-[#B85C38]' : chevronBase}`} />
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className={`pb-4 pl-11 pr-2 text-[13px] leading-relaxed ${bodyText}`}>{s.b}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Included feature pill ─────────────────────────────────── */
function Chip({ label }) {
  return (
    <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#f7f3ee] rounded-xl border border-[#e8e4df]">
      <FiCheck size={11} className="text-[#B85C38] flex-shrink-0" />
      <span className="text-[12.5px] text-[#1a1a1a]/70 font-medium leading-none">{label}</span>
    </div>
  )
}

/* ─── Data ──────────────────────────────────────────────────── */
const BUILD_STEPS = [
  { t: 'Requirement & Planning',             b: 'We understand your lifestyle, budget, site conditions and expectations — establishing a practical direction before any work begins.' },
  { t: 'Design & Technical Coordination',    b: 'We coordinate with architects and structural consultants to align drawings and specifications with site execution.' },
  { t: 'Estimation & Material Planning',     b: 'We review quantities and material needs to support better cost awareness, planned procurement and reduced wastage.' },
  { t: 'Construction Execution',             b: 'Foundation, structural work, masonry, plastering and all major activities — executed in the right sequence.' },
  { t: 'Electrical & Plumbing Coordination', b: 'MEP services coordinated with construction activities to ensure proper integration at each required stage.' },
  { t: 'Finishing Works',                    b: 'Flooring, painting, doors, windows, sanitary fixtures — coordinated to approved requirements.' },
  { t: 'Sustainable Features',               b: 'Landscape, rainwater harvesting, traditional flooring and solar energy — part of the project, not afterthoughts.' },
  { t: 'Final Inspection & Handover',        b: 'We coordinate final inspections, identify corrections, and support the completion process through to handover.' },
]

const PMC_STEPS = [
  { t: 'Understand Your Requirements',  b: 'We begin by understanding your lifestyle, priorities, budget, site conditions and expectations.' },
  { t: 'Plan Before Execution',         b: 'We review drawings, specifications, quantities and construction sequence to identify issues before they reach site.' },
  { t: 'Coordinate the Work',           b: 'We coordinate architects, consultants, contractors, suppliers and specialist teams — maintaining the right sequence.' },
  { t: 'Monitor Site Execution',        b: 'Regular observation of workmanship, dimensions, materials and construction practices at important stages.' },
  { t: 'Manage Materials & Wastage',    b: 'We monitor material requirements, usage and wastage to support better resource utilisation and cost awareness.' },
  { t: 'Monitor Quality',               b: 'Stage-wise checking — identifying and addressing issues during construction, not after.' },
  { t: 'Track Progress & Decisions',    b: 'We keep you informed about activities, requirements, issues and decisions so the project progresses with clarity.' },
  { t: 'Support Through Handover',      b: 'Our involvement continues through finishing stages, final inspections and corrections — to an organised handover.' },
]

const COMPLETE_STEPS = [
  { t: 'Site Assessment',              b: 'We visit and assess the existing construction — understanding what has been built, what is pending and current conditions.' },
  { t: 'Existing Work Evaluation',     b: 'Identifying what is structurally sound, what needs repair, and what can be retained vs. reworked.' },
  { t: 'Remaining Work Calculation',   b: 'We calculate the remaining scope of work required to bring the home to a finished, livable condition.' },
  { t: 'Sustainable Feature Planning', b: 'We identify where landscape, rainwater, solar and waste management can be incorporated effectively.' },
  { t: 'Scope-Based Estimate',         b: 'A clear, itemised estimate based on the actual assessed scope — not a generic per-sq.ft. rate.' },
]

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Services() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <div ref={ref} className="bg-[#fdfbf7] min-h-screen overflow-x-hidden text-[#1a1a1a]">
      <Helmet>
        <title>Services — Build, Manage & Complete | KARRCHOLAI</title>
        <meta name="description" content="KARRCHOLAI: Build My Home, Manage My Home, Complete My Home — one service for every stage of your construction journey. Tamil Nadu." />
        <link rel="canonical" href="https://karrcholai.com/services" />
      </Helmet>

      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-[#B85C38] z-[100] origin-left" style={{ scaleX }} />

      <Navbar />

      {/* ══════════════════════════════
          1 · HERO
      ══════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-end bg-[#111] overflow-hidden">
        <img src={imgHero} alt="" className="absolute inset-0 w-full h-full object-cover object-center opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111]/20 via-transparent to-[#111]" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pb-16 pt-36">
          <motion.p
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-[#B85C38] font-bold tracking-[0.2em] uppercase text-[11px] mb-5"
          >
            KARRCHOLAI · Services
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="font-black text-[clamp(2.8rem,6.5vw,6rem)] text-white leading-[0.93] tracking-tighter mb-5"
          >
            Your Home.<br />
            <span className="text-[#B85C38]">Our Expertise.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="text-white/55 text-[16px] font-light leading-relaxed max-w-md mb-10"
          >
            Starting fresh, mid-construction, or completing an unfinished home — 
            pick the service that matches your stage.
          </motion.p>

          {/* 3 service jump links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-3 mb-14"
          >
            {[
              { label: 'Build My Home',    id: 'sec-build' },
              { label: 'Manage My Home',   id: 'sec-manage' },
              { label: 'Complete My Home', id: 'sec-complete' },
            ].map((s, i) => (
              <button
                key={s.id}
                onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 !text-white text-[12px] font-semibold tracking-wide hover:bg-[#B85C38] hover:border-[#B85C38] transition-all duration-300 cursor-pointer"
              >
                <span className="text-[#B85C38] font-black text-[10px]">0{i + 1}</span>
                {s.label}
              </button>
            ))}
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="flex flex-wrap gap-8 pt-7 border-t border-white/10"
          >
            {[['12+', 'Years on Site'], ['200+', 'Projects Delivered'], ['3', 'Services'], ['4', 'CHOLAI Solutions']].map(([v, l]) => (
              <div key={l} className="flex flex-col gap-1">
                <span className="font-black text-[clamp(1.5rem,3vw,2rem)] text-white leading-none">{v}</span>
                <span className="text-[10px] text-white/35 uppercase tracking-widest">{l}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════
          2 · 3-CARD OVERVIEW
      ══════════════════════════════ */}
      <section className="bg-white py-20 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">

          <motion.div {...fadeUp} className="mb-12 text-center">
            <p className="text-[#B85C38] font-bold tracking-[0.18em] uppercase text-[11px] mb-3">Choose Your Stage</p>
            <h2 className="font-black text-[clamp(1.8rem,4vw,3.2rem)] tracking-tighter leading-tight">
              Which service is for you?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                num: '01', title: 'Build My Home',
                img: imgBuild,
                tag: 'Complete Construction',
                situation: 'I have a plot. I want to build my house.',
                desc: 'Full construction from groundwork to handover under one contract.',
                price: '₹2,500 / sq.ft.*',
                href: 'sec-build',
              },
              {
                num: '02', title: 'Manage My Home',
                img: imgManage,
                tag: 'Project Management (PMC)',
                situation: 'I am building. I need expert management.',
                desc: 'You own the project. We plan, coordinate and supervise.',
                price: '10% or ₹100 / sq.ft.',
                href: 'sec-manage',
              },
              {
                num: '03', title: 'Complete My Home',
                img: imgComplete,
                tag: 'Complete & Improve',
                situation: 'My house is incomplete. I want to finish it.',
                desc: 'Assess, complete remaining works and add sustainable features.',
                price: 'Scope-based estimate',
                href: 'sec-complete',
              },
            ].map((c, i) => (
              <motion.div
                key={c.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex flex-col rounded-2xl border border-[#e8e4df] bg-[#fdfbf7] overflow-hidden hover:shadow-lg hover:border-[#B85C38]/30 transition-all duration-400 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/70 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] font-black tracking-widest bg-[#B85C38] text-white px-3 py-1.5 rounded-full uppercase">
                      {c.num}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">{c.tag}</p>
                    <h3 className="font-black text-[18px] text-white leading-tight">{c.title}</h3>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5 gap-4">
                  {/* Situation quote */}
                  <p className="text-[13px] text-[#B85C38] font-semibold italic leading-snug">
                    &ldquo;{c.situation}&rdquo;
                  </p>
                  <p className="text-[13px] text-[#1a1a1a]/60 font-light leading-relaxed">{c.desc}</p>

                  {/* Price */}
                  <div className="mt-auto pt-4 border-t border-[#e8e4df] flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#1a1a1a]/30 mb-0.5">Pricing</p>
                      <p className="text-[14px] font-black text-[#1a1a1a]">{c.price}</p>
                    </div>
                    <button
                      onClick={() => document.getElementById(c.href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                      className="flex items-center gap-1.5 text-[11px] font-bold text-[#B85C38] hover:gap-2.5 transition-all duration-300 cursor-pointer"
                    >
                      Details <FiArrowRight size={11} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          SERVICE DETAIL TEMPLATE (reused 3×)
          Layout: full-width, white bg, consistent structure
      ══════════════════════════════════════════════════════ */}

      {/* ── 3 · BUILD MY HOME ── */}
      <ServiceDetail
        id="sec-build"
        badge="01 · Build My Home"
        headline="Complete Construction Execution"
        tagline="I have a plot. I want to build my house."
        desc="From the first column of steel to the last coat of paint — planned, coordinated and executed under one accountable contract. You tell us what you want. We handle every team, every stage."
        img={imgBuild}
        imgAlt="Build My Home"
        features={['Construction execution', 'Contractor coordination', 'Site supervision', 'Quality monitoring', 'Material coordination', 'Finishing works', 'CHOLAI solutions', 'Final handover']}
        processTitle="8-Stage Construction Process"
        steps={BUILD_STEPS}
        pricingBlock={
          <PricingCard
            label="Indicative Cost"
            price="₹2,500"
            unit="per sq.ft."
            note="*Based on specifications, built-up area and site conditions."
            items={['Civil & structural works', 'Masonry & plastering', 'Flooring', 'Doors & windows', 'Electrical', 'Plumbing', 'Painting', 'Basic sanitary fixtures']}
          />
        }
        ctaPrimary={{ label: 'Start Building', to: '/contact' }}
        ctaSecondary={{ label: 'Call Now', tel: 'tel:+916385062939' }}
        ctaProcess={{ label: 'Request Detailed Estimate', to: '/contact' }}
        dark={false}
      />

      {/* ── 4 · MANAGE MY HOME ── */}
      <ServiceDetail
        id="sec-manage"
        badge="02 · Manage My Home"
        headline="Project Management Consultancy"
        tagline="I am building. I need professional management."
        desc="You own the project — you make the decisions. We provide the planning, coordination, site supervision and reporting that keeps construction organised and on track."
        img={imgManage}
        imgAlt="Manage My Home"
        features={['Project planning', 'Contractor coordination', 'Site supervision', 'Quality monitoring', 'Progress tracking', 'Cost monitoring', 'Material coordination', 'Client reporting']}
        processTitle="8-Stage PMC Process"
        steps={PMC_STEPS}
        pricingBlock={
          <PMCPricingCard />
        }
        ctaPrimary={{ label: 'Discuss PMC', to: '/contact' }}
        ctaSecondary={{ label: 'Call Now', tel: 'tel:+916385062939' }}
        ctaProcess={{ label: 'Get a PMC Quote', to: '/contact' }}
        dark={true}
      />

      {/* ── 5 · COMPLETE MY HOME ── */}
      <ServiceDetail
        id="sec-complete"
        badge="03 · Complete My Home"
        headline="Complete, Improve & Live Better"
        tagline="My house is incomplete. I want to finish it."
        desc="Every incomplete home is different. We assess the existing construction, calculate the remaining scope, complete the work — and introduce practical sustainable features at the same time."
        img={imgComplete}
        imgAlt="Complete My Home"
        features={['Assessment of existing work', 'Remaining construction', 'Repair & alteration works', 'Waterproofing', 'Landscape', 'Rainwater harvesting', 'Solar solutions', 'Waste management']}
        processTitle="5-Step Assessment Process"
        steps={COMPLETE_STEPS}
        pricingBlock={
          <CompletePricingCard />
        }
        ctaPrimary={{ label: 'Request Assessment', to: '/contact' }}
        ctaSecondary={{ label: 'Call Now', tel: 'tel:+916385062939' }}
        ctaProcess={{ label: 'Request Site Assessment', to: '/contact' }}
        dark={false}
        sustainableAddons
      />


      {/* ══════════════════════════════
          6 · CONSULTATION
      ══════════════════════════════ */}
      <section className="bg-white py-20 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">

          <motion.div {...fadeUp} className="mb-12 text-center">
            <p className="text-[#B85C38] font-bold tracking-[0.18em] uppercase text-[11px] mb-3">Not Sure Where to Start?</p>
            <h2 className="font-black text-[clamp(1.8rem,4vw,3.2rem)] tracking-tighter leading-tight mb-3">
              Professional Consultation
            </h2>
            <p className="text-[#1a1a1a]/50 text-[15px] font-light max-w-sm mx-auto">
              Get expert advice before your next decision — from ₹1,000.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Online */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="group flex flex-col rounded-2xl border border-[#e8e4df] bg-[#fdfbf7] p-7 hover:border-[#B85C38]/30 hover:shadow-md transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-[#B85C38]/8 flex items-center justify-center mb-5 group-hover:bg-[#B85C38] transition-colors duration-300">
                <FiMonitor size={19} className="text-[#B85C38] group-hover:text-white transition-colors duration-300" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#B85C38] mb-1">Online Consultation</p>
              <p className="font-black text-[28px] text-[#1a1a1a] leading-none mb-1">₹1,000</p>
              <p className="text-[12px] text-[#1a1a1a]/40 mb-6">Up to 60 minutes · Video call</p>
              <ul className="space-y-2.5 flex-1 mb-7">
                {['Construction planning & cost advice', 'Contractor selection guidance', 'Material selection', 'Quality concerns review', 'Waterproofing solutions', 'PMC requirements', 'Incomplete-house evaluation'].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <FiCheck size={12} className="text-[#B85C38] flex-shrink-0 mt-[2px]" />
                    <span className="text-[13px] text-[#1a1a1a]/60">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="w-full text-center py-3 rounded-xl border-2 border-[#B85C38] !text-[#B85C38] text-[12px] font-bold tracking-wide hover:bg-[#B85C38] hover:!text-white transition-all duration-300 block">
                Book Online — ₹1,000
              </Link>
            </motion.div>

            {/* Site Visit — featured */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="group flex flex-col rounded-2xl bg-[#B85C38] p-7 relative overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_60%)] pointer-events-none" />
              <span className="absolute top-5 right-5 bg-white text-[#B85C38] text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full">
                Recommended
              </span>
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center mb-5">
                <FiMapPin size={19} className="text-white" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/70 mb-1">Site Visit</p>
              <p className="font-black text-[28px] text-white leading-none mb-1">₹2,000</p>
              <p className="text-[12px] text-white/55 mb-4">Per visit · Travel charges extra</p>
              <p className="text-[14px] text-white/80 font-light leading-relaxed mb-5">
                We visit your site, see the problem first-hand, and recommend the right path forward.
              </p>
              <ul className="space-y-2.5 flex-1 mb-7">
                {['Physical site inspection', 'Discussion with homeowner', 'Review of visible construction', 'Identification of major concerns', 'Practical on-site recommendations', 'Discussion of possible next steps'].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <FiCheck size={12} className="text-white flex-shrink-0 mt-[2px]" />
                    <span className="text-[13px] text-white/75">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="relative z-10 w-full text-center py-3 rounded-xl bg-white !text-[#B85C38] text-[12px] font-bold tracking-wide hover:bg-[#1a1a1a] hover:!text-white transition-all duration-300 block">
                Book Site Visit — ₹2,000
              </Link>
            </motion.div>

            {/* Travel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col rounded-2xl border border-[#e8e4df] bg-[#fdfbf7] p-7"
            >
              <div className="w-11 h-11 rounded-xl bg-[#1a1a1a]/5 flex items-center justify-center mb-5">
                <FiTruck size={19} className="text-[#1a1a1a]/40" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a]/30 mb-1">Travel</p>
              <p className="font-black text-[22px] text-[#1a1a1a] leading-none mb-1">At Actual Cost</p>
              <p className="text-[12px] text-[#1a1a1a]/40 mb-6">Agreed before the visit</p>
              <p className="text-[13px] text-[#1a1a1a]/55 font-light leading-relaxed mb-6 flex-1">
                Applicable for locations outside the standard service area. Always discussed and confirmed before the visit.
              </p>
              <div className="p-4 bg-white rounded-xl border border-[#e8e4df]">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a]/30 mb-2">Service Area</p>
                <p className="text-[13px] text-[#1a1a1a]/60 leading-relaxed">
                  Karur · Chennai · Coimbatore · Madurai · Trichy · Erode and surrounding areas across Tamil Nadu.
                </p>
              </div>
              <div className="mt-4 p-4 bg-[#fdfbf7] rounded-xl border border-[#e8e4df]">
                <p className="text-[11px] text-[#1a1a1a]/40 leading-relaxed">
                  Consultation fees cover preliminary assessment only. Detailed design, BOQ, estimation, approvals and project execution are charged separately.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ══════════════════════════════
          7 · TRUST / STATS
      ══════════════════════════════ */}
      <section className="bg-[#1a1a1a] py-20 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">

          <motion.div {...fadeUp} className="mb-12 text-center">
            <p className="text-[#B85C38] font-bold tracking-[0.18em] uppercase text-[11px] mb-3">Why KARRCHOLAI</p>
            <h2 className="font-black text-[clamp(1.8rem,4vw,3.2rem)] text-white tracking-tighter leading-tight">
              Experience You Can Trust
            </h2>
          </motion.div>

          {/* 4 stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { v: '12+',  l: 'Years on Site',       d: 'Practical Tamil Nadu construction experience.' },
              { v: '200+', l: 'Projects Delivered',   d: 'Homes across Karur, Chennai, Coimbatore, Madurai, Trichy & Erode.' },
              { v: '3',    l: 'Home Services',        d: 'Build, Manage or Complete — one for every stage.' },
              { v: '4',    l: 'CHOLAI Solutions',     d: 'Landscape, rainwater, solar and traditional materials.' },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.07] hover:border-[#B85C38]/40 transition-colors duration-300"
              >
                <p className="font-black text-[clamp(1.7rem,3vw,2.3rem)] text-white leading-none tracking-tighter mb-1">{s.v}</p>
                <p className="text-[10px] font-black text-[#B85C38] tracking-widest uppercase mb-2">{s.l}</p>
                <p className="text-[11px] text-white/40 font-light leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>

          {/* 3 pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { n: '01', t: 'Structured Planning',  d: 'Every project begins with thorough pre-construction planning — drawings, budgets and timelines reviewed before work starts.' },
              { n: '02', t: 'Stage-wise Quality',   d: 'Work checked at every critical stage — foundation, structure, MEP, finishing and handover.' },
              { n: '03', t: 'Transparent Costs',    d: 'Detailed cost breakdowns and proactive updates on variations. Clients always know where their money stands.' },
            ].map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className="group p-7 rounded-2xl bg-white/[0.04] border border-white/[0.07] hover:border-[#B85C38]/40 transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-xl bg-[#B85C38]/15 group-hover:bg-[#B85C38] flex items-center justify-center mb-5 transition-colors duration-300">
                  <span className="font-black text-[10px] text-[#B85C38] group-hover:text-white transition-colors duration-300">{p.n}</span>
                </div>
                <h4 className="font-black text-[15px] text-white mb-2.5">{p.t}</h4>
                <p className="text-[12px] text-white/45 font-light leading-relaxed">{p.d}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      {/* ══════════════════════════════
          8 · FINAL CTA
      ══════════════════════════════ */}
      <section className="bg-[#2D4B37] py-20 md:py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <p className="text-white/45 font-bold tracking-[0.18em] uppercase text-[11px] mb-4">Ready to Begin?</p>
            <h2 className="font-black text-[clamp(2.2rem,5vw,4.5rem)] text-white leading-tight tracking-tighter mb-5">
              Start Your Home Journey
            </h2>
            <p className="text-white/55 text-[15px] font-light leading-relaxed max-w-md mx-auto mb-10">
              One team, one contract — from first conversation to key handover.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="px-9 py-4 bg-white !text-[#1a1a1a] text-[13px] font-bold tracking-wide rounded-full hover:bg-[#B85C38] hover:!text-white transition-all duration-300 block text-center">
                Start Your Project
              </Link>
              <Link to="/projects" className="px-9 py-4 border border-white/25 !text-white text-[13px] font-bold tracking-wide rounded-full hover:bg-white/10 transition-all duration-300 block text-center">
                View Our Work
              </Link>
              <a href="tel:+916385062939" className="px-9 py-4 bg-white/10 !text-white text-[13px] font-bold tracking-wide rounded-full hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2">
                <FiPhone size={14} /> Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════
          9 · FAQ
      ══════════════════════════════ */}
      <div className="bg-[#f8f6f3]">
        <FAQSection
          dark={false}
          accent="#B85C38"
          subtitle="Common Questions"
          title="Everything You Need to Know"
          faqs={[
            { q: 'What is the difference between Build, Manage and Complete My Home?', a: 'Build My Home is for those who have a plot and want full construction execution from start to handover. Manage My Home is for those already building who need a professional to plan, coordinate and supervise. Complete My Home is for incomplete homes that need remaining work finished, repaired or improved with sustainable features.' },
            { q: 'What does the Build My Home rate include?', a: 'The indicative rate covers civil and structural works, masonry, plastering, flooring, doors, windows, electrical, plumbing, painting and basic sanitary fixtures. Final cost is prepared based on your approved design, specifications, built-up area and site conditions.' },
            { q: 'Is the PMC fee separate from construction cost?', a: 'Yes. The PMC fee covers professional planning, coordination, site supervision, quality monitoring, progress tracking and reporting — completely separate from construction costs.' },
            { q: 'What does the ₹1,000 / ₹2,000 consultation cover?', a: 'These fees cover professional consultation and preliminary assessment only. Detailed drawings, BOQ preparation, quantity surveying, estimation, testing, approvals and project execution or PMC services are charged separately.' },
            { q: 'Are CHOLAI solutions included in all services?', a: 'CHOLAI solutions (landscape, rainwater harvesting, solar, traditional materials) are planned as part of every service at the right stage — not retrofitted. The specific solutions depend on your priorities and budget.' },
            { q: 'Which areas do you serve?', a: 'Karur, Chennai, Coimbatore, Madurai, Trichy, Erode and surrounding areas across Tamil Nadu. Travel charges at actual cost apply for locations outside the standard service area.' },
            { q: 'How is the Complete My Home scope determined?', a: 'We conduct a site assessment first to evaluate the existing construction, identify remaining scope and understand where sustainable features can be added. A detailed scope-based estimate is then prepared — not a generic rate.' },
          ]}
        />
      </div>

      <UnifiedFooter />
    </div>
  )
}


/* ══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════════════════════════ */

/* ── Reusable Service Detail Section ── */
function ServiceDetail({
  id, badge, headline, tagline, desc, img, imgAlt,
  features, processTitle, steps,
  pricingBlock, ctaPrimary, ctaSecondary, ctaProcess,
  dark = false, sustainableAddons = false,
}) {
  const bg       = dark ? 'bg-[#111]'              : 'bg-[#fdfbf7]'
  const text     = dark ? 'text-white'             : 'text-[#1a1a1a]'
  const muted    = dark ? 'text-white/55'          : 'text-[#1a1a1a]/55'
  const card     = dark ? 'bg-white/[0.04] border-white/[0.07]' : 'bg-white border-[#e8e4df]'
  const chipBg   = dark ? 'bg-white/[0.05] border-white/[0.08]' : 'bg-[#f7f3ee] border-[#e8e4df]'
  const chipText = dark ? 'text-white/65'          : 'text-[#1a1a1a]/70'
  const divider  = dark ? 'border-white/[0.07]'    : 'border-[#e8e4df]'
  const callBtnCls = dark
    ? 'border border-white/20 !text-white hover:bg-white/10'
    : 'border border-[#e8e4df] !text-[#1a1a1a] hover:border-[#B85C38]/40 hover:!text-[#B85C38]'
  const processBtnCls = dark
    ? 'border border-white/20 !text-white hover:bg-[#B85C38] hover:border-[#B85C38] hover:!text-white'
    : 'border border-[#e8e4df] !text-[#1a1a1a]/70 hover:bg-[#B85C38] hover:!text-white hover:border-[#B85C38]'

  return (
    <section id={id} className={`${bg} py-20 md:py-24 px-6`}>
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div {...fadeUp} className="mb-10">
          <span className="inline-block text-[#B85C38] font-black tracking-[0.18em] uppercase text-[11px] mb-3">{badge}</span>
          <h2 className={`font-black text-[clamp(2rem,4.5vw,3.5rem)] ${text} leading-tight tracking-tighter mb-3`}>
            {headline}
          </h2>
          <p className={`text-[16px] ${muted} font-light max-w-xl leading-relaxed`}>
            &ldquo;{tagline}&rdquo;
          </p>
        </motion.div>

        {/* ── Image banner (full-width, not in grid) ── */}
        <motion.div {...fadeUp} className="relative h-56 md:h-72 rounded-2xl overflow-hidden mb-10">
          <img src={img} alt={imgAlt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/60 via-transparent to-transparent" />
          <p className={`absolute bottom-5 left-6 text-[15px] font-light text-white/80 italic max-w-xs leading-relaxed`}>
            {desc}
          </p>
        </motion.div>

        {/* ── Three equal columns: Features | Process | Pricing+CTA ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Column 1: What's Included */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className={`rounded-2xl border ${card} p-6 flex flex-col gap-4`}
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#B85C38] mb-1">What&apos;s Included</p>
              <p className={`text-[13px] ${muted} font-light leading-relaxed`}>
                Everything covered under this service.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {features.map((f) => (
                <div key={f} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border ${chipBg}`}>
                  <FiCheck size={11} className="text-[#B85C38] flex-shrink-0" />
                  <span className={`text-[12.5px] font-medium ${chipText}`}>{f}</span>
                </div>
              ))}
            </div>

            {sustainableAddons && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a]/30 mb-3 mt-2">Sustainable Additions</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { Icon: FaLeaf,      label: 'Landscape',    color: '#22c55e' },
                    { Icon: FaCloudRain, label: 'Rainwater',    color: '#60a5fa' },
                    { Icon: FaSun,       label: 'Solar',        color: '#fbbf24' },
                    { Icon: FaRecycle,   label: 'Waste Mgmt',   color: '#f97316' },
                  ].map(({ Icon, label, color }) => (
                    <div key={label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#f7f3ee] border border-[#e8e4df]">
                      <Icon size={16} style={{ color }} />
                      <span className="text-[11px] font-semibold text-[#1a1a1a]/60">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={`mt-auto pt-4 border-t ${divider} flex gap-2`}>
              <Link
                to={ctaPrimary.to}
                className="flex-1 min-w-0 text-center py-3 rounded-xl bg-[#B85C38] !text-white text-[12px] font-bold tracking-wide hover:bg-[#a34e30] transition-colors duration-300 block leading-none"
              >
                {ctaPrimary.label}
              </Link>
              <a
                href={ctaSecondary.tel}
                className={`flex-1 min-w-0 text-center py-3 rounded-xl text-[12px] font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-1.5 leading-none ${callBtnCls}`}
              >
                <FiPhone size={11} /> Call
              </a>
            </div>
          </motion.div>

          {/* Column 2: Process Steps */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className={`rounded-2xl border ${card} p-6 flex flex-col`}
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-[#B85C38] mb-1">{processTitle}</p>
            <p className={`text-[13px] ${muted} font-light leading-relaxed mb-5`}>
              Click any step to see what happens.
            </p>
            <div className="flex-1">
              <Steps items={steps} dark={dark} />
            </div>
            <div className={`mt-5 pt-4 border-t ${divider}`}>
              <Link to={ctaProcess.to} className={`w-full text-center py-3 rounded-xl text-[12px] font-bold tracking-wide transition-all duration-300 block ${processBtnCls}`}>
                {ctaProcess.label} →
              </Link>
            </div>
          </motion.div>

          {/* Column 3: Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            className={`rounded-2xl border ${card} p-6 flex flex-col`}
          >
            {pricingBlock}
          </motion.div>

        </div>
      </div>
    </section>
  )
}

/* ── Build My Home Pricing ── */
function PricingCard({ label, price, unit, note, items }) {
  return (
    <div className="flex flex-col h-full">
      <p className="text-[10px] font-black uppercase tracking-widest text-[#B85C38] mb-2">{label}</p>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-black text-[2.6rem] text-[#1a1a1a] leading-none tracking-tighter">{price}</span>
        <span className="text-[#1a1a1a]/45 text-[15px] font-light">{unit}</span>
      </div>
      <p className="text-[11px] text-[#1a1a1a]/35 mb-6 leading-relaxed">{note}</p>

      <p className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a]/30 mb-3">Included at this rate</p>
      <div className="grid grid-cols-1 gap-1.5 flex-1">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f7f3ee] border border-[#e8e4df]">
            <FiCheck size={10} className="text-[#22c55e] flex-shrink-0" />
            <span className="text-[12px] text-[#1a1a1a]/60">{item}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-[#e8e4df]">
        <p className="text-[11px] text-[#1a1a1a]/35 leading-relaxed">
          Final pricing is prepared based on your approved design, specifications, built-up area and site conditions.
        </p>
      </div>
    </div>
  )
}

/* ── PMC Pricing ── */
function PMCPricingCard() {
  return (
    <div className="flex flex-col h-full">
      <p className="text-[10px] font-black uppercase tracking-widest text-[#B85C38] mb-4">PMC Fee Structure</p>

      <div className="grid grid-cols-1 gap-3 mb-5">
        {[
          { opt: 'Option A', val: '10%',    sub: 'of total project cost' },
          { opt: 'Option B', val: '₹100',   sub: 'per sq.ft.' },
        ].map((o) => (
          <div key={o.opt} className="p-4 rounded-xl bg-white/[0.06] border border-white/[0.1]">
            <p className="text-[9px] font-black uppercase tracking-widest text-[#B85C38] mb-1">{o.opt}</p>
            <p className="font-black text-[2rem] text-white leading-none mb-0.5">{o.val}</p>
            <p className="text-[11px] text-white/40">{o.sub}</p>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-5">
        <p className="text-[11px] font-bold text-amber-300 mb-1.5">⚠ Important</p>
        <p className="text-[12px] text-white/60 font-light leading-relaxed">
          <strong className="text-white font-bold">Construction cost ≠ PMC fee.</strong>{' '}
          The PMC fee covers planning, coordination, supervision and reporting — separate from all construction costs.
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-white/[0.07]">
        <p className="text-[11px] text-white/35 leading-relaxed">
          The fee option that works best depends on your total project cost and scope. We discuss this at the start.
        </p>
      </div>
    </div>
  )
}

/* ── Complete My Home Pricing ── */
function CompletePricingCard() {
  return (
    <div className="flex flex-col h-full">
      <p className="text-[10px] font-black uppercase tracking-widest text-[#B85C38] mb-3">Pricing Model</p>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-xl bg-[#B85C38]/10 flex items-center justify-center flex-shrink-0">
          <FiCheck size={20} className="text-[#B85C38]" />
        </div>
        <div>
          <p className="font-black text-[18px] text-[#1a1a1a] leading-tight">Scope-Based</p>
          <p className="text-[12px] text-[#1a1a1a]/45">Assessment first, then estimate</p>
        </div>
      </div>

      <p className="text-[13px] text-[#1a1a1a]/55 font-light leading-relaxed mb-6">
        Every incomplete home has a different condition and remaining scope. We assess first and prepare a 
        detailed itemised estimate — not a generic rate.
      </p>

      <div className="space-y-3 flex-1">
        {[
          ['Step 1', 'Book a site assessment'],
          ['Step 2', 'We evaluate existing work'],
          ['Step 3', 'Scope & estimate prepared'],
          ['Step 4', 'Work begins on approval'],
        ].map(([step, label]) => (
          <div key={step} className="flex items-center gap-3 p-3 rounded-xl bg-[#f7f3ee] border border-[#e8e4df]">
            <span className="text-[9px] font-black text-[#B85C38] bg-[#B85C38]/10 px-2 py-1 rounded-lg">{step}</span>
            <span className="text-[12.5px] text-[#1a1a1a]/65 font-medium">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-[#e8e4df]">
        <p className="text-[11px] text-[#1a1a1a]/35 leading-relaxed">
          No hidden costs. The estimate is prepared after assessment and agreed before any work begins.
        </p>
      </div>
    </div>
  )
}
