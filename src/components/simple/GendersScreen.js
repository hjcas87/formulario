import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { infoFormSimple } from "../../actions/post";
import { removeError, setError } from "../../actions/ui";
import { getLocalStorage } from "../../helpers/getLocalStorage";


import { useForm } from "../../hooks/useForm";

    

export const GendersScreen = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { msgError } = useSelector(state => state.ui)
    
    const { simpleData } = getLocalStorage();
    
    const { generoYLocalizacion } = simpleData;
    
    const { genero_1, genero_2, localizacion, artista_similar_1, artista_similar_2, artista_similar_3, } = generoYLocalizacion;

    const [ formValues, handleInputChange ] = useForm({
        genero_1,
        genero_2,
        localizacion,
        artista_similar_1,
        artista_similar_2,
        artista_similar_3,
    })
    
    useEffect(() => {
        dispatch( infoFormSimple( simpleData ) )
    }, [])
    
    const handleClick = (e) => {
        e.preventDefault();
        simpleData.generoYLocalizacion = formValues;
        if ( isFormValid() ) {
            localStorage.setItem( 'simpleInfo', JSON.stringify( simpleData ) );
            navigate( '/simple/isrc' );
        }
    }

    const isFormValid = () => {

        for (const input in formValues) {
            if ( formValues[input].trim().length === 0 ) {
                window.scroll({ top: 0, left: 0, behavior: 'smooth' });
                dispatch( setError('Por favor completá todos los campos') );
                return false
            } else {
                dispatch( removeError() );
                return true
            }
        }
    }

    

    return (
        <div className="main-container">
            <div className="text-secondary text-center animate__animated animate__fadeIn">
                <div className="mt-7">

                    <h2>Género Musical</h2>
                    <p>Decinos dos generos musicales con los cuales identifiques tu musica</p>
                    <div className="d-flex flex-column p-2">

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
                            className="form-control"
                            id="genero_1"
                            name="genero_1" 
                            value={ formValues.genero_1 }
                            onChange={ handleInputChange }
                        />
                    </div>    
                    <div className="d-flex flex-column p-2">
                        <label htmlFor="genero_2" className="mb-1 mt-1">Género Nº2</label>
                        <input
                            type="text"
                            className="form-control"
                            id="genero_2"
                            name="genero_2"
                            value={ formValues.genero_2 }
                            onChange={ handleInputChange }
                        />
                    </div>    
                    
                    <h2>Localización</h2>
                        
                    <p>De donde es la banda o artista?</p>
                    <div className="d-flex flex-column p-2">
                        <input
                            type="text"
                            className="form-control"
                            id="localizacion"
                            name="localizacion"
                            value={ formValues.localizacion }
                            onChange={ handleInputChange }
                        />
                    </div>
                    
                    <h2>Artistas Similares</h2>
                        
                    <p>Decinos tres artistas con los cuales te identifiques</p>
                    <div className="d-flex flex-column p-2">
                        <label htmlFor="artista_similar_1" className="mb-1 mt-1">Artista nº1</label>
                        <input
                            type="text"
                            className="form-control"
                            id="artista_similar_1"
                            name="artista_similar_1"
                            value={ formValues.artista_similar_1 }
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div className="d-flex flex-column p-2">
                        <label htmlFor="artista_similar_2" className="mb-1 mt-1">Artista nº2</label>
                        <input
                            type="text"
                            className="form-control"
                            id="artista_similar_2"
                            name="artista_similar_2"
                            value={ formValues.artista_similar_2 }
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div className="d-flex flex-column p-2">
                        <label htmlFor="artista_similar_3" className="mb-1 mt-1">Artista nº3</label>
                        <input
                            type="text"
                            className="form-control"
                            id="artista_similar_3"
                            name="artista_similar_3"
                            value={ formValues.artista_similar_3 }
                            onChange={ handleInputChange }
                        />
                    </div>

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
