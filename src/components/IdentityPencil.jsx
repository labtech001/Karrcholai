/**
 * IdentityPencil — KARRCHOLAI Our Identity
 * Periodic-table inspired premium glassy UI
 */

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import logoImg from '../assets/KARRCHOLAI LOGO.png'

const TERRA = '#B85C38'
const WINE  = '#7a1d35'
const INK   = '#0f0f0f'
const GOLD  = '#C9A84C'
const GREEN = '#2D6A4F'
const STEEL = '#3a6ea8'

/* Element data — each brand letter maps to a real chemical element */
const PRINCIPLES = [
  { i:0, ch:'K',  word:'Keystone',      element:'K',  elName:'Potassium',  atomicNo:19, color: WINE,  colorRgb:'122,29,53',   group:'KARR',   desc:'The irreplaceable anchor every great structure begins from.' },
  { i:1, ch:'A',  word:'Architecture',  element:'Al', elName:'Aluminium',  atomicNo:13, color: TERRA, colorRgb:'184,92,56',   group:'KARR',   desc:'Thoughtful design balancing form, function and family life.' },
  { i:2, ch:'R',  word:'Resilience',    element:'Fe', elName:'Iron',       atomicNo:26, color: WINE,  colorRgb:'122,29,53',   group:'KARR',   desc:'Structures engineered to endure decades of real life.' },
  { i:3, ch:'R',  word:'Reliability',   element:'Zn', elName:'Zinc',       atomicNo:30, color: GOLD,  colorRgb:'201,168,76',  group:'KARR',   desc:'Consistent delivery on every promise at every stage.' },
  { i:4, ch:'C',  word:'Craftsmanship', element:'C',  elName:'Carbon',     atomicNo:6,  color: TERRA, colorRgb:'184,92,56',   group:'CHOLAI', desc:'Precision in every finish — quality that lives in the details.' },
  { i:5, ch:'H',  word:'Harmony',       element:'H',  elName:'Hydrogen',   atomicNo:1,  color: GREEN, colorRgb:'45,106,79',   group:'CHOLAI', desc:'Balance between nature, space, Vastu and the families who call it home.' },
  { i:6, ch:'O',  word:'Optimization',  element:'O',  elName:'Oxygen',     atomicNo:8,  color: GOLD,  colorRgb:'201,168,76',  group:'CHOLAI', desc:'Every square foot, every rupee maximised without compromise.' },
  { i:7, ch:'L',  word:'Longevity',     element:'Ti', elName:'Titanium',   atomicNo:22, color: WINE,  colorRgb:'122,29,53',   group:'CHOLAI', desc:'We build for generations, not just occupancy certificates.' },
  { i:8, ch:'A',  word:'Aesthetics',    element:'Si', elName:'Silicon',    atomicNo:14, color: TERRA, colorRgb:'184,92,56',   group:'CHOLAI', desc:'Timeless beauty rooted in Tamil culture.' },
  { i:9, ch:'I',  word:'Integrity',     element:'Cu', elName:'Copper',     atomicNo:29, color: STEEL, colorRgb:'58,110,168',  group:'CHOLAI', desc:'Transparent, honest and accountable from first conversation to handover.' },
]

