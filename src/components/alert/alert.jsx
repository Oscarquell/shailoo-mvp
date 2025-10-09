import React from 'react'
import './alert.css'

const Alert = (props) => {
    return (
        <div>
            {/*<h4 className='alert-title'>{props.title}</h4>*/}
            <p className='alert-description'>{props.msg}</p>
        </div>
    )
}

export default Alert