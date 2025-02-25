import React from 'react'
import style from "./NavBar.module.css"
import { Link } from 'react-router-dom';
const NavBar = () => {
  return (
    <div>
      <ul className={style.menu}>        
        <li><Link to="home" >Home</Link> </li>
        <li><Link to="/todo">Todo List</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </div>
  )
}

export default NavBar
