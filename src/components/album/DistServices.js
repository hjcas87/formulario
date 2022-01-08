import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";

export const DistServices = () => {


    
    const navigate = useNavigate();
    const [ values, handleInputChange ] = useForm({
        opcion_plataforma: '',
    })
    const { opcion_plataforma } = values;

    console.log(values)
    const handleClick = (e) => {
        e.preventDefault();
        navigate( '/album/artist' )
    }

    


    return (
        <div>
            <div className="titulo__seccion"><h3>Opciones de distribución</h3></div>
            <div className="radio">
                <input
                    type="radio"
                    className="radio__field"
                    id="descargas_y_streaming"
                    name="opcion_plataforma"
                    value="descargas_y_streaming"
                    checked={ opcion_plataforma === 'descargas_y_streaming' }
                    onChange={ handleInputChange }
                />
                <label htmlFor="descargas_y_streaming" className="radio__label negrita-medium">Servicios de Descargas + Streaming</label>
            </div>
            <p>Incluye todas las plataformas de descargas, además los servicios de streaming tales como: 
            Spotify, Apple Music, Pandora, YouTube Music, Deezer y otros.</p>
            <div className="radio">
                <input
                    type="radio"
                    className="radio__field"
                    id="solo_descargas"
                    name="opcion_plataforma"
                    value="solo_descargas"
                    checked={ opcion_plataforma === 'solo_descargas' }
                    onChange={ handleInputChange }
                />
                <label htmlFor="solo_descargas" className="radio__label negrita-medium">Solo descargas</label>
            </div>    
            <p>Incluye solamente las tiendas que venden descargas de tu música y no los servicios de streaming que provean a los 
            usuarios el acceso a las pistas que no hayan comprado o no les hayan pertenecido antes. 
            Esto no incluirá servicios como Spotify, Youtube, o Apple Music.</p>  
            <div className="radio">
                <input
                    type="radio"
                    className="radio__field"
                    id="todos"
                    name="opcion_plataforma"
                    value="todos"
                    checked={ opcion_plataforma === 'todos' }
                    onChange={ handleInputChange }
                />
                <label htmlFor="todos" className="radio__label negrita-medium">Todos, incluso los que no sean de pago.</label>
            </div>   
            <p>Incluye lugares que ofrecen descargas y transmisiones gratuitas.</p> 

            <button onClick={ handleClick }>
                Continuar
            </button>
        </div>
    )
}
