import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { infoFormAlbum } from "../../../actions/post";
import { removeError, removeMsg, setError } from "../../../actions/ui";
import { getLocalStorage } from "../../../helpers/getLocalStorage";
import { BasicInfoForm } from "./BasicInfoForm";

export const BasicInfo = () => {
    
    const [bool, setBool] = useState(false)
    // // // console.log(bool)
    const { msgError, msg } = useSelector( state => state.ui);

    const { data } = useMemo(() => getLocalStorage( bool ), [ bool ])

    const { albumInfo = data } = useSelector(state => state.albumForm)

    const { info_basica } = albumInfo;
    // // console.log(state)
    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    useEffect(() => {
        window.scroll({ top: 0, left: 0 });
        document.querySelector('body').classList.remove('overflow');
        dispatch( removeError() );
        dispatch( removeMsg() );
    }, [])
    
    useEffect(() => {
        
        dispatch( infoFormAlbum( data ));

    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if ( isAlbumScreenValid() ) {
            localStorage.setItem( 'albumInfo', JSON.stringify(albumInfo) );
            setBool(true)
            animationScreenNavigate();
        }

    };

    const animationScreenNavigate = () => {
        const screen = document.querySelector('#info-screen');
        screen.classList.remove('animate__fadeIn');
        screen.classList.add('animate__fadeOutLeft', 'animate__faster');
        screen.addEventListener('animationend', () => {
            
            navigate( '/album/upc' );
        
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
                <div className="text-secondary text-align-left animate__animated animate__fadeIn" id="info-screen">
                    
                    <div className="py-5 mt-5">
                    <h1 className="text-align-left">Álbum</h1>
                    <h2 className="text-align-left">Informacion Básica</h2>
                    <hr />
                        <div>
                            { 
                                msgError &&
                                    (
                                        <div className="error">
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

                            <BasicInfoForm data={ data }/>
                            <hr />
                            
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

            }

        </div>
    )
}
