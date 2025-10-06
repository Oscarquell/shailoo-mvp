import React from 'react';
import {Button} from "@mui/material";

const ButtonComponent = (props) => {

    const { variant, onClick, text, style } = props;

    return (
        <Button variant={variant} onClick={onClick} style={style}>{text}</Button>
    );
};

export default ButtonComponent;