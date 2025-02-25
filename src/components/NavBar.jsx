import React from 'react'
import style from "./NavBar.module.css"
import { Link,useLocation } from 'react-router-dom';
const NavBar = () => {
  const location = useLocation();

  const MENU_OPTIONS =[
    {
      name:"Home",
      path:"/home"
    },
    {
      name:"Todo List",
      path:"/todo"
    },
    {
      name:"About",
      path:"/about"
    }
  ]

  return (
    <div>
      <ul className={style.menu}>        
        {MENU_OPTIONS.map((option,index)=>(
          <li key={index} >
            <Link 
              className={location.pathname === option.path ? style.active : ""}
              to={option.path}>{option.name}
            </Link>
          </li>
        ))}
        
      </ul>
    </div>
  )
}

export default NavBar
