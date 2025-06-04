import { useState, useEffect, useContext, useRef } from "react";
import "../css/Style_userRole.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const UserRole = ({ user, activeRole, setActiveRole, refetch }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleChange = async (e) => {
    const newRole = e.target.checked ? "blogger" : "advertiser";
    setActiveRole(newRole);
    localStorage.setItem("activeRole", newRole);

    if (newRole === "advertiser") {
      if (location.pathname.includes("/channel")) {
        navigate("/");
      } else {
        console.log("Обновляем");
        await refetch()
      }
    }

    if (newRole === "blogger") {
      if (location.pathname.includes("/")) {
        navigate("/orders");
      } else {
        await refetch()
        console.log("Обновляем");
      }
    }
  };

  const prevRole = useRef();

  useEffect(() => {
    if (user?.role === "blogger") {
      setActiveRole(localStorage.getItem("activeRole") || "blogger");
      // navigate("/orders")
    } else if (user?.role === "advertiser") {
      // navigate("/");
    }
  }, [user?.role]);

  if (user?.role === "advertiser") return null;

  return (
    <div className="user-role">
      <span>Рекламодатель</span>
      <label className="switch">
        <input
          id="roleCheck"
          type="checkbox"
          checked={activeRole === "blogger"}
          onChange={handleRoleChange}
        />
        <span className="slider"></span>
      </label>
      <span>Блогер</span>
    </div>
  );
};

export default UserRole;
