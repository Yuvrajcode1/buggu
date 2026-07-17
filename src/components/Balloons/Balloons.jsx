import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import Particles from '../Particles/Particles'
import LoveNotes from '../LoveNotes/LoveNotes'
import useSound from '../../hooks/useSound'
import { SFX } from '../../utils/constants'

const COLORS = ['#f3c47a', '#e8b4bc', '#f6d9de', '#c98bb4', '#ffe0a3']

function Balloon({ id, onPop }) {
  const config = useMemo(
    () => ({
      left: Math.random() * 90 + 2,
      size: Math.random() * 30 + 60,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 6,
      duration: Math.random() * 6 + 10,
    }),
    []
  )
  const [popped, setPopped] = useState(false)

  const handlePop = (e) => {
    if (popped) return
    setPopped(true)
    const rect = e.currentTarget.getBoundingClientRect()
    onPop(rect)
    setTimeout(() => setPopped(true), 0)
  }

  if (popped) return null

  return (
    <motion.button
      aria-label="Pop balloon"
      onClick={handlePop}
      className="absolute bottom-[-10%] focus:outline-none animate-rise"
      style={{
        left: `${config.left}%`,
        animationDelay: `${config.delay}s`,
        animationDuration: `${config.duration}s`,
      }}
    >
      <svg width={config.size} height={config.size * 1.25} viewBox="0 0 100 125">
        <ellipse cx="50" cy="45" rx="42" ry="45" fill={config.color} opacity="0.95" />
        <ellipse cx="35" cy="28" rx="12" ry="16" fill="white" opacity="0.25" />
        <path d="M50 90 L45 100 L55 100 Z" fill={config.color} />
        <line x1="50" y1="100" x2="50" y2="122" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      </svg>
    </motion.button>
  )
}

export default function Balloons() {
  const [balloons] = useState(() => Array.from({ length: 24 }).map((_, i) => i))
  const [poppedIds, setPoppedIds] = useState(new Set())
  const popSound = useSound(SFX.balloonPop, { volume: 0.7 })

  const handlePop = (id, rect) => {
    popSound.play()
    confetti({
      particleCount: 60,
      spread: 70,
      origin: {
        x: rect.left / window.innerWidth,
        y: rect.top / window.innerHeight,
      },
      colors: COLORS,
    })
    setPoppedIds((prev) => new Set(prev).add(id))
  }

  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-gradient-to-b from-plum to-midnight px-6 py-24">
      <Particles count={40} />
      <LoveNotes />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">Pop A Little Joy</p>
        <h2 className="section-heading text-glow mt-3 text-3xl text-cream md:text-5xl">
          Balloon Celebration 🎈
        </h2>
        <p className="mt-4 text-cream/60">Tap a balloon and watch what happens.</p>
      </div>

      <div className="absolute inset-0">
        <AnimatePresence>
          {balloons
            .filter((id) => !poppedIds.has(id))
            .map((id) => (
              <Balloon key={id} id={id} onPop={(rect) => handlePop(id, rect)} />
            ))}
        </AnimatePresence>
      </div>
    </section>
  )
}



