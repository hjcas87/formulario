import React from "react"
import { NavLink } from "react-router-dom"



export const LinksButtons = React.memo(({ page, name }) => {

    // // console.log('se llama')
    return (
        <>
            <NavLink 
                className={ ({ isActive }) => 'nav-item text-white ' + (isActive ? 'activo nav-item' : '') } 
                to={ page }
            >
                {name}
            </NavLink>
        </>
    )
})
