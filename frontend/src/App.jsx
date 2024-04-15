import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
 import Booking  from './pages/booking.jsx'
 import Nav from './components/nav.jsx'
 import Home from './home.jsx';
import Reviews from "./pages/reviews.jsx"
import Gallery from "./pages/gallery.jsx"
import Packages from './pages/packages.jsx';
import Guides from './pages/Guides.jsx'
import Account from './pages/login.jsx'

 
 const router = createBrowserRouter([

  {
    path: "/",
    exact: true,
    element: <Home/>
  },
  
  {
    path: "/booking",
    element: <Booking/>,

  },
  {
    path: "/packages",
    element: <Packages/>,

  },
  {
    path: "/login",
    element: <Account/>,

  },
  {
    path: "/reviews",
    element: <Reviews/>,

  },
  {
    path: "/guides",
    element: <Guides/>,

  },
  {
    path: "/gallery",
    element: <Gallery/>,

  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
} 

 
 export default App



