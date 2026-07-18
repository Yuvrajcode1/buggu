import { motion } from 'framer-motion'
import useScrollReveal from '../../hooks/useScrollReveal'
import { NICK_NAME } from '../../utils/constants'

export default function Welcome() {
  const ref = useScrollReveal({ y: 40 })

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center bg-midnight px-4 py-16 sm:px-6 sm:py-24">
      <div
        ref={ref}
        className="glass w-full max-w-2xl rounded-3xl px-5 py-8 text-center shadow-premium sm:px-8 sm:py-12"
      >
        <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-gold sm:text-xs">A Little Note</p>
        <h2 className="section-heading text-xl text-cream sm:text-2xl md:text-3xl">
          I built this whole little world just for one person —
        </h2>
        <p className="mt-4 font-script text-2xl text-rosegold sm:text-3xl md:text-4xl">you, {NICK_NAME}.</p>
        <p className="mt-6 text-sm leading-relaxed text-cream/70 sm:text-base">
          Scroll slowly. There's a memory around every corner, a surprise waiting a little
          further down, and a whole cake with your name on it. Ready?
        </p>
      </div>
    </section>
  )
}