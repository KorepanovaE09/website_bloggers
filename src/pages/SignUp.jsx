import "../css/Style_signUp.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";
import { useNavigate } from "react-router-dom";
import usePostData from "../hooks/usePostData";

const SignUp = () => {
  const navigate = useNavigate();

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

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;

    if (!formData.email) {
      setErrors({ ...errors, email: "* Поле обязательно для заполнения" });
      isValid = false;
    }
    if (!formData.password) {
      setErrors({ ...errors, password: "* Поле обязательно для заполнения" });
      isValid = false;
    }

    if (formData.password.length < 8) {
      setErrors({
        ...errors,
        password: "* Пароль должен быть больше 8 символов",
      });
      isValid = false;
    }
    return isValid;
  };

  const { postData, isLoading, error } = usePostData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log(formData);

    try {
      const response = await postData("/auth/signup", {
        user_email: formData.email,
        user_password: formData.password,
      });

      localStorage.setItem("token", response.refreshToken);
      // localStorage.setItem("userRole", userRole)
      navigate("/");
    } catch (err) {
      console.error("Ошибка при входе:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      document.querySelector(".SignUp-button").click();
      handleSubmit(e);
    }
  };

  return (
    <div className="SignUp-body">
      <div className="SignUp">
        <h1>Войти</h1>

        <form
          onSubmit={handleSubmit}
          className="SignUp-form"
          onKeyDown={handleKeyDown}
        >
          <div className="input-errors-group">
            <input
              type="email"
              name="email"
              placeholder="Электронная почта"
              value={formData.email}
              onChange={handleChange}
              className={`SignUp-input ${errors.email ? "error" : ""}`}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="input-errors-group">
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
            </div>
            {errors.password && (
              <p className="error-message"> {errors.password} </p>
            )}
          </div>

          <div>
            <button type="submit" className="SignUp-button">
              Войти
            </button>
          </div>
        </form>

        <Link to="/auth/login" className="SignUp-link">
          Нет аккаунта? Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
