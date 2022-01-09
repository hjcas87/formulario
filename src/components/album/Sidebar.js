import React, { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux";
import {  NavLink, useLocation, } from "react-router-dom"
import { isAlbumLink } from "../../actions/ui";
import { LinksButtons } from "../ui/LinksButtons";

export const Sidebar = React.memo(({ actualRoute, albumRoutes, simpleRoutes }) => {

    let { pathname } = useLocation();
    
     
    const rute = useMemo(() => actualRoute.includes('album'), [pathname]) ;

    const dispatch = useDispatch()

    const { navigation } = useSelector(state => state.ui)

    useEffect(() => {
    
    dispatch( isAlbumLink( rute ) )

    }, [rute])

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


    return (
        
        <>
            <div className="text-white bg-dark sidebar">
                <NavLink 
                    className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                    to="/"
                >
                    Ir al resumen
                </NavLink>
                <hr/>
                <ul className="nav nav-pills flex-column">
                    {
                        navigation 
                            ?                        
                            albumRoutes.map( (nav, i) => (
                                <li key={ `navlink${i}` }>
                                    <LinksButtons page={ nav[0] } name={ nav[1] }/>
                                </li>
                            ))
                            :
                            simpleRoutes.map( (nav, i) => (
                                <li key={ `navlink${i}` }>
                                    <LinksButtons page={ nav[0] } name={ nav[1] }/>
                                </li>
                            ))
                    }
                    
                    
                </ul>
                
            <div className="menu-side">
                <div className="menu-side-icon" onClick={ handleSidebar } >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
                </div>
            </div>
            </div>
            
        </>
            
    )
    
})
