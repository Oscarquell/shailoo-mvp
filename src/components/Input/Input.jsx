import React from 'react';
import TextField from '@mui/material/TextField';

const Input = ({id = new Date(), value, onChange, style, label}) => {
    return (
        <>
            <TextField id={id} label={label} variant="outlined" />
        </>
    );
};

export default Input;