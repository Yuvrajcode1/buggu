import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaHeart } from 'react-icons/fa'
import FloatingHearts from '../FloatingHearts/FloatingHearts'
import { BIRTHDAY_WISH_LINES } from '../../utils/constants'

export default function BirthdayWish() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [lineIndex, setLineIndex] = useState(0)
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (!inView || lineIndex >= BIRTHDAY_WISH_LINES.length) return
    const full = BIRTHDAY_WISH_LINES[lineIndex]
    let i = 0
    const interval = setInterval(() => {
      i++
      setTyped(full.slice(0, i))
      if (i >= full.length) {
        clearInterval(interval)
        setTimeout(() => {
          setLineIndex((idx) => idx + 1)
          setTyped('')
        }, 650)
      }
    }, 45)
    return () => clearInterval(interval)
  }, [inView, lineIndex])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-wine px-4 py-20 text-center sm:px-6 sm:py-24"
    >
      <FloatingHearts count={10} />
      <FaHeart className="mb-6 text-2xl text-gold" />
      <div className="relative z-10 flex min-h-[10rem] w-full max-w-2xl flex-col items-center justify-center gap-3">
        {BIRTHDAY_WISH_LINES.slice(0, lineIndex).map((line) => (
          <p key={line} className="section-heading text-lg text-cream/80 sm:text-xl md:text-2xl">
            {line}
          </p>
        ))}
        {lineIndex < BIRTHDAY_WISH_LINES.length && (
          <p className="section-heading text-glow text-xl text-gold sm:text-2xl md:text-3xl">
            {typed}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.7 }}
              className="ml-1 inline-block w-[2px] bg-gold align-middle"
              style={{ height: '1em' }}
            />
          </p>
        )}
      </div>
    </section>
  )
}