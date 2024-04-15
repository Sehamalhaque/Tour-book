import React from 'react'
import { Link } from 'react-router-dom'
import "./nav.css"

const Nav = () => {
  
  return (

    <nav className="navbar">
      <ul className="bar">
        <li className="item">
          <Link to="/" className="link">Home</Link>
        </li>
        <li className="item">
          <Link to="/booking" className="link">Booking</Link>
        </li>
        <li className="item">
          <Link to="/packages" className="link">Packages</Link>
        </li>
        <li className="item">
          <Link to="/guides" className="link">Guides</Link>
        </li>
        <li className="item">
          <Link to="/gallery" className="link">Gallery</Link>
        </li>
        <li className="item">
          <Link to="/reviews" className="link">Reviews</Link>
        </li>
        <li className="item">
          <Link to="/login" className="link">Account</Link>
        </li>
      </ul>
    </nav>

    
  )
}

export default Nav