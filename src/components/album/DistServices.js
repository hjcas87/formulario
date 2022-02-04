import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeError, removeMsg, setError } from "../../actions/ui";
import { getLocalStorage } from "../../helpers/getLocalStorage";
import { useForm } from "../../hooks/useForm";

export const DistServices = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { msgError } = useSelector(state => state.ui)

    const { data } = getLocalStorage();

    const { opciones_distribucion } = data;

    const [ formValues, handleInputChange ] = useForm({
        opciones_distribucion
    });
    useEffect(() => {
        window.scroll({ top: 0, left: 0 });
        document.querySelector('body').classList.remove('overflow');
        dispatch( removeError() );
        dispatch( removeMsg() );
    }, [])
    
    const handleClick = (e) => {
        e.preventDefault();
        if ( isFormValid() ) {
            data.opciones_distribucion = formValues.opciones_distribucion;
            localStorage.setItem( 'albumInfo', JSON.stringify( data ) );
            animationScreenNavigate();
        }
    }
    
    const animationScreenNavigate = () => {
        const screen = document.querySelector('#info-screen');
        screen.classList.remove('animate__fadeInRight');
        screen.classList.add('animate__fadeOutLeft', 'animate__faster');
        screen.addEventListener('animationend', () => {
            
            navigate( '/album/artist' );
        
        });
    };

    const isFormValid = () => {
        if ( formValues.opciones_distribucion.trim().length === 0 ) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
            dispatch( setError('Por favor decinos que opción de distribución querés') );
            return false
        }
        dispatch( removeError() );
        return true
    }


    return (
        <div className="main-container">
            <div className="text-secondary text-center animate__animated animate__fadeIn" id="info-screen">
                <div className="mt-7 p-2">
                    <h1 className="text-align-left">Álbum</h1>
                    <h2 className="text-align-left">Opciones de distribución</h2>
                    <hr />
                    { 
                        msgError &&
                            (
                                <div className="error">
                                    { msgError }
                                </div>
                            )
                    }
                    <div className="d-flex g-1 align-center mt-3">
                        <input
                            type="radio"
                            className="radio__field"
                            id="descargas_y_streaming"
                            name="opciones_distribucion"
                            value="Descargas y streaming"
                            checked={ formValues.opciones_distribucion === 'Descargas y streaming' }
                            onChange={ handleInputChange }
                        />
                        <label htmlFor="descargas_y_streaming" className="text-white">Servicios de Descargas + Streaming</label>
                    </div>
                    <p className="text-align-left m-0">Incluye todas las plataformas de descargas, además los servicios de streaming tales como: 
                    Spotify, Apple Music, Pandora, YouTube Music, Deezer y otros.</p>
                    <div className="d-flex g-1 align-center mt-3">
                        <input
                            type="radio"
                            className="radio__field"
                            id="solo_descargas"
                            name="opciones_distribucion"
                            value="Solo descargas"
                            checked={ formValues.opciones_distribucion === 'Solo descargas' }
                            onChange={ handleInputChange }
                        />
                        <label htmlFor="solo_descargas" className="text-white">Solo descargas</label>
                    </div>    
                    <p className="text-align-left m-0">Incluye solamente las tiendas que venden descargas de tu música y no los servicios de streaming que provean a los 
                    usuarios el acceso a las pistas que no hayan comprado o no les hayan pertenecido antes. 
                    Esto no incluirá servicios como Spotify, Youtube, o Apple Music.</p>  
                    <div className="d-flex g-1 align-center mt-3">
                        <input
                            type="radio"
                            className="radio__field"
                            id="todos"
                            name="opciones_distribucion"
                            value="Todos, incluso los que no sean de pago"
                            checked={ formValues.opciones_distribucion === 'Todos, incluso los que no sean de pago' }
                            onChange={ handleInputChange }
                        />
                        <label htmlFor="todos" className="text-white">Todos, incluso los que no sean de pago.</label>
                    </div>   
                    <p className="text-align-left m-0">Incluye lugares que ofrecen descargas y transmisiones gratuitas.</p> 

                    <hr className="mt-3"/>
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

