import React from 'react'
import { InputsFieldsArtistDinamic } from './InputsFieldsArtistDinamic'

export const InputsFieldsDinamics = React.memo(({ artistasSecundarios = [] }) => {

    return (
            
        artistasSecundarios.map( (field, i) => (
                <div key={ i } >
                    <div className="mb-3 d-flex flex-column">
                        <div className="d-flex">                                                
                            <InputsFieldsArtistDinamic
                                index={ i }
                                artistasSecundarios={artistasSecundarios}
                            /> 
                        </div>
                    </div>                                
                </div>
            ))
            
    )
})