/* Shared glassy styles injected once */
const GLASS_CSS = `
  .kc-glass-card {
    position: relative;
    border-radius: 10px;
    background: linear-gradient(145deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.42) 100%);
    border: 1px solid rgba(255,255,255,0.85);
    backdrop-filter: blur(20px) saturate(1.6);
    -webkit-backdrop-filter: blur(20px) saturate(1.6);
    box-shadow:
      0 2px 16px rgba(0,0,0,0.08),
      0 1px 4px rgba(0,0,0,0.05),
      inset 0 1px 0 rgba(255,255,255,0.95),
      inset 0 -1px 0 rgba(0,0,0,0.04);
    transition: box-shadow 0.28s ease, border-color 0.28s ease, transform 0.22s ease, background 0.28s ease;
    overflow: hidden;
  }
  .kc-glass-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 45%;
    background: linear-gradient(180deg, rgba(255,255,255,0.65) 0%, transparent 100%);
    pointer-events: none;
    border-radius: 10px 10px 0 0;
  }
  .kc-glass-card.active {
    box-shadow:
      0 10px 36px rgba(var(--card-rgb), 0.32),
      0 3px 10px rgba(0,0,0,0.12),
      inset 0 1px 0 rgba(255,255,255,0.95),
      inset 0 -1px 0 rgba(var(--card-rgb), 0.15);
    border-color: rgba(var(--card-rgb), 0.45);
    transform: translateY(-2px) scale(1.025);
  }
  .kc-el-symbol {
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.02em;
  }
  .kc-el-number {
    font-family: 'Manrope', sans-serif;
    font-variant-numeric: tabular-nums;
  }
  .kc-pill {
    display: inline-block;
    font-size: 6px;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 2px 6px;
    border-radius: 20px;
    border: 1px solid currentColor;
    opacity: 0.7;
  }
  .kc-shimmer::after {
    content: '';
    position: absolute;
    top: -60%;
    left: -60%;
    width: 50%;
    height: 200%;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%);
    transform: skewX(-15deg);
    transition: left 0.6s ease;
    pointer-events: none;
  }
  .kc-shimmer.active::after {
    left: 140%;
  }
`

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
            opacity: 0.7;
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

