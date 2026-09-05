import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiX, FiChevronRight, FiChevronLeft, FiCheck, FiUpload,
  FiUser, FiMapPin, FiHome, FiTool, FiSun, FiDollarSign,
  FiCalendar, FiMessageSquare, FiArrowRight, FiShield, FiStar,
} from 'react-icons/fi'
import logoImg from '../assets/KARRCHOLAI LOGO.png'

/* ─── Sections ───────────────────────────────────────────────── */
const SECTIONS = [
  { id:1,  label:'Client Details',       short:'You',          icon:FiUser },
  { id:2,  label:'Your Project',         short:'Service',      icon:FiHome },
  { id:3,  label:'Project Location',     short:'Location',     icon:FiMapPin },
  { id:4,  label:'Current Stage',        short:'Stage',        icon:FiTool },
  { id:5,  label:'House Requirements',   short:'Requirements', icon:FiHome },
  { id:6,  label:'Design & Documents',   short:'Design',       icon:FiMessageSquare },
  { id:7,  label:'Construction Scope',   short:'Scope',        icon:FiTool },
  { id:8,  label:'PMC Scope',            short:'PMC',          icon:FiTool },
  { id:9,  label:'Complete My Home',     short:'Completion',   icon:FiTool },
  { id:10, label:'Sustainable Features', short:'Cholai',       icon:FiSun },
  { id:11, label:'Budget',               short:'Budget',       icon:FiDollarSign },
  { id:12, label:'Timeline',             short:'Timeline',     icon:FiCalendar },
  { id:13, label:'Consultation',         short:'Consult',      icon:FiMessageSquare },
  { id:14, label:'Upload Documents',     short:'Uploads',      icon:FiUpload },
  { id:15, label:'Expectations',         short:'Priorities',   icon:FiCheck },
  { id:16, label:'How You Found Us',     short:'Referral',     icon:FiUser },
  { id:17, label:'Declaration',          short:'Submit',       icon:FiCheck },
]

const SIDE = [
  { headline:'Let\'s build\nyour dream\nhome together.', sub:'Your contact details help us personalise your experience and reach out at the right time.', badge:'Confidential & Secure' },
  { headline:'What do you\nneed us to do\nfor you?', sub:'Choose the service that fits your situation — everything else will be tailored from here.', badge:'17 Years of Excellence' },
  { headline:'Where is\nyour project\ntaking shape?', sub:'Location helps us plan site visits, understand local regulations, and assign the right team.', badge:'Pan India Projects' },
  { headline:'Where does\nyour project\nstand today?', sub:'Understanding your current stage lets us scope exactly the right level of involvement.', badge:'No Commitment Needed' },
  { headline:'Tell us\nabout your\ndream home.', sub:'Size, layout, and room preferences help us prepare the right cost and design framework.', badge:'100% Customised' },
  { headline:'Drawings\nand approvals\nstatus.', sub:'Knowing what exists helps us pick up exactly where things stand — no rework, no redundancy.', badge:'Expert Guidance' },
  { headline:'What should\nwe take care\nof for you?', sub:'Scope clarity at the start means accurate pricing and absolutely zero surprises later.', badge:'Transparent Pricing' },
  { headline:'Define your\nproject\noversight.', sub:'From periodic checks to full supervision — you decide how deeply we stay involved.', badge:'Professional PMC' },
  { headline:'Let\'s finish\nwhat was\nstarted.', sub:'We need to understand the gap before we can bridge it with the right professional approach.', badge:'Restart with Confidence' },
  { headline:'Build with\nnature,\nnot against it.', sub:'KARRCHOLAI\'s Cholai philosophy — sustainable, thoughtful, and low-impact construction.', badge:'Cholai Philosophy' },
  { headline:'Budget is\nnot a barrier\nhere.', sub:'There\'s no right or wrong number. Knowing your range helps us recommend the right approach.', badge:'Best Value Always' },
  { headline:'When do you\nwant to move\ninto your home?', sub:'Even a rough target helps us reverse-engineer the right construction schedule for you.', badge:'On-Time Delivery' },
  { headline:'How would\nyou like to\nbegin?', sub:'Choose the right entry point — a quick call, a site visit, or a full PMC discussion.', badge:'First Step Is Easy' },
  { headline:'Show us\nwhat you\nalready have.', sub:'Any drawings, photos, or estimates you share help us give a much more accurate response.', badge:'Fully Confidential' },
  { headline:'What matters\nmost in your\nnew home?', sub:'Your top 3 priorities guide every single decision we make together on your project.', badge:'Your Vision, Our Work' },
  { headline:'How did\nwe find\neach other?', sub:'This helps us understand where our clients come from and continue to serve them better.', badge:'Growing Together' },
  { headline:'You\'re almost\nthere. One\nlast step.', sub:'Review your details and submit. We\'ll get back to you within 24 hours with the right next step.', badge:'Response in 24 Hours' },
]

const TRUST = [
  { icon:'🏆', text:'Award-winning\nconstruction' },
  { icon:'🔒', text:'Your data is\n100% private' },
  { icon:'⏱', text:'Response within\n24 hours' },
  { icon:'🤝', text:'No obligation\nto proceed' },
]

const init = {
  fullName:'', phone:'', email:'', commPref:[], location:'',
  service:'', otherServices:[],
  address:'', city:'', pincode:'', landStatus:[],
  projectStage:[], completionPercent:'',
  propertyType:[], floors:[], plotArea:'', builtArea:'', bedrooms:'', otherReqs:[],
  drawings:[], approvedPlan:[], designHandler:[],
  constructionScope:[], constructionModel:[],
  pmcScope:[], monitoringFreq:[],
  incompleteReason:[], completedPercent:'', remaining:[],
  landscape:[], water:[], energy:[], responsible:[], traditional:[],
  budget:[], budgetStatus:[], costDiscussion:[],
  startPlan:[], hasTarget:[], targetDate:'',
  consultationType:[],
  uploadedFiles:[],
  priorities:[],
  referral:[],
  declaration: false,
}

