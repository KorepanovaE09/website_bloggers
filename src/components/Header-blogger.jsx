import { Link, useLocation } from "react-router-dom";
import "../css/Style_Header_blogger.css";
import logo from "../assets/img/korad-promo.png";
import walletIcon from "../assets/img/wallet.png";
import { useState } from "react";

const Header = () => {
  const location = useLocation();

  return (
    <header>
      <div className="header-blogger-left">
        <img className="header_logo" src={logo} alt="Логотип"></img>

        <Link to="/">
          {/* <button className="btnbloggers">Каталог блогеров</button> */}
          <button
            className={`btn-header-left ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            {" "}
            КАТАЛОГ БЛОГЕРОВ{" "}
          </button>
        </Link>

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
      </div>

      <div className="header_right">
        <Link to="/balance">
          <button className="btn-line">
            <img className="img_balance" src={walletIcon} alt="Кошелек" />
            Баланс
          </button>
        </Link>
        <Link to="/profile">
          <button className="btn-profile">Имя пользователя</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
