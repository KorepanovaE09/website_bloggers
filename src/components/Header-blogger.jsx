import { Link, useLocation } from "react-router-dom";
import "../css/Style_Header_blogger.css";
import logo from "../assets/img/korad-promo.png";
import walletIcon from "../assets/img/wallet.png";
import UserRole from "./UserRole";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  return (
    <header>
      <div className="header-blogger-left">
        <img className="header_logo" src={logo} alt="Логотип"></img>

        <Link to="/">
          <button
            className={`btn-header-left ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            {" "}
            КАТАЛОГ БЛОГЕРОВ{" "}
          </button>
        </Link>

        {token && (
          <>
            <Link to="/channel">
              <button
                className={`btn-header-left ${
                  location.pathname === "/channel" ? "active" : ""
                }`}
              >
                МОИ КАНАЛЫ
              </button>
            </Link>

            <Link to="/orders">
              <button
                className={`btn-header-left ${
                  location.pathname === "/orders" ? "active" : ""
                }`}
              >
                ЗАКАЗЫ
              </button>
            </Link>
          </>
        )}
      </div>
      <UserRole/>

      <div className="header_right">
        {token ? (
          <Link to="/balance">
            <button className="btn-line">
              <img className="img_balance" src={walletIcon} alt="Кошелек" />
              Баланс
            </button>
          </Link>
        ) : (
          <Link to="/auth/login">
            <button className="btn-line">Создать аккаунт</button>
          </Link>
        )}
        <Link to="/profile">
          <button className="btn-profile">
            {" "}
            {token ? "Имя пользователя" : "Войти"}
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
