/**
 * IdentityPencil — KARRCHOLAI Brand Identity
 * Alternating timeline · Side-by-side popup · Big tiles
 */

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import imgKalium     from '../assets/identy/kalium.jpg'
import imgAluminium  from '../assets/identy/Aluminium.jpg'
import imgIron       from '../assets/identy/iron.jpg'
import imgChromium   from '../assets/identy/Chromium.jpg'
import imgArgon      from '../assets/identy/argon.jpg'
import imgHydrogen   from '../assets/identy/Hydrogen.jpg'
import imgO2         from '../assets/identy/O2.jpg'
import imgLithium    from '../assets/identy/Lithium.jpg'
import imgRhodium    from '../assets/identy/rhodium.webp'
import imgRuthenium  from '../assets/identy/Ruthenium.jpg'

const KARR_COLOR   = '#7a1d35'
const CHOLAI_COLOR = '#2D6A4F'

/* Order matches image: K,Al,Ru,Rh,Cr,H,O,Li,Ar,Fe spelling KARRCHOLAI */
const ITEMS = [
  { id:0, ch:'K', zone:'KARR',   principle:'Keystone',      symbol:'K',  element:'Kalium',    num:19, mass:'39.098', img:imgKalium,    accent:'#C9714A', tag:'Foundation · Structure',  desc:'Strong foundations and the right beginning.' },
  { id:1, ch:'A', zone:'CHOLAI', principle:'Architecture',  symbol:'Al', element:'Aluminium', num:13, mass:'26.982', img:imgAluminium, accent:'#6a9ebe', tag:'Design · Form',            desc:'Thoughtful design shaped around how people live.' },
  { id:2, ch:'R', zone:'KARR',   principle:'Resilience',    symbol:'Ru', element:'Ruthenium', num:44, mass:'101.07', img:imgRuthenium, accent:'#7aa0c0', tag:'Strength · Durability',   desc:'Construction designed to endure changing conditions and time.' },
  { id:3, ch:'R', zone:'CHOLAI', principle:'Reliability',   symbol:'Rh', element:'Rhodium',   num:45, mass:'102.91', img:imgRhodium,   accent:'#c89880', tag:'Trust · Consistency',     desc:'Consistent quality, responsibility and dependable execution.' },
  { id:4, ch:'C', zone:'KARR',   principle:'Craftsmanship', symbol:'Cr', element:'Chromium',  num:24, mass:'51.996', img:imgChromium,  accent:'#d4c090', tag:'Precision · Quality',     desc:'Careful workmanship in every detail.' },
  { id:5, ch:'H', zone:'CHOLAI', principle:'Harmony',       symbol:'H',  element:'Hydrogen',  num:1,  mass:'1.008',  img:imgHydrogen,  accent:'#5aa0c8', tag:'Balance · Vastu',         desc:'Balance between the home, people and surroundings.' },
  { id:6, ch:'O', zone:'KARR',   principle:'Optimization',  symbol:'O',  element:'Oxygen',    num:8,  mass:'15.999', img:imgO2,        accent:'#5aaa80', tag:'Efficiency · Value',      desc:'Making thoughtful use of space, materials, energy and resources.' },
  { id:7, ch:'L', zone:'CHOLAI', principle:'Longevity',     symbol:'Li', element:'Lithium',   num:3,  mass:'6.941',  img:imgLithium,   accent:'#d4aa55', tag:'Generations · Future',    desc:'Creating homes intended to serve generations.' },
  { id:8, ch:'A', zone:'KARR',   principle:'Aesthetics',    symbol:'Ar', element:'Argon',     num:18, mass:'39.948', img:imgArgon,     accent:'#9b88c8', tag:'Beauty · Culture',        desc:'Beauty that works together with function.' },
  { id:9, ch:'I', zone:'CHOLAI', principle:'Integrity',     symbol:'Iron', element:'Fe',      num:26, mass:'55.845', img:imgIron,      accent:'#c8a882', tag:'Honesty · Trust',         desc:'Honest decisions, transparent practices and responsible construction.' },
]

