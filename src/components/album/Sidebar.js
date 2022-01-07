import React from "react"
import { NavLink, Outlet } from "react-router-dom"

export const Sidebar = React.memo(({ arr }) => {
console.log(arr)

    // const inputs = document.querySelectorAll('input')
    // console.log(inputs)


    return (
        
        <>
            <div className="text-white bg-dark sidebar toggled" id="sidebar-wrapper">
                <NavLink 
                    className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                    to="/"
                >
                    Ir al resumen
                </NavLink>
                <hr/>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li>
                        <NavLink 
                            className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                            to="album/"
                        >
                            Información básica
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                            to="/album/upc"
                        >
                            Código de barras/Upc
                        </NavLink>
                    </li>
                        <NavLink 
                            className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                            to="/album/selection"
                        >
                            Información del álbum
                        </NavLink>
                    <li>
                        <NavLink 
                            className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                            to="/album/songs"
                        >
                            Canciones
                        </NavLink>
                    </li>
                    <hr />
                    <li>
                        <NavLink 
                            className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                            to="/album/genders"
                        >
                            Géneros/Localización
                        </NavLink>
                    </li>
                    <hr />
                    <li>
                        <NavLink 
                            className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                            to="/album/isrc"
                        >
                            Códigos ISRC
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                            to="/album/distribution"
                        >
                            Distribución
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                            to="/album/extended-songs"
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
