import React from 'react';



export const ButtonItem = React.memo(({ content, onClick, arg }) => {
    // // console.log('boton')
    return (
        <div className="button-container">
            <div className="button-item"
                onClick={ () => onClick( arg ) }
            >
                { content }
            </div>
        </div>
    )
})
