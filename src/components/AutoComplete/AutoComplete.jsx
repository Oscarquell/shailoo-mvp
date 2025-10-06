import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const AutoComplete = ({items, label, style}) => {
    return (
        <>
            <Autocomplete
                disablePortal
                options={items}
                sx={style}
                renderInput={(params) => <TextField {...params} label={label} />}
            />
        </>
    );
};

export default AutoComplete;