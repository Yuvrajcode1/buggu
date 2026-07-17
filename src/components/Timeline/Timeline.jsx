import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import { TIMELINE } from '../../utils/constants'

export default function Timeline() {
  return (
    <section id="timeline" className="relative bg-midnight px-6 py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">Our Story</p>
        <h2 className="section-heading text-glow mt-3 text-3xl text-cream md:text-5xl">
          Our Journey
        </h2>
      </div>

      <div className="relative mx-auto mt-20 max-w-2xl">
        <div className="absolute left-4 top-0 h-full w-[2px] bg-gradient-to-b from-gold via-rosegold to-transparent md:left-1/2 md:-translate-x-1/2" />

        {TIMELINE.map((item, i) => {
          const isLeft = i % 2 === 0
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`relative mb-14 flex flex-col md:flex-row ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-start md:items-center`}
            >
              <div className="absolute left-4 top-1 z-10 -translate-x-1/2 md:left-1/2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gold shadow-glow">
                  <FaHeart className="text-[8px] text-midnight" />
                </span>
              </div>

              <div
                className={`ml-12 w-full md:ml-0 md:w-1/2 ${
                  isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}
              >
                <div className="glass rounded-2xl px-6 py-5 shadow-premium">
                  <p className="text-xs uppercase tracking-widest text-rosegold">{item.year}</p>
                  <h3 className="section-heading mt-1 text-xl text-gold md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/70">{item.text}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}