import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import { infoFormSimple, infoFormSimpleAllArtists } from "../../../actions/post";
import { removeError, setError } from "../../../actions/ui";
import { getLocalStorage } from "../../../helpers/getLocalStorage";
// import { allArtists } from "../../../helpers/allArtists";
import { BasicInfoForm } from "./BasicInfoForm";
import { SimpleResume } from "../../ui/SimpleResume";
import { infoFormSimple } from "../../../actions/post";

export const BasicInfo = () => {
    
    const { simpleInfo, simpleInfo: { info_basica } } = useSelector(state => state.simpleForm)
    
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    
    const { msgError, isAlbum } = useSelector( state => state.ui);

    const { simpleData, simpleDataSong, started } = useMemo(() => getLocalStorage( isAlbum ), [ isAlbum ])

    useEffect(() => {
        dispatch( removeError() )
    }, [])
    
    useEffect(() => {
        
        dispatch( infoFormSimple( simpleData ));

    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(info_basica)
        if ( isAlbumScreenValid() ) {
            localStorage.setItem( 'simpleInfo', JSON.stringify(simpleInfo) );
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

        if ( info_basica.idioma.trim().length === 0) {
            dispatch( setError('El idioma es requerido') );
            return false;
        } 
        else if ( info_basica.artista_principal.trim().length === 0) {
            dispatch( setError('Dinos cual es el artista o banda principal') );
            return false;
        } else if ( info_basica.titulo_album.trim().length === 0) {
            dispatch( setError('Dinos cual es el titulo del lanzamiento') );
            return false;
        } else if ( info_basica.fecha_lanzamiento.trim().length === 0) {
            dispatch( setError('Dinos cual es la fecha del lanzamiento') );
            return false;
        } else if ( info_basica.artistas_secundarios.some(artista => artista.artista_secundario.trim().length === 0)) {
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
