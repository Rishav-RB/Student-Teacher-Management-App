import React from 'react'
import Navbar from '../components/Navbar'
import HomeContent from '../components/HomeContent'
import MovingSVG from './Bubbles'

const Home = () => {
  return (
    <div data-theme='corporate'>
        <Navbar/>
        <HomeContent/>
    </div>
  )
}

export default Home