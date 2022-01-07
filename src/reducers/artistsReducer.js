import { types } from "../types/types";



export const artistsReducer = (state = {}, action) => {
    

    switch ( action.type ) {
        case types.spotifyArtists:
            return {
                spotifyArtists:action.payload.datos
            }
            
    
        default:
            return state;
    }

}
