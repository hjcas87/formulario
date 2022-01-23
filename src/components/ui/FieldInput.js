import React from "react";



export const FieldInput = React.memo(({ indexParent, type, name, value, onChange, id, checked, className }) => {

  
  // console.log('fieldinput llamado')

    return (
          <>
            <input
              name={name}
              id={id}
              className={ className }
              autoComplete="off"
              type={type}
              value={value}
              checked={checked}
              onChange={(event) => onChange(event, indexParent)}
            />
          </>
    ) 

});