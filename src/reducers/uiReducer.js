
import { types } from "../types/types";


export const uiReducer = ( state = {}, action ) => {

    switch ( action.type ) {
        case types.uiInputs:
            return {
                ...state,
                amount: action.payload.amount
            }
    
        case types.uiInputsSongs:
            return {
                ...state,
                amountObj: action.payload.amountObj
            }
    
        default:
            return state;
    }


}