import { types } from "../types/types";

export const createInput = ( amount ) => {
    console.log('pasa por aca', amount )
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

export const setMsg = ( err ) => ({
    type: types.uiSetMsg,
    payload: err
});

export const removeMsg = () => ({
    type: types.uiRemoveMsg
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