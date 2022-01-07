import { getArtists } from "../helpers/getArtists";
import { types } from "../types/types";

export const getArtistForSpotify = ( artists = [] ) => {
        let data = []
        return (dispatch) => {
    
            artists.forEach( artist => (
                getArtists( artist )
                    .then( datos => {
                        data = [...data, datos]
                        dispatch(
                            spotifyArtists(data)
                        )
                    })
    
            ))
    
        }

};

export const spotifyArtists = ( datos ) => ({
    type: types.spotifyArtists,
    payload: {
        datos
    }
});


