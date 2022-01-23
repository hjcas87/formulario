import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { infoFormAlbum, infoFormAlbumAllArtists } from "../../../actions/post";
import { removeError, setError } from "../../../actions/ui";
import { getLocalStorage } from "../../../helpers/getLocalStorage";
import { allArtists } from "../../../helpers/allArtists";
import { BasicInfoForm } from "./BasicInfoForm";
import { SimpleResume } from "../../ui/SimpleResume";

export const BasicInfo = () => {
    
    const [bool, setBool] = useState(false)
    // // console.log(bool)

    const { albumInfo } = useSelector(state => state.form)
    
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    
    const { msgError, isAlbum } = useSelector( state => state.ui);

    const { simpleData, simpleDataSong, started } = useMemo(() => getLocalStorage( bool, isAlbum ), [ bool, isAlbum ])

    // console.log(isAlbum)
    // const artistas = useMemo(() => allArtists( simpleData, simpleDataSong ), [ simpleData, simpleDataSong ]);

    console.log(simpleData)
    console.log(albumInfo)

    useEffect(() => {
        dispatch( removeError() )
    }, [])
    
    useEffect(() => {
        
        dispatch( infoFormAlbum( simpleData ));

    }, []);

    // useEffect(() => {
    //     // // console.log('se mandan los artistas')
    //     dispatch( infoFormAlbumAllArtists( artistas ))

    // }, [artistas]);
    
    
    // useEffect(() => {
        
    //     dispatch( getArtistForSpotify( artistas ))
        
    // }, [artistas]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // // console.log(basicInfo)
        if ( isAlbumScreenValid() ) {
            console.log(simpleData)
    console.log(albumInfo)
            localStorage.setItem( 'simpleInfo', JSON.stringify(albumInfo) );
            setBool(true)
            animationScreenNavigate();
        }

    };

    const animationScreenNavigate = () => {
        const screen = document.querySelector('#basic_info');
        screen.classList.remove('animate__fadeIn');
        screen.classList.add('animate__fadeOutLeft', 'animate__faster');
        screen.addEventListener('animationend', () => {
            
            navigate( '/simple/upc' );
        
        });
    };

    const isAlbumScreenValid = () => {

        if ( albumInfo.idioma.trim().length === 0) {
            dispatch( setError('El idioma es requerido') );
            return false;
        } 
        else if ( albumInfo.artista_principal.trim().length === 0) {
            dispatch( setError('Dinos cual es el artista o banda principal') );
            return false;
        } else if ( albumInfo.titulo_album.trim().length === 0) {
            dispatch( setError('Dinos cual es el titulo del lanzamiento') );
            return false;
        } else if ( albumInfo.fecha_lanzamiento.trim().length === 0) {
            dispatch( setError('Dinos cual es la fecha del lanzamiento') );
            return false;
        } else if ( albumInfo.artistas_secundarios.some(artista => artista.artista_secundario.trim().length === 0)) {
            dispatch( setError('Completá todos los campos') );
            return false;
        }
        dispatch( removeError() );
        return true;
    }

    return (
        <div className="main-container">

            {
                simpleData.simpleStarted && started 
                    ?
                        <div className="text-secondary text-align-left animate__animated animate__fadeIn" id="basic_info">
                            
                            <div className="py-5 mt-5">
                            <h1 className="text-align-left">Simple</h1>
                            <h2 className="text-align-left">Informacion Básica</h2>
                                <div className="col-auto">
                                    { 
                                        msgError &&
                                            (
                                                <div className="error animate__animated animate__fadeIn">
                                                    { msgError }
                                                </div>
                                            )
                                    }
                                

                                    <BasicInfoForm simpleData={ simpleData }/>
                                    
                                    <div className="d-flex justify-center">
                                        <button 
                                            onClick={ handleSubmit }
                                            className="btn mt-3"
                                        >
                                            Guardar y continuar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    :

                        <SimpleResume isStarted={simpleData.simpleStarted}/>

            }

        </div>
    )
}
