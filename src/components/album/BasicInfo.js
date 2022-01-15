import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";


import { infoFormAlbum, infoFormAlbumAllArtists } from "../../actions/post";
import { useDinamicForm } from "../../hooks/useDinamicForm";
import { useForm } from "../../hooks/useForm";
import { Sidebar } from "./Sidebar";
import { removeError, setError } from "../../actions/ui";
import { getArtistForSpotify } from "../../actions/get";
import { getLocalStorage } from "../../helpers/getLocalStorage";
import { isObjEmpty } from "../../helpers/validates";
import { allArtists } from "../../helpers/allArtists";
import { InputsFields } from "../ui/InputsFields";
import { HelpItem } from "../ui/HelpItem";
import { BasicInfoForm } from "./BasicInfoForm";

let arr = [];


export const BasicInfo = () => {

    const [counter, setCounter] = useState(false)
        
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    
    const { msgError } = useSelector( state => state.ui);
  
    const { data, dataSong } = useMemo(() => getLocalStorage(counter), [counter]);

    const artistas = useMemo(() => allArtists( data, dataSong ), [ data, dataSong ]);

    useEffect(() => {
        dispatch( removeError() )
    }, [])
    
    useEffect(() => {
        
        dispatch( infoFormAlbum( data ));

    }, [artistas]);

    useEffect(() => {

        dispatch( infoFormAlbumAllArtists( artistas ))

    }, [artistas]);
    
    
    useEffect(() => {
        
        dispatch( getArtistForSpotify( artistas ))
        
    }, [artistas]);
    

 


  
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if ( isAlbumScreenValid() ) {
    //         formValues.artistas_secundarios = artistasSecundarios;
            // dispatch( infoFormAlbum( formValues ) );
    //         setCounter( !counter )
    //         localStorage.setItem( 'basicInfo', JSON.stringify(formValues) );
    //         animationScreenNavigate();
    //     }

    // };

    // const animationScreenNavigate = () => {
    //     const screen = document.querySelector('#basic_info');
    //     screen.classList.remove('animate__fadeIn');
    //     screen.classList.add('animate__fadeOutLeft', 'animate__faster');
    //     screen.addEventListener('animationend', () => {
            
    //         navigate( '/album/upc' );
        
    //     });
    // };


    // const isAlbumScreenValid = () => {

    //     if ( idioma.trim().length === 0) {
    //         dispatch( setError('El idioma es requerido') );
    //         return false;
    //     } 
    //     else if ( artista_principal.trim().length === 0) {
    //         dispatch( setError('Dinos cual es el artista o banda principal') );
    //         return false;
    //     } else if ( titulo_album.trim().length === 0) {
    //         dispatch( setError('Dinos cual es el titulo del lanzamiento') );
    //         return false;
    //     } else if ( fecha_lanzamiento.trim().length === 0) {
    //         dispatch( setError('Dinos cual es la fecha del lanzamiento') );
    //         return false;
    //     } else if ( artistasSecundarios.some(artista => artista.artista_secundario.trim().length === 0)) {
    //         dispatch( setError('Completá todos los campos') );
    //         return false;
    //     }
    //     dispatch( removeError() );
    //     return true;
    // }

    return (
        <div className="main-container">

            <div className="text-secondary text-center animate__animated animate__fadeIn" id="basic_info">
                
                <div className="py-5 mt-5">
                <h1 className="text-center text-white">Álbum</h1>
                <h2 className="text-center text-white">Informacion Básica</h2>
                <div className="col-auto">
                    { 
                        msgError &&
                            (
                                <div className="error">
                                    { msgError }
                                </div>
                            )
                    }
                

                <BasicInfoForm data={ data }/>
                    
                    
                    <button 
                        // onClick={ handleSubmit }
                        className="btn mt-3"
                    >
                        Guardar y continuar
                    </button>
                    
                </div>
                </div>
            </div>

            {
                // !isObjEmpty( data ) && <div className="fill"></div>
            }
            {/* <Outlet /> */}
        </div>
    )
}
