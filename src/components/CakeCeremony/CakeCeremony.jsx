import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import Particles from '../Particles/Particles'
import useSound from '../../hooks/useSound'
import { SFX, MUSIC_TRACKS, NICK_NAME } from '../../utils/constants'
import { switchTrack } from '../MusicPlayer/MusicPlayer'

const CANDLE_COUNT = 5

function fireCelebration() {
  const duration = 3000
  const end = Date.now() + duration
  ;(function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0 }, colors: ['#f3c47a', '#e8b4bc', '#fdf6ec'] })
    confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1 }, colors: ['#f3c47a', '#e8b4bc', '#fdf6ec'] })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
  confetti({ particleCount: 140, spread: 100, origin: { y: 0.5 }, colors: ['#f3c47a', '#e8b4bc', '#fdf6ec'] })
}

export default function CakeCeremony() {
  const [litCandles, setLitCandles] = useState(Array.from({ length: CANDLE_COUNT }, () => true))
  const [cut, setCut] = useState(false)
  const [cutting, setCutting] = useState(false)

  const blowSound = useSound(SFX.blow, { volume: 0.6 })
  const cakeCutSound = useSound(SFX.cakeCut, { volume: 0.7 })
  const cheerSound = useSound(SFX.crowdCheer, { volume: 0.6 })
  const fireworksSound = useSound(SFX.fireworks, { volume: 0.5 })

  const allBlown = litCandles.every((l) => !l)

  const blowCandle = (i) => {
    if (!litCandles[i]) return
    blowSound.play()
    setLitCandles((prev) => prev.map((v, idx) => (idx === i ? false : v)))
  }

  const cutCake = () => {
    if (cutting || cut) return
    setCutting(true)
    cakeCutSound.play()
    setTimeout(() => {
      setCut(true)
      cheerSound.play()
      fireworksSound.play()
      fireCelebration()
      switchTrack(MUSIC_TRACKS.birthday)
    }, 1400)
  }

  return (
    <section id="cake" className="relative min-h-screen overflow-hidden bg-gradient-to-b from-midnight via-wine to-plum px-4 sm:px-6 py-20 sm:py-28">
      <Particles count={50} />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">The Main Event</p>
        <h2 className="section-heading text-glow mt-3 text-2xl sm:text-3xl text-cream md:text-5xl">
          Make A Wish, {NICK_NAME}
        </h2>
        <p className="mt-4 text-sm sm:text-base text-cream/60 px-2">
          {!allBlown
            ? 'Blow out each candle by clicking on it.'
            : !cut
            ? 'Now, let\'s cut the cake together.'
            : 'Happy Birthday! 🎉'}
        </p>
      </div>

      <div className="relative z-10 mt-12 sm:mt-16 flex justify-center px-2">
        <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
          {/* Candles */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-1">
            {litCandles.map((lit, i) => (
              <button
                key={i}
                onClick={() => blowCandle(i)}
                aria-label={`Candle ${i + 1}`}
                className="relative flex flex-col items-center focus:outline-none"
              >
                <AnimatePresence>
                  {lit && (
                    <motion.div
                      initial={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -14, scale: 1.6 }}
                      transition={{ duration: 0.5 }}
                      className="mb-[-2px] h-3 w-2.5 sm:h-4 sm:w-3 rounded-full bg-gradient-to-t from-orange-400 via-yellow-300 to-yellow-100 shadow-[0_0_14px_rgba(253,224,71,0.9)]"
                      style={{ transformOrigin: 'bottom center' }}
                    />
                  )}
                </AnimatePresence>
                {!lit && (
                  <motion.div
                    initial={{ opacity: 0.8, y: 0 }}
                    animate={{ opacity: 0, y: -30 }}
                    transition={{ duration: 1.6 }}
                    className="absolute -top-1 h-5 w-3 sm:h-6 sm:w-4 rounded-full bg-cream/30 blur-[3px]"
                  />
                )}
                <div className="h-8 w-1.5 sm:h-10 sm:w-2 rounded-sm bg-gradient-to-b from-rosegold to-blush" />
              </button>
            ))}
          </div>

          {/* Cake */}
          <div className="relative mx-auto w-full">
            <div className="relative flex justify-center" style={{ height: 'clamp(150px, 42vw, 200px)' }}>
              {/* Left half */}
              <motion.div
                animate={cut ? { x: -36, rotate: -3 } : { x: 0, rotate: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative w-1/2"
              >
                <CakeHalf side="left" />
              </motion.div>
              {/* Right half */}
              <motion.div
                animate={cut ? { x: 36, rotate: 3 } : { x: 0, rotate: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative w-1/2"
              >
                <CakeHalf side="right" />
              </motion.div>

              {/* Knife */}
              {allBlown && !cut && (
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  animate={cutting ? { y: [-30, 50], opacity: 1 } : { y: -30, opacity: 1 }}
                  transition={cutting ? { duration: 1.2, ease: 'easeIn' } : { duration: 0.8 }}
                  className="absolute left-1/2 top-0 -translate-x-1/2 scale-75 sm:scale-100"
                  style={{ zIndex: 20 }}
                >
                  <Knife />
                </motion.div>
              )}

              {/* Hands */}
              {allBlown && !cut && (
                <>
                  <motion.div
                    initial={{ x: -55, y: -8, opacity: 0 }}
                    animate={{ x: -26, y: -14, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="absolute left-1/2 top-0 -translate-x-1/2 text-2xl sm:text-4xl"
                    style={{ zIndex: 21 }}
                  >
                    🤚
                  </motion.div>
                  <motion.div
                    initial={{ x: 55, y: -8, opacity: 0, scaleX: -1 }}
                    animate={{ x: 16, y: -14, opacity: 1, scaleX: -1 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="absolute left-1/2 top-0 -translate-x-1/2 text-2xl sm:text-4xl"
                    style={{ zIndex: 21 }}
                  >
                    🤚
                  </motion.div>
                </>
              )}
            </div>
            <div className="mx-auto h-4 sm:h-6 w-[85%] max-w-[280px] rounded-full bg-black/40 blur-md" />
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 sm:mt-10 flex justify-center px-4">
        {allBlown && !cut && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={cutCake}
            className="rounded-full bg-gradient-to-r from-gold to-rosegold px-6 sm:px-8 py-3 text-sm sm:text-base font-medium text-midnight shadow-glow"
          >
            Cut The Cake Together 🔪
          </motion.button>
        )}
      </div>
    </section>
  )
}

function CakeHalf({ side }) {
  const isLeft = side === 'left'
  return (
    <svg viewBox="0 0 150 200" className="w-full h-auto">
      <defs>
        <linearGradient id={`frost-${side}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf6ec" />
          <stop offset="100%" stopColor="#f6d9de" />
        </linearGradient>
        <linearGradient id={`sponge-${side}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e6a45c" />
          <stop offset="100%" stopColor="#c9822f" />
        </linearGradient>
      </defs>
      <rect x="5" y="120" width="140" height="70" rx="6" fill={`url(#sponge-${side})`} />
      <rect x="5" y="120" width="140" height="16" fill={`url(#frost-${side})`} />
      <rect x="25" y="60" width="100" height="65" rx="6" fill={`url(#sponge-${side})`} />
      <rect x="25" y="60" width="100" height="14" fill={`url(#frost-${side})`} />
      <path
        d={
          isLeft
            ? 'M25 74 q6 14 0 22 M50 74 q6 18 0 26 M75 74 q6 12 0 18'
            : 'M75 74 q6 12 0 18 M100 74 q6 18 0 26 M125 74 q6 14 0 22'
        }
        stroke="#f6d9de"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx={isLeft ? 110 : 40} cy="60" r="9" fill="#fdf6ec" />
      <circle cx={isLeft ? 110 : 40} cy="60" r="4" fill="#f3c47a" />
    </svg>
  )
}

function Knife() {
  return (
    <svg viewBox="0 0 40 140" width="30" height="105">
      <defs>
        <linearGradient id="blade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f4f4f4" />
          <stop offset="100%" stopColor="#c9c9c9" />
        </linearGradient>
      </defs>
      <polygon points="20,0 30,90 10,90" fill="url(#blade)" stroke="#999" strokeWidth="0.5" />
      <rect x="12" y="90" width="16" height="40" rx="4" fill="#5a3a22" />
      <rect x="12" y="90" width="16" height="6" fill="#3a2414" />
    </svg>
  )
}