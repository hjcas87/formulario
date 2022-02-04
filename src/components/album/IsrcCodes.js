import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { infoFormAlbum, infoFormSimple } from "../../actions/post";

import { changeResume, removeError, removeMsg, setError } from "../../actions/ui";
import { getLocalStorage } from "../../helpers/getLocalStorage";
import { songObject } from "../../helpers/songObject";
import { useForm } from "../../hooks/useForm";


export const IsrcCodes = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    let { pathname } = useLocation();
    
    const rute = useMemo(() => pathname.includes('album'), [pathname]);
    
    const { msgError } = useSelector(state => state.ui);

    const { data, simpleData } = useMemo(() => getLocalStorage(rute), [rute]);

    const { albumsYCanciones, ISRC } = rute ? data : simpleData;

    const { codigo_ISRC, num_codigo } = ISRC;

    const codigos = useMemo(() => songObject(albumsYCanciones, num_codigo), [albumsYCanciones, num_codigo]);
    console.log(albumsYCanciones);

    useEffect(() => {
        rute ? dispatch( infoFormAlbum( data ) ) : dispatch( infoFormSimple( simpleData ) );
        dispatch( changeResume( rute ) );
    }, [])
    
    useEffect(() => {
        window.scroll({ top: 0, left: 0 });
        document.querySelector('body').classList.remove('overflow');
        dispatch( removeError() );
        dispatch( removeMsg() );
    }, [])
    
    const [ formValues, handleInputChange ] = useForm({
        codigo_ISRC
    });    

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

    const handleSubmit = (e) => {
        e.preventDefault();
        formValues.num_codigo = values;
        if (isFormValid()) {
            data.ISRC = formValues
            localStorage.setItem( 'albumInfo', JSON.stringify( data ) );
            animationScreenNavigate();
        }
    }
    
    const animationScreenNavigate = () => {
        const screen = document.querySelector('#info-screen');
        screen.classList.remove('animate__fadeIn');
        screen.classList.add('animate__fadeOutLeft', 'animate__faster');
        screen.addEventListener('animationend', () => {
            
            navigate( '/album/distribution' )
        
        });
    };


    return (
        <div className="main-container">
            <div className="text-secondary text-center animate__animated animate__fadeIn" id="info-screen">
                <div className="py-5 mt-5">
                    <h1 className="text-align-left">{ rute ? 'Álbum' : 'Simple' }</h1>
                    <h2 className="text-align-left">Códigos ISRC</h2>
                    <hr />
                
                    <p className="text-white text-align-left">El ISRC es un código identificativo único para cada canción de un álbum. 
                    Como un código de barras, los ISRC son necesarios para la distribución digital.</p>
                    <div className="d-flex mb-5">
                        <div>
                        { 
                            msgError &&
                                (
                                    <div className="error">
                                        { msgError }
                                    </div>
                                )
                        }
                            <div className="d-flex align-center g-1 mt-3">
                                <input
                                    type="radio"
                                    className="radio__field"
                                    id="necesito_isrc"
                                    name="codigo_ISRC"
                                    value="necesito_isrc" 
                                    checked={ formValues.codigo_ISRC === 'necesito_isrc' }
                                    onChange={ handleInputChange }
                                    onClick={ () => setValues([]) }
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
                                    onClick={ () => setValues(codigos) }
                                />
                                <label htmlFor="no_necesito_isrc" className="radio__label negrita-medium">Tengo mis propios códigos</label>
                            </div>
                        </div>
                    </div>
                <div className="mb-5">
                    { formValues.codigo_ISRC === 'no_necesito_isrc' && values.length <= 0 && 
                        <p className="text-align-center">Aún no has agregado canciones a tú lanzamiento.</p>}
                    { formValues.codigo_ISRC === 'no_necesito_isrc' && values.length > 0 && 
                        <p className="text-align-left">Si necesitas un código ISRC para alguna canción en particular dejá el espacio en blanco y nosotros te lo asignamos.</p>}
                    {
                        formValues.codigo_ISRC === 'no_necesito_isrc' && 
                            values.map( (cancion, x) => (
                                <div 
                                    key={ cancion + x }
                                    className="animate__animated animate__fadeInUp"
                                >
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

                <hr />
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
