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
    

    const { post = [], albumsAndSongsValues = [] } = useSelector(state => state.form)
    // console.log(post)
    // console.log(albumsAndSongsValues)

    const {spotifyArtists = [] } = useSelector(state => state.artists)
    // let { data, loading } = spotifyArtists;
    // // // // console.log(spotifyArtists)
    // // // console.log(spotifyArtists)
    // const { allArtists: allIdArtists } = useSelector(state => state.form)
    // // console.log(allIdArtists)
    const artistas = allArtists( post, albumsAndSongsValues )
    // console.log(artistas)
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
        navigate( '/simple/extended-songs' )
    }


    return (
        <div className="main-container">
            <div className="text-secondary text-center animate__animated animate__fadeIn">
                
                <div className="mt-7 p-2">
                    <h2>IDS de Artista</h2>
                    <div className="text-white text-align-left d-flex">
                    <p>Algunas plataformas (como Spotify y Apple Music) asignan un ID único a cada nombre de artista para agrupar 
                    los lanzamientos del artista en el perfil de artista correcto.<br/>
                    Si es la primera vez que publicas música en estas plataformas, te crearan un nuevo perfil de artista cuando se envíe tu lanzamiento.<br/>
                    Si ya lanzaste música en estas plataformas, ya tenes un perfil de artista en cada plataforma. <br/>
                    Si este es tu caso haznoslo saber.
                    </p>

                    </div>
                    <div className="d-flex align-center mb-3 g-1">
                        <input
                            type="radio"
                            className="radio__field"
                            id="no_tengo_id"
                            name="ID_artista"
                            value="no_tengo_id"
                        />
                    <label htmlFor="no_tengo_id" className="radio__label negrita-medium">No tengo perfil de artista</label>
                    </div>
                    <div className="d-flex align-center mb-3 g-1">
                        <input
                            type="radio"
                            className="radio__field"
                            id="tengo_id"
                            name="ID_artista"
                            value="tengo_id"
                        />
                    <label htmlFor="tengo_id" className="radio__label negrita-medium">Tengo perfil de artista</label>
                    </div>

                    <div className="d-flex flex-column g-1">
                        <label htmlFor="id_artista" className="text-white text-align-left">Si por alguna razon tu perfil no aparece aqui, copiá y pegá el link del mismo.</label>
                        <input
                            type="text"
                            autoComplete="off"
                            className="form-control"
                            id="id_artista"
                            name="id_artista"
                        />
                    </div>

            {/* { loading && <p className="animate__animated animate__flash">Loading...</p>} */}
            {
                data.map( (artist, i) => (
                    <div key={ artist.name + i } className="mt-5">
                        <p className="text-white text-transform text-align-left">{ artist.name }</p>
                        {
                            artist.link.map( (r, x ) => (
                                
                                // // console.log(r)
                                <div key={ r + x }>
                                    {
                                        r === 'No encontramos ningún perfil para este artista.' 
                                        ?
                                            <p className="text-white text-align-left">No encontramos ningún perfil para este artista.</p>
                                        :
                                        <div className="d-flex g-1">
                                            <input 
                                                type="radio"
                                                className="radio__field"
                                                id="no_necesito_isrc"
                                                name={`idArtist${i-x}`}
                                                // value={ r.link } 
                                            />
                                            <a href={r} target="_blank" rel="noopener noreferrer" className="anchors-artist">{r}</a>
                                            
                                        </div>
                                    }
                                </div>
                                        
                                    
                                    
                            ))

                        } 

                    </div>
                ))
            }
            
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
