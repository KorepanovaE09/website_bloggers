import "../css/Style_profile_blogger.css";

import { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [img, setImg] = useState(null);
  const [activeButton, setActivebutton] = useState("profile");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(URL.createObjectURL(file));
    }
  };

  const handleButtonClick = (buttonType) => {
    setActivebutton(buttonType);
  };

  return (
    <div className="Profile_blogger">
      <div className="type-settings">
        <button
          className={activeButton === "profile" ? "active" : ""}
          onClick={() => handleButtonClick("profile")}
        >
          Профиль
        </button>
        <button
          className={activeButton === "channel" ? "active" : ""}
          onClick={() => handleButtonClick("channel")}
        >
          Каналы
        </button>

        {activeButton === "channel" && (
          <div className="aaa">
            <h1>fghfuhslsh</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