export default function ClientRequirementsForm({ open, onClose }) {
  const [step, setStep]         = useState(0)
  const [form, setForm]         = useState(init)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [dir, setDir]           = useState(1)
  const scrollRef = useRef(null)
  const set = k => v => setForm(f => ({ ...f, [k]: v }))

  useEffect(() => { if (open) { setStep(0); setSubmitted(false); setForm(init); setDir(1) } }, [open])
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0 }, [step])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])
  useEffect(() => { const fn = e => { if (e.key==='Escape') onClose() }; document.addEventListener('keydown',fn); return ()=>document.removeEventListener('keydown',fn) }, [onClose])

  const total    = SECTIONS.length
  const progress = ((step + 1) / total) * 100
  const side     = SIDE[step]

  const goNext = () => { setDir(1);  setStep(s => Math.min(s+1, total-1)) }
  const goPrev = () => { setDir(-1); setStep(s => Math.max(s-1, 0)) }

  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 2200))
    setSubmitting(false); setSubmitted(true)
  }

  const variants = {
    enter:  d => ({ opacity:0, y: d>0 ? 32 : -32 }),
    center: { opacity:1, y:0 },
    exit:   d => ({ opacity:0, y: d>0 ? -32 : 32 }),
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div key="fs"
          initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          transition={{ duration:0.25 }}
          style={{ position:'fixed', inset:0, zIndex:3000, display:'flex', flexDirection:'column', background:'#0C0A08' }}
        >
          {/* ── NAV BAR ── */}
          <div style={{
            height:'60px', flexShrink:0, display:'flex', alignItems:'center',
            justifyContent:'space-between', padding:'0 1.75rem',
            borderBottom:'1px solid rgba(255,255,255,0.06)',
            background:'rgba(12,10,8,0.95)', backdropFilter:'blur(12px)',
            position:'relative', zIndex:10,
          }}>
            <img src={logoImg} alt="KARRCHOLAI" style={{ height:'36px', width:'auto' }} />

            {/* centre progress dots */}
            <div className="nav-dots" style={{ display:'flex', gap:'5px', alignItems:'center' }}>
              {SECTIONS.map((_,i) => (
                <motion.div key={i}
                  animate={{ width: i===step ? 20 : 6, background: i<step ? '#C9754A' : i===step ? '#fff' : 'rgba(255,255,255,0.15)' }}
                  transition={{ duration:0.3 }}
                  style={{ height:'5px', borderRadius:'3px' }}
                />
              ))}
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
              <span className="nav-step-label" style={{ fontSize:'0.6rem', fontWeight:'700', letterSpacing:'0.18em',
                color:'rgba(255,255,255,0.35)', textTransform:'uppercase' }}>
                {step+1} / {total}
              </span>
              <button onClick={onClose} style={{
                width:'34px', height:'34px', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.12)',
                background:'rgba(255,255,255,0.06)', color:'rgba(255,255,255,0.6)',
                cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                transition:'all 0.2s',
              }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.12)';e.currentTarget.style.color='#fff'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)';e.currentTarget.style.color='rgba(255,255,255,0.6)'}}
              >
                <FiX size={15} />
              </button>
            </div>
          </div>

          {/* ── BODY ── */}
          <div style={{ flex:1, display:'flex', overflow:'hidden' }}>

            {/* LEFT PANEL */}
            <div className="left-col" style={{
              width:'400px', flexShrink:0, display:'flex', flexDirection:'column',
              background:'linear-gradient(175deg, #1C1208 0%, #0C0A08 55%, #0C0A08 100%)',
              borderRight:'1px solid rgba(255,255,255,0.05)',
              padding:'2.5rem 2rem', position:'relative', overflow:'hidden',
            }}>
              {/* Radial glow */}
              <div style={{ position:'absolute', top:'-100px', left:'-60px',
                width:'380px', height:'380px', borderRadius:'50%',
                background:'radial-gradient(circle, rgba(184,92,56,0.18) 0%, transparent 65%)',
                pointerEvents:'none' }} />
              <div style={{ position:'absolute', bottom:'-60px', right:'-60px',
                width:'240px', height:'240px', borderRadius:'50%',
                background:'radial-gradient(circle, rgba(184,92,56,0.08) 0%, transparent 70%)',
                pointerEvents:'none' }} />

              <AnimatePresence mode="wait">
                <motion.div key={`lp-${step}`}
                  initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, y:-20 }} transition={{ duration:0.4, ease:'easeOut' }}
                  style={{ flex:1, display:'flex', flexDirection:'column', position:'relative', zIndex:1 }}
                >
                  {/* Badge */}
                  <div style={{ display:'inline-flex', alignItems:'center', gap:'0.45rem',
                    padding:'0.3rem 0.7rem', borderRadius:'100px',
                    background:'rgba(184,92,56,0.15)', border:'1px solid rgba(184,92,56,0.25)',
                    marginBottom:'1.75rem', alignSelf:'flex-start' }}>
                    <FiStar size={9} color='#C9754A' />
                    <span style={{ fontSize:'0.55rem', fontWeight:'700', letterSpacing:'0.18em',
                      textTransform:'uppercase', color:'#C9754A' }}>{side.badge}</span>
                  </div>

                  {/* Headline */}
                  <h2 style={{ fontSize:'clamp(1.7rem, 2.8vw, 2.4rem)', fontWeight:'900',
                    color:'#FAF9F6', lineHeight:1.15, letterSpacing:'-0.025em',
                    margin:'0 0 1.25rem', whiteSpace:'pre-line' }}>
                    {side.headline}
                  </h2>

                  {/* Accent line */}
                  <div style={{ width:'36px', height:'3px', background:'linear-gradient(90deg, #C9754A, #E8A87C)',
                    borderRadius:'2px', marginBottom:'1.25rem' }} />

                  <p style={{ fontSize:'0.8rem', color:'rgba(250,249,246,0.48)', lineHeight:1.8,
                    margin:'0', maxWidth:'280px' }}>{side.sub}</p>

                  <div style={{ flex:1 }} />

                  {/* Trust badges */}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.6rem', marginBottom:'1.5rem' }}>
                    {TRUST.map((t,i) => (
                      <div key={i} style={{ padding:'0.65rem 0.75rem', borderRadius:'10px',
                        background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)',
                        display:'flex', alignItems:'flex-start', gap:'0.5rem' }}>
                        <span style={{ fontSize:'1rem', lineHeight:1, flexShrink:0 }}>{t.icon}</span>
                        <span style={{ fontSize:'0.58rem', fontWeight:'600', color:'rgba(255,255,255,0.45)',
                          lineHeight:1.5, whiteSpace:'pre-line' }}>{t.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Section checklist */}
                  <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:'1.25rem' }}>
                    <p style={{ fontSize:'0.5rem', fontWeight:'800', letterSpacing:'0.25em',
                      textTransform:'uppercase', color:'rgba(255,255,255,0.2)', marginBottom:'0.7rem' }}>
                      Your Journey
                    </p>
                    <div style={{ display:'flex', flexDirection:'column', gap:'1px', maxHeight:'160px',
                      overflowY:'auto', scrollbarWidth:'none' }}>
                      {SECTIONS.map((s,i) => {
                        const Icon = s.icon
                        const done = i < step; const curr = i === step
                        return (
                          <div key={s.id} style={{ display:'flex', alignItems:'center', gap:'0.55rem',
                            padding:'0.3rem 0.55rem', borderRadius:'6px',
                            background: curr ? 'rgba(201,117,74,0.12)' : 'transparent',
                            transition:'background 0.2s' }}>
                            <div style={{ width:'15px', height:'15px', borderRadius:'50%', flexShrink:0,
                              background: done ? '#C9754A' : curr ? 'rgba(201,117,74,0.35)' : 'rgba(255,255,255,0.07)',
                              display:'flex', alignItems:'center', justifyContent:'center' }}>
                              {done ? <FiCheck size={7} color="#fff" /> : <Icon size={6} color={curr ? '#C9754A' : 'rgba(255,255,255,0.25)'} />}
                            </div>
                            <span style={{ fontSize:'0.6rem', fontWeight: curr ? '700' : '500', letterSpacing:'0.04em',
                              color: done ? 'rgba(201,117,74,0.75)' : curr ? '#FAF9F6' : 'rgba(255,255,255,0.22)' }}>
                              {s.short}
                            </span>
                            {done && <FiCheck size={8} color="rgba(201,117,74,0.6)" style={{ marginLeft:'auto' }} />}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT PANEL */}
            <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden',
              background:'#F7F4EF' }}>

              {/* Progress bar */}
              <div style={{ height:'3px', background:'rgba(26,26,26,0.07)', flexShrink:0, position:'relative' }}>
                <motion.div animate={{ width:`${progress}%` }} transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
                  style={{ position:'absolute', inset:0, width:0,
                    background:'linear-gradient(90deg, #C9754A, #E8A87C)', borderRadius:'0 2px 2px 0' }} />
              </div>

              {/* Section header */}
              {!submitted && (
                <div style={{ padding:'1.75rem 2.5rem 1.25rem', borderBottom:'1px solid rgba(26,26,26,0.07)',
                  flexShrink:0, background:'#F7F4EF' }}>
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'1rem' }}>
                    <div>
                      <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'6px' }}>
                        <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center',
                          width:'20px', height:'20px', borderRadius:'50%', background:'#1A1A1A',
                          fontSize:'0.52rem', fontWeight:'800', color:'#FAF9F6', letterSpacing:'0.04em', flexShrink:0 }}>
                          {String(step+1).padStart(2,'0')}
                        </span>
                        <span style={{ fontSize:'0.55rem', fontWeight:'700', letterSpacing:'0.22em',
                          textTransform:'uppercase', color:'rgba(26,26,26,0.35)' }}>
                          of {total} sections
                        </span>
                      </div>
                      <h3 style={{ fontSize:'1.45rem', fontWeight:'900', color:'#1A1A1A',
                        letterSpacing:'-0.02em', margin:0, lineHeight:1.1 }}>
                        {SECTIONS[step].label}
                      </h3>
                    </div>
                    {/* Progress ring */}
                    <ProgressRing pct={progress} />
                  </div>
                </div>
              )}

              {/* Form content */}
              <div ref={scrollRef} style={{ flex:1, overflowY:'auto', padding: submitted ? 0 : '2rem 2.5rem',
                scrollbarWidth:'thin', scrollbarColor:'rgba(184,92,56,0.2) transparent' }}>
                {submitted ? (
                  <SuccessScreen form={form} onClose={onClose} />
                ) : (
                  <AnimatePresence mode="wait" custom={dir}>
                    <motion.div key={step} custom={dir} variants={variants}
                      initial="enter" animate="center" exit="exit"
                      transition={{ duration:0.28, ease:'easeOut' }}>
                      {renderSection(step, form, set)}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>

              {/* Footer */}
              {!submitted && (
                <div style={{ padding:'1rem 2.5rem', borderTop:'1px solid rgba(26,26,26,0.07)',
                  background:'#F7F4EF', flexShrink:0,
                  display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem' }}>

                  {/* Back */}
                  <motion.button onClick={goPrev} disabled={step===0}
                    whileHover={step>0?{scale:1.03}:{}} whileTap={step>0?{scale:0.97}:{}}
                    style={{ display:'flex', alignItems:'center', gap:'0.4rem',
                      padding:'0.6rem 1.1rem', borderRadius:'8px',
                      border:'1.5px solid rgba(26,26,26,0.12)', background:'transparent',
                      color: step===0 ? 'rgba(26,26,26,0.2)' : '#1A1A1A',
                      fontSize:'0.68rem', fontWeight:'700', letterSpacing:'0.1em',
                      textTransform:'uppercase', cursor: step===0 ? 'not-allowed':'pointer',
                      transition:'all 0.2s' }}>
                    <FiChevronLeft size={13} /> Back
                  </motion.button>

                  {/* Save indicator */}
                  <div style={{ display:'flex', alignItems:'center', gap:'0.35rem' }}>
                    <FiShield size={11} color="rgba(26,26,26,0.25)" />
                    <span style={{ fontSize:'0.58rem', color:'rgba(26,26,26,0.28)',
                      fontWeight:'600', letterSpacing:'0.08em' }}>Auto-saved</span>
                  </div>

                  {/* Continue / Submit */}
                  {step < total-1 ? (
                    <motion.button onClick={goNext}
                      whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                      style={{ display:'flex', alignItems:'center', gap:'0.5rem',
                        padding:'0.65rem 1.6rem', borderRadius:'8px', border:'none',
                        background:'#1A1A1A', color:'#FAF9F6',
                        fontSize:'0.7rem', fontWeight:'800', letterSpacing:'0.12em',
                        textTransform:'uppercase', cursor:'pointer',
                        boxShadow:'0 4px 16px rgba(26,26,26,0.18)' }}
                      onMouseEnter={e => e.currentTarget.style.background='#B85C38'}
                      onMouseLeave={e => e.currentTarget.style.background='#1A1A1A'}
                    >
                      Continue <FiChevronRight size={13} />
                    </motion.button>
                  ) : (
                    <motion.button onClick={handleSubmit}
                      disabled={!form.declaration || submitting}
                      whileHover={form.declaration&&!submitting?{scale:1.03}:{}}
                      whileTap={form.declaration&&!submitting?{scale:0.97}:{}}
                      style={{ display:'flex', alignItems:'center', gap:'0.5rem',
                        padding:'0.65rem 1.6rem', borderRadius:'8px', border:'none',
                        background: form.declaration ? 'linear-gradient(135deg,#C9754A,#B85C38)' : 'rgba(26,26,26,0.1)',
                        color: form.declaration ? '#fff' : 'rgba(26,26,26,0.3)',
                        fontSize:'0.7rem', fontWeight:'800', letterSpacing:'0.12em',
                        textTransform:'uppercase', minWidth:'190px', justifyContent:'center',
                        cursor: form.declaration&&!submitting ? 'pointer':'not-allowed',
                        boxShadow: form.declaration ? '0 4px 20px rgba(184,92,56,0.35)':'none',
                        transition:'all 0.2s' }}>
                      {submitting ? (
                        <><Spinner /> Submitting…</>
                      ) : <>Submit Requirements <FiArrowRight size={13} /></>}
                    </motion.button>
                  )}
                </div>
              )}
            </div>
          </div>

          <style>{`
            @media (max-width:860px){ .left-col{display:none!important} .nav-dots{display:none!important} }
            @media (max-width:600px){ .rg2{grid-template-columns:1fr!important} }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Progress ring ──────────────────────────────────────────── */
function ProgressRing({ pct }) {
  const r=18, c=2*Math.PI*r, dash=(pct/100)*c
  return (
    <div style={{ position:'relative', width:'52px', height:'52px', flexShrink:0 }}>
      <svg width="52" height="52" style={{ transform:'rotate(-90deg)' }}>
        <circle cx="26" cy="26" r={r} fill="none" stroke="rgba(26,26,26,0.08)" strokeWidth="3" />
        <motion.circle cx="26" cy="26" r={r} fill="none" stroke="#C9754A" strokeWidth="3"
          strokeLinecap="round"
          initial={{ strokeDasharray:`0 ${c}` }}
          animate={{ strokeDasharray:`${dash} ${c}` }}
          transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
        />
      </svg>
      <span style={{ position:'absolute', inset:0, display:'flex', alignItems:'center',
        justifyContent:'center', fontSize:'0.58rem', fontWeight:'800',
        color:'#1A1A1A', letterSpacing:'0.02em' }}>
        {Math.round(pct)}%
      </span>
    </div>
  )
}

/* ─── Spinner ────────────────────────────────────────────────── */
function Spinner() {
  return <span style={{ width:'13px', height:'13px', border:'2px solid rgba(255,255,255,0.3)',
    borderTopColor:'#fff', borderRadius:'50%', display:'inline-block',
    animation:'kcSpin 0.7s linear infinite' }} />
}

/* ═══════════════════════════════════════════════════════════════
   SECTION RENDERER
═══════════════════════════════════════════════════════════════ */
function renderSection(step, form, set) {
  switch(step) {
    case 0: return (
      <div>
        <InfoBanner icon="🔒" text="Your information is completely confidential and will only be used to prepare your project assessment." />
        <div className="rg2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
          <FInput label="Full Name" required placeholder="Your full name" value={form.fullName} onChange={set('fullName')} />
          <FInput label="Phone / WhatsApp" required placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={set('phone')} type="tel" />
        </div>
        <FInput label="Email address" placeholder="your@email.com" value={form.email} onChange={set('email')} type="email" />
        <FChips label="Preferred communication" options={['Phone call','WhatsApp','Email','Video call']} selected={form.commPref} onChange={set('commPref')} />
        <FInput label="Where are you currently located?" placeholder="City / District" value={form.location} onChange={set('location')} />
      </div>
    )
    case 1: return (
      <div>
        <InfoBanner icon="💡" text="Not sure which service applies? Select your closest match — we'll guide you to the right solution." />
        <SCard emoji="🏠" title="Build My Home" tag="Complete Residential Construction"
          desc="I have a plot and want to build a new home — from planning to final handover."
          value="build" selected={form.service} onChange={set('service')} />
        <SCard emoji="📋" title="Manage My Home" tag="Project Management Consultancy"
          desc="I am planning or constructing my home and need professional project management."
          value="manage" selected={form.service} onChange={set('service')} />
        <SCard emoji="🔨" title="Complete My Home" tag="Complete an Incomplete Home"
          desc="Construction has already started and I need professional support to complete it."
          value="complete" selected={form.service} onChange={set('service')} />
        <SCard emoji="♻️" title="Other Professional Services" tag="Renovation / Consultation / Vastu"
          desc="Renovation, alterations, sustainable solutions, Vastu / Manaiyadi, or other requirement."
          value="other" selected={form.service} onChange={set('service')} />
        {form.service==='other' && (
          <FChips label="Select applicable services" options={[
            'Renovation / alteration','Construction consultation','Sustainable home solutions',
            'Vastu / Manaiyadi consultation','Other professional requirement',
          ]} selected={form.otherServices} onChange={set('otherServices')} />
        )}
      </div>
    )
    case 2: return (
      <div>
        <FInput label="Address / Area" required placeholder="Street, locality or area" value={form.address} onChange={set('address')} />
        <div className="rg2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
          <FInput label="City / District" required placeholder="City or district" value={form.city} onChange={set('city')} />
          <FInput label="Pincode" placeholder="6-digit pincode" value={form.pincode} onChange={set('pincode')} />
        </div>
        <FChips label="Project location status" options={[
          'Land purchased','Land registration in progress','Planning to purchase','Existing building',
        ]} selected={form.landStatus} onChange={set('landStatus')} multi={false} />
      </div>
    )
    case 3: return (
      <div>
        <Qdesc>Where is your project currently?</Qdesc>
        <FChips options={[
          'Just planning','Land purchased, construction not started','Design / drawing stage',
          'Approval stage','Foundation started','Structure under construction',
          'Brickwork / masonry stage','Plastering stage','Finishing stage',
          'Construction stopped / incomplete','Existing house requiring renovation','Other',
        ]} selected={form.projectStage} onChange={set('projectStage')} multi={false} />
        <FInput label="If construction has started — approximately how much is complete?"
          placeholder="e.g. 40 (%)" value={form.completionPercent} onChange={set('completionPercent')} />
      </div>
    )
    case 4: return (
      <div>
        <FChips label="Type of property" multi={false} options={[
          'Independent house','Villa','Duplex','Multi-floor residence',
          'Renovation','Extension / additional floor','Other',
        ]} selected={form.propertyType} onChange={set('propertyType')} />
        <FChips label="Number of floors" multi={false} options={[
          'Ground only','Ground + 1','Ground + 2','Ground + 3 or more',
        ]} selected={form.floors} onChange={set('floors')} />
        <div className="rg2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
          <FInput label="Approximate plot area" placeholder="sq.ft." value={form.plotArea} onChange={set('plotArea')} />
          <FInput label="Approximate built-up area" placeholder="sq.ft." value={form.builtArea} onChange={set('builtArea')} />
        </div>
        <FInput label="Number of bedrooms" placeholder="e.g. 3" value={form.bedrooms} onChange={set('bedrooms')} />
        <FChips label="Other requirements" options={[
          'Parking','Home office','Pooja room','Courtyard',
          'Terrace garden','Utility area','Elder-friendly requirements','Other',
        ]} selected={form.otherReqs} onChange={set('otherReqs')} />
      </div>
    )
    case 5: return (
      <div>
        <FChips label="Drawings available" options={[
          'No drawings yet','Concept plan','Architectural drawings','Structural drawings',
          'Electrical drawings','Plumbing drawings','Complete working drawings',
        ]} selected={form.drawings} onChange={set('drawings')} />
        <FChips label="Approved plan status" multi={false} options={['Yes','No','In progress','Not applicable']}
          selected={form.approvedPlan} onChange={set('approvedPlan')} />
        <FChips label="Who is currently handling the design?" options={[
          'KARRCHOLAI','Architect','Structural consultant','Another contractor','Myself','Not decided',
        ]} selected={form.designHandler} onChange={set('designHandler')} />
      </div>
    )
    case 6: return (
      <div>
        <Qdesc>For Build My Home — what would you like KARRCHOLAI to handle?</Qdesc>
        <FChips options={[
          'Complete construction','Civil & structural works','Masonry & plastering',
          'Flooring','Doors & windows','Electrical','Plumbing','Painting',
          'Kitchen','Wardrobes','External works','Landscape','Other',
        ]} selected={form.constructionScope} onChange={set('constructionScope')} />
        <FChips label="Preferred construction model" multi={false} options={[
          'Complete execution','Labour contract','Material + labour','Not sure — need guidance',
        ]} selected={form.constructionModel} onChange={set('constructionModel')} />
      </div>
    )
    case 7: return (
      <div>
        <Qdesc>For Manage My Home — define your expectations from KARRCHOLAI.</Qdesc>
        <FChips options={[
          'Project planning','Contractor coordination','Site supervision','Quality monitoring',
          'Material coordination','Quantity / measurement verification','Cost monitoring',
          'Progress monitoring','Schedule monitoring','Vendor coordination',
          'Client reporting','Construction methodology advice','Periodic site inspection','Complete PMC',
        ]} selected={form.pmcScope} onChange={set('pmcScope')} />
        <FChips label="Site monitoring frequency" multi={false} options={[
          'As required','Weekly','Multiple visits per week','Regular / continuous supervision','Not sure',
        ]} selected={form.monitoringFreq} onChange={set('monitoringFreq')} />
      </div>
    )
    case 8: return (
      <div>
        <FChips label="Why is the project incomplete?" options={[
          'Contractor stopped work','Budget issue','Quality concerns',
          'Contractor coordination problems','Personal reasons','Design changes','Construction defects','Other',
        ]} selected={form.incompleteReason} onChange={set('incompleteReason')} />
        <FInput label="Construction completed (%)" placeholder="e.g. 60" value={form.completedPercent} onChange={set('completedPercent')} />
        <FChips label="What remains to be done?" options={[
          'Structural work','Masonry','Plastering','Waterproofing','Flooring',
          'Doors / windows','Electrical','Plumbing','Painting','Kitchen','External works','Landscape','Other',
        ]} selected={form.remaining} onChange={set('remaining')} />
      </div>
    )
    case 9: return (
      <div>
        <Qdesc>How would you like to improve the living environment?</Qdesc>
        {[
          { emoji:'🌿', label:'Landscape',              key:'landscape',  opts:['Basic landscape','Garden','Terrace garden','Native plants','Low-maintenance landscape'] },
          { emoji:'💧', label:'Water',                  key:'water',      opts:['Rainwater harvesting','Groundwater recharge','Rainwater storage','Water-efficient solutions'] },
          { emoji:'☀️', label:'Energy',                 key:'energy',     opts:['Solar PV','Solar water heating','Energy-efficient home','Natural lighting / ventilation'] },
          { emoji:'♻️', label:'Responsible Construction',key:'responsible',opts:['Construction waste management','Material reuse','Waste segregation','Reduce material wastage'] },
          { emoji:'🏡', label:'Traditional / Natural',  key:'traditional',opts:['Traditional flooring','Athangudi tiles','Natural materials','Traditional planning concepts','Other'] },
        ].map(g => (
          <GBlock key={g.key} emoji={g.emoji} label={g.label}>
            <FChips inline options={g.opts} selected={form[g.key]} onChange={set(g.key)} />
          </GBlock>
        ))}
      </div>
    )
    case 10: return (
      <div>
        <InfoBanner icon="💰" text="There's no right or wrong budget. Your range simply helps us recommend the most value-driven approach for your project." />
        <FChips label="Approximate construction budget" multi={false} options={[
          {value:'below25',label:'Below ₹25 lakh'},{value:'25-50',label:'₹25 – 50 lakh'},
          {value:'50-75',label:'₹50 – 75 lakh'},{value:'75-1cr',label:'₹75 lakh – ₹1 crore'},
          {value:'1cr+',label:'₹1 crore+'},{value:'nd',label:'Not decided yet'},
        ]} selected={form.budget} onChange={set('budget')} />
        <FChips label="Budget status" multi={false} options={[
          'Budget already decided','Need help preparing budget','I want to understand the construction cost first',
        ]} selected={form.budgetStatus} onChange={set('budgetStatus')} />
        <FChips label="Want a preliminary cost discussion?" multi={false} options={['Yes, please','No, not needed']}
          selected={form.costDiscussion} onChange={set('costDiscussion')} />
      </div>
    )
    case 11: return (
      <div>
        <FChips label="When do you plan to start?" multi={false} options={[
          'Immediately','Within 1–3 months','3–6 months','6–12 months','More than 1 year','Not decided',
        ]} selected={form.startPlan} onChange={set('startPlan')} />
        <FChips label="Is there a specific completion target?" multi={false} options={['Yes','No']}
          selected={form.hasTarget} onChange={set('hasTarget')} />
        {form.hasTarget.includes('Yes') && (
          <FInput label="Target completion date" placeholder="e.g. December 2027" value={form.targetDate} onChange={set('targetDate')} />
        )}
      </div>
    )
    case 12: return (
      <div>
        <Qdesc>Choose the right entry point for your project.</Qdesc>
        {[
          { emoji:'💻', title:'Online Consultation', price:'₹1,000', value:'online',
            desc:'Initial professional discussion and personalised construction guidance.' },
          { emoji:'📍', title:'Site Visit', price:'₹2,000 + travel', value:'site',
            desc:'Physical site inspection and preliminary project assessment.' },
          { emoji:'🤝', title:'Full PMC Discussion', price:'Contact for pricing', value:'pmc',
            desc:'For clients requiring ongoing project management and supervision.' },
          { emoji:'🤔', title:'I\'m Not Sure', price:'', value:'unsure',
            desc:'Please recommend the appropriate option based on my project.' },
        ].map(c => <CCard key={c.value} {...c} selected={form.consultationType} onChange={set('consultationType')} />)}
      </div>
    )
    case 13: return (
      <div>
        <InfoBanner icon="🔒" text="All uploaded files are kept strictly confidential and used only for your project assessment." />
        <UploadZone files={form.uploadedFiles} onChange={set('uploadedFiles')} />
      </div>
    )
    case 14: return (
      <div>
        <Qdesc>Choose up to 3 priorities — these guide every decision on your project.</Qdesc>
        <FChips options={[
          'Quality','Budget control','Transparency','Timely completion','Professional supervision',
          'Material quality','Design','Sustainability','Low maintenance','Traditional features','Peace of mind',
        ]} selected={form.priorities}
          onChange={v => { if(v.length<=3) set('priorities')(v) }} />
        {form.priorities.length>=3 && (
          <p style={{ fontSize:'0.65rem', color:'#B85C38', fontWeight:'700', marginTop:'-0.25rem' }}>Maximum 3 selected</p>
        )}
      </div>
    )
    case 15: return (
      <div>
        <FChips options={[
          'Google','Instagram','Facebook','YouTube','Referral','Friend / family','Existing client','Other',
        ]} selected={form.referral} onChange={set('referral')} />
      </div>
    )
    case 16: return (
      <div>
        {/* Summary */}
        <div style={{ border:'1px solid rgba(26,26,26,0.08)', borderRadius:'16px', overflow:'hidden', marginBottom:'1.5rem' }}>
          <div style={{ padding:'0.85rem 1.25rem', background:'#1A1A1A' }}>
            <span style={{ fontSize:'0.58rem', fontWeight:'800', letterSpacing:'0.2em',
              textTransform:'uppercase', color:'rgba(255,255,255,0.5)' }}>Your Summary</span>
          </div>
          {[
            { k:'Name',     v: form.fullName||'—' },
            { k:'Phone',    v: form.phone||'—' },
            { k:'Service',  v: {build:'Build My Home',manage:'Manage My Home',complete:'Complete My Home',other:'Other Services'}[form.service]||'—' },
            { k:'Location', v: [form.city,form.pincode].filter(Boolean).join(', ')||'—' },
            { k:'Budget',   v: {below25:'Below ₹25L','25-50':'₹25–50L','50-75':'₹50–75L','75-1cr':'₹75L–₹1Cr','1cr+':'₹1Cr+',nd:'Not decided'}[form.budget[0]]||'—' },
            { k:'Timeline', v: form.startPlan[0]||'—' },
          ].map(({k,v},i,a) => (
            <div key={k} style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
              padding:'0.8rem 1.25rem', borderBottom: i<a.length-1?'1px solid rgba(26,26,26,0.06)':'none',
              background: i%2===0?'rgba(26,26,26,0.015)':'transparent' }}>
              <span style={{ fontSize:'0.65rem', color:'rgba(26,26,26,0.42)', fontWeight:'600', letterSpacing:'0.06em', textTransform:'uppercase' }}>{k}</span>
              <span style={{ fontSize:'0.73rem', color:'#1A1A1A', fontWeight:'700', textAlign:'right', maxWidth:'65%' }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Declaration */}
        <div style={{ background:'rgba(184,92,56,0.05)', border:'1px solid rgba(184,92,56,0.12)',
          borderRadius:'14px', padding:'1.25rem 1.25rem', marginBottom:'1.5rem' }}>
          <p style={{ fontSize:'0.76rem', color:'rgba(26,26,26,0.62)', lineHeight:1.85, fontStyle:'italic', margin:0 }}>
            I understand that the information provided above is for preliminary project assessment. Final scope, cost, fees, 
            timelines and deliverables will be confirmed separately based on project requirements, site conditions, 
            drawings, specifications and mutually agreed terms.
          </p>
        </div>

        <button type="button" onClick={() => set('declaration')(!form.declaration)}
          style={{ display:'flex', alignItems:'center', gap:'0.85rem', background:'none', border:'none', cursor:'pointer', padding:0 }}>
          <motion.div animate={{ background: form.declaration?'#B85C38':'transparent',
            borderColor: form.declaration?'#B85C38':'rgba(26,26,26,0.2)' }}
            transition={{ duration:0.15 }}
            style={{ width:'24px', height:'24px', borderRadius:'7px', flexShrink:0, border:'2px solid',
              display:'flex', alignItems:'center', justifyContent:'center' }}>
            <AnimatePresence>
              {form.declaration && (
                <motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0}} transition={{duration:0.15}}>
                  <FiCheck size={13} color="#fff" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <span style={{ fontSize:'0.76rem', fontWeight:'600', color:'#1A1A1A', textAlign:'left' }}>
            I agree to the above declaration
          </span>
        </button>
      </div>
    )
    default: return null
  }
}

/* ═══════════════════════════════════════════════════════════════
   SMALL COMPONENTS
═══════════════════════════════════════════════════════════════ */
const Qdesc = ({children}) => (
  <p style={{ fontSize:'0.8rem', color:'rgba(26,26,26,0.52)', lineHeight:1.75,
    marginBottom:'1.25rem', marginTop:'-0.2rem' }}>{children}</p>
)

const InfoBanner = ({icon, text}) => (
  <div style={{ display:'flex', gap:'0.75rem', alignItems:'flex-start', padding:'0.85rem 1rem',
    borderRadius:'10px', background:'rgba(184,92,56,0.06)', border:'1px solid rgba(184,92,56,0.12)',
    marginBottom:'1.5rem' }}>
    <span style={{ fontSize:'1rem', flexShrink:0, marginTop:'1px' }}>{icon}</span>
    <p style={{ fontSize:'0.72rem', color:'rgba(26,26,26,0.6)', lineHeight:1.65, margin:0 }}>{text}</p>
  </div>
)

const FInput = ({label, required, placeholder, value, onChange, type='text'}) => (
  <div style={{ marginBottom:'1.25rem' }}>
    {label && <label style={{ display:'block', fontSize:'0.62rem', fontWeight:'700', letterSpacing:'0.12em',
      textTransform:'uppercase', color:'rgba(26,26,26,0.45)', marginBottom:'0.4rem' }}>
      {label}{required&&<span style={{color:'#B85C38'}}> *</span>}
    </label>}
    <input type={type} placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)}
      style={{ width:'100%', padding:'0.8rem 1rem', borderRadius:'10px', fontSize:'0.83rem',
        fontFamily:'inherit', color:'#1A1A1A', background:'#fff',
        border:'1.5px solid rgba(26,26,26,0.1)', outline:'none', boxSizing:'border-box',
        transition:'border-color 0.2s, box-shadow 0.2s',
        boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}
      onFocus={e=>{e.target.style.borderColor='#C9754A';e.target.style.boxShadow='0 0 0 3px rgba(201,117,74,0.12)'}}
      onBlur={e=>{e.target.style.borderColor='rgba(26,26,26,0.1)';e.target.style.boxShadow='0 1px 4px rgba(0,0,0,0.04)'}}
    />
  </div>
)

const FChips = ({label, options, selected, onChange, multi=true, inline}) => {
  const toggle = v => {
    if(multi) onChange(selected.includes(v)?selected.filter(x=>x!==v):[...selected,v])
    else onChange(selected.includes(v)?[]:[v])
  }
  return (
    <div style={{ marginBottom: inline?0:'1.5rem' }}>
      {label && <p style={{ fontSize:'0.62rem', fontWeight:'700', letterSpacing:'0.12em',
        textTransform:'uppercase', color:'rgba(26,26,26,0.45)', marginBottom:'0.55rem', margin:'0 0 0.55rem' }}>{label}</p>}
      <div style={{ display:'flex', flexWrap:'wrap', gap:'0.45rem' }}>
        {options.map(opt => {
          const isObj=typeof opt==='object', val=isObj?opt.value:opt, txt=isObj?opt.label:opt
          const on=selected.includes(val)
          return (
            <motion.button key={val} type="button" onClick={()=>toggle(val)}
              whileHover={{scale:1.03}} whileTap={{scale:0.97}}
              style={{ padding:'0.42rem 0.9rem', borderRadius:'100px',
                fontSize:'0.68rem', fontWeight:'600', letterSpacing:'0.02em', cursor:'pointer',
                border:`1.5px solid ${on?'#C9754A':'rgba(26,26,26,0.1)'}`,
                background: on?'#C9754A':'#fff', color: on?'#fff':'#1A1A1A',
                transition:'all 0.15s', display:'inline-flex', alignItems:'center', gap:'0.3rem',
                boxShadow: on?'0 2px 10px rgba(201,117,74,0.25)':'0 1px 3px rgba(0,0,0,0.04)' }}>
              {on && <FiCheck size={9} />} {txt}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

const GBlock = ({emoji, label, children}) => (
  <div style={{ marginBottom:'0.85rem', padding:'1rem 1.1rem', borderRadius:'12px',
    background:'#fff', border:'1px solid rgba(26,26,26,0.07)',
    boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }}>
    <p style={{ fontSize:'0.62rem', fontWeight:'800', letterSpacing:'0.12em',
      textTransform:'uppercase', color:'rgba(26,26,26,0.5)', marginBottom:'0.6rem', margin:'0 0 0.6rem' }}>
      {emoji} {label}</p>
    {children}
  </div>
)

const SCard = ({emoji, title, tag, desc, value, selected, onChange}) => {
  const on = selected===value
  return (
    <motion.button type="button" onClick={()=>onChange(value)}
      whileHover={{y:-2}} whileTap={{scale:0.99}}
      style={{ width:'100%', textAlign:'left', padding:'1.1rem 1.2rem',
        borderRadius:'14px', cursor:'pointer',
        border:`2px solid ${on?'#C9754A':'rgba(26,26,26,0.08)'}`,
        background: on?'rgba(201,117,74,0.05)':'#fff',
        marginBottom:'0.65rem', display:'flex', alignItems:'flex-start', gap:'1rem',
        boxShadow: on?'0 6px 24px rgba(201,117,74,0.15)':'0 1px 6px rgba(0,0,0,0.05)',
        transition:'all 0.2s' }}>
      <span style={{ fontSize:'1.65rem', flexShrink:0, lineHeight:1, marginTop:'2px' }}>{emoji}</span>
      <div style={{ flex:1, minWidth:0 }}>
        <p style={{ fontSize:'0.72rem', fontWeight:'900', letterSpacing:'0.1em', textTransform:'uppercase',
          color: on?'#C9754A':'#1A1A1A', margin:'0 0 3px' }}>{title}</p>
        <p style={{ fontSize:'0.6rem', fontWeight:'700', letterSpacing:'0.06em', textTransform:'uppercase',
          color: on?'rgba(201,117,74,0.65)':'rgba(26,26,26,0.35)', margin:'0 0 6px' }}>{tag}</p>
        <p style={{ fontSize:'0.72rem', color:'rgba(26,26,26,0.55)', margin:0, lineHeight:1.6 }}>{desc}</p>
      </div>
      <div style={{ width:'22px', height:'22px', borderRadius:'50%', flexShrink:0,
        border:`2px solid ${on?'#C9754A':'rgba(26,26,26,0.15)'}`,
        background: on?'#C9754A':'transparent',
        display:'flex', alignItems:'center', justifyContent:'center', marginTop:'2px', transition:'all 0.2s' }}>
        {on && <FiCheck size={11} color="#fff" />}
      </div>
    </motion.button>
  )
}

const CCard = ({emoji, title, price, desc, value, selected, onChange}) => {
  const on=selected.includes(value)
  const toggle=()=>onChange(on?selected.filter(v=>v!==value):[value])
  return (
    <motion.button type="button" onClick={toggle}
      whileHover={{y:-2}} whileTap={{scale:0.99}}
      style={{ width:'100%', textAlign:'left', padding:'1.1rem 1.2rem',
        borderRadius:'14px', cursor:'pointer', marginBottom:'0.65rem',
        border:`2px solid ${on?'#C9754A':'rgba(26,26,26,0.08)'}`,
        background: on?'rgba(201,117,74,0.05)':'#fff',
        display:'flex', gap:'1rem', alignItems:'flex-start',
        boxShadow: on?'0 6px 24px rgba(201,117,74,0.15)':'0 1px 6px rgba(0,0,0,0.05)',
        transition:'all 0.2s' }}>
      <span style={{ fontSize:'1.5rem', flexShrink:0 }}>{emoji}</span>
      <div style={{ flex:1 }}>
        <p style={{ fontSize:'0.72rem', fontWeight:'900', letterSpacing:'0.1em',
          textTransform:'uppercase', color: on?'#C9754A':'#1A1A1A', margin:'0 0 4px' }}>{title}</p>
        {price && <p style={{ fontSize:'0.72rem', fontWeight:'800', color:'#B85C38', margin:'0 0 5px' }}>{price}</p>}
        <p style={{ fontSize:'0.7rem', color:'rgba(26,26,26,0.55)', margin:0, lineHeight:1.6 }}>{desc}</p>
      </div>
      <div style={{ width:'22px', height:'22px', borderRadius:'50%', flexShrink:0,
        border:`2px solid ${on?'#C9754A':'rgba(26,26,26,0.15)'}`,
        background:on?'#C9754A':'transparent',
        display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s' }}>
        {on && <FiCheck size={11} color="#fff" />}
      </div>
    </motion.button>
  )
}

const UploadZone = ({files, onChange}) => {
  const ref = useRef()
  const add = f => onChange([...files,...Array.from(f)])
  return (
    <div>
      <motion.div onClick={()=>ref.current?.click()}
        onDragOver={e=>e.preventDefault()}
        onDrop={e=>{e.preventDefault();add(e.dataTransfer.files)}}
        whileHover={{ borderColor:'rgba(201,117,74,0.5)', background:'rgba(201,117,74,0.04)' }}
        style={{ border:'2px dashed rgba(184,92,56,0.25)', borderRadius:'16px',
          padding:'3.5rem 2rem', textAlign:'center', cursor:'pointer',
          background:'rgba(201,117,74,0.02)', transition:'all 0.2s' }}>
        <div style={{ width:'52px', height:'52px', borderRadius:'50%',
          background:'rgba(184,92,56,0.1)', display:'flex', alignItems:'center',
          justifyContent:'center', margin:'0 auto 1.1rem' }}>
          <FiUpload size={22} color="#B85C38" />
        </div>
        <p style={{ fontSize:'0.82rem', fontWeight:'700', color:'#1A1A1A', margin:'0 0 6px' }}>
          Click to upload or drag & drop
        </p>
        <p style={{ fontSize:'0.68rem', color:'rgba(26,26,26,0.42)', margin:0 }}>
          Photos, videos, PDFs, DWG — any format accepted
        </p>
      </motion.div>
      <input ref={ref} type="file" multiple accept="*/*" onChange={e=>add(e.target.files)} style={{display:'none'}} />
      {files.length>0 && (
        <div style={{ marginTop:'0.75rem', display:'flex', flexDirection:'column', gap:'0.4rem' }}>
          {files.map((f,i)=>(
            <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'0.6rem 0.9rem', background:'#fff', borderRadius:'8px',
              border:'1px solid rgba(26,26,26,0.07)', boxShadow:'0 1px 3px rgba(0,0,0,0.04)' }}>
              <span style={{ fontSize:'0.7rem', color:'#1A1A1A', fontWeight:'500',
                overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:'85%' }}>{f.name}</span>
              <button type="button" onClick={()=>onChange(files.filter((_,j)=>j!==i))}
                style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(26,26,26,0.35)', padding:'2px' }}>
                <FiX size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Success ────────────────────────────────────────────────── */
const SuccessScreen = ({form, onClose}) => (
  <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
    minHeight:'100%', padding:'3rem 2.5rem', background:'#F7F4EF' }}>
    <div style={{ maxWidth:'460px', width:'100%', textAlign:'center' }}>
      <motion.div initial={{scale:0,rotate:-20}} animate={{scale:1,rotate:0}}
        transition={{type:'spring',stiffness:260,damping:18,delay:0.1}}
        style={{ width:'84px', height:'84px', borderRadius:'50%',
          background:'linear-gradient(135deg,#C9754A,#9A4828)',
          display:'flex', alignItems:'center', justifyContent:'center',
          margin:'0 auto 2rem',
          boxShadow:'0 12px 40px rgba(184,92,56,0.35)' }}>
        <FiCheck size={36} color="#fff" />
      </motion.div>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}}>
        <span style={{ fontSize:'0.55rem', fontWeight:'800', letterSpacing:'0.25em',
          textTransform:'uppercase', color:'#C9754A', display:'block', marginBottom:'0.75rem' }}>
          Requirements Received
        </span>
        <h2 style={{ fontSize:'2.1rem', fontWeight:'900', color:'#1A1A1A',
          letterSpacing:'-0.025em', margin:'0 0 1rem', lineHeight:1.15 }}>
          We'll be in touch{form.fullName ? `,\n${form.fullName.split(' ')[0]}` : ''}.
        </h2>
        <p style={{ fontSize:'0.82rem', color:'rgba(26,26,26,0.52)', lineHeight:1.8,
          margin:'0 auto 2rem', maxWidth:'360px' }}>
          We've received your project requirements and will review them within 24 hours. 
          Expect a call or message with the ideal next step for your specific project.
        </p>

        <div style={{ background:'#fff', borderRadius:'16px', padding:'1.5rem',
          textAlign:'left', marginBottom:'2rem', border:'1px solid rgba(26,26,26,0.07)',
          boxShadow:'0 4px 20px rgba(0,0,0,0.05)' }}>
          {[
            {n:'01',text:'Our team reviews your requirements in detail.'},
            {n:'02',text:'We match your project to the right service and scope.'},
            {n:'03',text:'We contact you to schedule the ideal next step.'},
          ].map(({n,text},i,a)=>(
            <div key={n} style={{ display:'flex', gap:'1rem', alignItems:'flex-start',
              paddingBottom: i<a.length-1?'1rem':0, borderBottom: i<a.length-1?'1px solid rgba(26,26,26,0.06)':0,
              marginBottom: i<a.length-1?'1rem':0 }}>
              <span style={{ width:'28px', height:'28px', borderRadius:'50%',
                background:'#1A1A1A', color:'#FAF9F6', fontSize:'0.52rem', fontWeight:'900',
                display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{n}</span>
              <p style={{ fontSize:'0.75rem', color:'rgba(26,26,26,0.6)', lineHeight:1.65,
                margin:'5px 0 0' }}>{text}</p>
            </div>
          ))}
        </div>

        <motion.button onClick={onClose} whileHover={{scale:1.03}} whileTap={{scale:0.97}}
          style={{ padding:'0.8rem 2.5rem', borderRadius:'8px', border:'none',
            background:'linear-gradient(135deg,#C9754A,#B85C38)', color:'#fff',
            fontSize:'0.7rem', fontWeight:'800', letterSpacing:'0.12em',
            textTransform:'uppercase', cursor:'pointer',
            boxShadow:'0 6px 24px rgba(184,92,56,0.35)' }}>
          Close
        </motion.button>
      </motion.div>
    </div>
  </div>
)
