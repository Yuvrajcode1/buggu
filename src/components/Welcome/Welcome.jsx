import { motion } from 'framer-motion'
import useScrollReveal from '../../hooks/useScrollReveal'
import { NICK_NAME } from '../../utils/constants'

export default function Welcome() {
  const ref = useScrollReveal({ y: 40 })

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center bg-midnight px-6 py-24">
      <div
        ref={ref}
        className="glass max-w-2xl rounded-3xl px-8 py-12 text-center shadow-premium"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">A Little Note</p>
        <h2 className="section-heading text-2xl text-cream md:text-3xl">
          I built this whole little world just for one person —
        </h2>
        <p className="mt-4 font-script text-3xl text-rosegold md:text-4xl">you, {NICK_NAME}.</p>
        <p className="mt-6 text-cream/70 leading-relaxed">
          Scroll slowly. There's a memory around every corner, a surprise waiting a little
          further down, and a whole cake with your name on it. Ready?
        </p>
      </div>
    </section>
  )
}