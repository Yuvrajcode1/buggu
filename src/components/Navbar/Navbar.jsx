import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaBars, FaHeart, FaTimes } from 'react-icons/fa'
import { NICK_NAME } from '../../utils/constants'

const LINKS = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'timeline', label: 'Our Journey' },
  { id: 'gallery', label: 'Memories' },
  { id: 'cake', label: 'Cake' },
  { id: 'gift', label: 'Gift' },
  { id: 'letter', label: 'Letter' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-5 md:px-10 md:py-4 transition-colors duration-500 ${
        scrolled ? 'glass' : 'bg-transparent'
      }`}
    >
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2 font-display text-base text-gold sm:text-xl">
          <FaHeart className="text-sm" />
          <span>{NICK_NAME}'s Day</span>
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-cream transition-colors duration-300 hover:border-gold hover:text-gold md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes className="text-sm" /> : <FaBars className="text-sm" />}
        </button>

        <div className="hidden gap-6 text-sm tracking-wide text-cream/80 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => goTo(l.id)}
              className="transition-colors duration-300 hover:text-gold"
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 right-4 top-full mt-2 rounded-2xl border border-white/10 bg-midnight/95 p-3 shadow-premium backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    goTo(l.id)
                    setMenuOpen(false)
                  }}
                  className="rounded-xl px-3 py-3 text-left text-sm text-cream/80 transition-colors duration-300 hover:bg-white/10 hover:text-gold"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}