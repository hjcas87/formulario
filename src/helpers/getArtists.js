

export const getArtists = async ( artista ) => {
    const clientId = 'ce81605185f343cba24bafc8043e8b79';
    const clientSecret = 'e98b662961bb4508a20029b8fe129a8f';
    const url = `https://api.spotify.com/v1/search?q="${ encodeURI( artista ) }"&type=artist&limit=10`

    const result = await fetch('https://accounts.spotify.com/api/token', {

        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const { access_token } = await result.json();
    
    const resultado = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + access_token }
    });
    
    const { artists } = await resultado.json();

    const urls = artists.items.map( urls => {
        return {
                link: urls.external_urls.spotify,
                name: urls.name,
        } 
    })
    return urls
}
