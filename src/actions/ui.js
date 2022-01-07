import { types } from "../types/types";

export const createInput = ( amount ) => {
    return {
        type: types.uiInputs,
        payload: {
            amount
        }
    }
}

export const createInputsSongs = ( amountObj ) => {
    console.log(amountObj)
    return {
        type: types.uiInputsSongs,
        payload: {
            amountObj
        }
    }
}


export const setError = ( err ) => ({
    type: types.uiSetError,
    payload: err
});

export const removeError = () => ({
    type: types.uiRemoveError
});