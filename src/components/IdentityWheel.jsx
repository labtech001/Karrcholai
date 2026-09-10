import React from 'react'
import { motion } from 'framer-motion'
import {
  FaLayerGroup, FaFistRaised, FaMedal, FaPaintBrush,
  FaYinYang, FaChartLine, FaHourglass, FaLeaf, FaBalanceScale,
} from 'react-icons/fa'

const LEFT_VALUES = [
  { letter:'K', label:'Keystone',      desc:'The foundation every great structure begins with — in planning, materials and people.', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5V21h-6v-6H9v6H3V10.5z"/></svg>, dark:true  },
  { letter:'A', label:'Architecture',  desc:'Thoughtful design balancing form, function and the life of those who live within.',     icon:<FaLayerGroup className="w-[18px] h-[18px]" />,                                                                                                                                       dark:false },
  { letter:'R', label:'Resilience',    desc:'Structures built to endure — not just inspections, but decades of real life.',           icon:<FaFistRaised className="w-[18px] h-[18px]" />,                                                                                                                                      dark:true  },
  { letter:'R', label:'Reliability',   desc:'Consistent delivery on every commitment, at every stage of the project.',               icon:<FaMedal className="w-[18px] h-[18px]" />,                                                                                                                                           dark:false },
  { letter:'C', label:'Craftsmanship', desc:'Precision in every finish. Quality that lives in the details long after handover.',      icon:<FaPaintBrush className="w-[18px] h-[18px]" />,                                                                                                                                      dark:true  },
]

const RIGHT_VALUES = [
  { letter:'H', label:'Harmony',       desc:'Balance between nature, space and the families who call it home.',                      icon:<FaYinYang className="w-[18px] h-[18px]" />,                                                                                                                                         dark:false },
  { letter:'O', label:'Optimization',  desc:'Smart use of resources. Every square foot, every rupee — thoughtfully maximised.',      icon:<FaChartLine className="w-[18px] h-[18px]" />,                                                                                                                                       dark:true  },
  { letter:'L', label:'Longevity',     desc:'We build for generations, not just occupancy certificates.',                             icon:<FaHourglass className="w-[18px] h-[18px]" />,                                                                                                                                       dark:false },
  { letter:'A', label:'Aesthetics',    desc:'Beauty that is purposeful, timeless and rooted in the culture of the home.',            icon:<FaLeaf className="w-[18px] h-[18px]" />,                                                                                                                                            dark:true  },
  { letter:'I', label:'Integrity',     desc:'Transparent, honest and accountable — from the first conversation to final handover.',  icon:<FaBalanceScale className="w-[18px] h-[18px]" />,                                                                                                                                    dark:false },
]

export default function IdentityWheel({ logoImg }) {
  return (
    <div className="w-full">

      {/* ══════════ DESKTOP ══════════ */}
      <div className="hidden lg:grid" style={{ gridTemplateColumns: '1fr 280px 1fr', alignItems: 'center', gap: 0 }}>

        {/* ── LEFT: 5 items stacked ── */}
        <div className="flex flex-col">
          {LEFT_VALUES.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.09 }}
              className="group flex items-center justify-end gap-0 cursor-default"
            >
              {/* Text block — right aligned */}
              <div className="text-right pr-5 py-5 flex-1">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <span className="font-black text-dark text-[17px] tracking-tight leading-none group-hover:text-secondary transition-colors duration-200">{v.label}</span>
                  <span style={{ color: v.dark ? '#7B1F3A' : '#C9754A', opacity: 0.75 }}>{v.icon}</span>
                </div>
                <p className="text-dark/50 text-[12.5px] leading-relaxed max-w-[240px] ml-auto">{v.desc}</p>
              </div>

              {/* Connector: tapered line → node */}
              <div className="flex items-center shrink-0">
                {/* Line */}
                <div style={{
                  width: 48,
                  height: 2,
                  background: v.dark
                    ? 'linear-gradient(to right, rgba(123,31,58,0.15), rgba(123,31,58,0.55))'
                    : 'linear-gradient(to right, rgba(201,117,74,0.15), rgba(201,117,74,0.55))',
                }} />
                {/* Badge */}
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg text-white shrink-0"
                  style={{
                    background: v.dark
                      ? 'linear-gradient(135deg,#7B1F3A,#9B2440)'
                      : 'linear-gradient(135deg,#A85A2E,#C9754A)',
                    boxShadow: v.dark
                      ? '0 4px 18px rgba(123,31,58,0.4), 0 0 0 3px rgba(123,31,58,0.12)'
                      : '0 4px 18px rgba(201,117,74,0.4), 0 0 0 3px rgba(201,117,74,0.12)',
                    zIndex: 2,
                  }}
                >{v.letter}</motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CENTER: Large logo medallion ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
          className="flex flex-col items-center justify-center"
          style={{ padding: '20px 0' }}
        >
          {/* Outer decorative rings */}
          <div className="relative flex items-center justify-center">
            {/* Ring 3 — outermost dashed */}
            <div className="absolute rounded-full" style={{
              width: 268, height: 268,
              border: '1px dashed rgba(201,117,74,0.2)',
            }} />
            {/* Ring 2 */}
            <div className="absolute rounded-full" style={{
              width: 246, height: 246,
              border: '1px solid rgba(201,117,74,0.12)',
            }} />
            {/* Ring 1 — closest */}
            <div className="absolute rounded-full" style={{
              width: 222, height: 222,
              border: '1.5px solid rgba(201,117,74,0.3)',
            }} />

            {/* Main disc */}
            <div
              className="relative flex flex-col items-center justify-center rounded-full z-10"
              style={{
                width: 200, height: 200,
                background: 'radial-gradient(circle at 38% 36%, #fffdf9, #f2e9d8)',
                boxShadow: '0 12px 50px rgba(123,31,58,0.15), 0 4px 16px rgba(0,0,0,0.08), inset 0 1px 2px rgba(255,255,255,0.8)',
              }}
            >
              <img
                src={logoImg}
                alt="Karrcholai"
                style={{ width: 124, height: 124, objectFit: 'contain' }}
              />
              <div style={{
                fontSize: 8.5,
                fontWeight: 900,
                letterSpacing: '0.38em',
                color: '#7B1F3A',
                textTransform: 'uppercase',
                marginTop: 6,
                lineHeight: 1,
              }}>KARRCHOLAI</div>
            </div>
          </div>

          {/* Letter row */}
          <div className="flex items-center gap-0.5 mt-5">
            {['K','A','R','R','C','H','O','L','A','I'].map((l, i) => (
              <span key={i} className="font-black text-[15px] leading-none"
                style={{ color: i % 2 === 0 ? '#C9754A' : '#7B1F3A' }}>{l}</span>
            ))}
          </div>
          <p className="text-[8px] uppercase tracking-[0.4em] text-dark/30 mt-1.5">Ten Principles</p>
        </motion.div>

        {/* ── RIGHT: 5 items stacked ── */}
        <div className="flex flex-col">
          {RIGHT_VALUES.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.09 }}
              className="group flex items-center justify-start gap-0 cursor-default"
            >
              {/* Badge → line */}
              <div className="flex items-center shrink-0">
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg text-white shrink-0"
                  style={{
                    background: v.dark
                      ? 'linear-gradient(135deg,#7B1F3A,#9B2440)'
                      : 'linear-gradient(135deg,#A85A2E,#C9754A)',
                    boxShadow: v.dark
                      ? '0 4px 18px rgba(123,31,58,0.4), 0 0 0 3px rgba(123,31,58,0.12)'
                      : '0 4px 18px rgba(201,117,74,0.4), 0 0 0 3px rgba(201,117,74,0.12)',
                    zIndex: 2,
                  }}
                >{v.letter}</motion.div>
                {/* Line */}
                <div style={{
                  width: 48,
                  height: 2,
                  background: v.dark
                    ? 'linear-gradient(to right, rgba(123,31,58,0.55), rgba(123,31,58,0.15))'
                    : 'linear-gradient(to right, rgba(201,117,74,0.55), rgba(201,117,74,0.15))',
                }} />
              </div>

              {/* Text block — left aligned */}
              <div className="text-left pl-5 py-5 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span style={{ color: v.dark ? '#7B1F3A' : '#C9754A', opacity: 0.75 }}>{v.icon}</span>
                  <span className="font-black text-dark text-[17px] tracking-tight leading-none group-hover:text-secondary transition-colors duration-200">{v.label}</span>
                </div>
                <p className="text-dark/50 text-[12.5px] leading-relaxed max-w-[240px]">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ══════════ MOBILE ══════════ */}
      <div className="lg:hidden">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute rounded-full" style={{ width: 164, height: 164, border: '1px dashed rgba(201,117,74,0.25)' }} />
            <div
              className="relative flex flex-col items-center justify-center rounded-full"
              style={{
                width: 148, height: 148,
                background: 'radial-gradient(circle at 38% 36%, #fffdf9, #f2e9d8)',
                border: '1.5px solid rgba(201,117,74,0.35)',
                boxShadow: '0 8px 32px rgba(123,31,58,0.14)',
              }}
            >
              <img src={logoImg} alt="Karrcholai" style={{ width: 90, height: 90, objectFit: 'contain' }} />
              <div style={{ fontSize: 7, fontWeight: 900, letterSpacing: '0.35em', color: '#7B1F3A', textTransform: 'uppercase', marginTop: 4 }}>KARRCHOLAI</div>
            </div>
          </div>
          <div className="flex gap-0.5 mt-4">
            {['K','A','R','R','C','H','O','L','A','I'].map((l, i) => (
              <span key={i} className="font-black text-[17px]" style={{ color: i%2===0?'#C9754A':'#7B1F3A' }}>{l}</span>
            ))}
          </div>
        </motion.div>

        {/* Cards 2-col */}
        <div className="grid grid-cols-2 gap-2.5">
          {[...LEFT_VALUES, ...RIGHT_VALUES].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="relative bg-white rounded-2xl p-4 border border-dark/6 hover:border-secondary/25 hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                style={{ background: item.dark ? 'linear-gradient(90deg,#7B1F3A,transparent)' : 'linear-gradient(90deg,#C9754A,transparent)' }} />
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm text-white shrink-0"
                  style={{ background: item.dark ? 'linear-gradient(135deg,#7B1F3A,#9B2440)' : 'linear-gradient(135deg,#A85A2E,#C9754A)' }}>
                  {item.letter}
                </div>
                <span style={{ color: item.dark ? '#7B1F3A' : '#C9754A', opacity: 0.7, fontSize: 13 }}>{item.icon}</span>
              </div>
              <div className="font-bold text-dark text-[13px] leading-tight">{item.label}</div>
              <div className="text-dark/40 text-[10px] mt-1 leading-snug">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  )
}
