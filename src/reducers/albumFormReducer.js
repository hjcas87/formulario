import { types } from "../types/types";

export const albumFormReducer = ( state = { }, action ) => {

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