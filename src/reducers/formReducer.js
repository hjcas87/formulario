
import { types } from "../types/types";

const albumInfo = {
    // artista_principal: '',
    // artistas_secundarios: [],
    // fecha_lanzamiento: '',
    // idioma: '',
    // titulo_album: '',
    // UPC: '',
    // solicitaUpc: '',
    // albumsYCanciones: [],
    
    // generoYLocalizacion: {
    //     genero_1: '',
    //     genero_2: '',
    //     localizacion: '',
    //     artista_similar_1: '',
    //     artista_similar_2: '',
    //     artista_similar_3: '',
    // },
}

export const formReducer = ( state = { albumInfo }, action ) => {

    switch ( action.type ) {
        case types.albumInfo:
            return {
                ...state,
                albumInfo: action.payload.form
            }
            
        case types.albumValues:
            return {
                ...state,
                albumValues: action.payload.albumValues
            }
            
        case types.albumsAndSongsValues:
            return {
                ...state,
                albumsAndSongsValues: action.payload.abmsWthSng
            }

        case types.allArtists:
            return {
                ...state,
                allArtists: action.payload.artists
            }
    
        default:
            return state;
    }


}