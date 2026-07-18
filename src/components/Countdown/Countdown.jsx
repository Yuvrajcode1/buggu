import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Particles from '../Particles/Particles'
import { BIRTHDAY_DAY, BIRTHDAY_MONTH, NICK_NAME } from '../../utils/constants'

function getNextBirthday() {
  const now = new Date()
  let year = now.getFullYear()
  let target = new Date(year, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY, 0, 0, 0)
  if (target < now) {
    target = new Date(year + 1, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY, 0, 0, 0)
  }
  return target
}

function isBirthdayToday() {
  const now = new Date()
  return now.getMonth() + 1 === BIRTHDAY_MONTH && now.getDate() === BIRTHDAY_DAY
}

const UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
]

export default function Countdown({ onUnlocked }) {
  const [today, setToday] = useState(isBirthdayToday())
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    if (today) {
      onUnlocked?.()
      return
    }
    const target = getNextBirthday()
    const tick = () => {
      const now = new Date()
      const diff = target - now
      if (diff <= 0) {
        setToday(true)
        onUnlocked?.()
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [today, onUnlocked])

  if (today) {
    return (
      <section className="relative flex min-h-[50vh] items-center justify-center bg-plum px-6 text-center">
        <Particles count={40} />
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="section-heading text-glow text-3xl text-gold md:text-5xl"
        >
          It's Your Day, {NICK_NAME}! 🎉
        </motion.h2>
      </section>
    )
  }

  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center bg-plum px-4 py-16 text-center sm:px-6 sm:py-20">
      <Particles count={50} />
      <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-gold sm:text-xs">Counting Down To</p>
      <h2 className="section-heading text-2xl text-cream sm:text-3xl md:text-4xl">
        {NICK_NAME}'s Birthday
      </h2>
      <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4 md:gap-8">
        {UNITS.map((u) => (
          <div
            key={u.key}
            className="glass flex w-16 flex-col items-center rounded-2xl py-3 shadow-premium sm:w-20 sm:py-4 md:w-24 md:py-6"
          >
            <motion.span
              key={timeLeft[u.key]}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-xl text-gold sm:text-2xl md:text-4xl"
            >
              {String(timeLeft[u.key]).padStart(2, '0')}
            </motion.span>
            <span className="mt-1 text-[10px] uppercase tracking-widest text-cream/60 md:text-xs">
              {u.label}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-8 max-w-md px-2 text-sm text-cream/50 sm:text-base">
        The rest of the celebration unlocks the moment the clock hits zero.
      </p>
    </section>
  )
}