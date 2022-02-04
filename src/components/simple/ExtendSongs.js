import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { infoFormSimple } from '../../actions/post';
import { removeError, removeMsg, setError } from '../../actions/ui';
import { getLocalStorage } from '../../helpers/getLocalStorage';
import { useForm } from '../../hooks/useForm';

export const ExtendSongs = () => {

    const dispatch = useDispatch();

    const { msgError } = useSelector(state => state.ui);

    const navigate = useNavigate();
    
    const { simpleData, simpleData: { canciones_extendidas } } = getLocalStorage();

    const { cancion_extendida, solo_album } = canciones_extendidas;

    console.log(canciones_extendidas)

    const [ formValues, handleInputChange ] = useForm({
        cancion_extendida,
        solo_album
    })
    useEffect(() => {
        window.scroll({ top: 0, left: 0 });
        document.querySelector('body').classList.remove('overflow');
        dispatch( removeError() );
        dispatch( removeMsg() );
    }, [])
    useEffect(() => {
        dispatch( infoFormSimple( simpleData ) )
    }, [])
    // console.log(values)

    const handleClick = (e) => {
        e.preventDefault();
        if ( isFormValid() ) {
            simpleData.canciones_extendidas = formValues;
            localStorage.setItem( 'simpleInfo', JSON.stringify( simpleData ) );
            navigate( '/resume' );            
        }
    }

    
    const isFormValid = () => {

        for (const input in formValues) {
            if ( formValues[input].trim().length === 0 ) {
                dispatch( setError('Por favor completá todos los campos') );
                return false
            } else if ( formValues[input] === "si" ){
                if ( formValues.solo_album.trim().length === 0 ) {
                    dispatch( setError('Elegi una opción por favor') );
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
            <div className="mt-5 p-2">
                <h2>Canciones Extendidas</h2>
            <p className="text-white">¿Tenes alguna canción que dure 10 o más minutos?</p>
                { 
                    msgError &&
                        (
                            <div className="error">
                                { msgError }
                            </div>
                        )
                }
            <div className="d-flex justify-center mb-5">
                <div>
                    <div className="d-flex align-center g-1">
                        <input
                            type="radio"
                            className="radio__field"
                            id="no_tengo_cancion_ext"
                            name="cancion_extendida"
                            checked={ formValues.cancion_extendida === 'no' }
                            value="no"
                            onChange={ handleInputChange }
                        />
                        <label htmlFor="no_tengo_cancion_ext" className="radio__label negrita-medium">No</label>
                    </div>  
                    <div className="d-flex align-center g-1">
                        <input
                            type="radio"
                            className="radio__field"
                            id="si_tengo_cancion_ext"
                            name="cancion_extendida"
                            checked={ formValues.cancion_extendida === 'si' }
                            value="si"
                            onChange={ handleInputChange }
                        />
                        <label htmlFor="si_tengo_cancion_ext" className="radio__label negrita-medium">Si</label>
                    </div>
                </div>
            </div>

            {
                formValues.cancion_extendida === 'si' &&
                <div className="animate__animated animate__fadeInUp">
                    <p className="text-align-left text-white mb-5">Algunas plataformas digitales ofrecen una función de "solo álbum" para canciones extendidas de más de 10 minutos.<br/>
                    Si optas por vender tus canciones extendidas en "solo álbum", las plataformas elegibles harán que tu canción extendida 
                    esté disponible SOLO como parte de una descarga de álbum completo. <br/>
                    Sin embargo, elegir esta opción hace que tu álbum no sea elegible para su distribución en los servicios de transmisión y 
                    su monetización en YouTube.<br/>
                    Nota: Apple Music convierte automáticamente todas las canciones de más de 10 minutos en canciones para "solo álbum", 
                    independientemente de la selección que hagas aquí.</p>
                    <div className="d-flex justify-center mb-5">
                        <div>
                            <div className="d-flex align-top g-1 mb-1">
                                <input
                                    type="radio"
                                    className="mt-1"
                                    id="solo_album"
                                    name="solo_album"
                                    checked={ formValues.solo_album === 'no_solo_album' }
                                    value="no_solo_album"
                                    onChange={ handleInputChange }
                                />
                                <label htmlFor="solo_album" className="text-align-left">Hacer que las canciones extendidas estén disponibles para descargas y transmisiones con precio predeterminado.</label>
                            </div>  
                            <div className="d-flex align-top g-1">
                                <input
                                    type="radio"
                                    className="mt-1"
                                    id="no_solo_album"
                                    name="solo_album"
                                    checked={ formValues.solo_album === 'si_solo_album' }
                                    value="si_solo_album"
                                    onChange={ handleInputChange }
                                />
                                <label htmlFor="no_solo_album" className="text-align-left">Hacer que las canciones extendidas estén disponibles para "solo álbum" y no distribuir esta versión a los servicios de transmisión.</label>
                            </div>
                        </div>
                    </div>
                </div>
            }
            
            
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
