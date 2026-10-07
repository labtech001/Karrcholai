/**
 * IdentityPencil — KARRCHOLAI Our Identity
 * Smooth cinematic line-draw on hover, full responsive layout
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

/* ═══════════════════════════════════════════════════════
   AllLines — all 10 lines live in DOM always.
   On hover: CSS class toggles strokeDashoffset 100%→0
   No mounting/unmounting = zero layout-thrash lag
═══════════════════════════════════════════════════════ */
function AllLines({ letterRefs, cardRefs, containerRef, activeIdx }) {
  const [lines, setLines] = useState([])
  const svgRef = useRef(null)

  /* Compute line coordinates once, recompute on resize */
  useEffect(() => {
    const compute = () => {
      if (!containerRef.current) return
      const cRect = containerRef.current.getBoundingClientRect()
      const result = []

      PRINCIPLES.forEach(({ i, color }) => {
        const lr = letterRefs[i]?.current
        const cr = cardRefs[i]?.current
        if (!lr || !cr) return

        const lR = lr.getBoundingClientRect()
        const cR = cr.getBoundingClientRect()

        const x1 = lR.left + lR.width / 2 - cRect.left
        const y1 = lR.bottom - cRect.top

        let x2, y2
        if (i <= 3) {
          // left column → attach to right edge, vertically centred
          x2 = cR.right - cRect.left
          y2 = cR.top + cR.height / 2 - cRect.top
        } else if (i >= 6) {
          // right column → attach to left edge, vertically centred
          x2 = cR.left - cRect.left
          y2 = cR.top + cR.height / 2 - cRect.top
        } else {
          // pillar cards C(4) H(5) → top centre
          x2 = cR.left + cR.width / 2 - cRect.left
          y2 = cR.top - cRect.top
        }

        const dx = x2 - x1
        const dy = y2 - y1
        const len = Math.ceil(Math.sqrt(dx * dx + dy * dy))

        result.push({ i, color, x1, y1, x2, y2, len })
      })

      setLines(result)
    }

    const t = setTimeout(compute, 300)
    window.addEventListener('resize', compute)
    return () => { clearTimeout(t); window.removeEventListener('resize', compute) }
  }, [letterRefs, cardRefs, containerRef])

  /* Imperatively toggle animation class on the active line group */
  useEffect(() => {
    if (!svgRef.current) return
    const groups = svgRef.current.querySelectorAll('[data-line]')
    groups.forEach(g => {
      const idx = parseInt(g.dataset.line, 10)
      if (idx === activeIdx) {
        g.classList.add('line-active')
      } else {
        g.classList.remove('line-active')
      }
    })
  }, [activeIdx])

  if (!lines.length) return null

  return (
    <svg
      ref={svgRef}
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:3, overflow:'visible' }}
    >
      <defs>
        <style>{`
          /* line draw — GPU composited via stroke-dashoffset */
          [data-line] .kc-line {
            stroke-dashoffset: var(--kc-len);
            opacity: 0;
            transition: none;
          }
          [data-line].line-active .kc-line {
            stroke-dashoffset: 0;
            opacity: 1;
            transition:
              stroke-dashoffset 2.2s cubic-bezier(0.4, 0, 0.15, 1),
              opacity 0.2s ease;
          }

          /* origin dot */
          [data-line] .kc-dot-start {
            opacity: 0;
            transform: scale(0);
            transform-box: fill-box;
            transform-origin: center;
            transition: none;
          }
          [data-line].line-active .kc-dot-start {
            opacity: 1;
            transform: scale(1);
            transition: opacity 0.15s ease, transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
          }

          /* end dot */
          [data-line] .kc-dot-end {
            opacity: 0;
            transform: scale(0);
            transform-box: fill-box;
            transform-origin: center;
            transition: none;
          }
          [data-line].line-active .kc-dot-end {
            opacity: 1;
            transform: scale(1);
            transition:
              opacity 0.25s ease 2s,
              transform 0.3s cubic-bezier(0.34,1.56,0.64,1) 2s;
          }

          /* pulse ring */
          [data-line] .kc-ring {
            opacity: 0;
            transform: scale(0.4);
            transform-box: fill-box;
            transform-origin: center;
            transition: none;
          }
          [data-line].line-active .kc-ring {
            opacity: 0;
            transform: scale(2.2);
            transition:
              opacity 0.45s ease 2.1s,
              transform 0.6s ease 2.1s;
            animation: kcRingPulse 0.65s ease 2.1s forwards;
          }

          @keyframes kcRingPulse {
            0%   { opacity: 0;    transform: scale(0.5); }
            35%  { opacity: 0.55; transform: scale(1.2); }
            100% { opacity: 0;    transform: scale(2);   }
          }
        `}</style>

        {lines.map(l => (
          <linearGradient key={`lg${l.i}`} id={`kc-lg-${l.i}`}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%"   stopColor={l.color} stopOpacity="1" />
            <stop offset="100%" stopColor={l.color} stopOpacity="0.6" />
          </linearGradient>
        ))}
      </defs>

      {lines.map(l => (
        <g
          key={l.i}
          data-line={l.i}
          style={{ '--kc-len': l.len }}
        >
          {/* The line */}
          <line
            className="kc-line"
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={`url(#kc-lg-${l.i})`}
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray={l.len}
          />

          {/* Origin dot (letter end) */}
          <circle className="kc-dot-start" cx={l.x1} cy={l.y1} r={4} fill={l.color} />

          {/* End dot (card end) */}
          <circle className="kc-dot-end" cx={l.x2} cy={l.y2} r={5} fill={l.color} />

          {/* Pulse ring at end */}
          <circle className="kc-ring" cx={l.x2} cy={l.y2} r={10} fill="none" stroke={l.color} strokeWidth={1.5} />
        </g>
      ))}
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
        transition: 'background 0.25s, border-color 0.25s, box-shadow 0.25s',
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
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
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
   DESKTOP LAYOUT  (lg and above)
