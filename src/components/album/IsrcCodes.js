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
    // const { post, albumsAndSongsValues} = useSelector(state => state.form);
    const { post = {}, albumsAndSongsValues = [] } = useSelector(state => state.form)
    let data = JSON.parse(localStorage.getItem('albumFormValues')) || [[]];
    const canciones = JustSongs( data, albumsAndSongsValues )
    const navigate = useNavigate();

    const artistas = allArtists( post, albumsAndSongsValues )

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
    

    // console.log(value)



    // console.log(canciones)
    const handleClick = (e) => {
        e.preventDefault();
        navigate( '/album/distribution' )
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
                            <div className="d-flex align-center g-1">
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
                            <div className="d-flex align-center g-1">
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
                        </div>
                    </div>
                <div>
                    { codigo_ISRC === 'no_necesito_isrc' && 
                        <p>Si necesitas un código ISRC para alguna canción en particular dejá el espacio en blanco y nosotros te lo asignamos.</p>}
                {
                    codigo_ISRC === 'no_necesito_isrc' && 
                    canciones.map( (cancion, i) => (
                        <div key={ i } className="animate__animated animate__fadeInUp">
                           <p> {cancion.nombre} </p>
                            <input
                                type="text"
                                className="form-control"
                                name={ `codigo_${i+1}` }
                                value={ value.codigos }
                                onChange={ changes }
                            />
                        </div>
                    
                ))
                }
            </div>

                    <button 
                        className="btn mt-5"
                        onClick={ handleClick }
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </div>
    )
}
