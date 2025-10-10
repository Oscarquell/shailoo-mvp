import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const SelectComponent = ({ value, label, onChange, items, style }) => {
    return (
        <FormControl
            variant="outlined"
            sx={{
                width: '100%',
                color: '#fff',
                ...style,
                '& .MuiInputLabel-root': {
                    color: 'rgba(255,255,255,0.8)',
                    transition: 'color 0.2s ease',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#00e676 !important',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#fff',
                        transition: 'border-color 0.2s ease',
                    },
                    '&:hover fieldset': {
                        borderColor: '#fff',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#00e676 !important',
                    },
                    color: '#fff',
                },
                '& .MuiSelect-icon': {
                    color: '#fff',
                },
            }}
        >
            <InputLabel>{label}</InputLabel>
            <Select
                sx={{height: "51px"}}
                value={value}
                label={label}
                onChange={onChange}
            >
                {items.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                        {item.value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectComponent;
