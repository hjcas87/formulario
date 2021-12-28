
import { types } from "../types/types";


export const formReducer = ( state = {}, action ) => {

    switch ( action.type ) {
        case types.post:
            return {
                post: action.payload.form
            }
    
        default:
            return state;
    }


}