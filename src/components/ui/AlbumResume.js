import React from 'react'
import { StartProyect } from './StartProyect'

export const AlbumResume = React.memo(({ isStarted }) => {

    console.log(isStarted)
    return (
        <>
            {
                !isStarted 
                    ? 
                    <StartProyect value={ '/album' }/>
                    :
                    <h1>chau</h1>

            }
        </>
    )
})
