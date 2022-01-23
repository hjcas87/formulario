import React from 'react'

export const HelpItem = React.memo(({ content, classname }) => {
    
    return (
        
        <div className="button-container">
            <div className={`help-item ${classname}`} >
                { content }
            </div>
        </div>

    )
})
