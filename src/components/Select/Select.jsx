import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const SelectComponent = ({value, label, onChange, items, width, height}) => {
    return (
        <>
            {/*<InputLabel id={id}>{label}</InputLabel>*/}
            <Select
                style={{ width: width, height: height }}
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