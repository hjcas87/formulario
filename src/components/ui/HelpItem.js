import React from 'react'

export const HelpItem = React.memo(({ content }) => {
    
    return (
        
        <div className="help-container">
            <div className="help-item">
                { content }
            </div>
        </div>

    )
})
