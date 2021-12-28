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