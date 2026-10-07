/**
 * IdentityPencil — KARRCHOLAI Our Identity
 *
 * Layout matches sketch exactly:
 * - KARRCHOLAI heading at top center
 * - Left column: K(1), A(2), R(3), R(4) — small boxes stacked vertically
 * - Right column: I(10), A(9), L(8), O(7) — small boxes stacked vertically
 * - Center bottom: C(5) and H(6) as tall vertical pillars
 * - Logo centered in the middle
 * - Lines from each heading letter → its card, crossing through center
 */

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import logoImg from '../assets/KARRCHOLAI LOGO.png'

const TERRA = '#B85C38'
const WINE  = '#7a1d35'
const INK   = '#1a1a1a'
const GOLD  = '#C9A84C'
const GREEN = '#2D6A4F'
const STEEL = '#3a6ea8'

const PRINCIPLES = [
  { i:0, ch:'K', word:'Keystone',      color: WINE,  desc:'The irreplaceable anchor every great structure begins from.' },
  { i:1, ch:'A', word:'Architecture',  color: TERRA, desc:'Thoughtful design balancing form, function and family life.' },
  { i:2, ch:'R', word:'Resilience',    color: WINE,  desc:'Structures engineered to endure decades of real life.' },
  { i:3, ch:'R', word:'Reliability',   color: GOLD,  desc:'Consistent delivery on every promise at every stage.' },
  { i:4, ch:'C', word:'Craftsmanship', color: TERRA, desc:'Precision in every finish — quality that lives in the details.' },
  { i:5, ch:'H', word:'Harmony',       color: GREEN, desc:'Balance between nature, space, Vastu and the families who call it home.' },
  { i:6, ch:'O', word:'Optimization',  color: GOLD,  desc:'Every square foot, every rupee maximised without compromise.' },
  { i:7, ch:'L', word:'Longevity',     color: WINE,  desc:'We build for generations, not just occupancy certificates.' },
  { i:8, ch:'A', word:'Aesthetics',    color: TERRA, desc:'Timeless beauty rooted in Tamil culture.' },
  { i:9, ch:'I', word:'Integrity',     color: STEEL, desc:'Transparent, honest and accountable from first conversation to handover.' },
]

/*
  MESSY DEFAULT + CORRECT ON HOVER
  
  Each line has two endpoints:
  - messy: connects to a shuffled/wrong card (creates crossing web)
  - correct: connects to its actual matching card
  
  Default state → all messy endpoints shown (chaos web)
  Hover → that line morphs to correct endpoint + highlights
*/

// Shuffled mapping for the "messy" default look
// Designed to maximally cross through the center
const MESSY_MAP = [6, 9, 4, 7, 1, 8, 2, 5, 3, 0]

