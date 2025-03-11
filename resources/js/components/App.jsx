import React from 'react'
import Router  from '../router/index'
import { NavLink } from 'react-router-dom'

const App = () => {
  return (
    <div>
        <div>
            <h1>HELLO APP</h1>
        </div>
        <nav>
            <NavLink to="/">
                Go to Home
            </NavLink>
            <NavLink to="/about">
                Pergi ke about page
            </NavLink>
        </nav>
        <Router />
    </div>
  )
}

export default App