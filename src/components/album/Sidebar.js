import React, { useEffect } from "react"
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom"

export const Sidebar = React.memo(({ arr }) => {
console.log(arr)

    // const inputs = document.querySelectorAll('input')
    // console.log(inputs)
    
  let { pathname } = useLocation();
//   console.log(location)

  useEffect(() => {
    const container = document.querySelector('.main-container');
    const menuAside = document.querySelector('.sidebar-cont');
    menuAside.classList.remove('open')
    container.classList.remove('opacity');

  }, [pathname])

    const handleSidebar = () => {

        const container = document.querySelector('.main-container');
        const menuAside = document.querySelector('.sidebar-cont');
        if (menuAside.classList.contains('open')) {
            menuAside.classList.remove('open');
            container.classList.remove('opacity');
        } else {
            menuAside.classList.add('open');
            container.classList.add('opacity');
        }
        
    }

    const handleLink = () => {
        const container = document.querySelector('.main-container');
        const menuAside = document.querySelector('.sidebar-cont');
        if (menuAside.classList.contains('open')) {
            menuAside.classList.remove('open')
            container.classList.remove('opacity');
        }
    }


    return (
        
        <>
            <div className="text-white bg-dark sidebar">
            <div className="menu-side">
                <div className="menu-side-icon" onClick={ handleSidebar } >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                </div>
            </div>
                <NavLink 
                    className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                    to="/"
                >
                    Ir al resumen
                </NavLink>
                <hr/>
                <ul className="nav nav-pills flex-column">
                    <li>
                        <NavLink 
                            className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                            to="/album/"
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
                
            </div>
            
        </>
            
    )
    
})
