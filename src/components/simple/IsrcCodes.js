import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { infoFormSimple } from "../../actions/post";
import { removeError, removeMsg, setError } from "../../actions/ui";
// import { songObject } from "../../helpers/albumsWithSongsAndId";

import { getLocalStorage } from "../../helpers/getLocalStorage";
import { songObject } from "../../helpers/songObject";
import { useForm } from "../../hooks/useForm";


export const IsrcCodes = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { msgError } = useSelector(state => state.ui)

    const { simpleData, simpleData: { cancion } } = getLocalStorage();
    const { ISRC, ISRC: { codigo_ISRC, num_codigo } } = simpleData;
    const codigos = useMemo(() => songObject([cancion], num_codigo), [cancion, num_codigo]);

    // const [ formValues, handleInputChange ] = useForm({
    //     codigo_ISRC,
    //     num_codigo
    // })

    useEffect(() => {
        dispatch( infoFormSimple( simpleData ) );
        document.querySelector('body').classList.remove('overflow');
        dispatch( removeError() );
        dispatch( removeMsg() );
    }, [])
    

    const [ formValues, handleInputChange ] = useForm({
        codigo_ISRC
    })
    

    const [ values, setValues ] = useState(codigos)

    const changes = ( { target } , index ) => {
        const newData = values.map(( field, i ) => {
            if (index === i) {
                field[target.name] = target.value;
            }
            return field;
        });
        setValues([...newData]);
    };

    const isFormValid = () => {

        if ( formValues.codigo_ISRC.trim().length === 0 ) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
            dispatch( setError('Por favor completá todos los campos') );
            return false
        } else if ( formValues.codigo_ISRC === "no_necesito_isrc" ){
            if ( formValues.num_codigo.some( cancion => Object.values(cancion)[0].trim().length === 0 )) {
                window.scroll({ top: 0, left: 0, behavior: 'smooth' });
                dispatch( setError('El número de código no puede ir vacio') );
                return false
            }
        }
        dispatch( removeError() );
        return true
        
    }


    // console.log(canciones)
    const handleSubmit = (e) => {
        e.preventDefault();
        formValues.num_codigo = values;
        if (isFormValid()) {
            simpleData.ISRC = formValues
            localStorage.setItem( 'simpleInfo', JSON.stringify( simpleData ) );
            navigate( '/album/distribution' )
        }
    }


    return (
        <div className="main-container">
            <div className="text-secondary text-center animate__animated animate__fadeIn">
                <div className="py-5 mt-5">
                
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
                    { formValues.codigo_ISRC === 'no_necesito_isrc' && values.length <= 0 && 
                        <p className="text-align-left">Aún no has agregado canciones a tú lanzamiento.</p>}
                {
                    formValues.codigo_ISRC === 'no_necesito_isrc' && 
                        values.map( (cancion, x) => (
                            <div key={ cancion + x }>
                                <p className="text-align-left"> {Object.keys(values[x])[0]} </p>
                                <input
                                    type="text"
                                    className="form-control"
                                    name={ Object.keys(values[x])[0] }
                                    value={ Object.values(values[x])[0] }
                                    onChange={ (e) => changes(e, x) }
                                />
                            </div>
                        ))
                }
            </div>

                    <button 
                        className="btn mt-5"
                        onClick={ handleSubmit }
                    >
                        Guardar y continuar
                    </button>
                </div>
            </div>
        </div>
    )
}
