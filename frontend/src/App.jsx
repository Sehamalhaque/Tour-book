import React from 'react'
import Navbar from './Componets/Navbar/Navbar'
import { useState } from 'react'
import Booking from './Componets/Navbar/pages/Booking'
import TawkTo from './Componets/Navbar/livechat.jsx'

const App = () => {
  const current_theme=localStorage.getItem("current_theme")
  const[theme, setTheme]=useState(current_theme? current_theme: "light" );
  return (
    <div className={'container ${theme}'}>
      <Navbar theme={theme} setTheme={setTheme}/>
      <Booking/>
      <TawkTo />


    </div>
     

  )
}

export default App