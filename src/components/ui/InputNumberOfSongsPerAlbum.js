import React, { useEffect, useState } from "react";



export const InputNumberOfSongsPerAlbum = React.memo(({ index, volume, amount }) => {

    useEffect(() => {

        setSongsValues(amount);

    }, [amount])

    const [songsValues, setSongsValues] = useState(amount);

    const handleInputChange = (e, i) => {
        const newData = songsValues.map((song, indx) => {
        if (indx === i) {
            song[e.target.name] = e.target.value;
        }

        return song;
        });

        setSongsValues([...newData]);
    };

  // console.log('input llamado')

    return (
          <>
            <input
              name={`Album_${ index + 1 }`}
              className="form-control"
              autoComplete="off"
              min="1"
              max="10"
              type="number"
              value={volume[`Album_${index + 1}`] || ''}
              onChange={(e) => handleInputChange(e, index)}
            />
          </>
    ) 

});