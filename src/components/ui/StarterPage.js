import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { infoFormAlbum, infoFormSimple } from '../../actions/post';
import { changeResume } from '../../actions/ui';
import { getLocalStorage } from '../../helpers/getLocalStorage';

export const StarterPage = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch()

    let { started, data, simpleData } = getLocalStorage();

    const handleStart = (e) => {
        e.preventDefault();
        started = !started;
        localStorage.setItem('started', JSON.stringify(started));
        // dispatch( infoFormSimple( simpleData ) );
        // dispatch( infoFormAlbum( data ) );
    
        if (e.target.id === 'album') {
            data.albumStarted = true;
            localStorage.setItem('albumInfo', JSON.stringify(data));
            dispatch( changeResume( true ) )
            navigate( 'album' )
        } else {
            simpleData.simpleStarted = true;
            localStorage.setItem('simpleInfo', JSON.stringify(simpleData));
            dispatch( changeResume( false ) )
            navigate( 'simple' )
        }
    }


    return (
        <>
            <div className="main-container">
                <div className="text-secondary text-center animate__animated animate__fadeIn" id="basic_info">
                    
                    <div className="py-5 mt-5">
                    <h1 className="text-center text-white">Aún no has comenzado con la subida de ningún proyecto.</h1>
                    <h2 className="text-center text-white">Elegí que queres lanzar.</h2>
                    <div className="max-w-50 m-auto">
                        <div className="d-flex justify-around">
                            <div>
                                <button 
                                    onClick={ handleStart }
                                    className="btn mt-3"
                                    id="album"
                                >
                                    Lanzar un álbum
                                </button>

                            </div>
                            
                            <div>
                                <button 
                                    onClick={ handleStart }
                                    className="btn mt-3"
                                    id="simple"
                                >
                                    Lanzar un sencillo
                                </button>

                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}
