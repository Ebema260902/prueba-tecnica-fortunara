import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Carousel from './components/Carousel'
import Header from './components/Header'
import Gallery from './components/Gallery'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Carousel />
      <Gallery />

      
    </>
  )
}

export default App
