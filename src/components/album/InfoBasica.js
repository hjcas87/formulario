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

let arr = [];


export const InfoBasica = () => {

    const [counter, setCounter] = useState(false)
        
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    
    const { msgError } = useSelector( state => state.ui);
  
    const { data, dataSong } = useMemo(() => getLocalStorage(counter), [counter]);

    const artistas = useMemo(() => allArtists( data, dataSong ), [ data, dataSong ]);
    
    useEffect(() => {
        
        dispatch( infoFormAlbum( data ));

    }, [artistas]);

    useEffect(() => {

        dispatch( infoFormAlbumAllArtists( artistas ))

    }, [artistas]);
    
    
    useEffect(() => {
        
        dispatch( getArtistForSpotify( artistas ))
        
    }, [artistas]);
    

    const { idioma: lang, artista_principal: artist, titulo_album: title, fecha_lanzamiento: date, artistas_secundarios} = data;
 
    const [ artistasSecundarios, addInputField, deleteInputFields, changes ] = useDinamicForm( artistas_secundarios || [] )

    const [ formValues, handleInputChange ] = useForm({
        idioma: lang || '',
        artista_principal: artist || '',     
        titulo_album: title || '',
        fecha_lanzamiento: date || '',
    });

    const { idioma, artista_principal, titulo_album, fecha_lanzamiento } = formValues;

  
    const handleSubmit = (e) => {
        e.preventDefault();
        if ( isAlbumScreenValid() ) {
            formValues.artistas_secundarios = artistasSecundarios;
            dispatch( infoFormAlbum( formValues ) );
            setCounter( !counter )
            localStorage.setItem( 'basicInfo', JSON.stringify(formValues) );
            animationScreenNavigate();
        }

    };

    const animationScreenNavigate = () => {
        const screen = document.querySelector('#basic_info');
        screen.classList.remove('animate__fadeIn');
        screen.classList.add('animate__fadeOutLeft', 'animate__faster');
        screen.addEventListener('animationend', () => {
            
            navigate( '/album/upc' );
        
        });
    };


    const isAlbumScreenValid = () => {

        if ( idioma.trim().length === 0) {
            dispatch( setError('El idioma es requerido') );
            return false;
        } 
        else if ( artista_principal.trim().length === 0) {
            dispatch( setError('Dinos cual es el artista o banda principal') );
            return false;
        } else if ( titulo_album.trim().length === 0) {
            dispatch( setError('Dinos cual es el titulo del lanzamiento') );
            return false;
        } else if ( fecha_lanzamiento.trim().length === 0) {
            dispatch( setError('Dinos cual es la fecha del lanzamiento') );
            return false;
        } else if ( artistasSecundarios.some(artista => artista.artista_secundario.trim().length === 0)) {
            dispatch( setError('Completá todos los campos') );
            return false;
        }
        dispatch( removeError() );
        return true;
    }

    return (
        <div className="main-container">

            

            <div className="text-secondary px-4 py-5 text-center flex-fill animate__animated animate__fadeIn" id="basic_info">
                
                <div className="py-5">
                <h1 className="display-5 fw-bold text-white">Formulario-Álbum</h1>
                <h2 className="display-5 fw-ligth text-white">Informacion Básica</h2>
                <div className="col-auto mx-auto">
                <form className=" py-5">
                    { 
                        msgError &&
                            (
                                <div className="error">
                                    { msgError }
                                </div>
                            )
                    }
                    <div className="mb-3 d-flex ">
                        <div className="input_group">
                            <label htmlFor="idioma" className="col-form-label fs-2 col-form-label-lg ">Idioma del Álbum</label>
                            <input 
                                type="text"
                                autoComplete="off"
                                className="form-control fs-4"
                                name="idioma"
                                value={ idioma }
                                id="idioma"
                                onChange={ handleInputChange }
                            />
                        </div>
                        <div className="help-container">
                            <div className="help-item">
                                ?
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 d-flex flex-column flex-sm-column">
                        <div className="d-flex">
                            <div className="input_group d-flex flex-column">
                                <label htmlFor="nombre" className="col-form-label fs-2 col-form-label-lg">Nombre del Artista</label>
                                <div className="row g3 row-auto d-flex gap-1">
                                    <div className="col-10 col-auto align-self-center">
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className="form-control fs-4"
                                            name="artista_principal"
                                            value={ artista_principal }
                                            id="nombre"
                                            onChange={ handleInputChange }
                                        />
                                    </div>
                                    <div className="btn btn-outline-light col-sm-1 col-auto d-flex justify-content-center align-items-center fs-5 mt-3 ml-3 mb-3"
                                        onClick={ () => addInputField( 'artista_secundario' ) }
                                    >
                                        +
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="help-container">
                                <div className="help-item">
                                    ?
                                </div>
                            </div>
                        </div>
                        {
                            artistasSecundarios.map( (field, i) => (
                                <div key={ i } className="row g3 row-auto animate__animated animate__fadeInUp">
                                    <div className="input_group d-flex row row-auto gap-1">
                                        <div className="col-10 col-auto align-self-center">                                                
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control fs-4"
                                                name={ Object.keys( field ) }
                                                value={ Object.values( field ) }
                                                onChange={ (e) => changes(e, i) }
                                            /> 
                                        </div>
                                        <div className="btn btn-outline-light col-sm-1 col-auto d-flex justify-content-center align-items-center fs-5 mt-3 mb-3"
                                            onClick={ () => deleteInputFields(i)}
                                        >
                                            -
                                        </div>
                                    </div>                                    
                                </div>
                            ))
                        }
                    </div>
                        
                <div className="mb-3 d-flex">
                    <div className="input_group">
                        <label htmlFor="titulo_album" className="col-form-label fs-2 col-form-label-lg">Título del Álbum</label>
                        <input
                            type="text"
                            autoComplete="off"
                            className="form-control fs-4"
                            name="titulo_album"
                            value={ titulo_album }
                            id="titulo_album"
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div className="r">
                        <div className="">
                        </div>
                    </div>
                </div>

                <div className="mb-3 d-flex">
                    <div className="input_group">
                        <label htmlFor="fecha" className="col-form-label fs-2 col-form-label-lg">Fecha de Lanzamiento</label>
                        <input
                            type="date"
                            autoComplete="off"
                            className="form-control fs-4"
                            name="fecha_lanzamiento"
                            value={ fecha_lanzamiento }
                            id="fecha"
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div className="help-container">
                        <div className="help-item">
                            ?
                        </div>
                    </div>
                </div>

                    
                </form>
                    
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <button 
                        onClick={ handleSubmit }
                        className="btn btn-outline-info btn-lg px-4 fw-bold"
                    >
                        Guardar y continuar
                    </button>
                    </div>
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
