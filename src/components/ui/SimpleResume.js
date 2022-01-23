import React from 'react'
import { StartProyect } from './StartProyect'

export const SimpleResume = React.memo(({ isStarted }) => {

    console.log(isStarted)
    return (
        <>
            {
                !isStarted 
                    ? 
                    <StartProyect value={ '/simple' }/>
                    :
                    <h1>Hola</h1>

            }
        </>
    )
})

