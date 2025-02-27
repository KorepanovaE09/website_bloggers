import { Link, useLocation } from "react-router-dom";
import "../css/Style_Header_blogger.css";
import logo from "../assets/img/korad-promo.png";
import walletIcon from "../assets/img/wallet.png";
import { useState } from "react";

const Header = () => {
  const location = useLocation()

  return (
    <header>
      <div className="header-blogger-left">
        <img className="header_logo" src={logo} alt="Логотип"></img>
      
        <Link to = "/">
        {/* <button className="button_bloggers">Каталог блогеров</button> */}
          <button className={`button_bloggers ${location.pathname === "/" ? "active" : ""}`}> КАТАЛОГ БЛОГЕРОВ </button>
        </Link>

        <Link to="/channel">
          <button className={`button_channel ${location.pathname === "/channel" ? "active" : ""}`}>МОИ КАНАЛЫ</button>
        </Link>
      </div>
      <div className="header_right">
        <Link to="/balance">
          <button className="button_line">
            <img className="img_balance" src={walletIcon} alt="Кошелек" />
            Баланс
          </button>
        </Link>
        <Link to="/profile">
          <button className="button_profile">Имя пользователя</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
