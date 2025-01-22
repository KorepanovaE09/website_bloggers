import "../css/Style_LogIn.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const LogIn = () => {
  const [activeButton, setActiveButtom] = useState("advertiser");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleButtonClick = (buttonType) => {
    setActiveButtom(buttonType);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="LogIn">
      <h1>Регистрация</h1>
      <div className="TypeLogIn">
        <button
          className={activeButton === "advertiser" ? "active" : ""}
          onClick={() => handleButtonClick("advertiser")}
        >
          Рекламодатель
        </button>
        <button
          className={activeButton === "blogger" ? "active" : ""}
          onClick={() => handleButtonClick("blogger")}
        >
          Блогер
        </button>
      </div>
        <form className="logIn_form">
          <input
            type="text"
            name="firstName"
            placeholder="Имя"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Фамилия"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Электронная почта"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Телефон"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Повторите пароль"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <p>
            {" "}
            Нажимая на кнопку “Зарегистрироваться”, вы соглашаетесь с
            Пользовательскими соглашениями и Политикой конфиденциальности
          </p>
          <button>Зарегистрироваться</button>
        </form>
        <Link to="/signup">Уже есть аккаунт? Войти</Link>
    </div>
  );
};

export default LogIn;
