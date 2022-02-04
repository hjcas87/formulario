import React from 'react'
import { Link } from 'react-router-dom';

export const GenderResume = ({ data: { generoYLocalizacion } }) => {

    console.log(generoYLocalizacion)

    const {
        genero_1,
        genero_2,
        localizacion,
        artista_similar_1,
        artista_similar_2,
        artista_similar_3
    } = generoYLocalizacion;

    return (
        <>
            <div className="d-flex justify_rigth mb-3">
                <Link to={ '/simple/genders' }>Editar</Link>
            </div>
            <div className="grid_base mb-5">
                <div className="d-flex g-1 justify-between align-center mb-3">
                    <div className="d-flex flex-column g-1 align-top wrap">
                        <label>Genero Nº1:</label>
                        <p className="capitalize text-white">{ genero_1 }</p>
                    </div>
                </div>
                <div className="d-flex g-1 justify-between align-center mb-3">
                    <div className="d-flex flex-column g-1 align-top wrap">
                        <label>Genero Nº2:</label>
                        <p className="capitalize text-white">{ genero_2 }</p>
                    </div>
                </div>
            </div>
            <div className="grid_base">
                <div className="d-flex g-1 justify-between mb-3">
                    <div className="d-flex flex-column g-1 align-top wrap">
                        <label>Artistas similares:</label>
                        <p className="capitalize text-white">{ artista_similar_1 }</p>
                        <p className="capitalize text-white">{ artista_similar_2 }</p>
                        <p className="capitalize text-white">{ artista_similar_3 }</p>
                    </div>
                </div>
                <div className="d-flex g-1 justify-between mb-3">
                    <div className="d-flex flex-column g-1 align-top wrap">
                        <label>Localización del artista:</label>
                        <p className="capitalize text-white">{ localizacion }</p>
                    </div>
                </div>
            </div>
            
        </>
    )
}
