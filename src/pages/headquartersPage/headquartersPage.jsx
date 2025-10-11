import React, { useEffect, useState } from "react";
import "./headquartersPage.css";
import { axiosInstance } from "../../API/api";
import { showError, showSuccess } from "../../utils/alerts";
import { Edit2, Trash2, Plus } from "lucide-react";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import { TextField, Button } from "@mui/material";
import {useNavigate} from "react-router-dom";

const HeadquartersPage = () => {
    const [headquarter, setHeadquarter] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
    });

    const navigate = useNavigate();

    // === Проверка роли ===
    useEffect(() => {
        const role = localStorage.getItem("userRole");
        if (role !== "ROLE_ADMIN") {
            showError("Доступ запрещён", "У вас нет прав для просмотра этой страницы");
            navigate("/"); // редирект на главную
        }
    }, [navigate]);

    const getHeadquarter = async () => {
        try {
            const response = await axiosInstance.get("admin/users");
            const data = response.data.data;

            // ✅ Сортировка: сначала ADMIN, потом AGITATOR
            const sortedData = [...data].sort((a, b) => {
                const roleA = a.roles?.[0] || "";
                const roleB = b.roles?.[0] || "";
                if (roleA === "ADMIN" && roleB !== "ADMIN") return -1;
                if (roleA !== "ADMIN" && roleB === "ADMIN") return 1;
                return 0;
            });

            setHeadquarter(sortedData);
        } catch (error) {
            showError("Ошибка", `Ошибка при загрузке штаба: ${error}`);
        }
    };

    useEffect(() => {
        getHeadquarter();
    }, []);

    // === Удаление пользователя ===
    const handleDelete = async (id) => {
        if (!window.confirm("Удалить этого пользователя?")) return;
        try {
            await axiosInstance.delete(`admin/users/${id}`);
            showSuccess("Успешно", "Пользователь удалён");
            getHeadquarter();
        } catch (error) {
            showError("Ошибка", "Не удалось удалить пользователя");
        }
    };

    // === Изменение роли ===
    const handleRoleToggle = async (user) => {
        const currentRole = user.roles[0];
        const newRole = currentRole === "ADMIN" ? "AGITATOR" : "ADMIN";
        if (!window.confirm(`Изменить роль на ${newRole}?`)) return;

        try {
            await axiosInstance.put(`admin/users/${user.id}/role`, { role: newRole });
            showSuccess("Успешно", `Роль изменена на ${newRole}`);
            getHeadquarter();
        } catch (error) {
            showError("Ошибка", "Не удалось изменить роль");
        }
    };

    // === Создание нового пользователя ===
    const handleCreateUser = async (e) => {
        e.preventDefault();

        if (!newUser.username || !newUser.firstName || !newUser.lastName || !newUser.password) {
            showError("Ошибка", "Заполните все поля");
            return;
        }

        try {
            await axiosInstance.post("admin/users", newUser);
            showSuccess("Успешно", "Пользователь создан");
            setIsModalOpen(false);
            setNewUser({ username: "", firstName: "", lastName: "", password: "" });
            getHeadquarter();
        } catch (error) {
            showError("Ошибка", "Не удалось создать пользователя");
        }
    };

    return (
        <div className="headquarters-container">
            <h2 className="page-title">ШТАБ — СПИСОК СОТРУДНИКОВ</h2>

            <div className="cards-container">
                {headquarter.map((person) => (
                    <div key={person.id} className="person-card">
                        <div className="avatar-circle">
                            {person.firstName[0]}
                            {person.lastName[0]}
                        </div>

                        <div className="person-info">
                            <p className="person-name">
                                {person.firstName} {person.lastName}
                            </p>
                            <p className="person-username">@{person.username}</p>
                            <p className={`person-role ${person.roles[0].toLowerCase()}`}>
                                {person.roles[0] === "ADMIN"
                                    ? "Администратор"
                                    : "Сотрудник"}
                            </p>

                            {/* Кнопки действий */}
                            <div className="card-actions">
                                <button
                                    className="edit-btn"
                                    onClick={() => handleRoleToggle(person)}
                                    title="Изменить роль"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(person.id)}
                                    title="Удалить пользователя"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* ➕ Карточка добавления нового пользователя */}
                <div className="person-card add-card" onClick={() => setIsModalOpen(true)}>
                    <div className="add-content">
                        <Plus size={40} />
                        <p>Добавить пользователя</p>
                    </div>
                </div>
            </div>

            {/* === Модалка создания пользователя === */}
            <ModalWindow
                isOpened={isModalOpen}
                setIsOpened={setIsModalOpen}
                width={40}
                height={65}
                marginTop="10vh"
            >
                <form
                    onSubmit={handleCreateUser}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        padding: "20px",
                    }}
                >
                    <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
                        Создать нового пользователя
                    </h3>

                    <TextField
                        label="Логин"
                        variant="outlined"
                        value={newUser.username}
                        onChange={(e) =>
                            setNewUser({ ...newUser, username: e.target.value })
                        }
                        required
                        fullWidth
                    />

                    <TextField
                        label="Имя"
                        variant="outlined"
                        value={newUser.firstName}
                        onChange={(e) =>
                            setNewUser({ ...newUser, firstName: e.target.value })
                        }
                        required
                        fullWidth
                    />

                    <TextField
                        label="Фамилия"
                        variant="outlined"
                        value={newUser.lastName}
                        onChange={(e) =>
                            setNewUser({ ...newUser, lastName: e.target.value })
                        }
                        required
                        fullWidth
                    />

                    <TextField
                        label="Пароль"
                        variant="outlined"
                        type="password"
                        value={newUser.password}
                        onChange={(e) =>
                            setNewUser({ ...newUser, password: e.target.value })
                        }
                        required
                        fullWidth
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        style={{ fontWeight: 600 }}
                    >
                        Создать
                    </Button>
                </form>
            </ModalWindow>
        </div>
    );
};

export default HeadquartersPage;
