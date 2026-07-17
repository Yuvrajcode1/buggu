import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { LOVE_LETTER } from '../../utils/constants'

export default function LoveLetter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (!inView) return
    let i = 0
    const interval = setInterval(() => {
      i += 3
      setTyped(LOVE_LETTER.slice(0, i))
      if (i >= LOVE_LETTER.length) clearInterval(interval)
    }, 18)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <section id="letter" className="relative bg-midnight px-6 py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">From Me To You</p>
        <h2 className="section-heading text-glow mt-3 text-3xl text-cream md:text-5xl">
          A Letter, Just For You
        </h2>
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="mx-auto mt-14 max-w-xl rounded-sm px-8 py-12 shadow-premium md:px-12"
        style={{
          background: 'linear-gradient(180deg, #fdf6ec 0%, #f6ecda 100%)',
          backgroundImage:
            'repeating-linear-gradient(180deg, transparent, transparent 33px, rgba(74,16,48,0.08) 34px)',
        }}
      >
        <pre className="whitespace-pre-wrap font-script text-xl leading-[34px] text-wine md:text-2xl">
          {typed}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.7 }}
            className="inline-block w-[2px] bg-wine align-middle"
            style={{ height: '1em' }}
          />
        </pre>
      </motion.div>
    </section>
  )
}