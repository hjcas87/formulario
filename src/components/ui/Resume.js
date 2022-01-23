import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { changeResume } from '../../actions/ui';
import { getLocalStorage } from '../../helpers/getLocalStorage'
import { AlbumResume } from './AlbumResume';
import { SimpleResume } from './SimpleResume';

export const Resume = () => {

    const { isAlbum } = useSelector(state => state.ui)

    const { data, simpleData } = getLocalStorage();

    const { albumStarted } = data;
    const { simpleStarted } = simpleData;
    const dispatch = useDispatch()
    
    // useEffect(() => {
    //     if ( albumStarted ) {
    //         dispatch( changeResume( true ) );
    //     }
    // }, [])

    return (
        <>
        
        <div className="main-container">

            <div className="text-secondary text-center animate__animated animate__fadeIn">
                
                <div className="py-5 mt-5 p-2">
                <h1 className="text-align-left text-white">Resumen del proyecto</h1>
                <div className="col-auto">
                    
                    {
                        isAlbum
                            ?
                            <AlbumResume isStarted={ data.albumStarted }/>
                            :
                            <SimpleResume isStarted={ simpleData.simpleStarted }/>

                    }
                    
                    
                </div>
                </div>
            </div>
        </div>

        </>
    )
}
