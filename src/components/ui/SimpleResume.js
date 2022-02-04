import React from 'react'
import { getLocalStorage } from '../../helpers/getLocalStorage';
import { DistResume } from './resume/DistResume';
import { GenderResume } from './resume/GenderResume';
import { InfoBasicaResume } from './resume/InfoBasicaResume';
import { SongResume } from './resume/SongResume';
import { StartProyect } from './StartProyect'

export const SimpleResume = React.memo(({ isStarted }) => {

    
    const { simpleData, simpleData: { info_basica: { titulo_album } } } = getLocalStorage();
    
    return (
        <>
            <div className="text-secondary text-align-left animate__animated animate__fadeIn" id="basic_info">
                            
                <div className="mt-5">
                <h1 className="capitalize">{ titulo_album } - Sencillo</h1>
                <h3 className="text-align-left">Informacion Básica</h3>
                <hr />
                    <div className="col-auto">
                        <InfoBasicaResume data={ simpleData } />
                    </div>
                    <hr />
                    <div className="col-auto">
                        <GenderResume data={ simpleData } />
                    </div>
                    <hr />
                    <div className="col-auto">
                        <SongResume data={ simpleData } />
                    </div>
                    <hr />
                    <div className="col-auto">
                        <DistResume data={ simpleData } />
                    </div>
                </div>
            </div>
        </>
    )
})

