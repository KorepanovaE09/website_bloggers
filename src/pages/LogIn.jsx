import "../css/Style_LogIn.css";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import usePostData from "../hooks/usePostData";
import useData from "../hooks/useData";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { validateFormLogin, validateFormUnique } from "../utils/validateForm";
import Error from "../components/Error";

const LogIn = () => {
  const navigate = useNavigate();
  const { refetch } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const { data, isLoading, isError, error } = useData("/data/locations");
  const {
    postData,
    isLoading: postIsLoading,
    error: postError,
  } = usePostData();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    unique: "",
  });

  const [formData, setFormData] = useState({
    userType: "advertiser",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid } = validateFormLogin(formData, setErrors);
    if (!isValid) return;

    try {
      await postData("/auth/login", {
        ...formData,
      });
      await refetch();
      navigate("/");
    } catch (err) {
      setShowError(true)
      if (validateFormUnique(err, setErrors)) return;
    }
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
            className={formData.userType === "advertiser" ? "active" : ""}
            name="userType"
            value="advertiser"
            onClick={() =>
              handleChange({
                target: { name: "userType", value: "advertiser" },
              })
            }
          >
            Рекламодатель
          </button>
          <button
            className={formData.userType === "blogger" ? "active" : ""}
            name="userType"
            value="blogger"
            onClick={() =>
              handleChange({ target: { name: "userType", value: "blogger" } })
            }
          >
            Блогер
          </button>
        </div>
        <form
          className="logIn_form"
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
        >
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="Имя"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Фамилия"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Электронная почта"
              value={formData.email}
              onChange={handleChange}
              className={errors.unique ? "error" : ""}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div>
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
              inputClass={errors.phone || errors.unique ? "error" : ""}
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
              {Object.keys(data?.locations || []).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {formData.country && (
            <div className="prifile-settings-country">
              <select name="city" value={formData.city} onChange={handleChange}>
                <option value="" disabled>
                  {" "}
                  Выберите город
                </option>
                {(data?.locations?.[formData.country] || []).map((city) => (
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
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
          </div>

          {errors.unique && <p className="error-message">{errors.unique}</p>}

          <p className="logIn-text">
            {" "}
            Нажимая на кнопку "Зарегистрироваться", вы соглашаетесь с
            Пользовательскими соглашениями и Политикой конфиденциальности
          </p>
          <button type="submit">Зарегистрироваться</button>
        </form>
        <Link to="/auth/signup">Уже есть аккаунт? Войти</Link>
      </div>
      {showError && (
        <Error onClose={() => setShowError(false)} style={{ top: "7px" }}/>
      )}
    </div>
  );
};

export default LogIn;
