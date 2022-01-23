import React, { useEffect, useState } from "react";



export const InputNumberOfSongsPerAlbum = React.memo(({ index, volume, amount }) => {

  // const dispatch = useDispatch();

  
  const [songsValues, setSongsValues] = useState(amount);
  // console.log(songsValues[index])
  // console.log(amount)
  

    useEffect(() => {

        setSongsValues(amount);

    }, [amount])

    // useEffect(() => {
      
    //   dispatch( albumInfoAmount( songsValues ) )

    // }, [songsValues, dispatch])


    const handleInputChange = (e, i) => {
        const newData = songsValues.map((song, indx) => {
        if (indx === i) {
            song[e.target.name] = e.target.value;
        }

        return song;
        });

        setSongsValues([...newData]);
    };

  // console.log(songsValues)

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