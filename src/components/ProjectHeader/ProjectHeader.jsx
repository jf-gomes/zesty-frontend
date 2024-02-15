import React, { useState } from "react";
import "./ProjectHeader.css";
import { useNavigate } from "react-router-dom";

export default function ProjectHeader({ project, activeSection, setActiveSection }){

  const navigate = useNavigate()

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="projectHeader">
      <nav className="projectHeaderNav">
        <div className="flex alignCenter gap">
          <h2>{project.name}</h2>
          <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
          </div>
        </div>
        <ul className={menuOpen ? "open" : null}>
          <li>
            <a href="" onClick={(e) => {
              e.preventDefault()
              setActiveSection('team')
            }} style={activeSection == 'team' ? {textDecoration: 'underline', color: '#1B998B'} : null}>Equipe</a>
          </li>
          <li>
            <a href="" onClick={(e) => {
              e.preventDefault()
              setActiveSection('tasks')
            }} style={activeSection == 'tasks' ? {textDecoration: 'underline', color: '#1B998B'} : null}>Tarefas</a>
          </li>
          <li>
            <a href="" onClick={(e) => {
              e.preventDefault()
              setActiveSection('posts')
            }} style={activeSection == 'posts' ? {textDecoration: 'underline', color: '#1B998B'} : null}>Publicações</a>
          </li>
          <li>
            <a href="" onClick={(e) => {
              e.preventDefault()
              navigate('/zesty-frontend/user')
            }}>Voltar</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}