══════════════════════════════════════ */
function DesktopLayout() {
  const containerRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(null)

  const l0=useRef(null);const l1=useRef(null);const l2=useRef(null)
  const l3=useRef(null);const l4=useRef(null);const l5=useRef(null)
  const l6=useRef(null);const l7=useRef(null);const l8=useRef(null)
  const l9=useRef(null)
  const letterRefs = [l0,l1,l2,l3,l4,l5,l6,l7,l8,l9]

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

      <AllLines letterRefs={letterRefs} cardRefs={cardRefs} containerRef={containerRef} activeIdx={activeIdx} />

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 2 }}>

        {/* label */}
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

        {/* HEADING */}
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

        {/* MAIN GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '160px 1fr 160px',
          gap: '0 32px',
          marginTop: 8,
          alignItems: 'stretch',
        }}>
          {/* LEFT */}
          <div style={{ display:'flex', flexDirection:'column', gap:16, justifyContent:'center' }}>
            {[0,1,2,3].map(i => (
              <SmallCard key={i} p={PRINCIPLES[i]} cardRef={cardRefs[i]} active={activeIdx===i} onHover={onHover} onLeave={onLeave} />
            ))}
          </div>

          {/* CENTER */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:0, height:'100%' }}>
            <div style={{ flex:1 }} />
            <motion.div
              initial={{ opacity:0, scale:0.85 }}
              whileInView={{ opacity:1, scale:1 }}
              viewport={{ once:true }}
              transition={{ duration:0.7, delay:0.35 }}
              style={{ position:'relative', marginBottom:20 }}
            >
              <div style={{
                position:'absolute', inset:'-18px', borderRadius:'50%',
                background:'radial-gradient(circle, rgba(184,92,56,0.10) 0%, rgba(201,168,76,0.06) 50%, transparent 75%)',
                filter:'blur(12px)', pointerEvents:'none',
              }} />
              <motion.img
                src={logoImg}
                alt="KARRCHOLAI"
                style={{
                  width: 380, height: 380, objectFit: 'contain', display: 'block',
                  opacity: 0.45,
                  filter: 'saturate(0.75) brightness(1.05) drop-shadow(0 6px 32px rgba(184,92,56,0.22))',
                  mixBlendMode: 'multiply',
                  position: 'relative', zIndex: 1,
                }}
                whileHover={{ opacity: 0.65, scale: 1.04 }}
                transition={{ duration: 0.35 }}
              />
            </motion.div>
            <div style={{ flex:1 }} />
            <div style={{ display:'flex', gap:20, width:'100%' }}>
              <PillarCard p={PRINCIPLES[4]} cardRef={cardRefs[4]} active={activeIdx===4} onHover={onHover} onLeave={onLeave} />
              <PillarCard p={PRINCIPLES[5]} cardRef={cardRefs[5]} active={activeIdx===5} onHover={onHover} onLeave={onLeave} />
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display:'flex', flexDirection:'column', gap:16, justifyContent:'center' }}>
            {[9,8,7,6].map(i => (
              <SmallCard key={i} p={PRINCIPLES[i]} cardRef={cardRefs[i]} active={activeIdx===i} onHover={onHover} onLeave={onLeave} />
            ))}
          </div>
        </div>

        {/* footer tag */}
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
   TABLET LAYOUT  (md — 768px to 1023px)
