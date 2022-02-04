
import { types } from "../types/types";

const simpleInfo = {
    info_basica: {
        artista_principal: '',
        artistas_secundarios: [],
        fecha_lanzamiento: '',
        idioma: '',
        titulo_album: '',
    },
    cancion: {
        artistas_destacados: [],
        composicion: '',
        compositores: [],
        idioma: '',
        lenguaje_explicito: '',
        otro_idioma: '',
        version: '',
    },
    generoYLocalizacion: {
        genero_1: '',
        genero_2: '',
        localizacion: '',
        artista_similar_1: '',
        artista_similar_2: '',
        artista_similar_3: '',
    },
    codigo_barra: {
        UPC: '',
        solicitaUpc: '',
    },
    ISRC: {
        codigo_ISRC: '',
        num_codigo: '',
    },
    opciones_distribucion: '',
    canciones_extendidas: {
        cancion_extendida: '',
        solo_album: ''
    },
    simpleStarted: false
}

export const simpleFormReducer = ( state = {simpleInfo}, action ) => {

    switch ( action.type ) {
        case types.simpleInfoForm:
            return {
                ...state,
                simpleInfo: action.payload.values
            }
        default:
            return state;
    }


}