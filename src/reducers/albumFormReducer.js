import { types } from "../types/types";

const albumInfo = {
    info_basica: {
        artista_principal: '',
        artistas_secundarios: [],
        fecha_lanzamiento: '',
        idioma: '',
        titulo_album: '',
    },
    codigo_barra: {
        UPC: '',
        solicitaUpc: '',
    },
    generoYLocalizacion: {
        genero_1: '',
        genero_2: '',
        localizacion: '',
        artista_similar_1: '',
        artista_similar_2: '',
        artista_similar_3: '',
    },
    ISRC: {
        codigo_ISRC: '',
        num_codigo: [],
    },
    opciones_distribucion: '',
    canciones_extendidas: {
        cancion_extendida: '',
        solo_album: ''
    },
    idArtista: [],
    albumValues: [],
    albumsYCanciones: [[]],
    albumStarted: false
}



export const albumFormReducer = ( state = { albumInfo }, action ) => {

    switch ( action.type ) {
        case types.albumInfo:
            return {
                ...state,
                albumInfo: action.payload.form
            }
        default:
            return state;
    }


}