import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Booking  from './pages/booking'
import Nav from './components/nav'
const App = () => {
  return (
    <Router>
     <Nav />
     <main className="main-content">
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/gallery" element={<Gallary />} />
         <Route path="/guides" element={<Guides />} />
         <Route path="/packages" element={<Packages />} />
         <Route path="/booking" element={<Booking />} />
         <Route path="/login" element={<Account/>} />

        
       </Routes>
     </main>
   </Router>
  )
}

export default App
