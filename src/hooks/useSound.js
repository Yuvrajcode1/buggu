import { useCallback, useMemo, useRef } from 'react'
import { Howl } from 'howler'

/**
 * Wraps a Howler sound. If the audio file at `src` is missing
 * (common until you drop your own mp3s into /public/music),
 * playback fails silently instead of throwing.
 */
export default function useSound(src, { loop = false, volume = 1 } = {}) {
  const howlRef = useRef(null)

  const getHowl = useCallback(() => {
    if (!howlRef.current) {
      howlRef.current = new Howl({
        src: [src],
        loop,
        volume,
        html5: true,
        onloaderror: () => {
          // Missing/placeholder file — fail silently, don't break the UI
        },
      })
    }
    return howlRef.current
  }, [src, loop, volume])

  const play = useCallback(() => {
    try {
      getHowl().play()
    } catch {
      /* noop */
    }
  }, [getHowl])

  const stop = useCallback(() => {
    try {
      getHowl().stop()
    } catch {
      /* noop */
    }
  }, [getHowl])

  const pause = useCallback(() => {
    try {
      getHowl().pause()
    } catch {
      /* noop */
    }
  }, [getHowl])

  return useMemo(() => ({ play, stop, pause }), [play, stop, pause])
}