══════════════════════════════════════ */
function TabletLayout() {
  return (
    <section
      className="hidden md:block lg:hidden w-full overflow-hidden"
      style={{ background:'linear-gradient(160deg, #fdfbf7 0%, #f2ece0 100%)', padding:'56px 0 64px' }}
    >
      <div style={{ padding:'0 32px', maxWidth:768, margin:'0 auto' }}>
        {/* label */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginBottom:20 }}>
          <div style={{ height:1, width:28, background:`linear-gradient(90deg, transparent, ${TERRA})` }} />
          <span style={{ fontSize:8, fontWeight:800, letterSpacing:'0.65em', textTransform:'uppercase', color:TERRA }}>Our Identity</span>
          <div style={{ height:1, width:28, background:`linear-gradient(90deg, ${TERRA}, transparent)` }} />
        </div>

        {/* heading */}
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <span style={{ fontSize:'10vw', fontWeight:400, fontStyle:'italic', color:WINE, fontFamily:'"Lora", Georgia, serif', letterSpacing:'0.12em' }}>KARR</span>
          <span style={{ fontSize:'10vw', fontWeight:400, fontStyle:'italic', color:TERRA, fontFamily:'"Lora", Georgia, serif', letterSpacing:'0.12em' }}>CHOLAI</span>
        </div>

        {/* logo */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:32 }}>
          <img src={logoImg} alt="KARRCHOLAI" style={{ width:120, height:120, objectFit:'contain', opacity:0.5, mixBlendMode:'multiply' }} />
        </div>

        {/* 2-col grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          {PRINCIPLES.map((p) => (
            <motion.div
              key={p.i}
              initial={{ opacity:0, y:14 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.4, delay:p.i * 0.04 }}
              style={{
                background:'#fff',
                border:`1.5px solid ${p.color}28`,
                borderLeft:`4px solid ${p.color}`,
                borderRadius:10,
                padding:'14px 16px',
                boxShadow:`0 2px 10px ${p.color}10`,
              }}
            >
              <div style={{ fontSize:7, fontWeight:800, letterSpacing:'0.4em', color:`${p.color}75`, marginBottom:4 }}>{String(p.i+1).padStart(2,'0')}</div>
              <div style={{ fontSize:28, fontWeight:400, fontStyle:'italic', color:p.color, fontFamily:'"Lora", Georgia, serif', lineHeight:1, marginBottom:4 }}>{p.ch}</div>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:INK, marginBottom:4 }}>{p.word}</div>
              <div style={{ fontSize:11, color:'rgba(26,26,26,0.45)', lineHeight:1.55 }}>{p.desc}</div>
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

/* ══════════════════════════════════════
   MOBILE LAYOUT  (below md — up to 767px)
══════════════════════════════════════ */
function MobileLayout() {
  return (
    <section
      className="md:hidden w-full overflow-hidden"
      style={{ background:'linear-gradient(160deg, #fdfbf7 0%, #f2ece0 100%)', padding:'44px 0 52px' }}
    >
      <div style={{ padding:'0 16px' }}>
        {/* label */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginBottom:16 }}>
          <div style={{ height:1, width:20, background:`linear-gradient(90deg, transparent, ${TERRA})` }} />
          <span style={{ fontSize:7, fontWeight:800, letterSpacing:'0.6em', textTransform:'uppercase', color:TERRA }}>Our Identity</span>
          <div style={{ height:1, width:20, background:`linear-gradient(90deg, ${TERRA}, transparent)` }} />
        </div>

        {/* heading */}
        <div style={{ textAlign:'center', marginBottom:24 }}>
          <div>
            <span style={{ fontSize:'12vw', fontWeight:400, fontStyle:'italic', color:WINE, fontFamily:'"Lora", Georgia, serif', letterSpacing:'0.08em' }}>KARR</span>
            <span style={{ fontSize:'12vw', fontWeight:400, fontStyle:'italic', color:TERRA, fontFamily:'"Lora", Georgia, serif', letterSpacing:'0.08em' }}>CHOLAI</span>
          </div>
        </div>

        {/* logo */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:24 }}>
          <img src={logoImg} alt="KARRCHOLAI" style={{ width:80, height:80, objectFit:'contain', opacity:0.45, mixBlendMode:'multiply' }} />
        </div>

        {/* cards grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {PRINCIPLES.map((p) => (
            <motion.div
              key={p.i}
              initial={{ opacity:0, y:14 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.4, delay:p.i * 0.04 }}
              style={{
                background:'#fff',
                border:`1.5px solid ${p.color}28`,
                borderLeft:`3px solid ${p.color}`,
                borderRadius:10,
                padding:'10px 12px',
                boxShadow:`0 2px 8px ${p.color}10`,
              }}
            >
              <div style={{ fontSize:7, fontWeight:800, letterSpacing:'0.35em', color:`${p.color}75`, marginBottom:3 }}>{String(p.i+1).padStart(2,'0')}</div>
              <div style={{ fontSize:22, fontWeight:400, fontStyle:'italic', color:p.color, fontFamily:'"Lora", Georgia, serif', lineHeight:1, marginBottom:3 }}>{p.ch}</div>
              <div style={{ fontSize:8, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:INK, marginBottom:3 }}>{p.word}</div>
              <div style={{ fontSize:9, color:'rgba(26,26,26,0.45)', lineHeight:1.5 }}>{p.desc}</div>
            </motion.div>
          ))}
        </div>

        <p style={{ textAlign:'center', marginTop:24, fontSize:8, fontWeight:700, letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(26,26,26,0.22)' }}>
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
      <TabletLayout />
      <MobileLayout />
    </>
  )
}
