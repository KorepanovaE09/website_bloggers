import "../css/Style_signUp.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prevData) => ({
        ...prevData,
        [name]: value
    }))
  };

  return (
    <div className="SignUp">
      <h1>Войти</h1>
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Пароль"
        value={formData.password}
        onChange={handleChange}
      />
      <Link to="/">
        <button>Войти</button>
      </Link>
      <Link to="/login">Нет аккаунта? Зарегистрироваться</Link>
    </div>
  );
};

export default SignUp;