function AllLines({ letterRefs, cardRefs, containerRef, activeIdx }) {
  const [lines, setLines] = useState([])

  useEffect(() => {
    const compute = () => {
      if (!containerRef.current) return
      const cRect = containerRef.current.getBoundingClientRect()
      const result = []

      PRINCIPLES.forEach(({ i, color }) => {
        const lr = letterRefs[i]?.current
        const crCorrect = cardRefs[i]?.current           // correct card
        const crMessy   = cardRefs[MESSY_MAP[i]]?.current // messy card

        if (!lr || !crCorrect || !crMessy) return

        const lR  = lr.getBoundingClientRect()
        const cRc = crCorrect.getBoundingClientRect()
        const cRm = crMessy.getBoundingClientRect()

        result.push({
          i, color,
          // origin — bottom center of letter
          x1: lR.left + lR.width / 2 - cRect.left,
          y1: lR.bottom - cRect.top,
          // correct target
          cx2: cRc.left + cRc.width / 2 - cRect.left,
          cy2: cRc.top  - cRect.top + 8,
          // messy target
          mx2: cRm.left + cRm.width / 2 - cRect.left,
          my2: cRm.top  - cRect.top + 8,
        })
      })

      setLines(result)
    }

    const t = setTimeout(compute, 250)
    window.addEventListener('resize', compute)
    return () => { clearTimeout(t); window.removeEventListener('resize', compute) }
  }, [letterRefs, cardRefs, containerRef])

  if (!lines.length) return null

  return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:3, overflow:'visible' }}>
      <defs>
        {lines.map(l => {
          const isActive = activeIdx === l.i
          const x2 = isActive ? l.cx2 : l.mx2
          const y2 = isActive ? l.cy2 : l.my2
          return (
            <linearGradient key={`lg${l.i}`} id={`lg${l.i}`}
              x1={l.x1} y1={l.y1} x2={x2} y2={y2}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%"   stopColor={l.color} stopOpacity={isActive ? '1'   : activeIdx === null ? '0.5'  : '0.06'} />
              <stop offset="100%" stopColor={l.color} stopOpacity={isActive ? '0.7' : activeIdx === null ? '0.18' : '0.03'} />
            </linearGradient>
          )
        })}
      </defs>

      {lines.map(l => {
        const isActive = activeIdx === l.i
        // use correct endpoint when active, messy when not
        const x2 = isActive ? l.cx2 : l.mx2
        const y2 = isActive ? l.cy2 : l.my2

        return (
          <motion.line
            key={l.i}
            x1={l.x1} y1={l.y1}
            x2={x2} y2={y2}
            stroke={`url(#lg${l.i})`}
            strokeWidth={isActive ? 2.5 : 1.1}
            strokeDasharray={isActive ? 'none' : '5 4'}
            animate={{ x2, y2 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          />
        )
      })}

      {/* dot at correct card end when hovering */}
      {activeIdx !== null && lines[activeIdx] && (
        <motion.circle
          cx={lines[activeIdx].cx2}
          cy={lines[activeIdx].cy2}
          r="5"
          fill={lines[activeIdx].color}
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </svg>
  )
}

/* ─── Small square card (left & right columns) ─── */
function SmallCard({ p, cardRef, active, onHover, onLeave }) {
  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => onHover(p.i)}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, x: p.i <= 3 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: 0.1 + (p.i <= 3 ? p.i : 9 - p.i) * 0.08 }}
      style={{
        background: active ? p.color : '#fff',
        border: `1.5px solid ${active ? p.color : p.color + '35'}`,
        borderRadius: 10,
        padding: '14px 14px 12px',
        cursor: 'default',
        transition: 'all 0.25s',
        boxShadow: active ? `0 10px 28px ${p.color}45` : `0 2px 12px rgba(0,0,0,0.07)`,
        minWidth: 110,
      }}
    >
      <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.4em', color: active ? 'rgba(255,255,255,0.5)' : `${p.color}70`, marginBottom: 5, transition:'color 0.25s' }}>
        {String(p.i + 1).padStart(2, '0')}
      </div>
      <div style={{ fontSize: 36, fontWeight: 400, lineHeight: 1, fontFamily: '"Lora", Georgia, serif', fontStyle: 'italic', color: active ? '#fff' : p.color, marginBottom: 5, transition:'color 0.25s' }}>
        {p.ch}
      </div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: active ? '#fff' : INK, marginBottom: 5, fontFamily: '"Manrope", sans-serif', transition:'color 0.25s' }}>
        {p.word}
      </div>
      <div style={{ fontSize: 10, lineHeight: 1.55, color: active ? 'rgba(255,255,255,0.72)' : 'rgba(26,26,26,0.42)', transition:'color 0.25s' }}>
        {p.desc}
      </div>
    </motion.div>
  )
}

