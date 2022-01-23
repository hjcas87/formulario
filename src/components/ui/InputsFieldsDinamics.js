import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { infoFormAlbum } from '../../actions/post'
import { useForm } from '../../hooks/useForm'
import { ButtonItem } from './ButtonItem'
import { HelpItem } from './HelpItem'
import { InputsFields } from './InputsFields'
import { InputsFieldsArtistDinamic } from './InputsFieldsArtistDinamic'

export const InputsFieldsDinamics = React.memo(({ artistasSecundarios = [] }) => {

    // console.log(artistasSecundarios)

    return (
            
        artistasSecundarios.map( (field, i) => (
                <div key={ i } className="animate__animated animate__fadeInUp">
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

