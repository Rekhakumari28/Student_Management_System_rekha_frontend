import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <>
        <nav className='navbar navbar-expand-lg bg-body-tertiary'>
            <div className='container'>
            <Link className='navbar-brand' to="/">Student Management System</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className='collapse navbar-collapse' id='navbarNav'>
        <ul className='navbar-nav'>
            <li className='nav-item'>
                <Link className='nav-link' to="/">Students</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to="/classes">Classes</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to="/teachers">Teachers</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to="/school">School</Link>
            </li>
        </ul>
    </div>
            </div>
        </nav>
    </>
  )
}

