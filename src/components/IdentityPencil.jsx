import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logoImg from '../assets/KARRCHOLAI LOGO.png'
import {
  FaLayerGroup, FaFistRaised, FaMedal, FaPaintBrush,
  FaYinYang, FaChartLine, FaHourglass, FaLeaf, FaBalanceScale,
} from 'react-icons/fa'

const MAROON = '#7B1F3A'
const TERRA  = '#C9754A'
const DARK   = '#1a1a1a'
const BG     = '#faf6ef'

/* ─── canvas geometry ───────────────────────────────────── */
const W = 860, H = 860
const CX = W / 2, CY = H / 2
const CR = 108   // center disc radius

/* ─── 10 nodes, evenly on a circle r=300 ───────────────── */
// Start at top (-90°), clockwise
const R = 300
function pos(i, total) {
  const a = (i / total) * 2 * Math.PI - Math.PI / 2
  return { x: CX + Math.cos(a) * R, y: CY + Math.sin(a) * R }
}

const NODES = [
  { ch:'K', num:'01', label:'Keystone',      group:'KARR',   color:MAROON,
    desc:'The foundation every great structure begins with — in planning, materials and people.',
    Icon: () => <svg viewBox="0 0 24 24" fill="#fff" width="22" height="22"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
  { ch:'A', num:'02', label:'Architecture',  group:'KARR',   color:'#9B4520',
    desc:'Thoughtful design balancing form, function and the life of those who live within.',
    Icon: () => <FaLayerGroup color="#fff" size={20}/> },
  { ch:'R', num:'03', label:'Resilience',    group:'KARR',   color:'#9B2440',
    desc:'Structures built to endure — not just inspections, but decades of real life.',
    Icon: () => <FaFistRaised color="#fff" size={20}/> },
  { ch:'R', num:'04', label:'Reliability',   group:'KARR',   color:TERRA,
    desc:'Consistent delivery on every commitment, at every stage of the project.',
    Icon: () => <FaMedal color="#fff" size={20}/> },
  { ch:'C', num:'05', label:'Craftsmanship', group:'CHOLAI', color:MAROON,
    desc:'Precision in every finish. Quality that lives in the details long after handover.',
    Icon: () => <FaPaintBrush color="#fff" size={20}/> },
  { ch:'H', num:'06', label:'Harmony',       group:'CHOLAI', color:TERRA,
    desc:'Balance between nature, space and the families who call it home.',
    Icon: () => <FaYinYang color="#fff" size={20}/> },
  { ch:'O', num:'07', label:'Optimization',  group:'CHOLAI', color:'#9B2440',
    desc:'Smart use of resources. Every square foot, every rupee — thoughtfully maximised.',
    Icon: () => <FaChartLine color="#fff" size={20}/> },
  { ch:'L', num:'08', label:'Longevity',     group:'CHOLAI', color:'#9B4520',
    desc:'We build for generations, not just occupancy certificates.',
    Icon: () => <FaHourglass color="#fff" size={20}/> },
  { ch:'A', num:'09', label:'Aesthetics',    group:'CHOLAI', color:MAROON,
    desc:'Beauty that is purposeful, timeless and rooted in the culture of the home.',
    Icon: () => <FaLeaf color="#fff" size={20}/> },
  { ch:'I', num:'10', label:'Integrity',     group:'CHOLAI', color:TERRA,
    desc:'Transparent, honest and accountable — from first conversation to final handover.',
    Icon: () => <FaBalanceScale color="#fff" size={20}/> },
]
const TOTAL = NODES.length

/* curved arrow: from edge of center disc to near node */
function arrow(i) {
  const { x: nx, y: ny } = pos(i, TOTAL)
  const dx = nx - CX, dy = ny - CY
  const len = Math.sqrt(dx * dx + dy * dy)
  const ux = dx / len, uy = dy / len
  const sx = CX + ux * 90
  const sy = CY + uy * 90
  const ex = nx - ux * 44
  const ey = ny - uy * 44
  // control point: slightly perpendicular for a gentle curve
  const mx = (sx + ex) / 2 - uy * 30
  const my = (sy + ey) / 2 + ux * 30
  return `M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`
}

export default function IdentityPencil() {
  const [active, setActive]   = useState(null)   // clicked node
  const [hovered, setHovered] = useState(null)   // hovered node
  const popupIdx = active !== null ? active : hovered  // show popup for either
  const popupNode = popupIdx !== null ? NODES[popupIdx] : null

  return (
    <>
      {/* ═══════ DESKTOP ═══════ */}
      <div className="hidden lg:block w-full" style={{ background: BG }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px 40px' }}>

          {/* SVG mind-map wrapper — position:relative so popup can float inside */}
          <div style={{ width: '100%', aspectRatio: '1 / 1', maxHeight: 860, position: 'relative' }}>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
            >
              <defs>
                <marker id="arr" markerWidth="7" markerHeight="7"
                  refX="5" refY="3.5" orient="auto">
                  <path d="M0,1 L6,3.5 L0,6 Z" fill="#C9754A" opacity="0.6"/>
                </marker>
              </defs>

              {/* ── arrows ── */}
              {NODES.map((n, i) => {
                const isAct = active === i || hovered === i
                const dim   = (active !== null && active !== i) || (active === null && hovered !== null && hovered !== i)
                return (
                  <path key={`a${i}`}
                    d={arrow(i)}
                    fill="none"
                    stroke={n.color}
                    strokeWidth={isAct ? 2.2 : 1.2}
                    strokeDasharray={isAct ? 'none' : '5 5'}
                    opacity={dim ? 0.08 : isAct ? 1 : 0.38}
                    markerEnd="url(#arr)"
                    style={{ transition: 'opacity 0.2s' }}
                  />
                )
              })}

              {/* ── center: logo only ── */}
              <foreignObject x={CX - CR} y={CY - CR} width={CR * 2} height={CR * 2}>
                <div style={{
                  width: '100%', height: '100%',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <img src={logoImg} alt="logo"
                    style={{ width: CR * 1.7, height: CR * 1.7, objectFit: 'contain' }}/>
                  <div style={{ display: 'flex', marginTop: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: '-0.02em', color: MAROON }}>KARR</span>
                    <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: '-0.02em', color: TERRA }}>CHOLAI</span>
                  </div>
                </div>
              </foreignObject>

              {/* ── node circles ── */}
              {NODES.map((n, i) => {
                const { x: nx, y: ny } = pos(i, TOTAL)
                const isAct   = active === i
                const isHov   = hovered === i
                const lit     = isAct || isHov
                const dim     = (active !== null && !isAct) || (active === null && hovered !== null && !isHov)
                const isAbove = ny < CY

                return (
                  <g key={`n${i}`}
                    onClick={() => setActive(isAct ? null : i)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ cursor: 'pointer' }}
                    opacity={dim ? 0.2 : 1}
                  >
                    {/* pulse ring on hover/active */}
                    {lit && (
                      <circle cx={nx} cy={ny} r={48}
                        fill="none" stroke={n.color} strokeWidth="1.5" opacity="0.35"/>
                    )}
                    <circle cx={nx} cy={ny} r={38}
                      fill={n.color}
                      style={{
                        filter: lit ? `drop-shadow(0 4px 16px ${n.color}cc)` : 'none',
                        transition: 'filter 0.2s',
                      }}
                    />
                    <ellipse cx={nx - 12} cy={ny - 12} rx={14} ry={9}
                      fill="rgba(255,255,255,0.18)" style={{ pointerEvents: 'none' }}/>
                    <text x={nx} y={ny - 4}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize={lit ? 23 : 20} fontWeight="900" fill="#fff"
                      style={{ userSelect: 'none' }}>
                      {n.ch}
                    </text>
                    <text x={nx} y={ny + 14}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="8" fontWeight="600" fill="rgba(255,255,255,0.55)"
                      style={{ userSelect: 'none' }}>
                      {n.num}
                    </text>
                    <text x={nx} y={isAbove ? ny - 50 : ny + 56}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="11" fontWeight="700" fill={lit ? n.color : DARK}
                      letterSpacing="1"
                      style={{ transition: 'fill 0.2s', userSelect: 'none' }}>
                      {n.label.toUpperCase()}
                    </text>
                    <text x={nx} y={isAbove ? ny - 38 : ny + 70}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="8" fontWeight="600" fill={n.color} opacity="0.5"
                      letterSpacing="1.5" style={{ userSelect: 'none' }}>
                      {n.group}
                    </text>
                  </g>
                )
              })}
            </svg>

            {/* ── Floating popup (HTML, positioned over SVG) ── */}
            <AnimatePresence>
              {popupNode && (() => {
                const { x: nx, y: ny } = pos(popupIdx, TOTAL)
                // Convert SVG coords → % of container
                const pctX = (nx / W) * 100
                const pctY = (ny / H) * 100
                const isAbove = ny < CY
                const isLeft  = nx < CX
                const { Icon } = popupNode

                return (
                  <motion.div
                    key={popupNode.num}
                    initial={{ opacity: 0, scale: 0.85, y: isAbove ? 8 : -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: 'absolute',
                      left:  isLeft ? `calc(${pctX}% + 52px)` : `auto`,
                      right: isLeft ? `auto` : `calc(${100 - pctX}% + 52px)`,
                      top:   isAbove ? `calc(${pctY}% - 20px)` : `auto`,
                      bottom: isAbove ? `auto` : `calc(${100 - pctY}% - 20px)`,
                      width: 230,
                      zIndex: 50,
                      pointerEvents: 'none',
                    }}
                  >
                    {/* Arrow tip pointing toward the circle */}
                    <div style={{
                      position: 'absolute',
                      [isLeft ? 'left' : 'right']: -7,
                      top: '50%', transform: 'translateY(-50%)',
                      width: 0, height: 0,
                      borderTop: '7px solid transparent',
                      borderBottom: '7px solid transparent',
                      [isLeft ? 'borderRight' : 'borderLeft']: `7px solid white`,
                    }}/>

                    {/* Popup card */}
                    <div style={{
                      background: '#ffffff',
                      borderRadius: 14,
                      boxShadow: `0 12px 40px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px ${popupNode.color}25`,
                      overflow: 'hidden',
                    }}>
                      {/* Coloured top strip */}
                      <div style={{
                        height: 4,
                        background: `linear-gradient(90deg, ${popupNode.color}, ${popupNode.color}88)`,
                      }}/>

                      <div style={{ padding: '14px 16px' }}>
                        {/* Header row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                          {/* Circle badge */}
                          <div style={{
                            width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                            background: popupNode.color,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 3px 12px ${popupNode.color}55`,
                          }}>
                            <Icon />
                          </div>
                          <div>
                            {/* Number */}
                            <p style={{ margin: 0, fontSize: 8.5, fontWeight: 700,
                              letterSpacing: '0.35em', textTransform: 'uppercase',
                              color: popupNode.color, opacity: 0.7, lineHeight: 1 }}>
                              {popupNode.num} · {popupNode.group}
                            </p>
                            {/* Name */}
                            <p style={{ margin: '3px 0 0', fontSize: 14, fontWeight: 800,
                              color: DARK, letterSpacing: '-0.01em', lineHeight: 1 }}>
                              {popupNode.label}
                            </p>
                          </div>
                        </div>

                        {/* Big letter watermark + desc */}
                        <div style={{ position: 'relative' }}>
                          <span style={{
                            position: 'absolute', right: -4, top: -8,
                            fontSize: 64, fontWeight: 900, lineHeight: 1,
                            color: popupNode.color, opacity: 0.07,
                            letterSpacing: '-0.04em', userSelect: 'none',
                          }}>{popupNode.ch}</span>
                          <p style={{
                            margin: 0, fontSize: 11.5, lineHeight: 1.65,
                            color: DARK, opacity: 0.55,
                            position: 'relative', zIndex: 1,
                          }}>{popupNode.desc}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })()}
            </AnimatePresence>
          </div>

          {/* Hint text when nothing active */}
          <AnimatePresence>
            {popupNode === null && (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ textAlign: 'center', fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.4em', textTransform: 'uppercase',
                  color: DARK, opacity: 0.25, paddingBottom: 16 }}
              >
                Hover or click a principle to explore
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ═══════ MOBILE ═══════ */}
      <MobileView />
    </>
  )
}

function MobileView() {
  const [open, setOpen] = useState(null)
  return (
    <div className="lg:hidden w-full" style={{ background: BG, padding: '32px 16px 48px' }}>
      {/* Logo */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
        <div style={{
          width: 108, height: 108, borderRadius: '50%', marginBottom: 12,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: 'radial-gradient(circle at 38% 36%, #fffdf9, #f0e2cc)',
          boxShadow: `0 0 0 2px ${TERRA}55, 0 10px 32px rgba(0,0,0,0.1)`,
        }}>
          <img src={logoImg} alt="KARRCHOLAI" style={{ width: 66, height: 66, objectFit: 'contain' }}/>
          <div style={{ display: 'flex' }}>
            <span style={{ fontSize: 9, fontWeight: 900, color: MAROON }}>KARR</span>
            <span style={{ fontSize: 9, fontWeight: 900, color: TERRA }}>CHOLAI</span>
          </div>
        </div>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.4em',
          textTransform: 'uppercase', color: DARK, opacity: 0.3 }}>Ten Principles</p>
      </div>

      {NODES.map((n, i) => {
        const isOpen = open === i
        const { Icon } = n
        return (
          <motion.div key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.32, delay: i * 0.04 }}
            style={{
              borderRadius: 10, overflow: 'hidden', marginBottom: 8, cursor: 'pointer',
              background: isOpen ? n.color : '#fff',
              border: `1.5px solid ${isOpen ? n.color : n.color + '25'}`,
              boxShadow: isOpen ? `0 8px 24px ${n.color}44` : '0 2px 8px rgba(0,0,0,0.05)',
              transition: 'all 0.25s',
            }}
            onClick={() => setOpen(isOpen ? null : i)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px' }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                background: isOpen ? 'rgba(255,255,255,0.22)' : n.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 800, fontSize: 14,
                  color: isOpen ? '#fff' : DARK }}>{n.label}</p>
                <p style={{ margin: '2px 0 0', fontSize: 8.5, fontWeight: 600,
                  letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: isOpen ? 'rgba(255,255,255,0.6)' : n.color + 'aa' }}>
                  {n.num} · {n.group}
                </p>
              </div>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: 22, fontWeight: 300, flexShrink: 0,
                  color: isOpen ? 'rgba(255,255,255,0.6)' : n.color, opacity: isOpen ? 1 : 0.45 }}>
                +
              </motion.span>
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{
                    overflow: 'hidden', margin: 0,
                    padding: '0 16px 14px 74px',
                    fontSize: 12.5, lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.78)',
                    borderTop: '1px solid rgba(255,255,255,0.14)',
                    paddingTop: 10,
                  }}
                >{n.desc}</motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
