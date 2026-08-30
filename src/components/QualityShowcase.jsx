import { motion, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import qualityVid from '../../assets/Karcholai Construction Quality Showcase.mp4'

const QualityShowcase = () => {
  const videoRef = useRef(null)
  const isInView = useInView(videoRef, { amount: 0.3 })

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(e => {
          console.log("Autoplay check:", e)
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [isInView])

  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Professional Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[1px] bg-secondary" />
              <span className="text-secondary font-bold text-[10px] tracking-[0.4em] uppercase">Quality Showcase</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-light text-dark tracking-tighter">
              Precision In <span className="font-medium text-secondary">Every Square Foot.</span>
            </h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden md:block max-w-xs text-right"
          >
            <p className="text-dark/40 text-[10px] leading-relaxed uppercase tracking-widest font-medium">
              A deep dive into our site standards — from structural foundation to the final architectural finish.
            </p>
          </motion.div>
        </div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-video md:aspect-[21/9] rounded-xl md:rounded-2xl overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.1)] bg-black group"
        >
          <video
            ref={videoRef}
            src={qualityVid}
            className="w-full h-full object-cover"
            autoPlay
            loop
            playsInline
          />
          
          {/* Sleek Minimalist Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Bottom Label */}
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
            <p className="text-white/60 text-[9px] uppercase tracking-[0.4em] font-medium mb-1">Standard Of Excellence</p>
            <div className="flex items-center gap-4">
              <h4 className="text-white text-sm md:text-base font-light tracking-wide italic">Karrcholai Build Quality</h4>
              <div className="w-[1px] h-4 bg-white/20" />
              <span className="text-white/30 text-[9px] font-bold">RAW FOOTAGE</span>
            </div>
          </div>

          {/* Live Indicator */}
          <div className="absolute top-6 right-6 flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-white text-[8px] font-bold uppercase tracking-widest">Process Check</span>
          </div>
        </motion.div>

        {/* Mobile Optimization: Statement */}
        <div className="mt-8 md:hidden text-center">
            <p className="text-dark/40 text-[10px] leading-relaxed uppercase tracking-widest font-medium">
              Witness our commitment to structural integrity and architectural precision.
            </p>
        </div>
      </div>
    </section>
  )
}

export default QualityShowcase
