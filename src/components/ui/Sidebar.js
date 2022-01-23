import React, { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux";
import {  NavLink, useLocation, } from "react-router-dom"


import { changeResume, isAlbumLink, isChange } from "../../actions/ui";
import { getLocalStorage } from "../../helpers/getLocalStorage";
import { LinksButtons } from "./LinksButtons";
import { SidebarResume } from "./SidebarResume";

export const Sidebar = React.memo(({ actualRoute, albumRoutes, simpleRoutes }) => {

    let { pathname } = useLocation();

    const dispatch = useDispatch();
     
    const rute = useMemo(() => actualRoute.includes('album'), [pathname]);
    
    const ruteResume = useMemo(() => actualRoute.includes('resume'), [pathname]);

    useEffect(() => {
        dispatch( changeResume( rute ) )
    }, [rute])
    
    console.log({rute})

    useEffect(() => {
        const container = document.querySelector('.main-container');
        const menuAside = document.querySelector('#sidebar');
        const allInputs = document.querySelectorAll('input');
        const butons = document.querySelectorAll('button');
        menuAside.classList.remove('open');
        container.classList.remove('opacity');
        allInputs.forEach(input => input.disabled = false );
        butons.forEach(btn => btn.disabled = false );

    }, [pathname])

    const handleSidebar = () => {

        const container = document.querySelector('.main-container');
        const menuAside = document.querySelector('#sidebar');
        const allInputs = document.querySelectorAll('input');
        const butons = document.querySelectorAll('button');
        if (menuAside.classList.contains('open')) {
            menuAside.classList.remove('open');
            container.classList.remove('opacity');
            allInputs.forEach(input => input.disabled = false );
            butons.forEach(btn => btn.disabled = false );
        } else {
            menuAside.classList.add('open');
            container.classList.add('opacity');
            allInputs.forEach(input => input.disabled = true );
            butons.forEach(btn => btn.disabled = true );
        }
        
    }

    // if (rute) {
    //     const { data } = getLocalStorage();
    //     localStorage.setItem( 'albumInfo', JSON.stringify(data) );
    // }


    return (
        
        <>
            <div className="text-white sidebar m-auto">

            {
                !ruteResume &&
                <>
                    <NavLink 
                        className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                        to="/resume"
                    >
                        Ir al resumen
                    </NavLink>
                    <hr/>
                </>
            }   

                <ul className="nav nav-pills flex-column">
                    {
                        !ruteResume ?
                            rute 
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
                            :
                            <>
                                <SidebarResume />
                            </>
                    }
                    
                    
                </ul>
                
            </div>
            <div className="menu-side">
                <div className="menu-side-icon" onClick={ handleSidebar } >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                </div>
            </div>
            
        </>
            
    )
    
})
