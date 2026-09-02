import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import homeHeroImage from '../assets/lancape.jpg'
import HangingWorker from './HangingWorker'


const HeroSection = () => {
 const ref = useRef(null)

 const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
 const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
 const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])


 return (
 <div
 ref={ref}
 className="relative w-full overflow-hidden bg-[#1a1a1a]"
 style={{
 height: 'calc(100vh - var(--nav-height, 100px))',
 marginTop: 'var(--nav-height, 100px)',
 }}
 >

 {/* ── Background Image with Parallax Effect ── */}
 <motion.div
 className="absolute inset-0 w-full h-full"
 style={{
 backgroundImage: `url(${homeHeroImage})`,
 backgroundSize: 'cover',
 backgroundPosition: 'center 30%',
 backgroundRepeat: 'no-repeat',
 y,
 opacity,
 }}
 />

 {/* ── Dynamic Gradient Overlay for Ultimate Readability & Visual Focus ── */}
 <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent pointer-events-none z-[5]" />
 
 {/* ── Overlay Content ── */}
 <div className="absolute inset-0 z-10 flex items-center justify-start">
 <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">

 {/* Content block — left-aligned, max half width so image breathes on the right */}
 <div className="max-w-md lg:max-w-lg">

 {/* Tagline */}
 <motion.span
 initial={{ opacity: 0, y: -15 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 0.2 }}
 className="inline-block text-[#B85C38] text-[10px] sm:text-xs font-bold tracking-[0.28em] uppercase mb-4"
 >
 Residential Design & Build
 </motion.span>

 {/* Main Heading */}
 <motion.h1
 initial={{ opacity: 0, x: -30 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl"
 >
 Build Your{' '}
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#B85C38] font-light">Dream Home</span>
 <br />with Expert Planning.
 </motion.h1>

 {/* Subtitle */}
 <motion.p
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 0.65 }}
 className="text-white/65 text-sm font-light leading-relaxed mt-4"
 >
 Tamil Nadu-based construction & PMC — transparent site execution, disciplined planning, responsible building.
 </motion.p>

 {/* CTA Buttons */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.9, delay: 0.85 }}
 className="mt-7 flex flex-row items-center gap-4"
 >
 <Link to="/contact" style={{ color: '#ffffff' }} className="group bg-[#B85C38] hover:bg-[#a34e30] text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase px-6 sm:px-8 py-3.5 rounded-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(184,92,56,0.5)] hover:-translate-y-0.5 flex items-center gap-2.5 whitespace-nowrap">
 <span style={{ color: '#ffffff' }}>Get Free Consultation</span>
 <svg style={{ color: '#ffffff' }} className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
 </Link>
 <Link to="/projects" className="bg-white/10 backdrop-blur-sm border border-white/25 text-white text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase px-6 sm:px-8 py-3.5 rounded-sm transition-all duration-400 hover:bg-white hover:text-[#1a1a1a] hover:-translate-y-0.5">
 View Our Work
 </Link>
 </motion.div>

 </div>
 </div>
 </div>

 {/* ── Hanging construction worker ad ── */}
 <HangingWorker />

 {/* ── Scroll cue ── */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 2 }}
 className="absolute bottom-6 right-6 sm:right-8 z-20 flex flex-col items-center gap-1"
 >
 <span className="text-white/60 text-[9px] tracking-[0.3em] uppercase rotate-90 origin-center mb-3">Scroll</span>
 <motion.div
 animate={{ y: [0, 6, 0] }}
 transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
 className="w-4 h-7 border border-white/35 rounded-full flex justify-center pt-1"
 >
 <div className="w-0.5 h-2 bg-white/60 rounded-full" />
 </motion.div>
 </motion.div>
 </div>
 )
}

export default HeroSection
