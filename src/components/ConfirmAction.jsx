import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import usePostData from "../hooks/usePostData";
import { useState } from "react";
import "../css/Style_confirmAction.css";
import { act } from "react";

const ConfirmAction = ({ onClose, action }) => {
  const { postData } = usePostData();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const handleSubmit = (e) => {
    e.preventDefault();
    action(password)
    onClose()
  };

  return (
    <div
      className="confirm-action-body"
      onClick={(e) => {
        if (e.target.classList.contains("confirm-action-body")) {
          onClose();
        }
      }}
    >
      <div className="confirm-action-content">
        <h1>Требуется подтверждение пароля</h1>
        <form onSubmit={handleSubmit}>
          <div className="password-input">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Введите пароль"
              disableUnderline
              onChange={(e) => setPassword(e.target.value)}
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

          <div className="save">
            <button>Отправить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmAction;
