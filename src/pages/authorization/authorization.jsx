import React, { useState } from 'react';
import logo from '../../assets/logo/logo_emgek.png';
import { TextField } from "@mui/material";
import ButtonComponent from "../../components/button/button";
import { showSuccess, showError } from "../../utils/alerts";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../API/api";
import { setToken } from "../../API/token";
import './authorization.css';

const Authorization = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const parseJwt = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error('Ошибка парсинга JWT', e);
            return null;
        }
    };

    const handleLogin = async () => {
        if (!login || !password) {
            showError('Ошибка', 'Введите логин и пароль');
            return;
        }
        try {
            const response = await axiosInstance.post('auth/login', {
                username: login,
                password: password
            });

            const { accessToken, refreshToken } = response.data;

            if (accessToken && refreshToken) {
                setToken(accessToken, "accessToken");
                setToken(refreshToken, "refreshToken");
                const decoded = parseJwt(accessToken);
                if (decoded && decoded.fullName) {
                    localStorage.setItem("userName", decoded.fullName);
                }
                showSuccess('Вы успешно вошли!', `Добро пожаловать, ${decoded.fullName}`);
                navigate("/");
            } else {
                showError('Ошибка', 'Неверный формат ответа от сервера');
            }
        } catch (error) {
            console.error("Ошибка входа:", error);
            if (error.response?.status === 401) {
                showError('Ошибка авторизации', 'Неверный логин или пароль');
            } else {
                showError('Ошибка', 'Не удалось подключиться к серверу');
            }
        }
    };

    return (
        <div className="authorization-container">
            <div className="authorization-window">
                <div className="authorization-logo">
                    <div className="authorization-inputs">
                        <img src={logo} alt="logo" className="authorization-logo-imng" />
                        <TextField
                            id="login"
                            label="Логин"
                            variant="outlined"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            style={{ backgroundColor: "white" }}
                        />
                        <TextField
                            id="password"
                            label="Пароль"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ backgroundColor: "white" }}
                        />
                        <ButtonComponent
                            variant="outlined"
                            onClick={handleLogin}
                            text={'Войти'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authorization;