/* ─── Small periodic-table card (left & right columns) ─── */
function SmallCard({ p, cardRef, active, onHover, onLeave }) {
  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => onHover(p.i)}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, x: p.i <= 3 ? -18 : 18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.42, delay: 0.06 + (p.i <= 3 ? p.i : 9 - p.i) * 0.07 }}
      className={`kc-glass-card kc-shimmer${active ? ' active' : ''}`}
      style={{
        '--card-rgb': p.colorRgb,
        background: active
          ? `linear-gradient(145deg, rgba(${p.colorRgb},0.92) 0%, rgba(${p.colorRgb},0.70) 100%)`
          : `linear-gradient(145deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.52) 100%)`,
        cursor: 'default',
        padding: '10px 10px 9px',
        minWidth: 108,
      }}
    >
      {/* top row: atomic number + group pill */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 4 }}>
        <span className="kc-el-number" style={{
          fontSize: 8, fontWeight: 700, letterSpacing: '0.05em',
          color: active ? 'rgba(255,255,255,0.6)' : `rgba(${p.colorRgb},0.55)`,
          transition: 'color 0.25s',
        }}>{p.atomicNo}</span>
        <span className="kc-pill" style={{
          color: active ? 'rgba(255,255,255,0.7)' : `rgba(${p.colorRgb},0.6)`,
          transition:'color 0.25s',
        }}>{p.group}</span>
      </div>

      {/* element symbol */}
      <div className="kc-el-symbol" style={{
        fontSize: 30,
        color: active ? '#fff' : p.color,
        marginBottom: 1,
        transition: 'color 0.25s',
      }}>{p.element}</div>

      {/* element name */}
      <div style={{
        fontSize: 7.5, fontWeight: 700, letterSpacing: '0.06em',
        color: active ? 'rgba(255,255,255,0.6)' : `rgba(${p.colorRgb},0.5)`,
        textTransform: 'uppercase', fontFamily: '"Manrope", sans-serif',
        marginBottom: 6, transition: 'color 0.25s',
      }}>{p.elName}</div>

      {/* divider */}
      <div style={{
        height: 1,
        background: active ? 'rgba(255,255,255,0.3)' : `rgba(${p.colorRgb},0.18)`,
        marginBottom: 6, transition: 'background 0.25s',
      }} />

      {/* brand letter + principle */}
      <div style={{ display:'flex', alignItems:'baseline', gap: 5, marginBottom: 3 }}>
        <span style={{
          fontSize: 16, fontWeight: 400, fontStyle: 'italic',
          fontFamily: '"Lora", Georgia, serif',
          color: active ? 'rgba(255,255,255,0.95)' : p.color,
          lineHeight: 1, transition: 'color 0.25s',
        }}>{p.ch}</span>
        <span style={{
          fontSize: 8, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
          fontFamily: '"Manrope", sans-serif',
          color: active ? '#fff' : INK,
          transition: 'color 0.25s',
        }}>{p.word}</span>
      </div>

      {/* description */}
      <div style={{
        fontSize: 9, lineHeight: 1.5,
        color: active ? 'rgba(255,255,255,0.72)' : 'rgba(15,15,15,0.42)',
        transition: 'color 0.25s',
      }}>{p.desc}</div>
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.28 }}
      className={`kc-glass-card kc-shimmer${active ? ' active' : ''}`}
      style={{
        '--card-rgb': p.colorRgb,
        background: active
          ? `linear-gradient(160deg, rgba(${p.colorRgb},0.90) 0%, rgba(${p.colorRgb},0.65) 100%)`
          : `linear-gradient(160deg, rgba(255,255,255,0.82) 0%, rgba(${p.colorRgb},0.08) 100%)`,
        cursor: 'default',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '10px 12px 10px',
        position: 'relative',
        minHeight: 0,
      }}
    >
      {/* watermark symbol */}
      <div style={{
        position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)',
        fontSize: 42, fontWeight: 800,
        fontFamily: '"Manrope", sans-serif',
        color: active ? 'rgba(255,255,255,0.08)' : `rgba(${p.colorRgb},0.06)`,
        lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        transition: 'color 0.3s',
        letterSpacing: '-0.02em',
      }}>{p.element}</div>

      {/* atomic number + group pill */}
      <div style={{ display:'flex', justifyContent:'space-between', width:'100%', marginBottom: 5, position:'relative', zIndex:1 }}>
        <span className="kc-el-number" style={{
          fontSize: 7.5, fontWeight: 700,
          color: active ? 'rgba(255,255,255,0.6)' : `rgba(${p.colorRgb},0.55)`,
          transition: 'color 0.25s',
        }}>{p.atomicNo}</span>
        <span className="kc-pill" style={{
          color: active ? 'rgba(255,255,255,0.7)' : `rgba(${p.colorRgb},0.6)`,
          transition:'color 0.25s',
        }}>{p.group}</span>
      </div>

      {/* element symbol + element name inline */}
      <div style={{ display:'flex', alignItems:'baseline', gap:5, position:'relative', zIndex:1, marginBottom:5 }}>
        <div className="kc-el-symbol" style={{
          fontSize: 26,
          color: active ? '#fff' : p.color,
          transition: 'color 0.25s',
        }}>{p.element}</div>
        <div style={{
          fontSize: 7, fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase', fontFamily: '"Manrope", sans-serif',
          color: active ? 'rgba(255,255,255,0.55)' : `rgba(${p.colorRgb},0.45)`,
          transition: 'color 0.25s',
        }}>{p.elName}</div>
      </div>

      {/* divider */}
      <div style={{
        height: 1, width: '75%',
        background: active ? 'rgba(255,255,255,0.3)' : `rgba(${p.colorRgb},0.18)`,
        marginBottom: 7, transition: 'background 0.25s',
      }} />

      {/* brand letter + principle name inline */}
      <div style={{ display:'flex', alignItems:'baseline', gap:6, position:'relative', zIndex:1, marginBottom:4 }}>
        <span style={{
          fontSize: 18, fontWeight: 400, fontStyle: 'italic',
          fontFamily: '"Lora", Georgia, serif',
          color: active ? 'rgba(255,255,255,0.95)' : p.color,
          lineHeight: 1, transition: 'color 0.25s',
        }}>{p.ch}</span>
        <span style={{
          fontSize: 8, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase',
          fontFamily: '"Manrope", sans-serif',
          color: active ? '#fff' : INK,
          transition: 'color 0.25s',
        }}>{p.word}</span>
      </div>

      {/* description */}
      <div style={{
        fontSize: 9, lineHeight: 1.5,
        color: active ? 'rgba(255,255,255,0.72)' : 'rgba(15,15,15,0.4)',
        maxWidth: 160, margin: '0 auto',
        position: 'relative', zIndex: 1, transition: 'color 0.25s',
      }}>{p.desc}</div>
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
        padding: '52px 0 64px',
        position: 'relative',
      }}
    >
      <style>{GLASS_CSS}</style>

      {/* Subtle warm radial glows */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', zIndex:0,
        backgroundImage: `
          radial-gradient(ellipse 70% 45% at 50% 0%, rgba(184,92,56,0.05) 0%, transparent 60%),
          radial-gradient(ellipse 50% 35% at 15% 100%, rgba(122,29,53,0.04) 0%, transparent 55%),
          radial-gradient(ellipse 50% 35% at 85% 100%, rgba(201,168,76,0.04) 0%, transparent 55%)
        `,
      }} />
      {/* grid dots */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0, backgroundImage:'radial-gradient(circle, rgba(26,26,26,0.05) 1px, transparent 1px)', backgroundSize:'28px 28px' }} />

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
                fontSize: '4.8vw',
                fontWeight: 400,
                fontFamily: '"Lora", Georgia, serif',
                fontStyle: 'italic',
                color: activeIdx === p.i
                  ? p.color
                  : activeIdx !== null
                    ? (p.i < 4 ? WINE + '25' : TERRA + '25')
                    : (p.i < 4 ? WINE : TERRA),
                letterSpacing: '0.18em',
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
          gridTemplateColumns: '148px 1fr 148px',
          gap: '0 28px',
          marginTop: 8,
          alignItems: 'stretch',
        }}>
          {/* LEFT */}
          <div style={{ display:'flex', flexDirection:'column', gap:10, justifyContent:'center' }}>
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
                background:'radial-gradient(circle, rgba(184,92,56,0.12) 0%, rgba(201,168,76,0.06) 50%, transparent 75%)',
                filter:'blur(16px)', pointerEvents:'none',
              }} />
              <motion.img
                src={logoImg}
                alt="KARRCHOLAI"
                style={{
                  width: 360, height: 360, objectFit: 'contain', display: 'block',
                  opacity: 0.45,
                  filter: 'saturate(0.8) brightness(1.05) drop-shadow(0 6px 32px rgba(184,92,56,0.22))',
                  mixBlendMode: 'multiply',
                  position: 'relative', zIndex: 1,
                }}
                whileHover={{ opacity: 0.65, scale: 1.04 }}
                transition={{ duration: 0.35 }}
              />
            </motion.div>
            <div style={{ flex:1 }} />
            <div style={{ display:'flex', gap:12, width:'100%' }}>
              <PillarCard p={PRINCIPLES[4]} cardRef={cardRefs[4]} active={activeIdx===4} onHover={onHover} onLeave={onLeave} />
              <PillarCard p={PRINCIPLES[5]} cardRef={cardRefs[5]} active={activeIdx===5} onHover={onHover} onLeave={onLeave} />
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display:'flex', flexDirection:'column', gap:10, justifyContent:'center' }}>
            {[9,8,7,6].map(i => (
              <SmallCard key={i} p={PRINCIPLES[i]} cardRef={cardRefs[i]} active={activeIdx===i} onHover={onHover} onLeave={onLeave} />
            ))}
          </div>
        </div>

        {/* KARR / CHOLAI legend */}
        <motion.div
          initial={{ opacity:0 }}
          whileInView={{ opacity:1 }}
          viewport={{ once:true }}
          transition={{ duration:0.5, delay:0.4 }}
          style={{ display:'flex', justifyContent:'center', gap:24, marginTop:32 }}
        >
          {[
            { label:'KARR', sub:'Built Environment', color: WINE, els:'K · Al · Fe · Zn' },
            { label:'CHOLAI', sub:'Living Environment', color: GREEN, els:'C · H · O · Ti · Si · Cu' },
          ].map(item => (
            <div key={item.label} style={{
              display:'flex', alignItems:'center', gap:10,
              padding:'8px 18px',
              borderRadius:40,
              background:'rgba(255,255,255,0.55)',
              border:`1px solid rgba(${item.color === WINE ? '122,29,53' : '45,106,79'},0.18)`,
              backdropFilter:'blur(12px)',
              boxShadow:'0 2px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
            }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:item.color, flexShrink:0 }} />
              <span style={{ fontSize:9, fontWeight:800, letterSpacing:'0.14em', color:item.color }}>{item.label}</span>
              <span style={{ fontSize:8, color:'rgba(26,26,26,0.45)', letterSpacing:'0.05em' }}>{item.sub}</span>
              <span style={{ fontSize:8, color:'rgba(26,26,26,0.3)', fontFamily:'"Manrope",sans-serif', fontWeight:600, letterSpacing:'0.08em' }}>{item.els}</span>
            </div>
          ))}
        </motion.div>

        {/* footer tag */}
        <motion.div
          initial={{ opacity:0 }}
          whileInView={{ opacity:1 }}
          viewport={{ once:true }}
          transition={{ duration:0.5, delay:0.5 }}
          style={{ textAlign:'center', marginTop:28, paddingTop:20, borderTop:'1px solid rgba(26,26,26,0.08)' }}
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
      style={{ background:'linear-gradient(160deg, #fdfbf7 0%, #f2ece0 100%)', padding:'56px 0 64px', position:'relative' }}
    >
      <style>{GLASS_CSS}</style>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'radial-gradient(circle, rgba(26,26,26,0.04) 1px, transparent 1px)', backgroundSize:'24px 24px' }} />
      <div style={{ padding:'0 32px', maxWidth:768, margin:'0 auto', position:'relative', zIndex:1 }}>
        {/* label */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginBottom:20 }}>
          <div style={{ height:1, width:28, background:`linear-gradient(90deg, transparent, ${TERRA})` }} />
          <span style={{ fontSize:8, fontWeight:800, letterSpacing:'0.65em', textTransform:'uppercase', color:TERRA }}>Our Identity</span>
          <div style={{ height:1, width:28, background:`linear-gradient(90deg, ${TERRA}, transparent)` }} />
        </div>

        {/* heading */}
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <span style={{ fontSize:'10vw', fontWeight:400, fontStyle:'italic', color:WINE, fontFamily:'"Lora", Georgia, serif', letterSpacing:'0.12em' }}>KARR</span>
          <span style={{ fontSize:'10vw', fontWeight:400, fontStyle:'italic', color:TERRA, fontFamily:'"Lora", Georgia, serif', letterSpacing:'0.12em' }}>CHOLAI</span>
        </div>

        {/* logo */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:28 }}>
          <img src={logoImg} alt="KARRCHOLAI" style={{ width:100, height:100, objectFit:'contain', opacity:0.5, mixBlendMode:'multiply' }} />
        </div>

        {/* 2-col grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {PRINCIPLES.map((p) => (
            <motion.div
              key={p.i}
              initial={{ opacity:0, y:12 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.38, delay:p.i * 0.04 }}
              className="kc-glass-card"
              style={{
                '--card-rgb': p.colorRgb,
                padding:'11px 12px',
                borderLeft:`2px solid ${p.color}`,
              }}
            >
              <div style={{ fontSize:7, fontWeight:800, letterSpacing:'0.04em', color:`rgba(${p.colorRgb},0.5)`, marginBottom:2, fontFamily:'"Manrope",sans-serif' }}>{p.atomicNo} · {p.elName}</div>
              <div style={{ display:'flex', alignItems:'baseline', gap:6, marginBottom:3 }}>
                <span style={{ fontSize:22, fontWeight:800, color:p.color, fontFamily:'"Manrope",sans-serif', lineHeight:1 }}>{p.element}</span>
                <span style={{ fontSize:14, fontWeight:400, fontStyle:'italic', color:p.color, fontFamily:'"Lora",serif', lineHeight:1 }}>{p.ch}</span>
              </div>
              <div style={{ fontSize:8, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:INK, marginBottom:3, fontFamily:'"Manrope",sans-serif' }}>{p.word}</div>
              <div style={{ fontSize:10, color:'rgba(15,15,15,0.42)', lineHeight:1.5 }}>{p.desc}</div>
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
      style={{ background:'linear-gradient(160deg, #fdfbf7 0%, #f2ece0 100%)', padding:'44px 0 52px', position:'relative' }}
    >
      <style>{GLASS_CSS}</style>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'radial-gradient(circle, rgba(26,26,26,0.04) 1px, transparent 1px)', backgroundSize:'20px 20px' }} />
      <div style={{ padding:'0 16px', position:'relative', zIndex:1 }}>
        {/* label */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginBottom:16 }}>
          <div style={{ height:1, width:20, background:`linear-gradient(90deg, transparent, ${TERRA})` }} />
          <span style={{ fontSize:7, fontWeight:800, letterSpacing:'0.6em', textTransform:'uppercase', color:TERRA }}>Our Identity</span>
          <div style={{ height:1, width:20, background:`linear-gradient(90deg, ${TERRA}, transparent)` }} />
        </div>

        {/* heading */}
        <div style={{ textAlign:'center', marginBottom:20 }}>
          <div>
            <span style={{ fontSize:'12vw', fontWeight:400, fontStyle:'italic', color:WINE, fontFamily:'"Lora", Georgia, serif', letterSpacing:'0.08em' }}>KARR</span>
            <span style={{ fontSize:'12vw', fontWeight:400, fontStyle:'italic', color:TERRA, fontFamily:'"Lora", Georgia, serif', letterSpacing:'0.08em' }}>CHOLAI</span>
          </div>
        </div>

        {/* logo */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom:20 }}>
          <img src={logoImg} alt="KARRCHOLAI" style={{ width:70, height:70, objectFit:'contain', opacity:0.45, mixBlendMode:'multiply' }} />
        </div>

        {/* cards grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {PRINCIPLES.map((p) => (
            <motion.div
              key={p.i}
              initial={{ opacity:0, y:12 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.38, delay:p.i * 0.04 }}
              className="kc-glass-card"
              style={{
                '--card-rgb': p.colorRgb,
                padding:'9px 10px',
                borderLeft:`2px solid ${p.color}`,
              }}
            >
              <div style={{ fontSize:7, fontWeight:700, color:`rgba(${p.colorRgb},0.5)`, marginBottom:2, fontFamily:'"Manrope",sans-serif' }}>{p.atomicNo} · {p.elName}</div>
              <div style={{ display:'flex', alignItems:'baseline', gap:5, marginBottom:2 }}>
                <span style={{ fontSize:18, fontWeight:800, color:p.color, fontFamily:'"Manrope",sans-serif', lineHeight:1 }}>{p.element}</span>
                <span style={{ fontSize:12, fontWeight:400, fontStyle:'italic', color:p.color, fontFamily:'"Lora",serif', lineHeight:1 }}>{p.ch}</span>
              </div>
              <div style={{ fontSize:7.5, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:INK, marginBottom:3, fontFamily:'"Manrope",sans-serif' }}>{p.word}</div>
              <div style={{ fontSize:9, color:'rgba(15,15,15,0.4)', lineHeight:1.5 }}>{p.desc}</div>
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
