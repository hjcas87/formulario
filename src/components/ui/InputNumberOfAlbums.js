import React from "react";



export const InputNumberOfAlbums = React.memo(({ indexParent, type, name, value, onChange, id, checked, className }) => {

  
  console.log('fieldinput llamado')

    return (
          <>
            <input
              type="number"
              autoComplete="off"
              min="1"
              max="10"
              className="form-control"
              id="numero_discos"
              // value={ numero_volumenes }
              name="numero_volumenes"
              // onChange={ handleInputChange }
            />
          </>
    ) 

});