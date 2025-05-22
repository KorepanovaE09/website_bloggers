import "../css/Style_LogIn.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import usePostData from "../hooks/usePostData";
import useData from "../hooks/useData";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";
import { useNavigate } from "react-router-dom";
import countryCityData from "../mockData/countryCityData";

const LogIn = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useData("/data/location");
  const {postData, isLoading : postIsLoading, error : postError } = usePostData();
  const [activeButton, setActivebutton] = useState("advertiser");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [formData, setFormData] = useState({
    userType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "",
    // country: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "password",
      "confirmPassword",
    ];

    const newErrors = { ...errors };

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "* Поле обязательно для заполнения";
        isValid = false;
      } else {
        newErrors[field] = "";
      }
    });

    if (formData.password) {
      if (formData.password.length < 8) {
        newErrors.password = "* Пароль должен быть больше 8 символов";
        isValid = false;
      }
    }

    if (formData.password && formData.confirmPassword) {
      if (formData.password != formData.confirmPassword) {
        newErrors.confirmPassword = "* Пароли не совпадают";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const responce = await postData("/auth/login", {
        ...formData,
        userType: activeButton,
      });
      localStorage.setItem("token", responce.token);
      // localStorage.setItem("userRole", userRole)
      navigate("/");
    } catch (err) {
      console.log("Ошибка при регистрации", err);
    }
  };

  const handleButtonClick = (buttonType) => {
    setActivebutton(buttonType);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
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
        <form
          className="logIn_form"
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
        >
          <div className="input-errors-group">
            <input
              type="text"
              name="firstName"
              placeholder="Имя"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? "error" : ""}
            />
            {errors.firstName && (
              <p className="error-message">{errors.firstName}</p>
            )}
          </div>

          <div className="input-errors-group">
            <input
              type="text"
              name="lastName"
              placeholder="Фамилия"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? "error" : ""}
            />
            {errors.lastName && (
              <p className="error-message">{errors.lastName}</p>
            )}
          </div>

          <div className="input-errors-group">
            <input
              type="email"
              name="email"
              placeholder="Электронная почта"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="input-errors-group">
            <PhoneInput
              country={"ru"}
              value={formData.phone}
              onChange={(phone, countryData) => {
                setFormData((prevData) => ({
                  ...prevData,
                  phone: phone,
                  countryCode: countryData?.dialCode || "",
                }));
                if (errors.phone) {
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    phone: "",
                  }));
                }
              }}
              inputClass={errors.phone ? "error" : ""}
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>

          <div className="prifile-settings-country">
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="" disabled>
                Выберите страну
              </option>
              {Object.keys(data?.locations || countryCityData).map(
                (country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                )
              )}
            </select>
          </div>

          {formData.country && (
            <div className="prifile-settings-country">
              <select name="city" value={formData.city} onChange={handleChange}>
                <option value="" disabled>
                  {" "}
                  Выберите город
                </option>
                {(
                  data?.locations?.[formData.country] ||
                  countryCityData[formData.country]
                ).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="password-input">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              disableUnderline
              className={errors.password ? "error" : ""}
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
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <div className="password-input">
            <Input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Повторите пароль"
              value={formData.confirmPassword}
              onChange={handleChange}
              disableUnderline
              className={errors.confirmPassword ? "error" : ""}
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
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
          </div>

          <p className="logIn-text">
            {" "}
            Нажимая на кнопку "Зарегистрироваться", вы соглашаетесь с
            Пользовательскими соглашениями и Политикой конфиденциальности
          </p>
          <button type="submit">Зарегистрироваться</button>
        </form>
        <Link to="/auth/signup">Уже есть аккаунт? Войти</Link>
      </div>
    </div>
  );
};

export default LogIn;
