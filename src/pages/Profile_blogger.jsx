import "../css/Style_profile_blogger.css";
import foto from "D:\\ПОЛИТЕХ\\ДИПЛОМ\\website\\src\\assets\\img\\1.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [img, setImg] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(URL.createObjectURL(file));
    }
  };

  return (
    <div className="Profile">
      <div className="Profile_title">
        <h1>Настройки профиля</h1>
      </div>
      <div className="ProfileSettings">
        <div className="ProfileSettings_top">
          <div className="ProfileSettings_avatar">
            <img src={img || foto} alt="avatar"></img>
            <a
              href="#"
              onClick={() => document.getElementById("fileInput").click()}
            >
              Загрузить фото
            </a>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="Profile_exit">
            <Link to="/signup">
              <button>Выйти</button>
            </Link>
          </div>
        </div>
        <div className="ProfileSettings_description">
          <div>
            <p>Имя</p>
            <input type="text"></input>
          </div>
          <div>
            <p>Фамилия</p>
            <input type="text"></input>
          </div>
          <div>
            <p>Номер телефона</p>
            <input type="text"></input>
          </div>
          <div>
            <p>E-mail</p>
            <input type="text"></input>
          </div>
          <div className="Profile_save">
            <button>Сохранить</button>
          </div>
        </div>
        <div className="change-password">
          <a href="#">Сменить пароль</a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
