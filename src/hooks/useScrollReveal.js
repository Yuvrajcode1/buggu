import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: options.y ?? 60 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: options.start ?? 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [options.y, options.duration, options.start])

  return ref
}