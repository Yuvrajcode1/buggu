import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
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
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 py-4 transition-colors duration-500 ${
        scrolled ? 'glass' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center gap-2 font-display text-xl text-gold">
        <FaHeart className="text-sm" />
        <span>{NICK_NAME}'s Day</span>
      </div>
      <div className="hidden md:flex gap-6 text-sm tracking-wide text-cream/80">
        {LINKS.map((l) => (
          <button
            key={l.id}
            onClick={() => goTo(l.id)}
            className="hover:text-gold transition-colors duration-300"
          >
            {l.label}
          </button>
        ))}
      </div>
    </motion.nav>
  )
}