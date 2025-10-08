import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import "./sidebar.css";
import {logout} from "../../utils/logout";

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);

    const navItems = [
        { name: "СРМ", path: "/" },
        { name: "Статистика", path: "/statistics" },
    ];

    const handleLogout = () => {
        setIsOpen(false);
        navigate("/login");
        logout()
    };

    return (
        <>
            {/* Кнопка бургер */}
            <button
                className="menu-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="toggle menu"
            >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            {/* Затемнение фона */}
            {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}

            {/* Сайдбар */}
            <div className={`sidebar ${isOpen ? "open" : ""}`}>
                <h2 className="sidebar-title">Навигация</h2>
                <div className="sidebar-buttons">
                    {navItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => {
                                navigate(item.path);
                                setIsOpen(false);
                            }}
                            className={`sidebar-btn ${
                                location.pathname === item.path ? "active" : ""
                            }`}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>

                {/* Кнопка выхода */}
                <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={18} style={{ marginRight: "8px" }} />
                    Выйти
                </button>
            </div>
        </>
    );
}
