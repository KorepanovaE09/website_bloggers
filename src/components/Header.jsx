import { Link, useLocation } from "react-router-dom";
import "../css/Style_header.css";
import logo from "../assets/img/korad-promo.png";
import walletIcon from "../assets/img/wallet.png";
import UserRole from "./UserRole";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Header = () => {
  const location = useLocation();
  const { user, setUser, refetch, isLoading, activeRole, setActiveRole } =
    useContext(AuthContext);

  
  if (isLoading) return;

  return (
    <header>
      <div className="header-blogger-left">
        <img className="header_logo" src={logo} alt="Логотип"></img>

        {activeRole === "advertiser" && (
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
        )}

        {activeRole === "blogger" && (
          <Link to="/channel">
            <button
              className={`btn-header-left ${
                location.pathname === "/channel" ? "active" : ""
              }`}
            >
              МОИ КАНАЛЫ
            </button>
          </Link>
        )}

        {user && (
          <Link to="/orders">
            <button
              className={`btn-header-left ${
                location.pathname === "/orders" ? "active" : ""
              }`}
            >
              ЗАКАЗЫ
            </button>
          </Link>
        )}
      </div>

      <div className="header_right">
        {user ? (
          <>
            <UserRole
              user={user}
              activeRole={activeRole}
              setActiveRole={setActiveRole}
              refetch={refetch}
            />

            <Link to="/balance">
              <button className="btn-line">
                <img className="img_balance" src={walletIcon} alt="Кошелек" />
                {user.balance}
                <span className="rub-symbol">₽</span>
              </button>
            </Link>

            <Link to="/profile">
              <button className="btn-profile">
                {user.firstName} {user.lastName}
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/auth/login">
              <button className="btn-line">Создать аккаунт</button>
            </Link>
            <Link to="/auth/signup">
              <button className="btn-profile">Войти</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
