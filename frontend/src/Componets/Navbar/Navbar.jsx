import React from 'react'
import './Navbar.css'
import logo_light from '../../assets/ghurifuri-high-resolution-logo-black.png'
import logo_dark from '../../assets/ghurifuri-high-resolution-logo-white.png'
import search_icom from '../../assets/search-w.png'
import search_icom_b from '../../assets/search-b.png'
import toggle_l from '../../assets/night.png'
import toggle_n from '../../assets/day.png'

const Navbar = ({theme, setTheme}) => {
  const toggle_mode=()=>{
    theme=="light" ? setTheme("dark"):setTheme("light");


  }
  return (
    <div className='navbar'>
      <img src={theme=="light" ? logo_light: logo_dark} alt='' className='logo' />
       <ul>
         <li> Home</li>
         <li> Packages</li>
         <li> Gallery</li>
         <li> Booking</li>
         <li> Guides</li>
         <li> Reviews</li>
         <li> Map </li>
         <li> Calender</li>
         
       </ul>

       <div className='search-box'>
        <input type='text' placeholder='Search'/>
        <img src={theme=="light" ?search_icom:search_icom_b} alt=''/>

      <img onClick={()=>{toggle_mode()}} src={theme=="light" ? toggle_l: toggle_n} alt='' className='toggle-icon'/>
       
       </div>

    </div>
    
  )

}

export default Navbar