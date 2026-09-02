import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from '../components/Navbar'
import UnifiedFooter from '../components/UnifiedFooter'
import {
  FaHardHat, FaClock, FaDollarSign, FaShieldAlt, FaQuoteLeft,
  FaProjectDiagram, FaHandHoldingUsd, FaStar, FaLeaf,
} from 'react-icons/fa'

import founderImg from '../../assets/Founder.jpeg'
import aboutBg from '../../assets/pic7.png'
import courtyardImg from '../../assets/img1.jpg'

import { Helmet } from 'react-helmet-async'

/* ─── Section ID anchors for nav ────────────────────────────── */
const SECTIONS = {
  story: 'our-story',
  founder: 'founder-thoughts',
  process: 'our-process',
}

const AboutUs = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  /* ── Process steps from the document ── */
  const processSteps = [
    {
      step: '01',
      title: 'Enquiry & Initial Discussion',
      desc: 'Every project starts with a conversation. We understand your basic requirements, site details, expectations, budget considerations and the type of home you want to create. We listen before we build.',
    },
    {
      step: '02',
      title: 'Requirement & Site Understanding',
      desc: 'We study your requirements and understand the site conditions. This helps us identify the practical considerations that may affect planning, design, cost and execution.',
    },
    {
      step: '03',
      title: 'Planning & Design Coordination',
      desc: 'Based on your requirements, we coordinate the planning process and work towards developing a practical solution for your residence — considering functionality, space utilisation, build feasibility, budget and your preferences.',
    },
    {
      step: '04',
      title: 'Estimation & Project Planning',
      desc: 'Before site work begins, we work towards establishing a clear understanding of the project scope, quantities, materials and expected costs. Proper planning at this stage helps minimise unexpected issues and material wastage.',
    },
    {
      step: '05',
      title: 'Agreement & Project Start',
      desc: 'Once the scope, responsibilities and project requirements are understood and agreed upon, we prepare for execution. The project is scheduled according to the agreed plan and the client\'s convenient timeline.',
    },
    {
      step: '06',
      title: 'Construction & Execution',
      desc: 'This is where the plan becomes reality. We coordinate the required teams, materials and activities at the site and execute the work through the different stages of the build — from foundation to finishing.',
    },
    {
      step: '07',
      title: 'Progress & Workmanship Monitoring',
      desc: 'Site work is continuously monitored against drawings and agreed specifications. We focus on proper execution, material usage, site coordination and progress, while keeping the client informed about important stages.',
    },
    {
      step: '08',
      title: 'Finishing & Handover',
      desc: 'Once site work is completed, finishing works and final checks are carried out. After ensuring that the agreed scope has been delivered, the residence is prepared for handover. Your new home is ready to move into.',
    },
  ]

  return (
    <div ref={containerRef} className="bg-cream min-h-screen text-dark selection:bg-secondary selection:text-white overflow-x-hidden">
      <Helmet>
        <title>About Us | Civil Engineers Tamil Nadu | Karrcholai Construction</title>
        <meta name="description" content="Meet Saravanakumar B., BE Civil Engineer and founder of Karrcholai Construction. 12+ years of residential construction and PMC in Tamil Nadu — built on strength, transparency, and sustainable living." />
        <link rel="canonical" href="https://karrcholai.com/about" />
        <meta property="og:title" content="About Karrcholai | Founder &amp; Our Story | Tamil Nadu Construction" />
        <meta property="og:description" content="Meet Saravanakumar B., founder of Karrcholai Construction. 12+ years of residential construction in Tamil Nadu — built on strength, transparency, and sustainable living." />
        <meta property="og:url" content="https://karrcholai.com/about" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://karrcholai.com/' },
            { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://karrcholai.com/about' },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Karrcholai Construction',
          url: 'https://karrcholai.com/about',
          description: 'About Karrcholai Construction — founded by Saravanakumar B., BE Civil Engineer, with 12+ years of residential construction and PMC experience in Tamil Nadu.',
          mainEntity: {
            '@type': 'Person',
            name: 'Saravanakumar B.',
            jobTitle: 'Founder & Civil Engineer',
            worksFor: { '@type': 'Organization', name: 'Karrcholai Construction', url: 'https://karrcholai.com' },
          },
        })}</script>
      </Helmet>

      <Navbar />

      <main>
        {/* ══════════════════════════════════════════
            1. HERO
        ══════════════════════════════════════════ */}
        <section
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            minHeight: '100svh',
            backgroundImage: `url(${aboutBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#000',
          }}
        >
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 pointer-events-none" />

          <div className="relative z-10 text-center px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <p className="text-secondary font-bold tracking-[0.4em] md:tracking-[0.6em] uppercase text-[10px] md:text-sm mb-4 md:mb-6 block">
                Building Excellence
              </p>
              <h1 className="text-5xl md:text-9xl font-black text-white uppercase tracking-tighter leading-tight md:leading-none mb-6 md:mb-8">
                ABOUT <span className="text-transparent stroke-text inline-block ml-2">US</span>
              </h1>
              <div className="flex items-center justify-center gap-3 md:gap-4 mb-8">
                <div className="h-[1px] w-8 md:w-12 bg-secondary/50" />
                <p className="text-white/60 text-[10px] md:text-lg font-light tracking-[0.2em] md:tracking-[0.3em] uppercase max-w-[200px] md:max-w-none mx-auto">
                  A Legacy of Strength &amp; Sustainability
                </p>
                <div className="h-[1px] w-8 md:w-12 bg-secondary/50" />
              </div>
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-white/55 text-[10px] uppercase tracking-[0.4em] rotate-90 mb-8">Scroll</span>
            <div className="w-[1px] h-20 bg-gradient-to-b from-secondary to-transparent" />
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            2. OUR STORY
        ══════════════════════════════════════════ */}
        <section id={SECTIONS.story} className="overflow-hidden">

          {/* ── PANEL A: Hero Intro — editorial split ── */}
          <div className="relative w-full flex flex-col lg:flex-row">
            {/* Left — large typographic statement */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative w-full lg:w-1/2 bg-[#0e0e0e] flex flex-col justify-between px-6 md:px-16 lg:px-20 py-16 md:py-24 lg:py-28 overflow-hidden"
            >
              {/* Big decorative number */}
              <div className="absolute -bottom-10 -left-6 text-[140px] md:text-[280px] font-black text-white/[0.03] leading-none select-none pointer-events-none">
                01
              </div>
              <div className="relative z-10">
                <p className="text-secondary text-[10px] font-black uppercase tracking-[0.45em] flex items-center gap-3 mb-8">
                  <span className="w-8 h-[1px] bg-secondary" />
                  Our Story
                </p>
                <h2 className="text-5xl md:text-8xl xl:text-[7rem] font-black text-white tracking-tighter leading-[0.88] mb-8">
                  From<br />
                  <span className="text-transparent" style={{ WebkitTextStroke: '2px #C9754A' }}>Stone</span><br />
                  to Oasis
                </h2>
                <p className="text-white/65 text-sm font-light leading-relaxed max-w-sm">
                  A story of discipline, purpose and the belief that every family deserves a residence built with clarity and care.
                </p>
              </div>
              <div className="relative z-10 flex gap-8 mt-12 pt-8 border-t border-white/10">
                {[
                  { num: '12+', label: 'Years Experience' },
                  { num: '40+', label: 'Projects' },
                  { num: '2021', label: 'Founded' },
                ].map((s) => (
                  <div key={s.num}>
                    <div className="text-2xl md:text-4xl font-black text-secondary tracking-tighter">{s.num}</div>
                    <div className="text-[9px] uppercase tracking-[0.25em] text-white/55 mt-1.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — quote + narrative */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
              className="w-full lg:w-1/2 bg-[#f8f6f3] flex flex-col justify-center px-6 md:px-16 lg:px-20 py-16 md:py-24 lg:py-28"
            >
              {/* Pull quote */}
              <div className="relative mb-10">
                <FaQuoteLeft className="text-secondary/20 text-4xl md:text-6xl absolute -top-3 -left-1 pointer-events-none" />
                <blockquote className="relative z-10 text-xl md:text-3xl font-light text-dark leading-[1.6] pl-4">
                  Every home begins with a dream. But turning that dream into reality requires more than bricks and drawings.{' '}
                  <span className="text-secondary font-semibold italic">It requires trust.</span>
                </blockquote>
              </div>
              <div className="space-y-4 text-[14px] md:text-[16px] text-dark/65 leading-[1.9]">
                <p>
                  Building a new residence should be exciting, not overwhelming. A home is one of the most important investments a family makes — it should be built with <strong className="text-dark">confidence, care and clarity</strong>.
                </p>
                <p>
                  With over <strong className="text-dark">12 years of experience in MNCs and private building firms</strong>, our founder gained deep knowledge of site practices, technical standards, workmanship verification, work sequencing and project management — the kind of discipline that most residential projects never see.
                </p>
                <p>
                  Working in MNC environments taught us the value of planning, systematic execution and completing projects within timeline. But residential construction showed us something different — that every family is unique, and every home must be too.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── PANEL B: The Problem — cinematic dark grid ── */}
          <div className="relative w-full bg-[#111] overflow-hidden py-16 md:py-28 px-6">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,117,74,0.08),_transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,117,74,0.06),_transparent_60%)] pointer-events-none" />

            <div className="container mx-auto max-w-7xl">
              {/* Header row */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-20 gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <p className="text-secondary text-[10px] font-black uppercase tracking-[0.45em] mb-4">Why KARRCHOLAI Began</p>
                  <h3 className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]">
                    We saw <br />
                    <span className="text-secondary">the problem.</span>
                  </h3>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="text-white/65 text-sm max-w-xs leading-relaxed"
                >
                  Homeowners were being let down — not by lack of money, but by lack of structure, discipline and accountability.
                </motion.p>
              </div>

              {/* Problem cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 md:mb-16">
                {[
                  { num: '01', label: 'Budget Overruns', desc: 'Families lost control of costs mid-project with no clear explanation or accountability.' },
                  { num: '02', label: 'Material Wastage', desc: 'Poor planning caused avoidable wastage — a direct loss to both wallets and the environment.' },
                  { num: '03', label: 'Inconsistent Quality', desc: 'Rework and poor workmanship created homes that needed fixing from day one.' },
                  { num: '04', label: 'Chaotic Coordination', desc: 'Multiple vendors with no unified oversight left homeowners overwhelmed and helpless.' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="group relative p-6 border border-white/8 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] hover:border-secondary/30 transition-all duration-500 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-secondary/0 via-secondary/0 to-secondary/0 group-hover:via-secondary/60 transition-all duration-700" />
                    <div className="text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-500 mb-3 tracking-tighter select-none">{item.num}</div>
                    <div className="text-secondary font-bold text-sm mb-2 tracking-wide">{item.label}</div>
                    <div className="text-white/60 text-[13px] leading-relaxed">{item.desc}</div>
                  </motion.div>
                ))}
              </div>

              {/* Solution statement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative p-6 md:p-12 rounded-2xl bg-secondary/10 border border-secondary/20 overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 w-60 h-60 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
                <p className="text-secondary text-[10px] font-black uppercase tracking-[0.45em] mb-4">The Answer</p>
                <p className="text-white text-base md:text-xl font-light leading-[1.8]">
                  In <strong className="text-secondary font-semibold">2021</strong>, KARRCHOLAI was founded with a simple purpose — to bring together the <strong className="text-white">discipline of professional construction</strong> with the flexibility, practicality and individuality required for residential homes. An approach where technical knowledge and Indian construction practices work together, while giving full importance to each client's unique requirements.
                </p>
              </motion.div>
            </div>
          </div>

          {/* ── PANEL C: KARR vs CHOLAI — full-bleed split ── */}
          <div className="relative w-full">
            {/* Section intro strip */}
            <div className="w-full bg-[#f0ede8] px-6 py-8 md:py-12 border-b border-dark/8">
              <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div>
                  <p className="text-secondary text-[10px] font-black uppercase tracking-[0.45em] mb-2">What We Stand For</p>
                  <h3 className="text-2xl md:text-4xl font-black text-dark tracking-tight">
                    Two names. One vision.
                  </h3>
                </div>
                <p className="text-dark/65 text-sm max-w-sm md:text-right leading-relaxed hidden md:block">
                  KARR and CHOLAI aren't just words — they are the two principles that guide every decision we make on every project.
                </p>
              </div>
            </div>

            {/* KARR + CHOLAI split panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* KARR */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative bg-[#1a1a1a] px-6 md:px-16 lg:px-20 py-12 md:py-20 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(201,117,74,0.12),_transparent_60%)] pointer-events-none" />
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-[140px] md:text-[220px] font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter">K</div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-7">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-secondary flex items-center justify-center shrink-0 shadow-lg shadow-secondary/20">
                      <span className="text-white font-black text-xl md:text-2xl">K</span>
                    </div>
                    <div>
                      <div className="text-secondary text-[10px] font-black uppercase tracking-[0.4em]">KARR</div>
                      <div className="text-white text-xl md:text-2xl font-bold mt-0.5">Strength &amp; Structure</div>
                    </div>
                  </div>

                  <p className="text-white/70 text-[14px] leading-relaxed mb-7 max-w-md">
                    KARR represents the stone — the foundation, the discipline, the unwavering commitment to getting every structural detail right. Good building comes from planning, coordination, verified workmanship and consistent site execution at every stage.
                  </p>

                  <div className="grid grid-cols-1 gap-0 divide-y divide-white/8">
                    {[
                      'Workmanship-focused site execution',
                      'Proper work sequencing',
                      'Technical standards & specifications',
                      'Disciplined project management',
                      'Transparent execution',
                      'Responsible material usage',
                      'Reducing unnecessary rework & wastage',
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
                        className="flex items-center gap-4 py-3 group/item"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                        <span className="text-[13px] text-white/75 group-hover/item:text-white/90 transition-colors duration-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* CHOLAI */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="relative bg-[#f8f6f0] px-6 md:px-16 lg:px-20 py-12 md:py-20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,117,74,0.08),_transparent_60%)] pointer-events-none" />
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-[140px] md:text-[220px] font-black text-dark/[0.04] leading-none select-none pointer-events-none tracking-tighter">C</div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-7">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-dark flex items-center justify-center shrink-0 shadow-xl shadow-dark/10">
                      <span className="text-secondary font-black text-xl md:text-2xl">C</span>
                    </div>
                    <div>
                      <div className="text-secondary text-[10px] font-black uppercase tracking-[0.4em]">CHOLAI</div>
                      <div className="text-dark text-xl md:text-2xl font-bold mt-0.5">Greenery &amp; Sustainability</div>
                    </div>
                  </div>

                  <p className="text-dark/60 text-[14px] leading-relaxed mb-7 max-w-md">
                    CHOLAI represents the oasis — life, nature and the environment around the home. Sustainability is not an optional feature to be added at the end. It should be woven into every decision from the very beginning of a project.
                  </p>

                  <div className="grid grid-cols-1 gap-3 mb-7">
                    {[
                      { icon: '🌿', label: 'Landscaping & Greenery', desc: 'Creating healthier, more pleasant living spaces' },
                      { icon: '💧', label: 'Rainwater Harvesting', desc: 'Conserving and managing water responsibly' },
                      { icon: '☀️', label: 'Solar Energy', desc: 'Reducing dependence on conventional energy' },
                      { icon: '♻️', label: 'Waste Management', desc: 'Minimising construction impact on the environment' },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.05 + i * 0.08 }}
                        className="flex items-center gap-3 p-3 bg-white rounded-xl border border-dark/6 hover:border-secondary/30 hover:shadow-md transition-all duration-300 group/card"
                      >
                        <span className="text-xl shrink-0">{item.icon}</span>
                        <div>
                          <div className="text-sm font-bold text-dark group-hover/card:text-secondary transition-colors duration-300">{item.label}</div>
                          <div className="text-[11px] text-dark/65 mt-0.5">{item.desc}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-4 bg-secondary/8 rounded-xl border-l-2 border-secondary">
                    <p className="text-[12px] text-dark/60 italic leading-relaxed">
                      We also honour traditional Indian construction — red oxide flooring, tile roofing, <em>Marabu Kattumanam</em> — thoughtfully combined with modern standards where appropriate.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── PANEL D: Responsibility — full-width cinematic ── */}
          <div className="relative w-full bg-[#0a0a0a] overflow-hidden py-16 md:py-28 px-6">
            <div className="absolute top-0 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-secondary/6 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12 md:mb-20"
              >
                <p className="text-secondary text-[10px] font-black uppercase tracking-[0.5em] mb-4">Our Responsibility</p>
                <h3 className="text-3xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                  More than <span className="text-secondary">building</span><br className="hidden md:block" /> a house.
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 md:mb-14">
                {[
                  { title: 'Resources & Earth', body: 'Every building consumes resources from the Earth. Materials are extracted, processed and transported before they reach a site. Some natural resources cannot simply be recreated.' },
                  { title: 'Waste is Real Loss', body: 'Unnecessary material wastage and avoidable rework are not just financial losses — they are losses to our environment. Every wasted material represents a cost paid twice.' },
                  { title: 'Building for Tomorrow', body: 'For us, sustainability means thinking about society and future generations. The resources we use today are connected to tomorrow — that responsibility guides every decision we make.' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    className="relative p-6 md:p-8 rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden group hover:border-secondary/25 transition-all duration-500"
                  >
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-secondary to-secondary/30 group-hover:w-full transition-all duration-700 ease-out" />
                    <div className="w-8 h-[2px] bg-secondary mb-5" />
                    <h4 className="text-white font-bold text-base mb-3 tracking-wide">{item.title}</h4>
                    <p className="text-white/65 text-[13px] leading-relaxed">{item.body}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative text-center px-5 md:px-6 py-8 md:py-10 rounded-2xl overflow-hidden border border-secondary/20 bg-gradient-to-r from-secondary/10 via-secondary/5 to-secondary/10"
              >
                <p className="text-white/60 text-[10px] uppercase tracking-[0.5em] mb-3">This is the responsibility we carry</p>
                <p className="text-white text-base md:text-2xl font-light leading-relaxed max-w-3xl mx-auto">
                  We want to build residences that are <strong className="text-secondary">strong in structure</strong>, practical in living, thoughtful in resource use and respectful of nature — because we are not simply building for today.
                </p>
                <p className="text-secondary font-bold text-sm uppercase tracking-[0.3em] mt-5">We are building with tomorrow in mind.</p>
              </motion.div>
            </div>
          </div>

          {/* ── PANEL E: Closing — minimal light statement ── */}
          <div className="relative w-full bg-[#f5f2ee] overflow-hidden px-4 md:px-6 py-12 md:py-20">
            <div className="relative z-10 container mx-auto max-w-7xl">
              <div className="flex flex-col md:flex-row items-stretch gap-3 rounded-2xl overflow-hidden border border-dark/8">

                {/* Karr tile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="flex-1 bg-white px-6 md:px-8 py-8 md:py-10 flex flex-col justify-between md:border-r border-b md:border-b-0 border-dark/8"
                >
                  <div>
                    <div className="text-3xl md:text-6xl font-black text-dark tracking-tighter mb-2">Karr</div>
                    <div className="text-dark/55 text-[9px] font-bold uppercase tracking-[0.4em]">Stone · Strength · Structure</div>
                  </div>
                  <p className="text-dark/65 text-sm leading-relaxed mt-6">
                    Gives the home its <strong className="text-dark">strength.</strong>
                  </p>
                </motion.div>

                {/* Center — brand statement */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="flex-[2] bg-[#f5f2ee] px-6 md:px-14 py-8 md:py-10 flex flex-col items-center justify-center text-center md:border-r border-b md:border-b-0 border-dark/8"
                >
                  <p className="text-dark/65 text-[9px] font-black uppercase tracking-[0.5em] mb-3">Together</p>
                  <h4 className="text-lg md:text-2xl font-black text-dark tracking-tight leading-tight mb-3">
                    A house should be more than a structure.
                  </h4>
                  <p className="text-dark/65 text-[13px] leading-relaxed max-w-sm mb-6">
                    A place where people and nature can exist together responsibly — built with tomorrow in mind.
                  </p>
                  <div className="px-5 py-2.5 border border-dark/15 text-dark/65 text-[9px] font-black uppercase tracking-[0.35em] rounded-full hover:border-secondary/50 hover:text-secondary transition-all duration-300 cursor-default text-center">
                    From Stone to Oasis — We Build Better Living
                  </div>
                </motion.div>

                {/* Cholai tile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="flex-1 bg-white px-6 md:px-8 py-8 md:py-10 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-3xl md:text-6xl font-black text-dark tracking-tighter mb-2">Cholai</div>
                    <div className="text-dark/55 text-[9px] font-bold uppercase tracking-[0.4em]">Oasis · Life · Sustainability</div>
                  </div>
                  <p className="text-dark/65 text-sm leading-relaxed mt-6">
                    Gives the home its <strong className="text-dark">life.</strong>
                  </p>
                </motion.div>

              </div>
            </div>
          </div>

        </section>

        {/* ══════════════════════════════════════════
            3. MEET THE FOUNDER
        ══════════════════════════════════════════ */}
        <section id={SECTIONS.founder} className="overflow-hidden">

          {/* ── Founder Hero — full-bleed split ── */}
          <div className="relative w-full flex flex-col lg:flex-row items-stretch">

            {/* Left — photo panel */}
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="relative w-full lg:w-5/12 lg:self-stretch overflow-hidden"
            >
              {/* Mobile: natural flow image with aspect ratio */}
              <div className="block lg:hidden relative w-full aspect-[4/5]">
                <img
                  src={founderImg}
                  alt="Saravanakumar B., founder of Karrcholai Construction"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/30 to-transparent" />
                {/* Name badge — mobile only */}
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-xl font-black text-white tracking-tight">Saravanakumar B.</h3>
                  <p className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] mt-1">Founder & Civil Engineer</p>
                </div>
              </div>

              {/* Desktop: absolute fill */}
              <div className="hidden lg:block absolute inset-0">
                <img
                  src={founderImg}
                  alt="Saravanakumar B., founder of Karrcholai Construction"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0e0e0e]" />
              </div>
            </motion.div>

            {/* Right — content panel */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
              className="relative w-full lg:w-7/12 bg-[#0e0e0e] flex flex-col justify-center px-6 md:px-16 lg:px-20 py-14 md:py-24 lg:py-28 overflow-hidden"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[120px] md:text-[260px] font-black text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter">02</div>

              <div className="relative z-10">
                <p className="text-secondary text-[10px] font-black uppercase tracking-[0.45em] flex items-center gap-3 mb-6">
                  <span className="w-8 h-[1px] bg-secondary" />
                  Meet the Founder
                </p>

                {/* Name — desktop only */}
                <div className="hidden lg:block mb-8">
                  <h2 className="text-5xl xl:text-6xl font-black text-white tracking-tighter leading-[0.9]">Saravanakumar B.</h2>
                  <p className="text-secondary text-sm font-bold uppercase tracking-[0.3em] mt-3">BE Civil Engineer · Founder, Karrcholai Construction</p>
                </div>

                <div className="space-y-4 text-[14px] text-white/75 leading-[1.9]">
                  <p>
                    With more than <strong className="text-white">12 years of professional experience</strong>, my journey has been shaped by practical site experience, disciplined project execution and a strong belief in honest, responsible building practices.
                  </p>
                  <p>
                    Exposure to <strong className="text-white">MNC and Private Limited companies</strong> gave me structured project environments, technical standards and large-scale execution experience. Work with an <strong className="text-white">Architectural firm</strong> deepened my understanding of design intent, space planning and the integration of architecture with build reality.
                  </p>
                  <p>
                    For me, construction is not simply about creating structures — it is about creating <strong className="text-white">spaces for life.</strong>
                  </p>
                  <p>
                    This belief became the foundation for starting <span className="text-secondary font-semibold">Karrcholai Construction in 2021</span> — with a focus on disciplined execution, transparency, cost-conscious planning and long-term value for every client.
                  </p>
                </div>

                {/* Credential pills */}
                <div className="flex flex-wrap gap-2 mt-8">
                  {['12+ Years Experience', 'BE Civil Engineer', 'MNC Background', 'Architectural Exposure', 'Project Management'].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 border border-white/10 rounded-full text-[10px] text-white/65 font-semibold uppercase tracking-wide hover:border-secondary/40 hover:text-secondary/70 transition-colors duration-300">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Signature */}
                <div className="mt-10 pt-7 border-t border-white/8">
                  <p className="text-white/55 text-[10px] uppercase tracking-[0.3em] mb-1">With regards,</p>
                  <p className="text-white font-black text-xl tracking-tight">Saravanakumar B.</p>
                  <p className="text-secondary text-[10px] font-bold uppercase tracking-[0.25em] mt-0.5">Founder & Civil Engineer</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Founder Thoughts — full-width cinematic ── */}
          <div className="relative w-full overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${courtyardImg})` }}
            />
            <div className="absolute inset-0 bg-[#0a0a0a]/82" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,117,74,0.08),_transparent_70%)]" />

            <div className="relative z-10 container mx-auto max-w-7xl px-6 py-16 md:py-28">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="text-secondary text-[10px] font-black uppercase tracking-[0.45em] mb-4">My Thoughts on Construction</p>
                  <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[0.92] mb-6">
                    A home is where <br /><span className="text-secondary">life happens.</span>
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed max-w-sm">
                    Every decision on a construction site has consequences — for the family, for the budget, and for the environment.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="space-y-4"
                >
                  {[
                    'Construction is not just about building a structure. It is about creating a space where life happens.',
                    'A good house must have a strong foundation, proper planning, correct materials, and disciplined execution — not just good looks.',
                    'Most problems in construction come from poor planning and lack of supervision. That is why I always follow a systematic approach in every project.',
                  ].map((text, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                      className="flex items-start gap-3 p-4 rounded-xl border border-white/8 bg-white/[0.03] hover:border-secondary/25 hover:bg-white/[0.05] transition-all duration-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                      <p className="text-white/60 text-[13px] md:text-[14px] leading-relaxed">{text}</p>
                    </motion.div>
                  ))}
                  <div className="pt-3 pl-4">
                    <p className="text-secondary font-bold text-sm uppercase tracking-[0.3em]">
                      Build with responsibility, clarity, and long-term thinking.
                    </p>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>

        </section>

        {/* ══════════════════════════════════════════
            4. OUR PROCESS
        ══════════════════════════════════════════ */}
        <section id={SECTIONS.process} className="overflow-hidden bg-[#f8f6f3]">

          {/* Process header band */}
          <div className="w-full bg-[#f8f6f3] px-6 pt-16 md:pt-28 pb-10 md:pb-14">
            <div className="container mx-auto max-w-7xl">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <p className="text-secondary text-[10px] font-black uppercase tracking-[0.45em] flex items-center gap-3 mb-3">
                    <span className="w-8 h-[1px] bg-secondary" />
                    Our Process
                  </p>
                  <h2 className="text-4xl md:text-7xl font-black text-dark tracking-tighter leading-[0.9]">
                    From Dream<br /><span className="text-secondary">to Home.</span>
                  </h2>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="max-w-md"
                >
                  <p className="text-dark/70 text-[14px] md:text-[15px] leading-relaxed mb-5">
                    Building a new residence should be organised, transparent, and stress-free — not confusing. We follow a systematic process from your first enquiry to final handover.
                  </p>
                  <div className="flex flex-wrap gap-2 items-center text-[10px] font-black uppercase tracking-[0.3em]">
                    {['Listen', 'Plan', 'Execute', 'Monitor', 'Deliver'].map((word, i, arr) => (
                      <React.Fragment key={word}>
                        <span className="text-secondary">{word}</span>
                        {i < arr.length - 1 && <span className="text-dark/55 font-normal">→</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Process steps — horizontal card scroll on mobile, 4-col grid on desktop */}
          <div className="w-full px-6 pb-20 md:pb-28 bg-[#f8f6f3]">
            <div className="container mx-auto max-w-7xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {processSteps.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.06 }}
                    className="group relative bg-white rounded-2xl p-7 border border-dark/5 hover:border-secondary/25 hover:shadow-xl transition-all duration-500 overflow-hidden"
                  >
                    {/* Hover fill */}
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-secondary to-secondary/40 group-hover:w-full transition-all duration-600 ease-out" />

                    <div className="relative z-10">
                      <div className="text-4xl font-black text-secondary/12 group-hover:text-secondary/25 transition-colors duration-400 tracking-tighter select-none mb-5 leading-none">
                        {item.step}
                      </div>
                      <h4 className="text-[15px] font-bold text-dark mb-3 leading-snug tracking-tight group-hover:text-secondary transition-colors duration-300">{item.title}</h4>
                      <p className="text-[12px] md:text-[13px] text-dark/65 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Closing line */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="mt-12 flex items-center gap-4"
              >
                <div className="h-[1px] flex-1 bg-dark/8" />
                <p className="text-secondary text-[10px] font-black uppercase tracking-[0.4em] shrink-0">
                  From the First Conversation to the Final Handover
                </p>
                <div className="h-[1px] flex-1 bg-dark/8" />
              </motion.div>
            </div>
          </div>

        </section>

        {/* ══════════════════════════════════════════
            5. CORE PHILOSOPHY
        ══════════════════════════════════════════ */}
        <section className="overflow-hidden bg-[#0e0e0e]">
          <div className="relative w-full px-6 py-16 md:py-28">
            <div className="absolute top-0 left-1/3 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-secondary/4 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto max-w-7xl relative z-10">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 md:mb-20 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <p className="text-secondary text-[10px] font-black uppercase tracking-[0.45em] flex items-center gap-3 mb-3">
                    <span className="w-8 h-[1px] bg-secondary" />
                    How We Operate
                  </p>
                  <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]">
                    Our Core <br /><span className="text-secondary">Philosophy.</span>
                  </h2>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="text-white/60 text-sm max-w-xs leading-relaxed"
                >
                  Three non-negotiable principles that guide every project we take on.
                </motion.p>
              </div>

              {/* Philosophy cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                {[
                  {
                    num: '01',
                    icon: <FaHardHat size={20} />,
                    title: 'Structured Planning',
                    desc: 'Every successful project begins with thorough pre-construction planning. We review drawings, budgets, and timelines before work begins — ensuring clarity and alignment from the start.',
                  },
                  {
                    num: '02',
                    icon: <FaShieldAlt size={20} />,
                    title: 'Stage-wise Site Verification',
                    desc: 'Work is checked against drawings and specifications at each critical stage — foundation, structure, roofing, finishing. On-site supervision ensures materials and workmanship meet the agreed contract throughout.',
                  },
                  {
                    num: '03',
                    icon: <FaDollarSign size={20} />,
                    title: 'Transparent Cost Management',
                    desc: 'Detailed cost breakdowns and proactive updates on any variations. Our clients always know where their investment is going — no unexpected charges mid-project.',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    className="group relative p-6 md:p-10 rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-secondary/30 transition-all duration-500 overflow-hidden"
                  >
                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-secondary to-secondary/30 group-hover:w-full transition-all duration-700 ease-out" />
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                          {item.icon}
                        </div>
                        <span className="text-3xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-300 tracking-tighter select-none">{item.num}</span>
                      </div>
                      <h4 className="text-white font-bold text-base md:text-lg mb-3 tracking-tight group-hover:text-secondary transition-colors duration-300">{item.title}</h4>
                      <p className="text-white/65 text-[13px] leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Advantage strip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-6 md:mt-8 p-6 md:p-10 rounded-2xl bg-secondary/8 border border-secondary/15 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-16"
              >
                <div className="shrink-0">
                  <p className="text-secondary text-[10px] font-black uppercase tracking-[0.4em] mb-2">The Advantage</p>
                  <h4 className="text-white text-xl md:text-3xl font-black tracking-tighter leading-tight">
                    Engineering expertise<br />you can trust.
                  </h4>
                </div>
                <div className="w-full h-[1px] md:w-[1px] md:h-16 bg-white/10 md:shrink-0" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full">
                  {[
                    { title: 'Structured Planning', icon: <FaProjectDiagram /> },
                    { title: 'Cost Transparency', icon: <FaHandHoldingUsd /> },
                    { title: 'Site Supervision', icon: <FaShieldAlt /> },
                    { title: 'Timely Delivery', icon: <FaClock /> },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 md:gap-3 group/pill">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-secondary text-sm shrink-0 group-hover/pill:bg-secondary group-hover/pill:text-white transition-all duration-300">
                        {item.icon}
                      </div>
                      <span className="text-white/70 text-[11px] md:text-[12px] font-semibold leading-tight group-hover/pill:text-white/80 transition-colors duration-300">{item.title}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            6. CLIENT TESTIMONIALS
        ══════════════════════════════════════════ */}
        <section className="overflow-hidden bg-[#f8f6f3]">
          <div className="w-full px-6 py-16 md:py-28">
            <div className="container mx-auto max-w-7xl">

              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 md:mb-20 gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <p className="text-secondary text-[10px] font-black uppercase tracking-[0.45em] flex items-center gap-3 mb-3">
                    <span className="w-8 h-[1px] bg-secondary" />
                    Client Testimonials
                  </p>
                  <h2 className="text-3xl md:text-6xl font-black text-dark tracking-tighter leading-[0.9]">
                    Hear from our <br /><span className="text-secondary">homeowners.</span>
                  </h2>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="text-dark/65 text-sm max-w-xs leading-relaxed"
                >
                  Real feedback from families who trusted us with their most important investment.
                </motion.p>
              </div>

              {/* Testimonial cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    name: 'Mrs. Elumalai Mohanavalli',
                    role: 'Homeowner',
                    image: 'https://ui-avatars.com/api/?name=Mohanavalli&background=2D4B37&color=ffffff&size=150&bold=true',
                    feedback: 'The KARRCHOLAI team impressed with their professionalism and dedication. From planning to execution, they demonstrated a keen eye for detail and a commitment to excellence.',
                    delay: 0,
                  },
                  {
                    name: 'Mrs. Naatrayan Karthiga Devi',
                    role: 'Homeowner',
                    image: 'https://ui-avatars.com/api/?name=Karthiga+Devi&background=B85C38&color=ffffff&size=150&bold=true',
                    feedback: 'We entrusted KARRCHOLAI with our home and their dedication to quality craftsmanship and attention to detail truly shines through in every corner. Thank you for turning our house into a haven.',
                    delay: 0.1,
                  },
                  {
                    name: 'Mrs. Mohanraj Priya',
                    role: 'Homeowner',
                    image: 'https://ui-avatars.com/api/?name=Mohanraj+Priya&background=4A7B5E&color=ffffff&size=150&bold=true',
                    feedback: 'Choosing KARRCHOLAI for our building renovation was the best decision we made. Their expertise and commitment to quality gave our building a new lease on life.',
                    delay: 0.2,
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: item.delay }}
                    className="group relative bg-white rounded-2xl p-6 md:p-8 border border-dark/5 hover:border-secondary/20 hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col"
                  >
                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-secondary to-secondary/30 group-hover:w-full transition-all duration-700 ease-out" />
                    <div className="absolute -top-8 -right-8 w-28 h-28 bg-secondary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                    <div className="relative z-10 flex-1">
                      <div className="flex items-center gap-1 mb-4 text-[#FFB01F] text-xs">
                        {[...Array(5)].map((_, j) => <FaStar key={j} />)}
                      </div>
                      <FaQuoteLeft className="text-secondary/15 text-xl mb-3 group-hover:text-secondary/30 transition-colors duration-500" />
                      <p className="text-dark/65 text-[13px] md:text-[14px] leading-relaxed mb-6">"{item.feedback}"</p>
                    </div>

                    <div className="relative z-10 flex items-center gap-3 pt-4 border-t border-dark/6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-full border-2 border-white shadow-md group-hover:border-secondary transition-colors duration-300 shrink-0"
                      />
                      <div>
                        <h4 className="text-[13px] font-bold text-dark tracking-tight group-hover:text-secondary transition-colors duration-300 leading-snug">{item.name}</h4>
                        <p className="text-[10px] text-dark/60 font-semibold uppercase tracking-wider mt-0.5">{item.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </section>

      </main>

      <UnifiedFooter />
    </div>
  )
}

export default AboutUs
