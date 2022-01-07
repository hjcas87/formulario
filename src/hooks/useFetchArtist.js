import { useEffect, useState } from "react";
import { getArtists } from "../helpers/getArtists";


export const useFetchArtist = ( artists ) => {

    console.log(artists)
    const [state, setState] = useState({
        data: []
    });

    useEffect( () => {
        
        artists.forEach( artist => (
            getArtists( artist )
                .then( datos => {
                    
                    setState({
                        
                        data: datos
                    })
                })

        ))

    }, []); 

    return state;
}