import { filterArtists } from "../helpers/allArtists";
import { getArtists } from "../helpers/getArtists";
import { types } from "../types/types";

export const getArtistForSpotify = ( artist, artistsProfiles, id ) => {
        let data = {}
        // console.log(artist)
        // console.log(artistsProfiles)
        
        return (dispatch) => {
            // dispatch( getSpotifyArtists({
            //     name: '',
            //     loading: true,
            //     datos: [],
            //     id: id
            // }))
    
            // artists.forEach( artist => (
            getArtists( artist.name )
                .then( datos => {
                    // console.log(datos)
                    data = {
                        datos,
                        id: artist.id
                    }
                    const artists = filterArtists( data, artistsProfiles, id )
                    // console.log(artists)
                    dispatch( filterSpotifyArtists(artists) )
                    // dispatch(
                    //     getSpotifyArtists(data)
                    // )
                })
    //                 .then( dato => {
    // )
    //         // ))
    
        }

};

export const getSpotifyArtists = ( datos ) => ({
    type: types.spotifyArtists,
    payload: {
        datos
    }
});

export const filterSpotifyArtists = ( data ) => {
    // console.log(data)

    return {type: types.filterSpotifyArtists,
    payload: {
        data
    }
}};