/* ── Popup — side-by-side layout ───────────────────────────────── */
function Popup({ el, onClose }) {
  const [dir, setDir] = useState(0)
  const [cur, setCur] = useState(el)

  useEffect(() => { if (el) setCur(el) }, [el])

  useEffect(() => {
    const h = e => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowRight') nav(1)
      if (e.key === 'ArrowLeft')  nav(-1)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  })

  useEffect(() => {
    if (el) document.body.style.overflow = 'hidden'
    else    document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [el])

  function nav(d) {
    if (!cur) return
    const i = ITEMS.findIndex(x => x.id === cur.id)
    setDir(d)
    setCur(ITEMS[(i + d + ITEMS.length) % ITEMS.length])
  }

  const idx       = cur ? ITEMS.findIndex(x => x.id === cur.id) : 0
  const zoneColor = cur ? (cur.zone === 'KARR' ? KARR_COLOR : CHOLAI_COLOR) : KARR_COLOR
  const slideIn   = { x: dir > 0 ? 40 : -40, opacity: 0 }
  const slideOut  = { x: dir > 0 ? -40 : 40, opacity: 0 }

  return (
    <AnimatePresence>
      {el && cur && (
        <>
          <motion.div key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{ position:'fixed', inset:0, zIndex:9998, background:'rgba(8,6,4,0.75)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)' }}
          />
          <div style={{ position:'fixed', inset:0, zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', pointerEvents:'none' }}>
            <motion.div key="modal"
              initial={{ opacity:0, y:28, scale:0.94 }}
              animate={{ opacity:1, y:0, scale:1 }}
              exit={{ opacity:0, y:20, scale:0.96 }}
              transition={{ duration:0.38, ease:[0.22,1,0.36,1] }}
              style={{ width:'min(820px,90vw)', height:'min(560px,84vh)', borderRadius:22, overflow:'hidden', display:'flex', flexDirection:'row', boxShadow:'0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)', pointerEvents:'all', flexShrink:0 }}
            >
              {/* LEFT — image 50% wide, full height */}
              <div style={{ position:'relative', flex:'0 0 50%', overflow:'hidden' }}>
                <AnimatePresence mode="sync">
                  <motion.img key={cur.id+'-img'}
                    src={cur.img} alt={cur.element}
                    initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                    transition={{ duration:0.4 }}
                    style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 30%' }}
                  />
                </AnimatePresence>
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,rgba(0,0,0,0.30) 0%,rgba(0,0,0,0.04) 35%,rgba(0,0,0,0.52) 100%)', zIndex:1 }} />
                <div style={{ position:'absolute', inset:0, background:`linear-gradient(135deg,${cur.accent}20 0%,transparent 55%)`, zIndex:1 }} />
                {/* Zone badge */}
                <div style={{ position:'absolute', top:16, left:16, zIndex:3 }}>
                  <div style={{ padding:'4px 11px', borderRadius:16, background: cur.zone==='KARR'?'rgba(122,29,53,0.90)':'rgba(45,106,79,0.90)', border:'1px solid rgba(255,255,255,0.18)', backdropFilter:'blur(6px)' }}>
                    <span style={{ fontSize:7, fontWeight:900, letterSpacing:'.32em', textTransform:'uppercase', color:'#fff', fontFamily:'"Manrope",sans-serif' }}>{cur.zone}</span>
                  </div>
                </div>
                {/* Atomic bottom */}
                <div style={{ position:'absolute', bottom:22, left:18, zIndex:3, display:'flex', alignItems:'flex-end', gap:9 }}>
                  <div>
                    <div style={{ fontSize:8, fontFamily:'monospace', color:'rgba(255,255,255,0.45)', marginBottom:1 }}>{cur.num}</div>
                    <div style={{ fontSize:38, fontWeight:700, fontFamily:'"Barlow Condensed",sans-serif', color:'#fff', lineHeight:1, textShadow:`0 0 24px ${cur.accent}55` }}>{cur.symbol}</div>
                  </div>
                  <div style={{ paddingBottom:3 }}>
                    <div style={{ fontSize:10, fontWeight:600, color:'rgba(255,255,255,0.55)', fontFamily:'"Manrope",sans-serif' }}>{cur.element}</div>
                    <div style={{ fontSize:8, fontFamily:'monospace', color:'rgba(255,255,255,0.32)' }}>{cur.mass}</div>
                  </div>
                </div>
                {/* Watermark */}
                <AnimatePresence mode="wait">
                  <motion.div key={cur.id+'-wm'}
                    initial={{ opacity:0 }} animate={{ opacity:0.07 }} exit={{ opacity:0 }} transition={{ duration:0.35 }}
                    style={{ position:'absolute', bottom:'-8%', right:'-5%', fontSize:'clamp(80px,14vw,140px)', fontWeight:900, fontFamily:'"Barlow Condensed",sans-serif', color:'#fff', lineHeight:1, pointerEvents:'none', userSelect:'none', zIndex:2 }}
                  >{cur.symbol}</motion.div>
                </AnimatePresence>
                {/* Progress bar */}
                <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:'rgba(255,255,255,0.08)', zIndex:3 }}>
                  <motion.div key={cur.id+'-bar'} initial={{ width:0 }} animate={{ width:`${((idx+1)/ITEMS.length)*100}%` }} transition={{ duration:0.5 }}
                    style={{ height:'100%', background:`linear-gradient(90deg,${zoneColor},${cur.accent})` }} />
                </div>
              </div>

              {/* RIGHT — content */}
              <div style={{ flex:'1 1 auto', background:'#fdfbf7', display:'flex', flexDirection:'column', overflow:'hidden' }}>
                {/* Top bar */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 20px 12px', borderBottom:'1px solid rgba(26,26,26,0.06)' }}>
                  <span style={{ fontSize:10, fontWeight:700, color:'rgba(26,26,26,0.28)', fontFamily:'"Manrope",sans-serif', letterSpacing:'.08em' }}>
                    {String(idx+1).padStart(2,'0')} / {String(ITEMS.length).padStart(2,'0')}
                  </span>
                  <button onClick={onClose}
                    style={{ width:34, height:34, borderRadius:'50%', background:'rgba(26,26,26,0.06)', border:'1px solid rgba(26,26,26,0.10)', color:'rgba(26,26,26,0.65)', fontSize:16, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
                    onMouseEnter={e => e.currentTarget.style.background='rgba(26,26,26,0.12)'}
                    onMouseLeave={e => e.currentTarget.style.background='rgba(26,26,26,0.06)'}
                  >✕</button>
                </div>
                {/* Content */}
                <AnimatePresence mode="wait">
                  <motion.div key={cur.id+'-content'}
                    initial={slideIn} animate={{ x:0, opacity:1 }} exit={slideOut}
                    transition={{ duration:0.34, ease:[0.25,0.46,0.45,0.94] }}
                    style={{ padding:'20px 26px 16px', flex:1, overflow:'hidden' }}
                  >
                    <div style={{ fontSize:7, fontWeight:900, letterSpacing:'.40em', textTransform:'uppercase', color:'rgba(26,26,26,0.30)', fontFamily:'"Manrope",sans-serif', marginBottom:10 }}>{cur.tag}</div>
                    <div style={{ display:'flex', alignItems:'flex-end', gap:2, marginBottom:12, lineHeight:1 }}>
                      <span style={{ fontSize:50, fontWeight:900, color:zoneColor, fontFamily:'"Barlow Condensed",sans-serif', lineHeight:0.88 }}>{cur.ch}</span>
                      <span style={{ fontSize:24, fontWeight:900, textTransform:'uppercase', color:'#1a1a1a', fontFamily:'"Manrope",sans-serif', lineHeight:1, paddingBottom:'0.05em', letterSpacing:'-.01em' }}>{cur.principle.slice(1)}</span>
                    </div>
                    <div style={{ height:2, width:32, background:`linear-gradient(90deg,${cur.accent},transparent)`, borderRadius:2, marginBottom:12 }} />
                    <p style={{ fontSize:13, lineHeight:1.75, color:'rgba(26,26,26,0.54)', fontFamily:'"Manrope",sans-serif', margin:'0 0 24px' }}>{cur.desc}</p>
                    {/* Element info */}
                    <div style={{ display:'flex', gap:18, alignItems:'center', padding:'14px 0', borderTop:'1px solid rgba(26,26,26,0.06)' }}>
                      <div>
                        <div style={{ fontSize:6.5, fontWeight:700, letterSpacing:'.28em', textTransform:'uppercase', color:'rgba(26,26,26,0.28)', fontFamily:'"Manrope",sans-serif', marginBottom:3 }}>Element</div>
                        <div style={{ fontSize:13, fontWeight:700, color:'rgba(26,26,26,0.65)', fontFamily:'"Barlow Condensed",sans-serif', letterSpacing:'.04em' }}>{cur.element}</div>
                      </div>
                      <div style={{ width:1, height:28, background:'rgba(26,26,26,0.08)' }} />
                      <div>
                        <div style={{ fontSize:6.5, fontWeight:700, letterSpacing:'.28em', textTransform:'uppercase', color:'rgba(26,26,26,0.28)', fontFamily:'"Manrope",sans-serif', marginBottom:3 }}>Symbol</div>
                        <div style={{ fontSize:22, fontWeight:900, color:cur.accent, fontFamily:'"Barlow Condensed",sans-serif', lineHeight:1 }}>{cur.symbol}</div>
                      </div>
                      <div style={{ width:1, height:28, background:'rgba(26,26,26,0.08)' }} />
                      <div>
                        <div style={{ fontSize:6.5, fontWeight:700, letterSpacing:'.28em', textTransform:'uppercase', color:'rgba(26,26,26,0.28)', fontFamily:'"Manrope",sans-serif', marginBottom:3 }}>Atomic №</div>
                        <div style={{ fontSize:13, fontWeight:700, color:'rgba(26,26,26,0.55)', fontFamily:'monospace' }}>{cur.num}</div>
                      </div>
                      <div style={{ width:1, height:28, background:'rgba(26,26,26,0.08)' }} />
                      <div>
                        <div style={{ fontSize:6.5, fontWeight:700, letterSpacing:'.28em', textTransform:'uppercase', color:'rgba(26,26,26,0.28)', fontFamily:'"Manrope",sans-serif', marginBottom:3 }}>Mass</div>
                        <div style={{ fontSize:11, fontWeight:700, color:'rgba(26,26,26,0.45)', fontFamily:'monospace' }}>{cur.mass}</div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                {/* Dot nav */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 26px 16px', borderTop:'1px solid rgba(26,26,26,0.06)' }}>
                  <button onClick={() => nav(-1)}
                    style={{ width:32, height:32, borderRadius:'50%', background:'rgba(26,26,26,0.06)', border:'1px solid rgba(26,26,26,0.10)', color:'rgba(26,26,26,0.58)', fontSize:17, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
                    onMouseEnter={e => e.currentTarget.style.background='rgba(26,26,26,0.12)'}
                    onMouseLeave={e => e.currentTarget.style.background='rgba(26,26,26,0.06)'}
                  >‹</button>
                  <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                    {ITEMS.map((item, i) => (
                      <button key={item.id} onClick={() => { setDir(i > idx ? 1 : -1); setCur(item) }}
                        style={{ width:i===idx?22:6, height:6, borderRadius:3, border:'none', cursor:'pointer', padding:0, transition:'width 0.3s,background 0.3s', background:i===idx?zoneColor:'rgba(26,26,26,0.18)' }}
                      />
                    ))}
                  </div>
                  <button onClick={() => nav(1)}
                    style={{ width:32, height:32, borderRadius:'50%', background:'rgba(26,26,26,0.06)', border:'1px solid rgba(26,26,26,0.10)', color:'rgba(26,26,26,0.58)', fontSize:17, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
                    onMouseEnter={e => e.currentTarget.style.background='rgba(26,26,26,0.12)'}
                    onMouseLeave={e => e.currentTarget.style.background='rgba(26,26,26,0.06)'}
                  >›</button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ── Photo tile ─────────────────────────────────────────────────── */
function Tile({ el, onOpen }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => onOpen(el)}
      style={{
        width:190, height:190, borderRadius:18, overflow:'hidden',
        cursor:'pointer', position:'relative', flexShrink:0,
        transform: hov ? 'scale(1.05) translateY(-4px)' : 'scale(1)',
        boxShadow: hov ? `0 24px 56px rgba(0,0,0,0.26), 0 0 0 2px ${el.accent}70` : '0 8px 28px rgba(0,0,0,0.16), 0 0 0 1px rgba(26,26,26,0.07)',
        transition:'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
      }}
    >
      <img src={el.img} alt={el.element} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transform: hov?'scale(1.10)':'scale(1)', transition:'transform 0.5s ease' }} />
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,rgba(0,0,0,0.08) 0%,rgba(0,0,0,0.68) 100%)' }} />
      {hov && <div style={{ position:'absolute', inset:0, background:`linear-gradient(145deg,${el.accent}28 0%,transparent 50%)` }} />}
      <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:1, background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)', opacity:hov?0.9:0.4, transition:'opacity 0.3s' }} />
      <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:el.zone==='KARR'?KARR_COLOR:CHOLAI_COLOR, opacity:hov?1:0.7, transition:'opacity 0.3s' }} />
      <div style={{ position:'relative', zIndex:2, width:'100%', height:'100%', display:'flex', flexDirection:'column', padding:'12px 14px 12px', boxSizing:'border-box' }}>
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          <span style={{ fontSize:10, fontFamily:'monospace', color:'rgba(255,255,255,0.50)', lineHeight:1 }}>{el.num}</span>
          <span style={{ fontSize:9, fontWeight:900, letterSpacing:'.12em', fontFamily:'"Manrope",sans-serif', color:hov?el.accent:'rgba(255,255,255,0.40)', transition:'color 0.25s', lineHeight:1 }}>{el.ch}</span>
        </div>
        <div style={{ flex:1, display:'flex', alignItems:'center', fontSize:58, fontWeight:700, fontFamily:'"Barlow Condensed",sans-serif', color:hov?el.accent:'#fff', textShadow:hov?`0 0 24px ${el.accent}70,0 2px 10px rgba(0,0,0,0.5)`:'0 2px 10px rgba(0,0,0,0.6)', transition:'color 0.25s,text-shadow 0.25s' }}>{el.symbol}</div>
        <div>
          <div style={{ height:1, background:hov?`linear-gradient(90deg,${el.accent}70,transparent)`:'rgba(255,255,255,0.18)', marginBottom:5, transition:'background 0.25s' }} />
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
            <span style={{ fontSize:9, fontWeight:600, fontFamily:'"Manrope",sans-serif', color:'rgba(255,255,255,0.60)' }}>{el.element}</span>
            <span style={{ fontSize:8, fontFamily:'monospace', color:'rgba(255,255,255,0.32)' }}>{el.mass}</span>
          </div>
        </div>
      </div>
      <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'24px 14px 12px', background:`linear-gradient(0deg,${el.accent}ee 0%,transparent)`, transform:hov?'translateY(0)':'translateY(100%)', transition:'transform 0.3s ease', zIndex:3, textAlign:'center' }}>
        <span style={{ fontSize:9.5, fontWeight:900, letterSpacing:'.14em', textTransform:'uppercase', color:'#fff', fontFamily:'"Manrope",sans-serif' }}>{el.principle}</span>
      </div>
    </div>
  )
}

/* ── Info card ──────────────────────────────────────────────────── */
function InfoCard({ el, align }) {
  const zoneColor = el.zone === 'KARR' ? KARR_COLOR : CHOLAI_COLOR
  return (
    <motion.div
      initial={{ opacity:0, x: align==='right' ? -28 : 28 }}
      whileInView={{ opacity:1, x:0 }}
      viewport={{ once:true, margin:'-50px' }}
      transition={{ duration:0.5, ease:[0.25,0.46,0.45,0.94] }}
      style={{ textAlign:align, maxWidth:220 }}
    >
      <div style={{ display:'flex', alignItems:'center', gap:6, justifyContent:align==='right'?'flex-end':'flex-start', marginBottom:6 }}>
        <div style={{ width:5, height:5, borderRadius:'50%', background:zoneColor, flexShrink:0 }} />
        <span style={{ fontSize:7, fontWeight:900, letterSpacing:'.38em', textTransform:'uppercase', color:zoneColor+'80', fontFamily:'"Manrope",sans-serif' }}>{el.zone}</span>
        <span style={{ fontSize:7, color:'rgba(26,26,26,0.22)' }}>·</span>
        <span style={{ fontSize:7, fontWeight:700, letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(26,26,26,0.30)', fontFamily:'"Manrope",sans-serif' }}>{el.tag}</span>
      </div>
      <div style={{ display:'flex', alignItems:'baseline', gap:1, justifyContent:align==='right'?'flex-end':'flex-start', marginBottom:7, lineHeight:1 }}>
        <span style={{ fontSize:44, fontWeight:900, color:zoneColor, fontFamily:'"Barlow Condensed",sans-serif', lineHeight:0.9 }}>{el.ch}</span>
        <span style={{ fontSize:20, fontWeight:900, letterSpacing:'.03em', textTransform:'uppercase', color:'#1a1a1a', fontFamily:'"Manrope",sans-serif', lineHeight:1 }}>{el.principle.slice(1)}</span>
      </div>
      <div style={{ height:1.5, width:32, background:zoneColor+'50', marginBottom:8, marginLeft:align==='right'?'auto':0 }} />
      <p style={{ fontSize:11.5, lineHeight:1.7, color:'rgba(26,26,26,0.48)', fontFamily:'"Manrope",sans-serif', margin:0 }}>{el.desc}</p>
    </motion.div>
  )
}

/* ── Desktop ────────────────────────────────────────────────────── */
function DesktopLayout({ onOpen }) {
  return (
    <section className="hidden lg:block w-full" style={{ background:'linear-gradient(170deg,#fdfbf7 0%,#f8f3ec 45%,#f3ede4 100%)', padding:'80px 0 88px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', opacity:.035, backgroundImage:'radial-gradient(rgba(26,26,26,0.6) 1px,transparent 1px)', backgroundSize:'40px 40px' }} />
      <div style={{ position:'absolute', top:0, left:0, width:'30%', height:'100%', background:'radial-gradient(ellipse 80% 60% at 0% 40%,rgba(122,29,53,0.04) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:0, right:0, width:'30%', height:'100%', background:'radial-gradient(ellipse 80% 60% at 100% 60%,rgba(45,106,79,0.04) 0%,transparent 70%)', pointerEvents:'none' }} />

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 40px', position:'relative', zIndex:2 }}>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:-16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ textAlign:'center', marginBottom:64, position:'relative' }}
        >
          {/* Eyebrow */}
          <p style={{ fontSize:7.5, fontWeight:900, letterSpacing:'.72em', textTransform:'uppercase', color:'rgba(184,92,56,0.45)', fontFamily:'"Manrope",sans-serif', marginBottom:16 }}>Our Identity</p>

          {/* Main heading */}
          <h2 style={{ margin:'0 0 24px', lineHeight:1 }}>
            <span style={{ fontSize:'clamp(48px,6vw,80px)', fontWeight:400, fontStyle:'italic', fontFamily:'"Lora",Georgia,serif', color:KARR_COLOR, letterSpacing:'0.12em' }}>KARR</span>
            <span style={{ fontSize:'clamp(28px,3.5vw,48px)', color:'rgba(26,26,26,0.18)', margin:'0 8px', fontFamily:'"Manrope",sans-serif' }}>·</span>
            <span style={{ fontSize:'clamp(48px,6vw,80px)', fontWeight:400, fontStyle:'italic', fontFamily:'"Lora",Georgia,serif', color:CHOLAI_COLOR, letterSpacing:'0.12em' }}>CHOLAI</span>
          </h2>

          {/* Periodic Plant badge */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'9px 20px 9px 14px', borderRadius:40, border:`1.5px solid ${CHOLAI_COLOR}`, background:'rgba(45,106,79,0.08)' }}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 14C8 14 3.5 11 3.5 6.5C3.5 4 5.5 2 8 2C10.5 2 12.5 4 12.5 6.5C12.5 9 10 11 8 11" stroke={CHOLAI_COLOR} strokeWidth="1.6" strokeLinecap="round"/>
                <path d="M8 11V14" stroke={CHOLAI_COLOR} strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <span style={{ fontSize:12, fontWeight:900, letterSpacing:'.18em', textTransform:'uppercase', color:CHOLAI_COLOR, fontFamily:'"Manrope",sans-serif' }}>Periodic Plant</span>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div style={{ position:'relative' }}>
          <motion.div initial={{ scaleY:0 }} whileInView={{ scaleY:1 }} viewport={{ once:true }}
            transition={{ duration:1.4, ease:'easeInOut' }}
            style={{ position:'absolute', left:'50%', top:0, bottom:0, width:2, transform:'translateX(-50%)', transformOrigin:'top', zIndex:0,
              background:`linear-gradient(180deg,${KARR_COLOR}22 0%,${KARR_COLOR}55 20%,${KARR_COLOR}55 45%,${CHOLAI_COLOR}55 55%,${CHOLAI_COLOR}55 80%,${CHOLAI_COLOR}22 100%)` }} />

          {ITEMS.map((el, i) => {
            const isLeft = el.zone === 'KARR'
            const zoneColor = isLeft ? KARR_COLOR : CHOLAI_COLOR
            return (
              <div key={el.id} style={{ display:'grid', gridTemplateColumns:'1fr 80px 1fr', alignItems:'center', marginBottom:i < ITEMS.length-1 ? 44 : 0, position:'relative', zIndex:1, minHeight:200 }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:20, paddingRight:40 }}>
                  {isLeft && (<>
                    <motion.div initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true, margin:'-40px' }} transition={{ delay:i*0.06, duration:0.5 }}>
                      <InfoCard el={el} align="right" />
                    </motion.div>
                    <motion.div initial={{ opacity:0, scale:0.88 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true, margin:'-40px' }} transition={{ delay:i*0.06+0.08, duration:0.5 }}>
                      <Tile el={el} onOpen={onOpen} />
                    </motion.div>
                  </>)}
                </div>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                  <motion.div initial={{ scale:0, opacity:0 }} whileInView={{ scale:1, opacity:1 }} viewport={{ once:true }} transition={{ delay:i*0.06+0.1, type:'spring', stiffness:280, damping:20 }}
                    style={{ width:18, height:18, borderRadius:'50%', background:zoneColor, boxShadow:`0 0 0 5px ${zoneColor}18, 0 0 0 10px ${zoneColor}07`, zIndex:2 }} />
                  <div style={{ width:32, height:1.5, background:`linear-gradient(${isLeft?'90deg':'270deg'},${zoneColor}60,transparent)`, position:'absolute', left:isLeft?'calc(50% + 9px)':'auto', right:isLeft?'auto':'calc(50% + 9px)' }} />
                </div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-start', gap:20, paddingLeft:40 }}>
                  {!isLeft && (<>
                    <motion.div initial={{ opacity:0, scale:0.88 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true, margin:'-40px' }} transition={{ delay:i*0.06+0.08, duration:0.5 }}>
                      <Tile el={el} onOpen={onOpen} />
                    </motion.div>
                    <motion.div initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true, margin:'-40px' }} transition={{ delay:i*0.06, duration:0.5 }}>
                      <InfoCard el={el} align="left" />
                    </motion.div>
                  </>)}
                </div>
              </div>
            )
          })}

          <motion.div initial={{ scale:0 }} whileInView={{ scale:1 }} viewport={{ once:true }} transition={{ delay:0.7, type:'spring' }}
            style={{ position:'absolute', left:'50%', bottom:-10, transform:'translateX(-50%)', width:10, height:10, borderRadius:'50%', background:`linear-gradient(135deg,${KARR_COLOR},${CHOLAI_COLOR})` }} />
        </div>

        {/* Footer */}
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:0.4 }}
          style={{ textAlign:'center', marginTop:56, paddingTop:24, borderTop:'1px solid rgba(26,26,26,0.06)' }}
        >
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:14 }}>
            <div style={{ height:1, width:56, background:'linear-gradient(90deg,transparent,rgba(26,26,26,0.10))' }} />
            <span style={{ fontSize:7.5, fontWeight:700, letterSpacing:'.6em', textTransform:'uppercase', color:'rgba(26,26,26,0.22)', fontFamily:'"Manrope",sans-serif' }}>Every Element · Every Value · Every Home</span>
            <div style={{ height:1, width:56, background:'linear-gradient(90deg,rgba(26,26,26,0.10),transparent)' }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Tablet ──────────────────────────────────────────────────────── */
function TabletLayout({ onOpen }) {
  return (
    <section className="hidden md:block lg:hidden w-full" style={{ background:'linear-gradient(165deg,#fdfbf7 0%,#f7f2ea 50%,#f3ede4 100%)', padding:'56px 0 64px', position:'relative', overflow:'hidden' }}>
      <div style={{ padding:'0 28px', maxWidth:720, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:44 }}>
          <p style={{ fontSize:7, fontWeight:900, letterSpacing:'.68em', textTransform:'uppercase', color:'rgba(184,92,56,0.42)', fontFamily:'"Manrope",sans-serif', marginBottom:10 }}>Our Identity</p>
          <div>
            <span style={{ fontSize:'9vw', fontWeight:400, fontStyle:'italic', fontFamily:'"Lora",Georgia,serif', color:KARR_COLOR, letterSpacing:'.10em' }}>KARR</span>
            <span style={{ fontSize:'9vw', fontWeight:400, fontStyle:'italic', fontFamily:'"Lora",Georgia,serif', color:CHOLAI_COLOR, letterSpacing:'.10em' }}>CHOLAI</span>
          </div>
        </div>
        <div style={{ position:'relative' }}>
          <div style={{ position:'absolute', top:0, bottom:0, left:'50%', width:2, transform:'translateX(-50%)', background:'linear-gradient(180deg,rgba(26,26,26,0.06),rgba(26,26,26,0.14),rgba(26,26,26,0.06))', pointerEvents:'none' }} />
          {ITEMS.map((el, i) => {
            const isLeft = el.zone === 'KARR'
            const zc = isLeft ? KARR_COLOR : CHOLAI_COLOR
            return (
              <motion.div key={el.id} initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.05 }}
                style={{ display:'grid', gridTemplateColumns:'1fr 48px 1fr', alignItems:'center', marginBottom:28, position:'relative', zIndex:1, minHeight:100 }}
              >
                <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:12, paddingRight:24 }}>
                  {isLeft && (<>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontSize:6.5, fontWeight:900, letterSpacing:'.3em', textTransform:'uppercase', color:zc+'70', fontFamily:'"Manrope",sans-serif', marginBottom:2 }}>{el.tag}</div>
                      <div style={{ display:'flex', alignItems:'baseline', gap:1, justifyContent:'flex-end' }}>
                        <span style={{ fontSize:32, fontWeight:900, color:zc, fontFamily:'"Barlow Condensed",sans-serif', lineHeight:0.9 }}>{el.ch}</span>
                        <span style={{ fontSize:15, fontWeight:900, textTransform:'uppercase', color:'#1a1a1a', fontFamily:'"Manrope",sans-serif' }}>{el.principle.slice(1)}</span>
                      </div>
                      <p style={{ fontSize:10.5, lineHeight:1.6, color:'rgba(26,26,26,0.46)', fontFamily:'"Manrope",sans-serif', margin:'4px 0 0' }}>{el.desc}</p>
                    </div>
                    <div onClick={() => onOpen(el)} style={{ width:88, height:88, borderRadius:12, overflow:'hidden', cursor:'pointer', position:'relative', flexShrink:0, boxShadow:'0 4px 16px rgba(0,0,0,0.13)' }}>
                      <img src={el.img} alt={el.element} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.55))' }} />
                      <div style={{ position:'absolute', bottom:6, left:8, fontSize:26, fontWeight:700, fontFamily:'"Barlow Condensed",sans-serif', color:'#fff' }}>{el.symbol}</div>
                    </div>
                  </>)}
                </div>
                <div style={{ display:'flex', justifyContent:'center' }}>
                  <div style={{ width:14, height:14, borderRadius:'50%', background:zc, boxShadow:`0 0 0 4px ${zc}18`, zIndex:2 }} />
                </div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-start', gap:12, paddingLeft:24 }}>
                  {!isLeft && (<>
                    <div onClick={() => onOpen(el)} style={{ width:88, height:88, borderRadius:12, overflow:'hidden', cursor:'pointer', position:'relative', flexShrink:0, boxShadow:'0 4px 16px rgba(0,0,0,0.13)' }}>
                      <img src={el.img} alt={el.element} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.55))' }} />
                      <div style={{ position:'absolute', bottom:6, left:8, fontSize:26, fontWeight:700, fontFamily:'"Barlow Condensed",sans-serif', color:'#fff' }}>{el.symbol}</div>
                    </div>
                    <div>
                      <div style={{ fontSize:6.5, fontWeight:900, letterSpacing:'.3em', textTransform:'uppercase', color:zc+'70', fontFamily:'"Manrope",sans-serif', marginBottom:2 }}>{el.tag}</div>
                      <div style={{ display:'flex', alignItems:'baseline', gap:1 }}>
                        <span style={{ fontSize:32, fontWeight:900, color:zc, fontFamily:'"Barlow Condensed",sans-serif', lineHeight:0.9 }}>{el.ch}</span>
                        <span style={{ fontSize:15, fontWeight:900, textTransform:'uppercase', color:'#1a1a1a', fontFamily:'"Manrope",sans-serif' }}>{el.principle.slice(1)}</span>
                      </div>
                      <p style={{ fontSize:10.5, lineHeight:1.6, color:'rgba(26,26,26,0.46)', fontFamily:'"Manrope",sans-serif', margin:'4px 0 0' }}>{el.desc}</p>
                    </div>
                  </>)}
                </div>
              </motion.div>
            )
          })}
        </div>
        <p style={{ textAlign:'center', marginTop:28, fontSize:7, fontWeight:700, letterSpacing:'.5em', textTransform:'uppercase', color:'rgba(26,26,26,0.20)', fontFamily:'"Manrope",sans-serif' }}>Every Element · Every Value · Every Home</p>
      </div>
    </section>
  )
}

