import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import confetti from 'canvas-confetti'
import Particles from '../Particles/Particles'
import useSound from '../../hooks/useSound'
import { SFX } from '../../utils/constants'

const COLORS = ['#f3c47a', '#e8b4bc', '#fdf6ec', '#c98bb4', '#ffdca8']

function launchFireworks() {
  const duration = 4000
  const end = Date.now() + duration
  const interval = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval)
      return
    }
    confetti({
      particleCount: 3,
      startVelocity: 45,
      spread: 360,
      ticks: 80,
      gravity: 0.9,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.4 + 0.1,
      },
      colors: COLORS,
      shapes: ['star', 'circle'],
      scalar: 1.1,
    })
  }, 220)
}

export default function Fireworks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [launched, setLaunched] = useState(false)
  const fireworksSound = useSound(SFX.fireworks, { volume: 0.5 })

  useEffect(() => {
    if (inView && !launched) {
      setLaunched(true)
      fireworksSound.play()
      launchFireworks()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-celebration-gradient px-6 text-center"
    >
      <Particles count={90} />
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="section-heading text-glow relative z-10 text-3xl text-cream md:text-6xl"
      >
        The Sky Is Celebrating You ✨
      </motion.h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          fireworksSound.play()
          launchFireworks()
        }}
        className="relative z-10 mt-10 rounded-full border border-gold/50 px-7 py-3 text-sm tracking-widest text-gold transition-colors hover:bg-gold hover:text-midnight"
      >
        LAUNCH MORE FIREWORKS 🎆
      </motion.button>
    </section>
  )
}