import React from "react";



export const InputNumberOfAlbums = React.memo(({ value, onChange }) => {

  
  // console.log('fieldinput llamado')

    return (
          <>
            <input
              type="number"
              autoComplete="off"
              min="1"
              max="10"
              className="form-control"
              id="numero_discos"
              value={ value }
              name="numero_volumenes"
              onChange={ onChange }
            />
          </>
    ) 

});