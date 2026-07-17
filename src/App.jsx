import { useState } from 'react'
import Loader from './components/Loader/Loader'
import CursorGlow from './components/CursorEffects/CursorGlow'
import Home from './pages/Home'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}
      {!loading && (
        <>
          <CursorGlow />
          <Home />
        </>
      )}
    </>
  )
}