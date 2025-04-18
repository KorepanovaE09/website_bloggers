import "../css/Style_signUp.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

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
    <div className="SignUp-body">
      <div className="SignUp">
        <h1>Войти</h1>
        <input
          type="email"
          name="email"
          placeholder="Электронная почта"
          value={formData.email}
          onChange={handleChange}
          className="SignUp-input"
        />

        <div className="password-input">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            disableUnderline
            fullWidth
            sx={{
              "& .MuiInput-input": {
                paddingRight: "40px", // Оставляем место для иконки
              },
            }}
          />
          <IconButton
            className="password-icon"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
            size="small"
            sx={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            {showPassword ? (
              <Visibility fontSize="small" />
            ) : (
              <VisibilityOff fontSize="small" />
            )}
          </IconButton>
        </div>

        <Link to="/">
          <button className="SignUp-button">Войти</button>
        </Link>
        <Link to="/login" className="SignUp-link">
          Нет аккаунта? Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
