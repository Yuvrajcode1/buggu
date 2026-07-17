import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import Particles from '../Particles/Particles'

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 12 + 4
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => setVisible(false), 500)
          return 100
        }
        return next
      })
    }, 180)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-celebration-gradient"
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <Particles count={60} />
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative flex flex-col items-center"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="mb-6 text-gold text-4xl drop-shadow-glow"
            >
              <FaHeart />
            </motion.div>
            <h1 className="section-heading text-center text-3xl md:text-5xl font-medium text-cream text-glow">
              Preparing a Special Surprise
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
              >
                …
              </motion.span>
            </h1>
            <div className="mt-8 h-[2px] w-64 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-gold to-rosegold"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-sm tracking-[0.3em] text-blush/70">
              {Math.min(100, Math.floor(progress))}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}