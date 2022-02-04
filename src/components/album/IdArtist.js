import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { filterSpotifyArtists, getArtistForSpotify } from '../../actions/get';
import { removeError, removeMsg, setError } from '../../actions/ui';
import { allArtists } from '../../helpers/allArtists';
import { getLocalStorage } from '../../helpers/getLocalStorage';

let state = [];
export const IdArtist = () => {

    
    const dispatch = useDispatch()

    const { data, data: { idArtista } } = useMemo(() => getLocalStorage(), []);

    const { info_basica, albumsYCanciones } = data;

    const { msgError } = useSelector(state => state.ui)

    let { artistId } = useSelector(state => state.artists)
    
    const {form, artistsProfiles} = useMemo(() => allArtists( info_basica, albumsYCanciones, idArtista ), [ info_basica, albumsYCanciones ]);
    
    const [formValues, setFormValues] = useState(form)
    // const [artists, setArtists] = useState([])

    useEffect(() => {
        window.scroll({ top: 0, left: 0 });
        document.querySelector('body').classList.remove('overflow');
        dispatch( removeError() );
        dispatch( removeMsg() );
    }, [])

    useEffect(() => {
        dispatch( filterSpotifyArtists(artistsProfiles) )
    }, [artistsProfiles]);

    useEffect(() => {
        setFormValues(form)
    }, [form]);

    const handleInputChange = ( { target } , index ) => {
        const newData = formValues.map(( field, i ) => {
            if (index === i) {
                field[target.name] = target.value;
            }
            return field;
        });
        setFormValues([...newData]);
    };
    const handleClickArtists = ( artist, id ) => {
        artistsProfiles.map( art => (
            art.id === id && (art.loading = true)
        ))
        dispatch( filterSpotifyArtists(artistsProfiles) )
        dispatch( getArtistForSpotify( artist, artistsProfiles, id ) )
    }
    
    const handleClickResetArtists = ( id ) => {
        artistsProfiles.map( art => (
            art.id === id && (art.value = '')
        ))
        const newForm = form.map( ( art, i ) => {
            if ( i === id ) {
                art[Object.keys(art)[0]] = '' ;
                return art;
            } else {
                return art;
            }
        });
        setFormValues( newForm );
        dispatch( filterSpotifyArtists(artistsProfiles) );
    }

    const navigate = useNavigate();
    const handleFocus = (e) => {
        const inputs = [...document.querySelectorAll('input')];
        inputs.forEach( ipt => ipt.name === e.target.name ? ipt.checked = false : null );
    }
    
    const handleChangeRadio = (e) => {
        const inputs = [...document.querySelectorAll('input[type=text]')];
        inputs.forEach( ipt => ipt.name === e.target.name ? ipt.value = '' : null );
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if ( isFormValid() ) {
            console.log(formValues)
            data.idArtista = formValues;
            localStorage.setItem( 'albumInfo', JSON.stringify( data ) );
            animationScreenNavigate();
            
        }
    }
    const animationScreenNavigate = () => {
        const screen = document.querySelector('#info-screen');
        screen.classList.remove('animate__fadeInRight');
        screen.classList.add('animate__fadeOutLeft', 'animate__faster');
        screen.addEventListener('animationend', () => {
            
            navigate( '/album/extended-songs' );
        
        });
    };
    
    const isFormValid = () => {
        console.log(formValues)
        const regEx = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
        if (formValues.some( value => Object.values(value)[0].trim().length === 0)) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
            dispatch( setError('Por favor completá todos los campos') );
            return false
        }
        if (formValues.some( value => Object.values(value)[0] !== "No tiene perfil de artista" && !regEx.test(Object.values(value)[0]))) {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
            dispatch( setError('Esa no es una url válida') );
            return false
        }
        dispatch( removeError() );
        return true
    }
    
    return (
        <div className="main-container">
            <div className="text-secondary text-center animate__animated animate__fadeIn" id="info-screen">
                
                <div className="py-5 mt-5">
                    <h1 className="text-align-left">Álbum</h1>
                    <h2 className="text-align-left">IDS de Artista</h2>
                    <hr />
                        { 
                            msgError &&
                                (
                                    <div className="error">
                                        { msgError }
                                    </div>
                                )
                        }
                    <div className="text-align-left d-flex">
                        <p>Algunas plataformas (como Spotify y Apple Music) asignan un ID único a cada nombre de artista para agrupar 
                        los lanzamientos del artista en el perfil de artista correcto.<br/>
                        Si es la primera vez que publicas música en estas plataformas, te crearan un nuevo perfil de artista cuando se envíe tu lanzamiento.<br/>
                        Si ya lanzaste música en estas plataformas, ya tenes un perfil de artista en cada plataforma. <br/>
                        Si este es tu caso haznoslo saber.
                        </p>
                    </div>
                    <hr />
                    {console.log(artistsProfiles)}
                    {
                        artistsProfiles.map( (artist, i) => (
                            <div key={ i } className="w-100">
                                <h3 className="text-white text-transform text-align-left">{ artist.name }</h3>
                                <hr />
                                {console.log(artist.datos)}
                                <div className="d-flex justify-center wrap align-center">
                                    {
                                        artist.value.trim().length > 0 
                                            ?
                                                <div className="d-flex flex-column w-100">
                                                    <div className="d-flex flex-column">
                                                        <p className="text-align-left">Perfil seleccionado</p>
                                                        { 
                                                            artist.value === "No tiene perfil de artista" 
                                                                ?
                                                                <p className="text-align-left text-white">{artist.value}</p>
                                                                :
                                                                <a href={artist.value} target="_blank" rel="noopener noreferrer" className="mt-1 mb-3 text-align-left">Abrir en una ventana nueva</a>
                                                        }
                                                    </div>
                                                    <div 
                                                        onClick={ () => handleClickResetArtists( artist.id ) } 
                                                        className="btn max-w-15 mb-3 mt-3 align-self-center">
                                                        Editar
                                                    </div>
                                                </div>
                                            :
                                            artist.name.trim().length === 0 
                                                ?
                                                    <p className="text-align-left text-white">Aún no agregaste ningún artista a este lanzamiento</p>
                                                :
                                            <div className="d-flex flex-column">
                                                { 
                                                    artist.loading 
                                                        ?
                                                            <p className="animate__animated animate__flash">loading...</p> 
                                                        :
                                                            !artist.loading && artist.notFound 
                                                                ?
                                                                <>
                                                                    <p className="text-align-left text-white m-0">Encontramos ({artist.datos.length}) resultados para este artista</p>
                                                                    <p className="text-align-left">No encontramos perfil para este artista</p>
                                                                </>
                                                                :
                                                            !artist.loading && artist.datos.length > 0
                                                                ?
                                                                <>
                                                                <p className="text-align-left text-white m-0">Encontramos ({artist.datos.length}) resultados para este artista</p>
                                                                    {
                                                                        artist.datos.map( (data, x) => (
                                                                            <div 
                                                                                key={ data.name + x }
                                                                            >
                                                                                <div className="d-flex g-1">
                                                                                    <input 
                                                                                        type="radio"
                                                                                        className="radio__field mt-1"
                                                                                        id="no_necesito_isrc"
                                                                                        name={artist.name}
                                                                                        onChange={ (e) => handleInputChange(e, i) }
                                                                                        value={ data.link } 
                                                                                        onClick={handleChangeRadio}
                                                                                    />
                                                                                    <a href={data.link} target="_blank" rel="noopener noreferrer" className="anchors-artist mt-1 mb-3">Abrir en una ventana nueva</a>
                                                                                </div>
                                                                                
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </>
                                                                :
                                                                <>
                                                                    <p className="text-align-left">Buscá o consultá acerca de este perfil de artista</p>
                                                                    <div className="d-flex flex-column">
                                                                        <div className="d-flex w-100 mt-3 g-1">
                                                                            <input
                                                                                type="radio"
                                                                                className="radio__field"
                                                                                id={`no_tengo_id${i}`}
                                                                                name={ artist.name }
                                                                                onChange={ (e) => handleInputChange(e, i) }
                                                                                value="No tiene perfil de artista"
                                                                                onClick={handleChangeRadio}
                                                                            />
                                                                            <label htmlFor={`no_tengo_id${i}`} className="radio__label negrita-medium">No tiene perfil de artista (se creará uno nuevo)</label>
                                                                        </div>
                                                                        <div 
                                                                            onClick={ () => handleClickArtists( artist, i ) } 
                                                                            className="btn max-w-15 mb-3 mt-3 align-self-center">
                                                                            Buscar
                                                                        </div>
                                                                    </div>
                                                                </>
                                                }
                                            </div>
                                    }
                                    {
                                        !artist.loading && artist.datos.length > 0 || artist.notFound 
                                            ?
                                            <>   
                                                <div className="d-flex flex-column g-1 wrap">
                                                    <label htmlFor={`id_artista_${i}`} className="text-white text-align-left mb-1">Si por alguna razon tu perfil no aparece aqui, copiá y pegá el link del mismo.</label>
                                                    <input
                                                        type="text"
                                                        autoComplete="off"
                                                        className="form-control text-transform-lower"
                                                        id={`id_artista_${i}`}
                                                        name={artist.name}
                                                        onChange={ (e) => handleInputChange(e, i) }
                                                        onFocus={ handleFocus }
                                                    />
                                                </div>
                                                <div className="d-flex align-center mt-3 g-1">
                                                    <input
                                                        type="radio"
                                                        className="radio__field"
                                                        id={`no_tengo_id${i}`}
                                                        name={ artist.name }
                                                        onChange={ (e) => handleInputChange(e, i) }
                                                        value="No tiene perfil de artista"
                                                        onClick={handleChangeRadio}
                                                    />
                                                    <label htmlFor={`no_tengo_id${i}`} className="radio__label negrita-medium">No tiene perfil de artista (se creará uno nuevo)</label>
                                                </div>
                                            </> 
                                            : null
                                    }
                                
                                </div>
                                <hr />
                            </div>
                        ))
                    }
            
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
