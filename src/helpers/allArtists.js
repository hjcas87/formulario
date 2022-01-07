import { getArtists } from "./getArtists";
import { isObjEmpty } from "./validates";



export const allArtists = ( post, postSongs ) => {
    
    if ( !isObjEmpty(post) ) {

        let artistas = [];
    
        const { artista_principal, artistas_secundarios } = post;
    
        artistas = [artista_principal]
    
        artistas_secundarios?.forEach( artist => artistas = [...artistas, artist.artista_secundario])
    
        postSongs?.forEach( album => album.forEach( song => song.artistas_destacados.forEach( artist => artistas = [...artistas, artist.artista_destacado]) ))
    
        const artist = artistas.map( a => a.toLowerCase());
    
        const result = artist.filter( (item,index) => {
            return artist.indexOf(item) === index;
        });
         
        return result;
        
    }

    return [];

}

export const filterArtists = ( artists, spotifyArtists ) => {

    let newArtists = []
    let data = []

    for (let i = 0; i < artists.length; i++) {
        spotifyArtists.forEach( (a, m) => {
            a.forEach( (j, x) => {
                if(artists[i] === j.name.toLowerCase()) {
                    newArtists = [...newArtists, j]
                }

            })
        })
    }
    artists.forEach( art => {
        const obj = {}
        obj.name = art;
        obj.link = [];

        newArtists.forEach( f => {
            if (art === f.name.toLowerCase()) {
                obj.link = [...obj.link, f.link]
            }
        })
        data = [...data, obj]
    })
    
    data.forEach( dat => {
        if (dat.link.length === 0) {
            dat.link = [ 'No encontramos ningún perfil para este artista.' ]
        }
    })
    console.log(data)


    // console.log(result)
    // newArtists = [...data, ...newArtists]
    // console.log(newArtists)

    // let newArray = [];
    // let lookupObject  = {};

    // for(let i in newArtists) {
    // lookupObject[newArtists[i].name.toLowerCase()] = newArtists[i];
    // }

    // console.log(lookupObject)
    // for(let i in lookupObject) {
    //     newArray.push(lookupObject[i]);
    // }
 
    // console.log(newArray)
    

   
    return data


}

