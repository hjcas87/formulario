import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import { infoFormSimple, infoFormSimpleAllArtists } from "../../../actions/post";
import { removeError, removeMsg, setError } from "../../../actions/ui";
import { getLocalStorage } from "../../../helpers/getLocalStorage";
// import { allArtists } from "../../../helpers/allArtists";
import { BasicInfoForm } from "./BasicInfoForm";
import { SimpleResume } from "../../ui/SimpleResume";
import { infoFormSimple } from "../../../actions/post";

export const BasicInfo = () => {

    const { msgError, isAlbum, msg } = useSelector( state => state.ui);

    const { simpleData, simpleDataSong, started } = useMemo(() => getLocalStorage( isAlbum ), [ isAlbum ])
    
    const { simpleInfo = simpleData } = useSelector(state => state.simpleForm)
    
    const { info_basica } = simpleInfo;

    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    useEffect(() => {
        document.querySelector('body').classList.remove('overflow');
        dispatch( removeError() );
        dispatch( removeMsg() );
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
            window.scroll({ behavior:"smooth", top: 0, left: 0 });
            dispatch( setError('El idioma es requerido') );
            return false;
        } 
        else if ( info_basica.artista_principal.trim().length === 0) {
            window.scroll({ behavior:"smooth", top: 0, left: 0 });
            dispatch( setError('Dinos cual es el artista o banda principal') );
            return false;
        } else if ( info_basica.titulo_album.trim().length === 0) {
            window.scroll({ behavior:"smooth", top: 0, left: 0 });
            dispatch( setError('Dinos cual es el titulo del lanzamiento') );
            return false;
        } else if ( info_basica.fecha_lanzamiento.trim().length === 0) {
            window.scroll({ behavior:"smooth", top: 0, left: 0 });
            dispatch( setError('Dinos cual es la fecha del lanzamiento') );
            return false;
        } else if ( info_basica.artistas_secundarios.some(artista => artista.artista_secundario.trim().length === 0)) {
            window.scroll({ behavior:"smooth", top: 0, left: 0 });
            dispatch( setError('Completá todos los campos') );
            return false;
        }
        dispatch( removeError() );
        return true;
    }

    const handleClose = () => {
        dispatch( removeMsg() );
        document.querySelector('body').classList.remove('overflow');
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
                                    { 
                                        msg &&
                                            (
                                                <div className="msg_container">
                                                    <div className="help_msg animate__animated animate__slideInDown">
                                                        <div className="d-flex justify_rigth" onClick={ handleClose }>
                                                            <div className="close d-flex justify-center align-center">
                                                                X
                                                            </div>
                                                        </div>
                                                        { msg }
                                                    </div>
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
                    :null

                        // <SimpleResume isStarted={simpleData.simpleStarted}/>

            }

        </div>
    )
}
