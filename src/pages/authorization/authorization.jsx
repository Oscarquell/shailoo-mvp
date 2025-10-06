import React from 'react';
import './authorization.css'
import logo from '../../assets/logo/logo_emgek.png'
import {Button, TextField} from "@mui/material";
import ButtonComponent from "../../components/button/button";


const Authorization = () => {

    const test = () => {
        console.log('test');
    }

    return (
    <div className="authorization-container">
        <div className="authorization-window">
            <div className="authorization-logo">
                <div className="authorization-inputs">
                    <img src={logo} alt="" className="authorization-logo-imng"/>
                    <TextField id="outlined-basic" label="Логин" variant="outlined" />
                    <TextField id="outlined-password-input"  label="Пароль" type="password" autoComplete="current-password" />
                    {/*<Button variant="outlined" onClick={test}>Войти</Button>*/}
                    <ButtonComponent
                        variant="outlined"
                        onClick={test}
                        text={'Войти'}
                    />
                </div>
            </div>
        </div>
    </div>

    );
};

export default Authorization;