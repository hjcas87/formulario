import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import { getArtistForSpotify } from "../../actions/get";
import { infoFormAlbumAllArtists } from "../../actions/post";
import { JustSongs, songObjet } from "../../helpers/albumsWithSongsAndId";
import { allArtists } from "../../helpers/allArtists";
import { useForm } from "../../hooks/useForm";


export const IsrcCodes = () => {

    
    const dispatch = useDispatch()
    // const { post, postSongs} = useSelector(state => state.form);
    const { post, postSongs = [] } = useSelector(state => state.form)
    let data = JSON.parse(localStorage.getItem('albumFormValues')) || [[]];
    const canciones = JustSongs( data, postSongs )
    const navigate = useNavigate();

    const artistas = allArtists( post, postSongs )

    useEffect(() => {
        
        dispatch( infoFormAlbumAllArtists( artistas ) )
        
    }, [])

    useEffect(() => {
        
        dispatch( getArtistForSpotify( artistas ) )
        
    }, [])
    
    const [ values, handleInputChange ] = useForm({
        codigo_ISRC: '',
    })
    const { codigo_ISRC } = values;
    
    const codigos = songObjet(canciones)
    const [ value, changes ] = useForm( codigos )
    // const { codigo_ISRC } = values;
    

    console.log(value)



    console.log(canciones)
    const handleClick = (e) => {
        e.preventDefault();
        navigate( '/distribution' )
    }


    return (
        <div>
            <div className="titulo__seccion">
                <h3>Códigos ISRC</h3>
            </div>
            <p>El ISRC es un código identificativo único para cada canción de un álbum. 
            Como un código de barras, los ISRC son necesarios para la distribución digital.</p>
            <div className="radio">
                <input
                    type="radio"
                    className="radio__field"
                    id="necesito_isrc"
                    name="codigo_ISRC"
                    value="necesito_isrc" 
                    checked={ codigo_ISRC === 'necesito_isrc' }
                    onChange={ handleInputChange }
                />
                <label htmlFor="necesito_isrc" className="radio__label negrita-medium">Necesito que asignen los códigos ISRC</label>
            </div>
            <div className="radio">
                <input
                    type="radio"
                    className="radio__field"
                    id="no_necesito_isrc"
                    name="codigo_ISRC"
                    value="no_necesito_isrc"
                    checked={ codigo_ISRC === 'no_necesito_isrc' }
                    onChange={ handleInputChange } 
                />
                <label htmlFor="no_necesito_isrc" className="radio__label negrita-medium">Tengo mis propios códigos</label>
            </div>

            <div>
                {
                    codigo_ISRC === 'no_necesito_isrc' && 
                    canciones.map( (cancion, i) => (
                        <div key={ i }>
                           <p> {cancion.nombre} </p>
                            <input
                                type="text"
                                name={ `codigo_${i+1}` }
                                value={ value.codigos }
                                onChange={ changes }
                            />
                        </div>
                    
                ))
                }
            </div>

            <button onClick={ handleClick }>
                Continuar
            </button>
        </div>
    )
}
