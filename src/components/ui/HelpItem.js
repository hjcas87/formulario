import React from 'react'

export const HelpItem = React.memo(({ content, classname, onClick }) => {
    
    return (
        
        <div className="button-container" onClick={ onClick }>
            <div className={`help-item ${classname}`} >
                { content }
            </div>
        </div>

    )
})
