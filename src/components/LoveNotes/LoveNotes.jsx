import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LOVE_NOTES } from '../../utils/constants'

let idCounter = 0

export default function LoveNotes() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const spawn = () => {
      const id = idCounter++
      const text = LOVE_NOTES[Math.floor(Math.random() * LOVE_NOTES.length)]
      const left = Math.random() * 80 + 5
      const top = Math.random() * 70 + 10
      setNotes((prev) => [...prev, { id, text, left, top }])
      setTimeout(() => {
        setNotes((prev) => prev.filter((n) => n.id !== id))
      }, 3800)
    }

    const interval = setInterval(spawn, 1900)
    spawn()
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <AnimatePresence>
        {notes.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 20, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="glass absolute rounded-full px-4 py-2 text-xs font-medium text-blush shadow-glow-rose md:text-sm"
            style={{ left: `${n.left}%`, top: `${n.top}%` }}
          >
            {n.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}