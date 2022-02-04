import React, { useEffect, useState } from "react";



export const InputNumberOfSongsPerAlbum = React.memo(({ index, volume, amount }) => {
  
  const [songsValues, setSongsValues] = useState(amount);

    useEffect(() => {

        setSongsValues(amount);

    }, [amount])

    const handleInputChange = (e, i) => {
        const newData = songsValues.map((song, indx) => {
        if (indx === i) {
            song[e.target.name] = e.target.value;
        }

        return song;
        });

        setSongsValues([...newData]);
    };

    return (
          <>
            <input
              name={`disco_${ index + 1 }`}
              className="form-control"
              autoComplete="off"
              min="1"
              max="50"
              type="number"
              value={volume[`disco_${index + 1}`] || ''}
              onChange={(e) => handleInputChange(e, index)}
            />
          </>
    ) 

});