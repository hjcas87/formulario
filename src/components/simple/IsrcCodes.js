import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { infoFormSimple } from "../../actions/post";
import { removeError, setError } from "../../actions/ui";

import { getLocalStorage } from "../../helpers/getLocalStorage";
import { useForm } from "../../hooks/useForm";


export const IsrcCodes = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { msgError } = useSelector(state => state.ui)

    const { simpleData } = getLocalStorage();
    const { ISRC, ISRC: { codigo_ISRC, num_codigo } } = simpleData;
    
    const [ formValues, handleInputChange ] = useForm({
        codigo_ISRC,
        num_codigo
    })

    useEffect(() => {
        dispatch( infoFormSimple( simpleData ) )
    }, [])
    

    const handleClick = (e) => {
        e.preventDefault();
        if ( isFormValid () ) {
            ISRC.codigo_ISRC = formValues.codigo_ISRC;
            ISRC.num_codigo = formValues.num_codigo;
            localStorage.setItem( 'simpleInfo', JSON.stringify( simpleData ) )
            navigate( '/simple/distribution' )
        }
    }

    const isFormValid = () => {

        for (const input in formValues) {
            if ( formValues[input].trim().length === 0 ) {
                dispatch( setError('Por favor completá todos los campos') );
                return false
            } else if ( formValues[input] === "no_necesito_isrc" ){
                if ( formValues.num_codigo.trim().length === 0 ) {
                    dispatch( setError('El número de código no puede ir vacio') );
                    return false
                }
            }
            dispatch( removeError() );
            return true
        }
    }

    return (
        <div className="main-container">
            <div className="text-secondary text-center animate__animated animate__fadeIn">
                <div className="mt-7 p-2">
                
                    <h2>Códigos ISRC</h2>
                
                    <p className="text-white mb-5">El ISRC es un código identificativo único para cada canción de un álbum. 
                    Como un código de barras, los ISRC son necesarios para la distribución digital.</p>
                    <div className="d-flex justify-center mb-5">
                        <div>
                        { 
                            msgError &&
                                (
                                    <div className="error">
                                        { msgError }
                                    </div>
                                )
                        }
                            <div className="d-flex align-center g-1">
                                <input
                                    type="radio"
                                    className="radio__field"
                                    id="necesito_isrc"
                                    name="codigo_ISRC"
                                    value="necesito_isrc" 
                                    checked={ formValues.codigo_ISRC === 'necesito_isrc' }
                                    onChange={ handleInputChange }
                                />
                                <label htmlFor="necesito_isrc" className="radio__label negrita-medium">Necesito que asignen los códigos ISRC</label>
                            </div>
                            <div className="d-flex align-center g-1">
                                <input
                                    type="radio"
                                    className="radio__field"
                                    id="no_necesito_isrc"
                                    name="codigo_ISRC"
                                    value="no_necesito_isrc"
                                    checked={ formValues.codigo_ISRC === 'no_necesito_isrc' }
                                    onChange={ handleInputChange } 
                                />
                                <label htmlFor="no_necesito_isrc" className="radio__label negrita-medium">Tengo mis propios códigos</label>
                            </div>
                        </div>
                    </div>
                <div>

                    {
                        formValues.codigo_ISRC === 'no_necesito_isrc' && 

                            <div className="animate__animated animate__fadeInUp">
                            <h2 className="text-align-left"> {simpleData.titulo_album} </h2>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="num_codigo"
                                    value={ formValues.num_codigo }
                                    onChange={ handleInputChange }
                                />
                            </div>

                    }
                </div>

                    <button 
                        className="btn mt-5"
                        onClick={ handleClick }
                    >
                        Guardar y continuar
                    </button>
                </div>
            </div>
        </div>
    )
}
