import React, { useState } from 'react';
import logo from '../../assets/logo/logo_emgek.png';
import { TextField, Button } from "@mui/material";
import { showSuccess, showError } from "../../utils/alerts";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../API/api";
import { setToken } from "../../API/token";
import './authorization.css';

const Authorization = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // === Распарсить JWT ===
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

    // === Авторизация ===
    const handleLogin = async (e) => {
        e.preventDefault();

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
                if (decoded) {
                    if (decoded.fullName) {
                        localStorage.setItem("userName", decoded.fullName);
                    }
                    if (decoded.authorities?.[0]) {
                        localStorage.setItem("userRole", decoded.authorities[0]); // 💾 сохраняем роль
                    }
                }

                showSuccess('Успешно', `Добро пожаловать, ${decoded?.fullName || "пользователь"}!`);
                navigate("/");
            } else {
                showError('Ошибка', 'Неверный ответ от сервера');
            }
        } catch (error) {
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
                <form
                    onSubmit={handleLogin}
                    className="authorization-inputs"
                    autoComplete="on"
                    noValidate
                >
                    <img src={logo} alt="logo" className="authorization-logo-imng" />

                    <TextField
                        id="login"
                        label="Логин"
                        name="username"
                        type="text"
                        variant="outlined"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        autoComplete="username"
                        fullWidth
                        style={{ backgroundColor: "white" }}
                    />

                    <TextField
                        id="password"
                        label="Пароль"
                        name="password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        fullWidth
                        style={{ backgroundColor: "white" }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Войти
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Authorization;
