
import { types } from "../types/types";



export const formReducer = ( state = {}, action ) => {

    switch ( action.type ) {
        case types.post:
            return {
                ...state,
                post: action.payload.form
            }
            
        case types.postSongs:
            return {
                ...state,
                postSongs: action.payload.abmsWthSng
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