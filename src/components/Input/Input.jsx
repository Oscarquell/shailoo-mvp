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
                color: '#fff',
                borderRadius: '10px',
                background: 'transparent',
                '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    color: '#fff',
                    '& fieldset': {
                        borderColor: '#00e676',
                        transition: 'border-color 0.2s ease',
                    },
                    '&:hover fieldset': {
                        borderColor: '#00e676',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#00e676 !important', // 🔴 рамка при фокусе
                        boxShadow: 'none',
                    },
                },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#00e676 !important', // 🔴 убирает синий MUI-эффект
                },
                '& .MuiInputLabel-root': {
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.8)',
                    transition: 'color 0.2s ease',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#00e676 !important', // 🔴 лейбл при фокусе
                },
                '& .MuiInputBase-input': {
                    padding: '14px',
                    color: '#fff', // белый текст при вводе
                },
                '& .MuiInputBase-input::placeholder': {
                    color: '#fff', // белый плейсхолдер
                    opacity: 1,
                },
                ...sx,
            }}
        />
    );
};

export default InputComponent;
