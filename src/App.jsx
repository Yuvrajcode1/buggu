import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaHeart, FaLock } from 'react-icons/fa'
import Loader from './components/Loader/Loader'
import CursorGlow from './components/CursorEffects/CursorGlow'
import Particles from './components/Particles/Particles'
import Home from './pages/Home'
import { BIRTHDAY_DAY, BIRTHDAY_MONTH, NICK_NAME } from './utils/constants'

const CORRECT_PASSWORD = 'Hamsafar'

function getNextBirthday() {
  const now = new Date()
  let year = now.getFullYear()
  let target = new Date(year, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY, 0, 0, 0)
  if (target < now) {
    target = new Date(year + 1, BIRTHDAY_MONTH - 1, BIRTHDAY_DAY, 0, 0, 0)
  }
  return target
}

export default function App() {
  const [unlocked, setUnlocked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = getNextBirthday()
    const tick = () => {
      const now = new Date()
      const diff = target - now
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
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
  }, [])

  const submit = (e) => {
    e.preventDefault()
    if (value.trim().toLowerCase() === CORRECT_PASSWORD.toLowerCase()) {
      setUnlocked(true)
    } else {
      setError(true)
      setValue('')
      setTimeout(() => setError(false), 1500)
    }
  }

  if (!unlocked) {
    return (
      <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-celebration-gradient px-4 py-6 text-center sm:px-6">
        <Particles count={60} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass relative z-10 w-full max-w-sm rounded-3xl px-5 py-10 shadow-premium sm:px-8 sm:py-12"
        >
          <FaLock className="mx-auto mb-4 text-3xl text-gold" />
          <h1 className="section-heading text-xl text-cream sm:text-2xl">A Little Secret</h1>
          <h1 className="section-heading text-xl text-red-500 sm:text-2xl">BABU DHANIYA</h1>
          <p className="mt-2 text-sm text-cream/60">Enter the password to open your surprise</p>

          <form onSubmit={submit} className="mt-8">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Password"
              autoFocus
              className={`w-full rounded-full bg-white/10 px-5 py-3 text-center text-cream placeholder-cream/40 outline-none border ${
                error ? 'border-red-400' : 'border-white/20'
              } focus:border-gold transition-colors`}
            />
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-xs text-red-300"
              >
                That's not it — try again ❤️
              </motion.p>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-rosegold px-6 py-3 font-medium text-midnight shadow-glow"
            >
              Unlock <FaHeart className="text-sm" />
            </motion.button>
          </form>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 px-3 py-3 sm:px-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold/80">
              Countdown to {NICK_NAME}'s Day
            </p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[
                { key: 'days', label: 'Days' },
                { key: 'hours', label: 'Hours' },
                { key: 'minutes', label: 'Min' },
                { key: 'seconds', label: 'Sec' },
              ].map((unit) => (
                <div key={unit.key} className="rounded-xl bg-white/10 px-2 py-2">
                  <p className="font-display text-lg text-gold">
                    {String(timeLeft[unit.key]).padStart(2, '0')}
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-cream/60">
                    {unit.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}
      {!loading && (
        <>
          <CursorGlow />
          <Home />
        </>
      )}
    </>
  )
}