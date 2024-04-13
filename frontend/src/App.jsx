import React from 'react'
import Navbar from './Componets/Navbar/Navbar'
import { useState } from 'react'

const App = () => {
  const current_theme=localStorage.getItem("current_theme")
  const[theme, setTheme]=useState(current_theme? current_theme: "light" );




  return (
    <div className={'container ${theme}'}>
      <Navbar theme={theme} setTheme={setTheme}/>
    </div>
  )
}

export default App