import React from 'react'

const Alert = (props) => {
    return (
        <div>
            <h4 style={{textAlign: 'center'}}>{props.title}</h4>
            <p style={{textAlign: 'center'}}>{props.msg}</p>
        </div>
    )
}

export default Alert