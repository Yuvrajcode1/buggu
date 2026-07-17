import { motion } from 'framer-motion'
import Particles from '../Particles/Particles'
import FloatingHearts from '../FloatingHearts/FloatingHearts'
import { NICK_NAME } from '../../utils/constants'

export default function FinalWish() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-celebration-gradient px-6 text-center">
      <Particles count={110} />
      <FloatingHearts count={18} />

      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: -20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="absolute right-[12%] top-[14%] h-24 w-24 rounded-full md:h-36 md:w-36"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #fdf6ec, #f3c47a 70%)',
          boxShadow: '0 0 90px rgba(243,196,122,0.55)',
        }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 1 }}
        className="relative z-10 text-xs uppercase tracking-[0.5em] text-rosegold/80"
      >
        The Final Note
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1.1 }}
        className="section-heading text-glow relative z-10 mt-4 max-w-3xl text-3xl text-cream md:text-6xl"
      >
        Happy Birthday My {NICK_NAME} ❤️
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 1.2 }}
        className="relative z-10 mt-6 font-script text-3xl text-gold md:text-4xl"
      >
        Forever Together.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6, duration: 1.5 }}
        className="relative z-10 mt-12 text-cream/40"
      >
        — end of tonight's celebration, not of us —
      </motion.div>
    </section>
  )
}