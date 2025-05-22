import { useState } from "react";
import "../css/Style_userRole.css"

const UserRole = () => {
  const [isBlogger, setIsBlogger] = useState(false);

  const handleRoleChange = (e) => {
    setIsBlogger(e.target.checked);
  };

  return (
    <div className="user-role">
      <span>Рекламодатель</span>
      <label className="switch">
        <input
          id="roleCheck"
          type="checkbox"
          checked={isBlogger}
          onChange={handleRoleChange}
        />
        <span className="slider"></span>
      </label>
      <span>Блогер</span>
    </div>
  );
};

export default UserRole;
