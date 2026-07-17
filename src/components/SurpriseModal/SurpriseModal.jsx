import { motion, AnimatePresence } from 'framer-motion'
import { FaLock } from 'react-icons/fa'
import { NICK_NAME } from '../../utils/constants'

export default function SurpriseModal({ show, onPreview }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-midnight/90 px-6 text-center backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass max-w-md rounded-3xl px-8 py-12 shadow-premium"
          >
            <FaLock className="mx-auto mb-5 text-3xl text-gold" />
            <h3 className="section-heading text-2xl text-cream md:text-3xl">
              The Rest Is Locked, {NICK_NAME}
            </h3>
            <p className="mt-3 text-sm text-cream/60">
              This part of the surprise unlocks itself the moment your birthday begins. Scroll up
              to watch the countdown.
            </p>
            {onPreview && (
              <button
                onClick={onPreview}
                className="mt-6 text-xs tracking-widest text-rosegold/70 underline underline-offset-4 hover:text-gold"
              >
                (developer preview — skip lock)
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}