import { types } from "../types/types";

export const infoFormAlbum = ( form ) => {
    return {
        type: types.post,
        payload: {
            form
        }
    }
}

export const infoFormAlbumWithSongs = ( abmsWthSng ) => {
    return {
        type: types.postSongs,
        payload: {
            abmsWthSng
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
