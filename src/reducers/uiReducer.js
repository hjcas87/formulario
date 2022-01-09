
import { types } from "../types/types";



const initialState = {
    loading: false,
    msgError: null,
    navigation: false
};

export const uiReducer = ( state = initialState, action ) => {

    switch (action.type) {
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
        case types.uiSetError:
            return {
                ...state,
                msgError: action.payload
            }
        case types.uiRemoveError:
            return {
                ...state,
                msgError: null
            }
        case types.uiArrayOfLinks:
            return {
                ...state,
                navigation: action.payload
            }
    
        default:
            return state;
    }
};