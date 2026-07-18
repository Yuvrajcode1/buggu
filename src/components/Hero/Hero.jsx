import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaHeart } from 'react-icons/fa'
import Particles from '../Particles/Particles'
import FloatingHearts from '../FloatingHearts/FloatingHearts'
import { HER_NAME, NICK_NAME } from '../../utils/constants'

export default function Hero({ onEnter }) {
  const [typed, setTyped] = useState('')
  const full = `Happy Birthday ${NICK_NAME} ❤️`

  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      i++
      setTyped(full.slice(0, i))
      if (i >= full.length) clearInterval(t)
    }, 90)
    return () => clearInterval(t)
  }, [full])

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-celebration-gradient px-4 py-6 text-center sm:px-6"
    >
      <Particles count={100} />
      <FloatingHearts count={16} />

      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9 }}
        className="mb-4 tracking-[0.5em] text-xs md:text-sm text-rosegold/80 uppercase"
      >
        For {HER_NAME}
      </motion.p>

      <h1 className="section-heading text-glow max-w-4xl text-3xl font-semibold leading-tight text-cream sm:text-5xl md:text-7xl">
        {typed}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.7 }}
          className="ml-1 inline-block w-[3px] bg-gold align-middle"
          style={{ height: '0.85em' }}
        />
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1.2 }}
        className="mt-6 px-2 font-script text-xl text-blush sm:text-2xl md:text-3xl"
      >
        Today is all about you.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.3, duration: 0.8 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        onClick={onEnter}
        className="group mt-10 flex w-full max-w-[280px] items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gold to-rosegold px-6 py-3.5 text-sm font-medium text-midnight shadow-glow sm:mt-12 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
      >
        <FaPlay className="text-sm" />
        Begin the Celebration
        <FaHeart className="text-sm transition-transform group-hover:scale-125" />
      </motion.button>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 text-[10px] tracking-[0.3em] text-cream/40 sm:bottom-8 sm:text-xs"
      >
        SCROLL TO CONTINUE ↓
      </motion.div>
    </section>
  )
}