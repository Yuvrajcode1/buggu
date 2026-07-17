import { useMemo } from 'react'
import { FaHeart } from 'react-icons/fa'

export default function FloatingHearts({ count = 14, className = '' }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 14 + 10,
        delay: Math.random() * 8,
        duration: Math.random() * 6 + 8,
        opacity: Math.random() * 0.4 + 0.25,
      })),
    [count]
  )

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {hearts.map((h) => (
        <FaHeart
          key={h.id}
          className="absolute text-rosegold animate-rise"
          style={{
            left: `${h.left}%`,
            bottom: '-5%',
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        />
      ))}
    </div>
  )
}