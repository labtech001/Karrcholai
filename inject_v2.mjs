import { readFileSync, writeFileSync } from 'fs'

const file = 'src/pages/AboutUs.jsx'
const src = readFileSync(file, 'utf8')
const lines = src.split('\n')

// Section: lines 725–948 (1-indexed) → indices 724–947 (0-indexed)
const START = 724
const END   = 948  // exclusive

const newSection = String.raw`        {/* ══════════════════════════════════════════
            3.5 KARRCHOLAI VALUES — Identity Wheel
        ══════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-[#faf8f5] py-16 md:py-24">

          {/* Corner diamond ornaments */}
          {[
            { cls: 'top-0 left-0',   tx: 0,   ty: 0   },
            { cls: 'top-0 right-0',  tx: 144, ty: 0   },
            { cls: 'bottom-0 right-0',tx:144,  ty: 144 },
            { cls: 'bottom-0 left-0', tx: 0,   ty: 144 },
          ].map(({ cls, tx, ty }, ci) => (
            <div key={ci} className={`absolute ${cls} w-20 h-20 md:w-28 md:h-28 opacity-[0.18] pointer-events-none overflow-hidden`}>
              <svg viewBox="0 0 144 144" className="w-full h-full">
                {[0,1,2,3].flatMap(r=>[0,1,2,3].map(c=>(
                  <rect key={`${r}-${c}`}
                    x={c*36+10} y={r*36+10} width={17} height={17} rx="2"
                    transform={`rotate(45 ${c*36+18.5} ${r*36+18.5})`}
                    fill="#7B1F3A" />
                )))}
              </svg>
            </div>
          ))}

          <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 md:mb-14"
            >
              <p className="text-secondary text-[10px] font-black uppercase tracking-[0.55em] mb-2">Our Identity</p>
              <h2 className="text-3xl md:text-5xl font-black text-dark tracking-tight leading-tight mb-3">
                The meaning behind <span className="text-secondary">KARRCHOLAI</span>
              </h2>
              <p className="text-dark/45 text-[13px] max-w-md mx-auto">
                Every letter — a principle we carry into every project, every home we build.
              </p>
            </motion.div>

            {/* ── WHEEL: pure SVG with HTML logo overlay ── */}
            <div className="relative w-full" style={{ paddingBottom: '75%', maxWidth: 900, margin: '0 auto' }}>
              <div className="absolute inset-0">

                {/* SVG rings, spokes, nodes, labels */}
                <svg
                  viewBox="0 0 900 680"
                  className="w-full h-full"
                  style={{ overflow: 'visible' }}
                >
                  <defs>
                    <radialGradient id="nodeGradA" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9B2440" />
                      <stop offset="100%" stopColor="#6B1530" />
                    </radialGradient>
                    <radialGradient id="nodeGradB" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D4814F" />
                      <stop offset="100%" stopColor="#A85A2E" />
                    </radialGradient>
                    <filter id="nodeShadow" x="-30%" y="-30%" width="160%" height="160%">
                      <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="rgba(0,0,0,0.18)" />
                    </filter>
                  </defs>

                  {/* Outer orbit ring */}
                  <circle cx="450" cy="340" r="260" fill="none" stroke="#C9754A" strokeWidth="0.8" strokeDasharray="4 10" opacity="0.3"/>
                  {/* Mid ring */}
                  <circle cx="450" cy="340" r="170" fill="none" stroke="#7B1F3A" strokeWidth="0.5" opacity="0.15"/>
                  {/* Center disc bg */}
                  <circle cx="450" cy="340" r="105" fill="#f0ebe3" stroke="#C9754A" strokeWidth="1.2" opacity="1"/>
                  <circle cx="450" cy="340" r="100" fill="none" stroke="#C9754A" strokeWidth="0.4" opacity="0.4"/>

                  {/* 10 value nodes */}
                  {[
                    { letter:'K', label:'Keystone',     desc:'Foundation of every great structure.',     },
                    { letter:'A', label:'Architecture',  desc:'Form, function and life in every design.', },
                    { letter:'R', label:'Resilience',    desc:'Built to endure decades of real life.',     },
                    { letter:'R', label:'Reliability',   desc:'Consistent delivery, every stage.',         },
                    { letter:'C', label:'Craftsmanship', desc:'Quality lives in every detail.',            },
                    { letter:'H', label:'Harmony',       desc:'Nature, space and family balanced.',        },
                    { letter:'O', label:'Optimization',  desc:'Every resource maximised wisely.',          },
                    { letter:'L', label:'Longevity',     desc:'Built for generations ahead.',              },
                    { letter:'A', label:'Aesthetics',    desc:'Timeless beauty rooted in culture.',        },
                    { letter:'I', label:'Integrity',     desc:'Transparent from day one to handover.',     },
                  ].map((v, i) => {
                    const angleDeg = i * 36 - 90
                    const rad = angleDeg * Math.PI / 180
                    const orbitR = 260
                    const nx = 450 + orbitR * Math.cos(rad)
                    const ny = 340 + orbitR * Math.sin(rad)

                    // Spoke from center edge to node
                    const spokeStartR = 106
                    const sx = 450 + spokeStartR * Math.cos(rad)
                    const sy = 340 + spokeStartR * Math.sin(rad)

                    // Label position: outward past the node
                    const labelR = 330
                    const lx = 450 + labelR * Math.cos(rad)
                    const ly = 340 + labelR * Math.sin(rad)
                    const isLeft = nx < 440
                    const anchor = isLeft ? 'end' : nx > 460 ? 'start' : 'middle'

                    const isDark = i % 2 === 0
                    const nodeGrad = isDark ? 'url(#nodeGradA)' : 'url(#nodeGradB)'

                    return (
                      <g key={i}>
                        {/* Spoke */}
                        <line
                          x1={sx} y1={sy} x2={nx} y2={ny}
                          stroke={isDark ? '#7B1F3A' : '#C9754A'}
                          strokeWidth="0.8"
                          opacity="0.35"
                          strokeDasharray="3 5"
                        />
                        {/* Node shadow ring */}
                        <circle cx={nx} cy={ny} r={27} fill={isDark ? 'rgba(123,31,58,0.1)' : 'rgba(201,117,74,0.1)'} />
                        {/* Node circle */}
                        <circle cx={nx} cy={ny} r={22} fill={nodeGrad} filter="url(#nodeShadow)" />
                        {/* Node inner ring */}
                        <circle cx={nx} cy={ny} r={22} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                        {/* Letter */}
                        <text
                          x={nx} y={ny + 1}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="white"
                          fontSize="16"
                          fontWeight="900"
                          fontFamily="system-ui, sans-serif"
                        >{v.letter}</text>

                        {/* Label connector line */}
                        <line
                          x1={nx + (isLeft ? -24 : anchor==='start' ? 24 : 0)}
                          y1={ny + (anchor==='middle' && ny < 340 ? -24 : anchor==='middle' ? 24 : 0)}
                          x2={lx + (isLeft ? -6 : anchor==='start' ? 6 : 0)}
                          y2={ly + (anchor==='middle' && ny < 340 ? -6 : anchor==='middle' ? 6 : 0)}
                          stroke={isDark ? '#7B1F3A' : '#C9754A'}
                          strokeWidth="0.7"
                          opacity="0.5"
                        />
                        {/* Label underline */}
                        <line
                          x1={anchor==='end' ? lx-72 : lx}
                          y1={ly + 14}
                          x2={anchor==='end' ? lx : lx+72}
                          y2={ly + 14}
                          stroke={isDark ? '#7B1F3A' : '#C9754A'}
                          strokeWidth="0.8"
                          opacity="0.4"
                        />

                        {/* Label text */}
                        <text
                          x={lx} y={ly - 2}
                          textAnchor={anchor}
                          dominantBaseline="auto"
                          fill="#1a1a1a"
                          fontSize="12.5"
                          fontWeight="800"
                          fontFamily="system-ui, sans-serif"
                          letterSpacing="0.3"
                        >{v.label}</text>
                        {/* Desc text */}
                        <text
                          x={lx} y={ly + 11}
                          textAnchor={anchor}
                          dominantBaseline="auto"
                          fill="rgba(26,26,26,0.45)"
                          fontSize="9.5"
                          fontFamily="system-ui, sans-serif"
                        >{v.desc}</text>
                      </g>
                    )
                  })}
                </svg>

                {/* Logo — HTML overlay on center disc */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.34,1.56,0.64,1], delay: 0.2 }}
                  className="absolute flex flex-col items-center justify-center"
                  style={{
                    left: '50%',
                    top: `${340/680*100}%`,
                    transform: 'translate(-50%, -50%)',
                    width: '22%',
                    pointerEvents: 'none',
                  }}
                >
                  <img
                    src={logoImg}
                    alt="Karrcholai"
                    className="w-full object-contain"
                    style={{ filter: 'drop-shadow(0 2px 12px rgba(123,31,58,0.18))' }}
                  />
                  <div className="text-center mt-1">
                    <div className="font-black text-[#7B1F3A] text-[8px] md:text-[10px] uppercase tracking-widest leading-none">KARRCHOLAI</div>
                    <div className="text-dark/35 text-[6px] md:text-[8px] uppercase tracking-wider mt-0.5">Ten Principles</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ── MOBILE: clean list ── */}
            <div className="lg:hidden mt-10">
              {/* mobile logo */}
              <div className="flex flex-col items-center mb-8">
                <img src={logoImg} alt="Karrcholai" className="w-28 h-28 object-contain"
                  style={{ filter: 'drop-shadow(0 4px 14px rgba(123,31,58,0.18))' }} />
                <div className="flex gap-0.5 mt-2">
                  {['K','A','R','R','C','H','O','L','A','I'].map((l,i)=>(
                    <span key={i} className="font-black text-[16px]" style={{color:i%2===0?'#C9754A':'#7B1F3A'}}>{l}</span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {letter:'K',label:'Keystone',    desc:'Foundation of every great structure.'},
                  {letter:'A',label:'Architecture', desc:'Form, function and life in design.'},
                  {letter:'R',label:'Resilience',   desc:'Built to endure real life.'},
                  {letter:'R',label:'Reliability',  desc:'Consistent delivery always.'},
                  {letter:'C',label:'Craftsmanship',desc:'Quality in every detail.'},
                  {letter:'H',label:'Harmony',      desc:'Nature and space balanced.'},
                  {letter:'O',label:'Optimization', desc:'Every resource maximised.'},
                  {letter:'L',label:'Longevity',    desc:'Built for generations.'},
                  {letter:'A',label:'Aesthetics',   desc:'Timeless rooted beauty.'},
                  {letter:'I',label:'Integrity',    desc:'Transparent always.'},
                ].map((item,i)=>(
                  <motion.div
                    key={i}
                    initial={{opacity:0,y:16}}
                    whileInView={{opacity:1,y:0}}
                    viewport={{once:true}}
                    transition={{duration:0.4,delay:i*0.04}}
                    className="flex items-start gap-3 py-3 px-3 rounded-xl bg-white border border-dark/6 hover:border-secondary/30 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-base text-white shrink-0"
                      style={{background:i%2===0?'linear-gradient(135deg,#7B1F3A,#a8294f)':'linear-gradient(135deg,#A85A2E,#C9754A)'}}>
                      {item.letter}
                    </div>
                    <div>
                      <div className="font-bold text-dark text-[13px] leading-tight">{item.label}</div>
                      <div className="text-dark/45 text-[10px] mt-0.5 leading-snug">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom strip */}
            <motion.div
              initial={{opacity:0}}
              whileInView={{opacity:1}}
              viewport={{once:true}}
              transition={{duration:0.7,delay:0.5}}
              className="mt-10 pt-6 border-t border-dark/8 flex items-center justify-center gap-2"
            >
              {['K','A','R','R','C','H','O','L','A','I'].map((l,i)=>(
                <span key={i} className="font-black text-[13px]" style={{color:i%2===0?'#C9754A':'rgba(26,26,26,0.4)'}}>{l}</span>
              ))}
              <span className="mx-2 text-dark/20 text-xs">·</span>
              <span className="text-dark/30 text-[9px] uppercase tracking-[0.3em]">Ten Principles · One Commitment</span>
            </motion.div>

          </div>
        </section>
`

const before = lines.slice(0, START)
const after   = lines.slice(END)
const result  = [...before, ...newSection.split('\n'), ...after].join('\n')
writeFileSync(file, result, 'utf8')
console.log('Done. Total lines:', result.split('\n').length)
