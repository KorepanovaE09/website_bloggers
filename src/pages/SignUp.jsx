import "../css/Style_signUp.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import usePostData from "../hooks/usePostData";
import {
  validateFormSignUp,
  signUpResponse_invalid_credentials,
} from "../utils/validateForm";
import Error from "../components/Error";
import Progress from "../components/Progress";

const SignUp = () => {
  const navigate = useNavigate();
  const { user, refetch } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    invalid_credentials: "",
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

  const { postData, isLoading, error } = usePostData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid } = validateFormSignUp(formData, setErrors);

    if (!isValid) return;

    try {
      await postData("/auth/signup", {
        user_email: formData.email,
        user_password: formData.password,
      });
      const user = await refetch();
      if (user?.role === "blogger") {
        navigate("/orders");
      } else navigate("/");
    } catch (err) {
      if (signUpResponse_invalid_credentials(err.response, setErrors)) {
        setShowError(true);

        return;
      }
      setShowError(true);
      console.error("Ошибка при входе:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      document.querySelector(".SignUp-button").click();
      handleSubmit(e);
    }
  };

  return (
    <>
      <div className="SignUp-body">
        <div className="SignUp">
          <h1>Войти</h1>

          <form
            onSubmit={handleSubmit}
            className="SignUp-form"
            onKeyDown={handleKeyDown}
          >
            <div className="input-errors-group">
                           <TextField
                type="email"
                name="email"
                label="Электронная почта"
                value={formData.email}
                onChange={handleChange}
                required
              />
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
                  className={
                    errors.password || errors.invalid_credentials ? "error" : ""
                  }
                  required
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
              {(errors.password || errors.invalid_credentials) && (
                <p className="error-message">
                  {errors.password} {errors.invalid_credentials}
                </p>
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
        {showError && (
          <Error onClose={() => setShowError(false)} style={{ top: "7px" }} />
        )}

        <div className="progress-container">{isLoading && <Progress />}</div>
      </div>
    </>
  );
};

export default SignUp;
