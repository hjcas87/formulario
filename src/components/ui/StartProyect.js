import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeResume } from '../../actions/ui';
import { getLocalStorage } from '../../helpers/getLocalStorage';

export const StartProyect = ({ value }) => {

    const dispatch = useDispatch()
    const { data, simpleData } = getLocalStorage();
    const navigate = useNavigate();

    // const { albumStarted } = data;
    // const { simpleStarted } = simpleData;

    console.log(value)
    const handleStart = (e) => {
        e.preventDefault();
        data.albumStarted = true;
        simpleData.simpleStarted = true;
        localStorage.setItem( 'albumInfo', JSON.stringify(data) );
        localStorage.setItem( 'simpleInfo', JSON.stringify(simpleData) );
        dispatch( changeResume( true ) );
        navigate( value )
    }

    return (
        <>
            <div className="text-secondary text-center animate__animated animate__fadeIn">
                
                <div className="py-5 mt-5">

                    <p>Aún no has comenzado aquí</p>

                    <button 
                        className="btn"
                        onClick={ handleStart }
                    >
                        Crear
                    </button>

                </div>
            </div>
        </>
    )
}
