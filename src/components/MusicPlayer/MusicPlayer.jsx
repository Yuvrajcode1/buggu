import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaMusic, FaPause } from 'react-icons/fa'
import { Howl } from 'howler'
import { MUSIC_TRACKS } from '../../utils/constants'

export default function MusicPlayer({ startPlaying = false }) {
  const [playing, setPlaying] = useState(false)
  const howlRef = useRef(null)
  const currentTrack = useRef(MUSIC_TRACKS.soft)

  useEffect(() => {
    howlRef.current = new Howl({
      src: [currentTrack.current],
      loop: true,
      volume: 0.35,
      html5: true,
      onloaderror: () => {},
    })
    return () => howlRef.current?.unload()
  }, [])

  useEffect(() => {
    if (startPlaying && howlRef.current && !playing) {
      howlRef.current.play()
      setPlaying(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startPlaying])

  useEffect(() => {
    const handler = (e) => {
      const track = e.detail?.track
      if (!track || !howlRef.current) return
      howlRef.current.unload()
      howlRef.current = new Howl({
        src: [track],
        loop: true,
        volume: 0.4,
        html5: true,
        onloaderror: () => {},
      })
      howlRef.current.play()
      setPlaying(true)
    }
    window.addEventListener('buggu:switch-track', handler)
    return () => window.removeEventListener('buggu:switch-track', handler)
  }, [])

  const toggle = () => {
    if (!howlRef.current) return
    if (playing) {
      howlRef.current.pause()
      setPlaying(false)
    } else {
      howlRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2 }}
      onClick={toggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full glass shadow-glow text-gold"
    >
      <motion.span
        animate={playing ? { rotate: 360 } : { rotate: 0 }}
        transition={{ repeat: playing ? Infinity : 0, duration: 4, ease: 'linear' }}
      >
        {playing ? <FaPause /> : <FaMusic />}
      </motion.span>
    </motion.button>
  )
}

export function switchTrack(track) {
  window.dispatchEvent(new CustomEvent('buggu:switch-track', { detail: { track } }))
}