import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import useSound from '../../hooks/useSound'
import { SFX } from '../../utils/constants'

export default function GiftBox() {
  const [opened, setOpened] = useState(false)
  const giftSound = useSound(SFX.giftOpen, { volume: 0.7 })

  const open = () => {
    if (opened) return
    setOpened(true)
    giftSound.play()
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f3c47a', '#fff2cc', '#e8b4bc'],
      scalar: 0.8,
    })
  }

  return (
    <section id="gift" className="relative flex min-h-[90vh] flex-col items-center justify-center bg-gradient-to-b from-plum to-midnight px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-gold">One More Thing</p>
      <h2 className="section-heading text-glow mt-3 text-3xl text-cream md:text-5xl">
        A Little Gift For You
      </h2>
      <p className="mt-4 text-cream/60">Go ahead — open it.</p>

      <div className="relative mt-16 flex h-56 w-56 items-center justify-center">
        {/* golden sparkle burst */}
        <AnimatePresence>
          {opened &&
            Array.from({ length: 14 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                animate={{
                  opacity: 0,
                  x: Math.cos((i / 14) * Math.PI * 2) * 90,
                  y: Math.sin((i / 14) * Math.PI * 2) * 90,
                  scale: 1,
                }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                className="absolute h-2 w-2 rounded-full bg-gold"
              />
            ))}
        </AnimatePresence>

        <motion.button
          onClick={open}
          whileHover={{ scale: opened ? 1 : 1.05 }}
          whileTap={{ scale: opened ? 1 : 0.95 }}
          aria-label="Open gift"
          className="relative focus:outline-none"
        >
          {/* Lid */}
          <motion.div
            animate={opened ? { y: -70, rotate: -18, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute -top-6 left-1/2 h-8 w-44 -translate-x-1/2 rounded-md bg-gradient-to-b from-rosegold to-blush shadow-premium"
          />
          {/* Ribbon vertical */}
          <motion.div
            animate={opened ? { scaleY: 0, opacity: 0 } : { scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ transformOrigin: 'top' }}
            className="absolute left-1/2 top-0 z-10 h-40 w-6 -translate-x-1/2 bg-gold"
          />
          {/* Box */}
          <div className="relative h-40 w-44 rounded-md bg-gradient-to-b from-wine to-plum shadow-premium">
            <div className="absolute left-1/2 top-0 h-full w-6 -translate-x-1/2 bg-gold/90" />
            {/* Contents */}
            <AnimatePresence>
              {opened && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: -110, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.9, ease: 'easeOut' }}
                  className="glass absolute left-1/2 top-8 w-64 -translate-x-1/2 rounded-xl px-5 py-4 shadow-glow"
                >
                  <p className="font-script text-xl text-gold">
                    I Have One More Surprise ❤️
                  </p>
                  <p className="mt-1 text-xs text-cream/60">Scroll down, my love.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </div>

      {!opened && (
        <p className="mt-6 text-xs tracking-widest text-cream/40">TAP THE GIFT</p>
      )}
    </section>
  )
}