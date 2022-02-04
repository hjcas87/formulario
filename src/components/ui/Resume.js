import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { infoFormAlbum, infoFormSimple } from '../../actions/post';
import { changeResume } from '../../actions/ui';
import { getLocalStorage } from '../../helpers/getLocalStorage'
import { AlbumResume } from './AlbumResume';
import { SimpleResume } from './SimpleResume';
import { StartProyect } from './StartProyect';

export const Resume = () => {

    const { isAlbum } = useSelector(state => state.ui)

    const { simpleInfo } = useSelector(state => state.simpleForm)
    const { data, simpleData } = getLocalStorage();
    const { albumStarted } = data;
    const { simpleStarted } = simpleData;
    const dispatch = useDispatch()
    
    // useEffect(() => {
    //     dispatch( infoFormSimple( simpleData ) );
    //     dispatch( infoFormAlbum( data ) );
    // }, [])+
    console.log(isAlbum)

    return (
        <>
        
        <div className="main-container resume">

            <div className="text-secondary text-center animate__animated animate__fadeIn">
                
                <div className="py-5 mt-5 p-2">
                <div className="col-auto">
                    
                    {
                        isAlbum
                            ?
                                albumStarted 
                                    ?
                                    <AlbumResume />
                                    :
                                    <StartProyect value={ '/album' }/>
                            :
                                simpleStarted 
                                    ?
                                    <SimpleResume />
                                    :
                                    <StartProyect value={ '/simple' }/>
                    }
                    
                    
                </div>
                </div>
            </div>
        </div>

        </>
    )
}
