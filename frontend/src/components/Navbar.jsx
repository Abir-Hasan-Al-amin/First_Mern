import React from 'react'
import {Link} from "react-router-dom"
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
function Navbar() {
  return (
    <div className='flex justify-evenly'>
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>about</Link>
        <Link to={"/contact"}>contact</Link>
    </div>
  )
}

export default Navbar