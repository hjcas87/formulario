import { types } from "../types/types";

export const infoFormAlbum = ( form ) => {
    return {
        type: types.post,
        payload: {
            form
        }
    }
}