/* ─── Tall pillar card (center bottom) ─── */
function PillarCard({ p, cardRef, active, onHover, onLeave }) {
  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => onHover(p.i)}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.3 }}
      style={{
        background: active
          ? `linear-gradient(160deg, ${p.color}, ${p.color}cc)`
          : `linear-gradient(160deg, #fff 0%, ${p.color}10 100%)`,
        border: `1.5px solid ${active ? p.color : p.color + '35'}`,
        borderRadius: 14,
        padding: '20px 16px 20px',
        cursor: 'default',
        transition: 'all 0.3s',
        boxShadow: active ? `0 16px 48px ${p.color}50` : `0 4px 20px rgba(0,0,0,0.08)`,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 220,
      }}
    >
      {/* ghost letter bg */}
      <div style={{
        position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
        fontSize: 72, fontWeight: 700, fontStyle: 'italic',
        fontFamily: '"Lora", Georgia, serif',
        color: active ? 'rgba(255,255,255,0.12)' : `${p.color}10`,
        lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        transition: 'color 0.3s',
      }}>{p.ch}</div>

      <div style={{ position: 'relative', zIndex: 1, marginTop: 50 }}>
        <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.5em', color: active ? 'rgba(255,255,255,0.5)' : `${p.color}70`, marginBottom: 10, transition:'color 0.3s' }}>
          {String(p.i + 1).padStart(2, '0')}
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: '"Manrope", sans-serif', color: active ? '#fff' : p.color, marginBottom: 10, transition:'color 0.3s' }}>
          {p.word}
        </div>
        <div style={{ fontSize: 12, lineHeight: 1.65, color: active ? 'rgba(255,255,255,0.75)' : 'rgba(26,26,26,0.5)', maxWidth: 170, margin: '0 auto', transition:'color 0.3s' }}>
          {p.desc}
        </div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════
   DESKTOP LAYOUT
