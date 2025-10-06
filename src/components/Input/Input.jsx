import React from 'react';
import TextField from '@mui/material/TextField';

const InputComponent = ({ id, value, onChange, label, sx }) => {
    return (
        <TextField
            id={id || String(Date.now())}
            label={label}
            value={value}
            onChange={onChange}
            variant="outlined"
            fullWidth
            sx={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    '& fieldset': {
                        borderColor: '#cfcfcf',
                    },
                    '&:hover fieldset': {
                        borderColor: '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#1976d2',
                        boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
                    },
                },
                '& .MuiInputLabel-root': {
                    fontSize: '14px',
                    color: '#555',
                },
                '& .MuiInputBase-input': {
                    padding: '14px',
                },
                ...sx,
            }}
        />
    );
};

export default InputComponent;
