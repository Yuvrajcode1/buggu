import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import { GALLERY_IMAGES } from '../../utils/constants'

function Polaroid({ img, index, onOpen }) {
  const rotate = (index % 2 === 0 ? -1 : 1) * (4 + (index % 3) * 2)

  return (
    <motion.button
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
      transition={{ duration: 0.6 }}
      onClick={() => onOpen(index)}
      className="glass relative w-full max-w-[220px] rounded-lg p-3 pb-8 shadow-premium"
    >
      <div className="aspect-square w-full overflow-hidden rounded-sm bg-black/20">
        <img
          src={img.src}
          alt={img.caption}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextSibling.style.display = 'flex'
          }}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div
          className="hidden h-full w-full items-center justify-center bg-gradient-to-br from-plum to-wine text-3xl"
          style={{ display: 'none' }}
        >
          📷
        </div>
      </div>
      <p className="mt-3 text-center font-script text-lg text-cream/80">{img.caption}</p>
    </motion.button>
  )
}

export default function MemoryGallery() {
  const [active, setActive] = useState(null)

  return (
    <section id="gallery" className="relative bg-plum px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">Captured Moments</p>
        <h2 className="section-heading text-glow mt-3 text-3xl text-cream md:text-5xl">
          Photo Gallery
        </h2>
        
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-5 place-items-center sm:mt-16 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
        {GALLERY_IMAGES.map((img, i) => (
          <Polaroid key={img.src} img={img} index={i} onOpen={setActive} />
        ))}
      </div>
      

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-6"
          >
            <button
              onClick={() => setActive(null)}
              className="absolute right-6 top-6 text-2xl text-cream/80 hover:text-gold"
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass w-full max-w-lg rounded-2xl p-4 shadow-premium"
            >
              <img
                src={GALLERY_IMAGES[active].src}
                alt={GALLERY_IMAGES[active].caption}
                className="max-h-[70vh] w-full rounded-lg object-cover"
                onError={(e) => (e.currentTarget.style.opacity = 0.1)}
              />
              <p className="mt-4 text-center font-script text-2xl text-rosegold">
                {GALLERY_IMAGES[active].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}




