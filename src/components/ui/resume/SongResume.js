import React from 'react'
import { Link } from 'react-router-dom';

export const SongResume = ({ data: { cancion }, data: { info_basica }, data: { ISRC } }) => {

    const { 
        titulo_album,
        artista_principal,
        artistas_secundarios
    } = info_basica;
    
    const { 
        artistas_destacados,
        composicion,
        compositores,
        idioma,
        lenguaje_explicito,
        otro_idioma,
        version
    } = cancion;

    const {
        codigo_ISRC,
        num_codigo
    } = ISRC;

    console.log(num_codigo)
    return (
        <>
            <div className="mb-5">
                <div className="d-flex justify-between align-center">
                    <h3 className="capitalize">{ titulo_album }</h3>
                    <Link to={ '/simple' }>Editar</Link>
                </div>
            <div className="mb-1">
                <p className="capitalize text-white">{ artista_principal }</p>
            </div>
            {
                artistas_secundarios.map( (artist, i) => (
                    <div key={ `${artist}_${i}` } className="d-flex g-1 justify-between align-center mb-3">
                        <div className="d-flex g-1 align-top wrap">
                            <label>Artista Secundario/a:</label>
                            <p className="capitalize text-white">{ artist.artista_secundario }</p>
                        </div>
                    </div>

                ))                
            }
            {
                artistas_destacados.map( (artist, i) => (
                    <div key={ `${artist}_${i}` } className="d-flex g-1 justify-between align-center mb-1">
                        <div className="d-flex g-1 align-top wrap">
                            <label>{ `${artist.rol}:` }</label>
                            <p className="capitalize text-white">{ artist.artista_destacado }</p>
                        </div>
                        
                    </div>

                ))  
            }
            </div>
            <div className="grid_base mb-5">
                <div className="d-flex g-1 justify-between align-center mb-3">
                    <div className="d-flex flex-column g-1 align-top wrap">
                        <label>Genero Nº1:</label>
                        <p className="capitalize text-white">{ composicion }</p>
                    </div>
                </div>
                <div className="d-flex g-1 justify-between align-center mb-3">
                    <div className="d-flex flex-column g-1 align-top wrap">
                        <label>Idioma de la letra:</label>
                        <p className="capitalize text-white">{ idioma === 'Otro' ? otro_idioma : idioma }</p>
                    </div>
                </div>
            </div>
            <div className="grid_base mb-5">
                <div className="d-flex g-1 justify-between align-center mb-3">
                    <div className="d-flex flex-column g-1 align-top wrap">
                        <label>Tipo de grabación:</label>
                        <p className="capitalize text-white">{ version }</p>
                    </div>
                </div>
                <div className="d-flex g-1 justify-between align-center mb-3">
                    <div className="d-flex flex-column g-1 align-top wrap">
                        <label>Advertencia para padres:</label>
                        <p className="capitalize text-white">{ lenguaje_explicito }</p>
                    </div>
                </div>
            </div>
            <div className="grid_base mb-5">
                
                <div className="d-flex g-1 justify-between align-center mb-3">
                    <div className="d-flex flex-column g-1 align-top wrap">
                        <label>ISRC:</label>
                        {
                            codigo_ISRC === 'no_necesito_isrc' ? 
                                num_codigo.map( num => (
                                    // console.log(Object.values(num)[0])
                                    <p key={ num } className="text-white">{ Object.values(num)[0] }</p>
                                ))
                                :
                                <p className="text-white">{ codigo_ISRC }</p>  
                        }
                    </div>
                </div>
            </div>
            
            <div>
                
                <p>Compositor:</p>
                <hr />
                {
                    compositores.map( (composer, i) => (
                        <div key={ i } className="mb-3">
                            <p className="capitalize text-white">{ composer.compositor }</p>
                        </div>
                    ))
                }
            </div>

        </>
    )
}
