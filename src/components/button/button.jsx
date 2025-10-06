import React from 'react';
import {Button} from "@mui/material";

const ButtonComponent = (props) => {

    const { variant, onClick, text } = props;

    return (
        <Button variant={variant} onClick={onClick}>{text}</Button>
    );
};

export default ButtonComponent;