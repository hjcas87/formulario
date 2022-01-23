import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const InputsFieldsNameOfSongs = React.memo(({
    albumsAndSongsValues,
    album
}) => {

    const { albumInfo } = useSelector(state => state.form)
    // console.log(albumInfo.albumsYCanciones)
    // console.log(albumsAndSongsValues)

    useEffect(() => {
        
        setFormValues(album)

    }, [album])
    
    const [formValues, setFormValues] = useState()
    useEffect(() => {
        
        albumInfo.albumsYCanciones = albumsAndSongsValues

    }, [formValues])


    const handleInputChange = ({target}, indx) => {

        // console.log(target)
        const newData = formValues.map(( field, i ) => {
            if (indx === i) {
                field[target.name] = target.value;
            }
            return field;
        });
        setFormValues([...newData]);
    }
    return (

        album.map( (cancion, i) => (
            <div key={ album + i }
            className="mb-3"
        >
            <div className="d-flex justify-center align-center g-1">
                {/* <label htmlFor="nombre" className="form-label fs-2 col-auto text-white">{ x + 1} -</label> */}
                <div className="flex-fill">
                    <input
                        type="text"
                        autoComplete="off"    
                        className="form-control min-h-4 animate__animated animate__fadeInUp"
                        name={ Object.keys( cancion )[0] }
                        value={ Object.values( cancion )[0] }
                        onChange={(e) => handleInputChange(e, i)}
                        // onChange={ (e) => changess( albumsAndSongsValues, e, i, index) }
                    />
                </div>
            </div>
        </div>
))
    )
})
