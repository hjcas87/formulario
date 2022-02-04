

export const filterAndGetSecondaryArtists = ( { artistas_secundarios }, canciones ) => {
    
    let artistas = [];
    const { artistas_destacados } = canciones
    artistas_secundarios.forEach( artist => artistas = [...artistas, artist.artista_secundario]);
    artistas_destacados.forEach( artist => artistas = [...artistas, artist.artista_destacado]);
    const result = artistas.filter( ( artist, i ) => {
        artist.toLowerCase();
        return artistas.indexOf(artist) === i;
    });
        
    return result;

}
export const allArtists = ( info_basica, albumsAndSongsValues, idArtista ) => {
    
        let artistas = [];
    
        const { artista_principal, artistas_secundarios } = info_basica;
    
        artistas = [artista_principal]
    
        artistas_secundarios?.forEach( artist => artistas = [...artistas, artist.artista_secundario])
    
        albumsAndSongsValues?.forEach( album => album.forEach( song => song.artistas_destacados.forEach( artist => artistas = [...artistas, artist.artista_destacado]) ))
    
        const artist = artistas.map( a => a.toLowerCase());
        // console.log(idArtista)
    
        const result = artist.filter( (item,index) => {
            return artist.indexOf(item) === index;
        });

        const form = result.map( (res, i) => {
            // console.log(Object.keys(idArtista[i]))
            return idArtista[i] && Object.keys(idArtista[i]) && Object.keys(idArtista[i])[0] === res
                    ?
                    {[res]: Object.values(idArtista[i])[0]}
                    :
                    {[res]: ''}
        });
        
        const artistsProfiles = form.map( (profile, i) => ({
            name: Object.keys(profile)[0],
            loading: false,
            notFound: false,
            datos: [],
            id: i,
            value: Object.values(profile)[0]
        }))
        console.log(artistsProfiles)

        return {
            form,
            artistsProfiles
        }

}

export const filterArtists = ( data, artistsProfiles, i ) => {
    
    artistsProfiles.map( profiles => {
        if (profiles.id === data.id) {
            if ( !data.datos || data.datos.length === 0 ) {
                profiles.notFound = true;
                profiles.loading = false;
                return
            } else {
                data.datos.forEach( artistId => {
                    if(profiles.name === artistId.name.toLowerCase()) {
                        profiles.datos = [...profiles.datos, artistId];
                        profiles.notFound = false;
                        profiles.loading = false;
                        return
                    } else if ( profiles.datos.length === 0 ) {
                        console.log(data.datos)
                        profiles.notFound = true;
                        profiles.loading = false;
                        return
                    }
                });
            }
        }
        return profiles
    })
   
    return artistsProfiles;
}

