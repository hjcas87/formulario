import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeResume } from '../../actions/ui';

export const SidebarResume = () => {

    const { isAlbum } = useSelector(state => state.ui)
    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault();
        const btn = document.querySelectorAll('.btn-resume');
        if (e.target.id === 'album') {
            btn[0].classList.add('activo')
            btn[1].classList.remove('activo')
        } else {
            btn[1].classList.add('activo')
            btn[0].classList.remove('activo')
        }
        const isAlbum = e.target.id === 'album';
        dispatch( changeResume( isAlbum ) )
        handleSidebar();
    }

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
            butons.forEach(btn => btn.disabled = true );
        }
        
    }

    return (
        <>
            <li>
                <div 
                    className={`btn-resume mb-3 ${isAlbum && 'activo'}`} 
                    onClick={ handleClick }
                    id="album"
                >
                    Resumen álbum
                </div>
            </li>
            <li>
                <div 
                    className={`btn-resume ${!isAlbum && 'activo'}`} 
                    onClick={ handleClick } 
                    id="simple"
                >
                    Resumen simple
                </div>
            </li>
            
        </>
    )
}
