import "../css/Style_LogIn.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";

const LogIn = () => {
  const [activeButton, setActivebutton] = useState("advertiser");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleButtonClick = (buttonType) => {
    setActivebutton(buttonType);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <div className="LogIn-body">
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

          <PhoneInput
            country={"ru"}
            value={formData.phone}
            onChange={(phone) =>
              setFormData((prevData) => ({
                ...prevData,
                phone: phone,
              }))
            }
          />

          {/* <input
            type="tel"
            name="phone"
            placeholder="Телефон"
            value={formData.phone}
            onChange={handleChange}
          /> */}

          <div className="password-input">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              disableUnderline
            />
            <IconButton
              className="password-icon"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? (
                <Visibility fontSize="small" />
              ) : (
                <VisibilityOff fontSize="small" />
              )}
            </IconButton>
          </div>

          <div className="password-input">
            <Input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Повторите пароль"
              value={formData.confirmPassword}
              onChange={handleChange}
              disableUnderline
            />
            <IconButton
              className="password-icon"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? (
                <Visibility fontSize="small" />
              ) : (
                <VisibilityOff fontSize="small" />
              )}
            </IconButton>
          </div>

          <p>
            {" "}
            Нажимая на кнопку "Зарегистрироваться", вы соглашаетесь с
            Пользовательскими соглашениями и Политикой конфиденциальности
          </p>
          <button>Зарегистрироваться</button>
        </form>
        <Link to="/signup">Уже есть аккаунт? Войти</Link>
      </div>
    </div>
  );
};

export default LogIn;
