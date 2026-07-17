import { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Hero from '../components/Hero/Hero'
import Welcome from '../components/Welcome/Welcome'
import Countdown from '../components/Countdown/Countdown'
import SurpriseModal from '../components/SurpriseModal/SurpriseModal'
import Timeline from '../components/Timeline/Timeline'
import Balloons from '../components/Balloons/Balloons'
import CakeCeremony from '../components/CakeCeremony/CakeCeremony'
import BirthdayWish from '../components/BirthdayWish/BirthdayWish'
import GiftBox from '../components/GiftBox/GiftBox'
import LoveLetter from '../components/LoveLetter/LoveLetter'
import MemoryGallery from '../components/MemoryGallery/MemoryGallery'
import Fireworks from '../components/Fireworks/Fireworks'
import FinalWish from '../components/FinalWish/FinalWish'
import MusicPlayer from '../components/MusicPlayer/MusicPlayer'

export default function Home() {
  const [entered, setEntered] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [devPreview, setDevPreview] = useState(false)

  const locked = entered && !unlocked && !devPreview

  return (
    <div className="relative">
      <Navbar />
      <Hero onEnter={() => setEntered(true)} />

      {entered && (
        <>
          <Welcome />
          <Countdown onUnlocked={() => setUnlocked(true)} />

          <div className={locked ? 'pointer-events-none select-none blur-sm' : ''}>
            <Timeline />
            <Balloons />
            <CakeCeremony />
            <BirthdayWish />
            <GiftBox />
            <LoveLetter />
            <MemoryGallery />
            <Fireworks />
            <FinalWish />
          </div>
          <Footer />

          <SurpriseModal show={locked} onPreview={() => setDevPreview(true)} />
          <MusicPlayer startPlaying />
        </>
      )}
    </div>
  )
}