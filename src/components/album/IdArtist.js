import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getArtistForSpotify } from '../../actions/get';
import { infoFormAlbumAllArtists } from '../../actions/post';
import { allArtists, filterArtists } from '../../helpers/allArtists';
import { useFetchArtist } from '../../hooks/useFetchArtist';

let state = [];
export const IdArtist = () => {

    
    const dispatch = useDispatch()
    

    const { post = [], postSongs = [] } = useSelector(state => state.form)
    console.log(post)
    console.log(postSongs)

    const {spotifyArtists = [] } = useSelector(state => state.artists)
    // let { data, loading } = spotifyArtists;
    // // // console.log(spotifyArtists)
    // // console.log(spotifyArtists)
    // const { allArtists: allIdArtists } = useSelector(state => state.form)
    // console.log(allIdArtists)
    const artistas = allArtists( post, postSongs )
    console.log(artistas)
    const data = filterArtists( artistas, spotifyArtists )

    // useEffect(() => {
        
        // dispatch( infoFormAlbumAllArtists( artistas ) )
        
    // }, [])

    // useEffect(() => {
        
    //     loading = true
    //     dispatch( getArtistForSpotify( artistas ) )
        
    // }, [])


    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate( '/album/extended-songs' )
    }


    return (
        <div>
            <div className="titulo__seccion"><h3>IDS de Artista</h3></div>
            <p>Algunas plataformas (como Spotify y Apple Music) asignan un ID único a cada nombre de artista para agrupar 
            los lanzamientos del artista en el perfil de artista correcto.<br/>
            Si es la primera vez que publicas música en estas plataformas, te crearan un nuevo perfil de artista cuando se envíe tu lanzamiento.<br/>
            Si ya lanzaste música en estas plataformas, ya tenes un perfil de artista en cada plataforma. <br/>
            Si este es tu caso haznoslo saber.
            </p>
            <div className="radio">
                <input
                    type="radio"
                    className="radio__field"
                    id="no_tengo_id"
                    name="ID_artista"
                    value="no_tengo_id"
                />
            <label htmlFor="no_tengo_id" className="radio__label negrita-medium">No tengo perfil de artista</label>
            </div>  
            <div className="radio">
                <input
                    type="radio"
                    className="radio__field"
                    id="tengo_id"
                    name="ID_artista"
                    value="tengo_id"
                />
                <label htmlFor="tengo_id" className="radio__label negrita-medium">Tengo perfil de artista</label>
            </div>

            <div className="campo margin">
                <label htmlFor="id_artista" className="campo__label negrita-medium">Copiá y pegá el link de tu perfil de artista.</label>
                <input
                    type="text"
                    className="campo__field--generado"
                    id="id_artista"
                    name="id_artista"
                />
            </div>

            {/* { loading && <p className="animate__animated animate__flash">Loading...</p>} */}
            {
                data.map( (artist, i) => (
                    <div key={ artist.name + i }>
                        <h5>{ artist.name }</h5>
                        {
                            artist.link.map( (r, x ) => (
                                
                                // console.log(r)
                                <div key={ r + x }>
                                    {
                                        r === 'No encontramos ningún perfil para este artista.' 
                                        ?
                                            <p>No encontramos ningún perfil para este artista.</p>
                                        :
                                        <>
                                            <input 
                                                type="radio"
                                                className="radio__field"
                                                id="no_necesito_isrc"
                                                name={`idArtist${x}`}
                                                // value={ r.link } 
                                            />
                                            <label className="radio__label negrita-medium">
                                                <a href={r} target="_blank" rel="noopener noreferrer">{r}</a>
                                            </label>
                                        </>
                                    }
                                </div>
                                        
                                    
                                    
                            ))

                        } 

                    </div>
                ))
            }
            
            <button onClick={ handleClick }>
                Continuar
            </button>
        </div>
    )
}