══════════════════════════════════════ */
function DesktopLayout() {
  const containerRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(null)

  /* letter refs — one per heading letter */
  const l0=useRef(null);const l1=useRef(null);const l2=useRef(null)
  const l3=useRef(null);const l4=useRef(null);const l5=useRef(null)
  const l6=useRef(null);const l7=useRef(null);const l8=useRef(null)
  const l9=useRef(null)
  const letterRefs = [l0,l1,l2,l3,l4,l5,l6,l7,l8,l9]

  /* card refs */
  const c0=useRef(null);const c1=useRef(null);const c2=useRef(null)
  const c3=useRef(null);const c4=useRef(null);const c5=useRef(null)
  const c6=useRef(null);const c7=useRef(null);const c8=useRef(null)
  const c9=useRef(null)
  const cardRefs = [c0,c1,c2,c3,c4,c5,c6,c7,c8,c9]

  const onHover = useCallback(i => setActiveIdx(i), [])
  const onLeave = useCallback(() => setActiveIdx(null), [])

  return (
    <section
      ref={containerRef}
      className="hidden lg:block w-full overflow-hidden"
      style={{
        background: 'linear-gradient(170deg, #fdfbf7 0%, #f7f2ea 55%, #f0ece2 100%)',
        padding: '72px 0 88px',
        position: 'relative',
      }}
    >
      {/* dot grid */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0, backgroundImage:'radial-gradient(circle, rgba(26,26,26,0.04) 1px, transparent 1px)', backgroundSize:'32px 32px' }} />

      {/* all lines */}
      <AllLines letterRefs={letterRefs} cardRefs={cardRefs} containerRef={containerRef} activeIdx={activeIdx} />

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 2 }}>

        {/* OUR IDENTITY */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, marginBottom:20 }}
        >
          <div style={{ height:1, width:40, background:`linear-gradient(90deg, transparent, ${TERRA})` }} />
          <span style={{ fontSize:9, fontWeight:800, letterSpacing:'0.7em', textTransform:'uppercase', color:TERRA }}>Our Identity</span>
          <div style={{ height:1, width:40, background:`linear-gradient(90deg, ${TERRA}, transparent)` }} />
        </motion.div>

        {/* ── HEADING — each letter individually ref'd ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ textAlign:'center', whiteSpace:'nowrap', lineHeight:1, marginBottom:0, userSelect:'none' }}
        >
          {PRINCIPLES.map((p) => (
            <span
              key={p.i}
              ref={letterRefs[p.i]}
              onMouseEnter={() => onHover(p.i)}
              onMouseLeave={onLeave}
              style={{
                fontSize: '8vw',
                fontWeight: 400,
                fontFamily: '"Lora", Georgia, serif',
                fontStyle: 'italic',
                color: activeIdx === p.i
                  ? p.color
                  : activeIdx !== null
                    ? (p.i < 4 ? WINE + '25' : TERRA + '25')
                    : (p.i < 4 ? WINE : TERRA),
                letterSpacing: '0.32em',
                display: 'inline-block',
                cursor: 'default',
                transition: 'color 0.2s, transform 0.2s',
                transform: activeIdx === p.i ? 'translateY(-3px) scale(1.06)' : 'none',
              }}
            >
              {p.ch}
            </span>
          ))}
        </motion.div>

        {/* ── MAIN LAYOUT: left column | center | right column ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '160px 1fr 160px',
          gap: '0 32px',
          marginTop: 8,
          alignItems: 'stretch',
        }}>

          {/* LEFT — K(0) A(1) R(2) R(3) stacked */}
          <div style={{ display:'flex', flexDirection:'column', gap:16, justifyContent:'center' }}>
            {[0,1,2,3].map(i => (
              <SmallCard key={i} p={PRINCIPLES[i]} cardRef={cardRefs[i]} active={activeIdx===i} onHover={onHover} onLeave={onLeave} />
            ))}
          </div>

          {/* CENTER — logo centered + two tall pillars C(4) H(5) pushed down */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:0, height:'100%' }}>
            {/* Spacer to push logo to vertical center */}
            <div style={{ flex:1 }} />
            {/* Logo — large watermark style, premium transparent */}
            <motion.div
              initial={{ opacity:0, scale:0.85 }}
              whileInView={{ opacity:1, scale:1 }}
              viewport={{ once:true }}
              transition={{ duration:0.7, delay:0.35 }}
              style={{ position:'relative', marginBottom:20 }}
            >
              {/* soft glow ring behind logo */}
              <div style={{
                position:'absolute', inset:'-18px',
                borderRadius:'50%',
                background:'radial-gradient(circle, rgba(184,92,56,0.10) 0%, rgba(201,168,76,0.06) 50%, transparent 75%)',
                filter:'blur(12px)',
                pointerEvents:'none',
              }} />
              <motion.img
                src={logoImg}
                alt="KARRCHOLAI"
                style={{
                  width: 380,
                  height: 380,
                  objectFit: 'contain',
                  display: 'block',
                  opacity: 0.45,
                  filter: 'saturate(0.75) brightness(1.05) drop-shadow(0 6px 32px rgba(184,92,56,0.22))',
                  mixBlendMode: 'multiply',
                  position: 'relative',
                  zIndex: 1,
                }}
                whileHover={{ opacity: 0.65, scale: 1.04 }}
                transition={{ duration: 0.35 }}
              />
            </motion.div>
            <div style={{ flex:1 }} />
            {/* Two pillars side by side */}
            <div style={{ display:'flex', gap:20, width:'100%' }}>
              <PillarCard p={PRINCIPLES[4]} cardRef={cardRefs[4]} active={activeIdx===4} onHover={onHover} onLeave={onLeave} />
              <PillarCard p={PRINCIPLES[5]} cardRef={cardRefs[5]} active={activeIdx===5} onHover={onHover} onLeave={onLeave} />
            </div>
          </div>

          {/* RIGHT — I(9) A(8) L(7) O(6) stacked */}
          <div style={{ display:'flex', flexDirection:'column', gap:16, justifyContent:'center' }}>
            {[9,8,7,6].map(i => (
              <SmallCard key={i} p={PRINCIPLES[i]} cardRef={cardRefs[i]} active={activeIdx===i} onHover={onHover} onLeave={onLeave} />
            ))}
          </div>

        </div>

        {/* bottom tag */}
        <motion.div
          initial={{ opacity:0 }}
          whileInView={{ opacity:1 }}
          viewport={{ once:true }}
          transition={{ duration:0.5, delay:0.5 }}
          style={{ textAlign:'center', marginTop:52, paddingTop:24, borderTop:'1px solid rgba(26,26,26,0.07)' }}
        >
          <span style={{ fontSize:9, fontWeight:700, letterSpacing:'0.6em', textTransform:'uppercase', color:'rgba(26,26,26,0.22)' }}>
            Every Letter · Every Value · Every Home
          </span>
        </motion.div>

      </div>
    </section>
  )
}

