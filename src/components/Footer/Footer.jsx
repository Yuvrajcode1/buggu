import { FaHeart } from 'react-icons/fa'
import { NICK_NAME } from '../../utils/constants'

export default function Footer() {
  return (
    <footer className="relative z-10 bg-midnight px-4 py-8 text-center text-xs text-cream/50 sm:text-sm">
      <div className="divider-line mx-auto mb-6 w-40" />
      <p className="flex items-center justify-center gap-2 font-display text-sm text-cream/70 sm:text-base">
        Made with <FaHeart className="text-rosegold" /> for my {NICK_NAME}
      </p>
      <p className="mt-2">© {new Date().getFullYear()} — Forever Together</p>
    </footer>
  )
}