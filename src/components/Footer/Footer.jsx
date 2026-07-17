import { FaHeart } from 'react-icons/fa'
import { NICK_NAME } from '../../utils/constants'

export default function Footer() {
  return (
    <footer className="relative z-10 bg-midnight py-8 text-center text-sm text-cream/50">
      <div className="divider-line mx-auto mb-6 w-40" />
      <p className="flex items-center justify-center gap-2 font-display text-base text-cream/70">
        Made with <FaHeart className="text-rosegold" /> for my {NICK_NAME}
      </p>
      <p className="mt-2">© {new Date().getFullYear()} — Forever Together</p>
    </footer>
  )
}