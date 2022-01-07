import React from "react"
import { NavLink } from "react-router-dom"

export const Sidebar = React.memo(({ arr }) => {
console.log(arr)

    // const inputs = document.querySelectorAll('input')
    // console.log(inputs)


    return (
        
        <>
            <div className="text-white bg-dark sidebar toggled" id="sidebar-wrapper">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                
                <span className="fs-4">Ir al resumen </span>
                </a>
                <hr/>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li>
                        <NavLink 
                            className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                            to="/album"
                        >
                            Información básica
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                            to="/upc"
                        >
                            Código de barras/Upc
                        </NavLink>
                    </li>
                        <NavLink 
                            className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                            to="/selection"
                        >
                            Información del álbum
                        </NavLink>
                    <li>
                        <NavLink 
                            className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                            to="/songs"
                        >
                            Canciones
                        </NavLink>
                    </li>
                    <hr />
                    <li>
                        <NavLink 
                            className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                            to="/genders"
                        >
                            Géneros/Localización
                        </NavLink>
                    </li>
                    <hr />
                    <li>
                        <NavLink 
                            className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                            to="/isrc"
                        >
                            Códigos ISRC
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                            to="/distribution"
                        >
                            Distribución
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                            to="/extended-songs"
                        >
                            Canciones Extendidas
                        </NavLink>
                    </li>
                </ul>
                <hr />
                <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <li><a className="dropdown-item" href="#">New project...</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
                </div>
            </div>
        </>
            
    )
    
})
