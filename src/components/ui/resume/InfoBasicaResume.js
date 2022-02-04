import { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { filterAndGetSecondaryArtists } from "../../../helpers/allArtists";


export const InfoBasicaResume = ({ data }) => {

    const { info_basica, cancion, codigo_barra } = data;

    const {
        artista_principal,
        artistas_secundarios,
        fecha_lanzamiento,
        idioma,
        titulo_album } = info_basica;

    const {
        UPC,
        solicitaUpc
    } = codigo_barra;

    const { artistas_destacados } = cancion;
    console.log(artistas_destacados.length)

    const allArtists = useMemo(() => filterAndGetSecondaryArtists(info_basica, cancion), [ info_basica, cancion ]);

    console.log(artistas_secundarios.length)
    if (artista_principal.trim().length === 0) {
        return <Navigate to={ '/simple' } />
    }

    return (
        <>
            <div className="d-flex g-1 justify-between align-center mb-3">
                <div className="d-flex g-1 align-top wrap">
                    <label>Banda o Artista Principal:</label>
                    <p className="capitalize text-white">{ artista_principal }</p>
                </div>
                <Link to={ '/simple' }>Editar</Link>
            </div>

            {
                artistas_secundarios.length > 0 || artistas_destacados.length > 0 
                    ?
                    <div className="mb-3">
                        <p className="text-white">Artistas Adicionales</p>
                    </div>
                    : null
            }
            {
                artistas_secundarios.length > 0 
                    &&    
                    artistas_secundarios.map( (artist, i) => (
                        <div key={ `${artist}_${i}` } className="d-flex g-1 justify-between align-center mb-3">
                            <div className="d-flex g-1 align-top wrap">
                                <label>Artista Secundario/a:</label>
                                <p className="capitalize text-white">{ artist.artista_secundario }</p>
                            </div>
                            
                            <Link to={ '/simple' }>Editar</Link>
                        </div>

                    ))                
            }
            {
                artistas_destacados.length > 0 
                    &&    
                    artistas_destacados.map( (artist, i) => (
                        <div key={ `${artist}_${i}` } className="d-flex g-1 justify-between align-center mb-3">
                            <div className="d-flex g-1 align-top wrap">
                                <label>{ `${artist.rol}:` }</label>
                                <p className="capitalize text-white">{ artist.artista_destacado }</p>
                            </div>
                            
                            <Link to={ '/simple/songs' }>Editar</Link>
                        </div>

                    ))                
            }


            <div className="d-flex g-1 justify-between align-center mb-3">
                <div className="d-flex g-1 align-top wrap">
                    <label>UPC:</label>
                    {
                        solicitaUpc === "no_quiere_upc" 
                            ?
                            <p className="text-white">{ UPC }</p>
                            :
                            <p className="text-white">{ solicitaUpc }</p>

                    }
                </div>
                <Link to={ '/simple/upc' }>Editar</Link>
            </div>

            <div className="d-flex g-1 justify-between align-center mb-3">
                <div className="d-flex g-1 align-top wrap">
                    <label>Fecha de lanzamiento:</label>
                    <p className="text-white">{ fecha_lanzamiento }</p>
                </div>
                <Link to={ '/simple' }>Editar</Link>
            </div>

            <div className="d-flex g-1 justify-between align-center mb-3">
                <div className="d-flex g-1 align-top wrap">
                    <label>Idioma del lanzamiento:</label>
                    <p className="text-white capitalize">{ idioma }</p>
                </div>
                <Link to={ '/simple' }>Editar</Link>
            </div>
        </>
    )
}