/* ══════════════════════════════════════
   MOBILE
══════════════════════════════════════ */
function MobileLayout() {
  return (
    <section
      className="lg:hidden w-full overflow-hidden"
      style={{ background:'linear-gradient(160deg, #fdfbf7 0%, #f2ece0 100%)', padding:'52px 0 56px' }}
    >
      <div style={{ padding:'0 20px' }}>
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginBottom:14 }}>
            <div style={{ height:1, width:24, background:`linear-gradient(90deg, transparent, ${TERRA})` }} />
            <span style={{ fontSize:8, fontWeight:800, letterSpacing:'0.65em', textTransform:'uppercase', color:TERRA }}>Our Identity</span>
            <div style={{ height:1, width:24, background:`linear-gradient(90deg, ${TERRA}, transparent)` }} />
          </div>
          <div style={{ whiteSpace:'nowrap' }}>
            <span style={{ fontSize:'10vw', fontWeight:400, fontStyle:'italic', color:WINE, fontFamily:'"Lora", Georgia, serif', letterSpacing:'0.15em' }}>KARR</span>
            <span style={{ fontSize:'10vw', fontWeight:400, fontStyle:'italic', color:TERRA, fontFamily:'"Lora", Georgia, serif', letterSpacing:'0.15em' }}>CHOLAI</span>
          </div>
        </div>

        <div style={{ display:'flex', justifyContent:'center', marginBottom:24 }}>
          <img src={logoImg} alt="KARRCHOLAI" style={{ width:52, height:52, objectFit:'contain' }} />
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {PRINCIPLES.map((p) => (
            <motion.div
              key={p.i}
              initial={{ opacity:0, y:14 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.4, delay:p.i * 0.05 }}
              style={{
                background:'#fff',
                border:`1.5px solid ${p.color}28`,
                borderLeft:`4px solid ${p.color}`,
                borderRadius:10,
                padding:'12px 14px',
                boxShadow:`0 2px 10px ${p.color}10`,
              }}
            >
              <div style={{ fontSize:7, fontWeight:800, letterSpacing:'0.4em', color:`${p.color}75`, marginBottom:4 }}>{String(p.i+1).padStart(2,'0')}</div>
              <div style={{ fontSize:26, fontWeight:400, fontStyle:'italic', color:p.color, fontFamily:'"Lora", Georgia, serif', lineHeight:1, marginBottom:4 }}>{p.ch}</div>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:INK, marginBottom:4 }}>{p.word}</div>
              <div style={{ fontSize:10, color:'rgba(26,26,26,0.45)', lineHeight:1.55 }}>{p.desc}</div>
            </motion.div>
          ))}
        </div>

        <p style={{ textAlign:'center', marginTop:28, fontSize:9, fontWeight:700, letterSpacing:'0.5em', textTransform:'uppercase', color:'rgba(26,26,26,0.22)' }}>
          Every Letter · Every Value · Every Home
        </p>
      </div>
    </section>
  )
}

export default function IdentityPencil() {
  return (
    <>
      <DesktopLayout />
      <MobileLayout />
    </>
  )
}
