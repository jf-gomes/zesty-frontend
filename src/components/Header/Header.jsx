import React, { useState } from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import logo from '../../img/logo.png'

export default function Header(){
  
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav>
        <div className="flex alignCenter gap">
          <Link to="/user"><img src={logo} alt="Zesty" style={{width: '200px', height: '200px'}} /></Link>
          <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
          </div>
        </div>
        <ul className={menuOpen ? "open" : null}>
          <li>
            <a href="#whatIsZestySection">O que é Zesty</a>
          </li>
          <li>
            <a href="#whatCanYouDoSection">Como funciona</a>
          </li>
          <li>
            <NavLink to="/zesty-frontend/login">Começar</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}