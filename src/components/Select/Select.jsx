import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const SelectComponent = ({value, label, onChange, items, style}) => {
    return (
        <>
            {/*<InputLabel id={id}>{label}</InputLabel>*/}
            <Select
                style={style}
                value={value}
                label={label}
                onChange={onChange}
                variant={"filled"}
            >
                {items.map((item) =>
                    <MenuItem value={item.id}>{item.value}</MenuItem>
                )}
            </Select>
        </>
    );
};

export default SelectComponent;