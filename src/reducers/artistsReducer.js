import { types } from "../types/types";

const spotifyArtists = {
        spotify: {
            name: '',
            loading: false,
            firstLoad: true,
            datos: [],
            id: null
        },
        artistId: {
            name: '',
            loading: true,
            notFound: false,
            datos: [],
            id: null
        }
    }
// const artistId = {

// }

export const artistsReducer = (state = spotifyArtists, action) => {
    
    switch ( action.type ) {
        case types.spotifyArtists:
            return {
                ...state,
                spotify:action.payload.datos
            }
        case types.filterSpotifyArtists:
            return {
                ...state,
                artistId:action.payload.data
            }
            
    
        default:
            return state;
    }

}
