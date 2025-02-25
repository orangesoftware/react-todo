import React from 'react'
import style from "./Home.module.css"

const Home = () => {
  return (
    <div className={style.home} >
      <h4>
        Welcome to the Todo List App!        
      </h4>
      <p>
        This is a simple web application that allows you 
      </p>
      <p>      
        to manage your tasks and stay organized.  
      </p>
    </div>
  )
}

export default Home
