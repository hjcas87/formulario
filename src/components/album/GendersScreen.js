import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { infoFormAlbum, infoFormSimple } from "../../actions/post";
import { changeResume, removeError, removeMsg, setError } from "../../actions/ui";
import { getLocalStorage } from "../../helpers/getLocalStorage";


import { useForm } from "../../hooks/useForm";

    

export const GendersScreen = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    let { pathname } = useLocation();
    
    const rute = useMemo(() => pathname.includes('album'), [pathname]);

    const { msgError } = useSelector(state => state.ui);
    
    const { data, simpleData } = useMemo(() => getLocalStorage(rute), [rute]);

    const { generoYLocalizacion } = rute ? data : simpleData;
    
    const { genero_1, genero_2, localizacion, artista_similar_1, artista_similar_2, artista_similar_3, } = generoYLocalizacion;

    const [ formValues, handleInputChange ] = useForm({
        genero_1,
        genero_2,
        localizacion,
        artista_similar_1,
        artista_similar_2,
        artista_similar_3,
    });
    
    useEffect(() => {
        rute ? dispatch( infoFormAlbum( data ) ) : dispatch( infoFormSimple( simpleData ) );
        dispatch( changeResume( rute ) );
    }, [])
    
    useEffect(() => {
        window.scroll({ top: 0, left: 0 })
        document.querySelector('body').classList.remove('overflow');
        dispatch( removeError() );
        dispatch( removeMsg() );
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        rute ? ( data.generoYLocalizacion = formValues ) : ( simpleData.generoYLocalizacion = formValues );
        if ( isFormValid() ) {
            rute 
                ? 
                    localStorage.setItem( 'albumInfo', JSON.stringify( data ) )
                :
                    localStorage.setItem( 'simpleInfo', JSON.stringify( simpleData ) );

            animationScreenNavigate();
        }
    }
    
    const animationScreenNavigate = () => {
        const screen = document.querySelector('#info-screen');
        screen.classList.remove('animate__fadeInRight');
        screen.classList.add('animate__fadeOutLeft', 'animate__faster');
        screen.addEventListener('animationend', () => {
            rute 
                ?
                    navigate( '/album/isrc' )
                :
                    navigate( '/simple/isrc' )
        
        });
    };
    const isFormValid = () => {
        console.log(Object.values(formValues))
        if ( Object.values(formValues).some( value => value.trim().length === 0) ) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
            dispatch( setError('Por favor completá todos los campos') );
            return false
        } else {
            dispatch( removeError() );
            return true
        }
        
    }

    return (
        <div className="main-container">
            <div className="text-secondary text-center animate__animated animate__fadeIn" id="info-screen">
                <div className="py-5 mt-5">
                    <h1 className="text-align-left mb-0">{ rute ? 'Álbum' : 'Simple' }</h1>
                    <h2 className="text-align-left">Género Musical</h2>
                    <hr />
                    <p className="text-align-left">Decinos dos generos musicales con los cuales identifiques tu música</p>
                    <div className="d-flex flex-column text-align-left">
                        { 
                            msgError &&
                                (
                                    <div className="error">
                                        { msgError }
                                    </div>
                                )
                        }
                        <label htmlFor="genero_1" className="mb-1 mt-1">Género Nº1</label>
                        <input
                            type="text"
                            autoComplete="off"
                            className="form-control"
                            id="genero_1"
                            name="genero_1" 
                            value={ formValues.genero_1 }
                            onChange={ handleInputChange }
                        />
                    </div>    
                    <div className="d-flex flex-column mt-3 text-align-left">
                        <label htmlFor="genero_2" className="mb-1 mt-1">Género Nº2</label>
                        <input
                            type="text"
                            autoComplete="off"
                            className="form-control"
                            id="genero_2"
                            name="genero_2"
                            value={ formValues.genero_2 }
                            onChange={ handleInputChange }
                        />
                    </div>    
                    
                    <h2 className="text-align-left">Localización</h2>
                    <hr />
                        
                    <p className="text-align-left">De donde es la banda o artista?</p>
                    <div className="d-flex flex-column mt-3">
                        <input
                            type="text"
                            autoComplete="off"
                            className="form-control"
                            id="localizacion"
                            name="localizacion"
                            value={ formValues.localizacion }
                            onChange={ handleInputChange }
                        />
                    </div>
                    
                    <h2 className="d-flex flex-column mt-3 text-align-left">Artistas Similares</h2>
                    <hr />
                        
                    <p className="d-flex flex-column mt-3 text-align-left">Decinos tres artistas con los cuales te identifiques</p>
                    <div className="d-flex flex-column mt-3 text-align-left">
                        <label htmlFor="artista_similar_1" className="mb-1 mt-1">Artista nº1</label>
                        <input
                            type="text"
                            autoComplete="off"
                            className="form-control"
                            id="artista_similar_1"
                            name="artista_similar_1"
                            value={ formValues.artista_similar_1 }
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div className="d-flex flex-column mt-3 text-align-left">
                        <label htmlFor="artista_similar_2" className="mb-1 mt-1">Artista nº2</label>
                        <input
                            type="text"
                            autoComplete="off"
                            className="form-control"
                            id="artista_similar_2"
                            name="artista_similar_2"
                            value={ formValues.artista_similar_2 }
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div className="d-flex flex-column mt-3 mb-5 text-align-left">
                        <label htmlFor="artista_similar_3" className="mb-1 mt-1">Artista nº3</label>
                        <input
                            type="text"
                            autoComplete="off"
                            className="form-control"
                            id="artista_similar_3"
                            name="artista_similar_3"
                            value={ formValues.artista_similar_3 }
                            onChange={ handleInputChange }
                        />
                    </div>
                    <hr />
                    <button 
                        className="btn mt-5 mb-5"
                        onClick={ handleClick }
                    >
                        Guardar y continuar
                    </button>
                </div>
            </div>

        </div>
    )
}
