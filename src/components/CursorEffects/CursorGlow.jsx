import { useEffect, useRef, useState } from 'react'

export default function CursorGlow() {
  const dotRef = useRef(null)
  const glowRef = useRef(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const touch = window.matchMedia('(pointer: coarse)').matches
    setIsTouch(touch)
    if (touch) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let gx = x
    let gy = y

    const move = (e) => {
      x = e.clientX
      y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`
      }
    }

    let raf
    const animateGlow = () => {
      gx += (x - gx) * 0.12
      gy += (y - gy) * 0.12
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${gx}px, ${gy}px)`
      }
      raf = requestAnimationFrame(animateGlow)
    }
    animateGlow()

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 mix-blend-screen"
        style={{
          background:
            'radial-gradient(circle, rgba(243,196,122,0.35) 0%, rgba(232,180,188,0.12) 45%, transparent 70%)',
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-glow"
      />
    </>
  )
}