/* ── Mobile ──────────────────────────────────────────────────────── */
function MobileLayout({ onOpen }) {
  return (
    <section className="md:hidden w-full" style={{ background:'linear-gradient(165deg,#fdfbf7 0%,#f7f2ea 50%,#f3ede4 100%)', padding:'44px 0 52px', position:'relative', overflow:'hidden' }}>
      <div style={{ padding:'0 16px' }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <p style={{ fontSize:6.5, fontWeight:900, letterSpacing:'.65em', textTransform:'uppercase', color:'rgba(184,92,56,0.42)', fontFamily:'"Manrope",sans-serif', marginBottom:8 }}>Our Identity</p>
          <div>
            <span style={{ fontSize:'12vw', fontWeight:400, fontStyle:'italic', fontFamily:'"Lora",Georgia,serif', color:KARR_COLOR, letterSpacing:'.07em' }}>KARR</span>
            <span style={{ fontSize:'12vw', fontWeight:400, fontStyle:'italic', fontFamily:'"Lora",Georgia,serif', color:CHOLAI_COLOR, letterSpacing:'.07em' }}>CHOLAI</span>
          </div>
        </div>
        <div style={{ position:'relative', paddingLeft:32 }}>
          <div style={{ position:'absolute', top:0, bottom:0, left:14, width:2, background:'linear-gradient(180deg,rgba(26,26,26,0.05),rgba(26,26,26,0.12),rgba(26,26,26,0.05))', borderRadius:2 }} />
          {ITEMS.map((el, i) => {
            const zc = el.zone === 'KARR' ? KARR_COLOR : CHOLAI_COLOR
            return (
              <motion.div key={el.id} initial={{ opacity:0, x:-14 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*0.05 }}
                style={{ display:'flex', gap:14, alignItems:'flex-start', marginBottom:24, position:'relative' }}
              >
                <div style={{ position:'absolute', left:-25, top:34, width:12, height:12, borderRadius:'50%', background:zc, boxShadow:`0 0 0 3px ${zc}20`, zIndex:2, flexShrink:0 }} />
                <div onClick={() => onOpen(el)} style={{ width:84, height:84, borderRadius:10, overflow:'hidden', flexShrink:0, cursor:'pointer', position:'relative', boxShadow:'0 4px 14px rgba(0,0,0,0.13)' }}>
                  <img src={el.img} alt={el.element} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.56))' }} />
                  <div style={{ position:'absolute', bottom:5, left:7, fontSize:24, fontWeight:700, fontFamily:'"Barlow Condensed",sans-serif', color:'#fff' }}>{el.symbol}</div>
                </div>
                <div style={{ flex:1, paddingTop:2 }}>
                  <div style={{ fontSize:6, fontWeight:900, letterSpacing:'.28em', textTransform:'uppercase', color:zc+'65', fontFamily:'"Manrope",sans-serif', marginBottom:2 }}>{el.tag}</div>
                  <div style={{ display:'flex', alignItems:'baseline', gap:1, marginBottom:4 }}>
                    <span style={{ fontSize:28, fontWeight:900, color:zc, fontFamily:'"Barlow Condensed",sans-serif', lineHeight:0.9 }}>{el.ch}</span>
                    <span style={{ fontSize:14, fontWeight:900, textTransform:'uppercase', color:'#1a1a1a', fontFamily:'"Manrope",sans-serif' }}>{el.principle.slice(1)}</span>
                  </div>
                  <p style={{ fontSize:11, lineHeight:1.65, color:'rgba(26,26,26,0.48)', fontFamily:'"Manrope",sans-serif', margin:0 }}>{el.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
        <p style={{ textAlign:'center', marginTop:14, fontSize:6.5, fontWeight:700, letterSpacing:'.42em', textTransform:'uppercase', color:'rgba(26,26,26,0.18)', fontFamily:'"Manrope",sans-serif' }}>Every Element · Every Value · Every Home</p>
      </div>
    </section>
  )
}

/* ── Export ──────────────────────────────────────────────────────── */
export default function IdentityPencil() {
  const [active, setActive] = useState(null)
  const open  = useCallback(el => setActive(el), [])
  const close = useCallback(() => setActive(null), [])
  return (
    <>
      <DesktopLayout onOpen={open} />
      <TabletLayout  onOpen={open} />
      <MobileLayout  onOpen={open} />
      <Popup el={active} onClose={close} />
    </>
  )
}
