import { types } from "../types/types";

export const infoFormAlbum = ( form ) => {
    return {
        type: types.albumInfo,
        payload: {
            form
        }
    }
}
export const infoFormSimple = ( values ) => {
    return {
        type: types.simpleInfoForm,
        payload: {
            values
        }
    }
}

export const albumsWithSongsInfo = ( abmsWthSng ) => {
    return {
        type: types.albumsAndSongsValues,
        payload: {
            abmsWthSng
        }
    }
}

export const albumInfoAmount = ( albumValues ) => {
    // console.log(albumValues)
    return {
        type: types.albumValues,
        payload: {
            albumValues
        }
    }
}

export const infoFormAlbumAllArtists = ( artists ) => {
    return {
        type: types.allArtists,
        payload: {
            artists
        }
    }
}
