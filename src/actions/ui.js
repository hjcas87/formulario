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

export const isAlbumLink = ( navigation ) => ({
    type: types.uiArrayOfLinks,
    payload: navigation
})

export const isChange = ( value ) => ({
    type: types.isChange,
    payload: value
})

export const changeResume = ( value ) => ({
    type: types.isAlbum,
    payload: value
})