import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import "../css/Style_changePassword.css";
import usePostData from "../hooks/usePostData";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { postData, isLoading, error, data } = usePostData();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    newPassword: "",
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Пароль должен быть не менее 8 символов";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await postData("user/change_password", formData);
      navigate("/profile");
    } catch (err) {
      console.log("Ошибка смена пароля", err);
      if (err.response?.status === 401) {
        setErrors({
          password: "Неверный пароль",
        });
      }
    }
  };

  return (
    <div className="change-password-body">
      <div className="change-password-content">
        <h1>Смена пароля</h1>
        <form onSubmit={handleSubmit}>
          <div className="password-input">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Введите старый пароль"
              disableUnderline
              onChange={handleChange}
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
              <p className="error-mesage">{errors.password}</p>
            )}
          </div>

          <div className="password-input">
            <Input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              placeholder="Введите новый пароль"
              disableUnderline
              onChange={handleChange}
              className={errors.newPassword ? "error" : ""}
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
            {errors.newPassword && (
              <p className="error-message">{errors.newPassword}</p>
            )}
          </div>

          <div className="save">
            <button>Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
