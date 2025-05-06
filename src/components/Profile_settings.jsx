import "../css/Style_profile_settings.css";
import { useEffect, useState } from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import useData from "../hooks/useData";
import usePostData from "../hooks/usePostData";
import countryCityData from "../mockData/countryCityData";
import { useConfirmModal } from "../context/ConfirmModalContext";

const Profile = () => {
  // const [selectedCountry, setSelectedCountry] = useState();
  // const [selectedCity, setSelectedSity] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { data, isLoading, isError, error } = useData("/profile", true);
  const { postData, postIsLoading, postError } = usePostData();
  const { showConfirmModal } = useConfirmModal();
  const [img, setImg] = useState(null);
  const [profileData, setProfileData] = useState({
    img: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    country: "",
    city: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/auth/signup", { replace: true });
      return;
    }

    if (data) {
      setProfileData({
        ...data,
        // img: data.img || "",
        // firstName: data.firstName,
        // lastName: data.lastName,
        // phone: data.phone,
        // email: data.email,
        // country: data.country,
        // city: data.city,
      });
    }
  }, [data, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(URL.createObjectURL(file));
    }
  };

  const handleChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChange = async () => {
    try {
      await postData("/save-setting", {
        token,
        ...data,
      });
    } catch (err) {
      console.log("Ошибка при сохранении данных", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/signup");
  };

  const handleModalLogout = () => {
    showConfirmModal({
      title: "Выход",
      message: "Вы уверены, что хотите выйти?",
      onConfirm: () => handleLogout(),
    });
  };

  return (
    <div className="Profile">
      <div className="Profile_title">
        <h1>Настройки профиля</h1>
      </div>

      <div className="ProfileSettings">
        <div className="ProfileSettings_top">
          <div className="ProfileSettings_avatar">
            <img src={img || "/img/1.jpg"} alt="avatar"></img>
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
            {/* <Link to="/auth/signup"> */}
            <button onClick={() => handleModalLogout()}>Выйти</button>
            {/* </Link> */}
          </div>
        </div>
        <div className="ProfileSettings_description">
          <div>
            <input
              type="text"
              placeholder="Имя"
              value={profileData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            ></input>
          </div>
          <div>
            <input
              type="text"
              placeholder="Фамилия"
              value={profileData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            ></input>
          </div>

          <div>
            <input
              type="text"
              placeholder="Номер телефона"
              value={profileData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            ></input>

            {/* <PhoneInput
              country={"ru"}
              value=""
              /> */}
          </div>

          <div>
            <input
              type="text"
              placeholder="E-mail"
              value={profileData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            ></input>
          </div>

          <div className="prifile-settings-country">
            <select
              name="country"
              value={profileData.country}
              onChange={(e) => {
                handleChange("country", e.target.value);
                // setSelectedSity("");
              }}
            >
              <option value="" disabled>
                Выберите страну
              </option>
              {Object.keys(countryCityData).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {profileData.country && (
            <div className="prifile-settings-country">
              <select
                name="city"
                value={profileData.city}
                onChange={(e) => handleChange("city", e.target.value)}
              >
                <option value="" disabled>
                  {" "}
                  Выберите город
                </option>
                {countryCityData[profileData.country].map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="Profile_save">
            <button onClick={handleSaveChange}>Сохранить</button>
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

// typeUser === "blogger" ? (
// ) : (
//   <div className="Profile">
//     <div className="Profile_title">
//       <h1>Настройки профиля</h1>
//     </div>
// <div className="ProfileSettings">
//   <div className="ProfileSettings_top">
//     <div className="ProfileSettings_avatar">
//       <img src={img || "/img/1.jpg"} alt="avatar"></img>
//       <a
//         href="#"
//         onClick={() => document.getElementById("fileInput").click()}
//       >
//         Загрузить фото
//       </a>
//       <input
//         id="fileInput"
//         type="file"
//         style={{ display: "none" }}
//         accept="image/*"
//         onChange={handleImageChange}
//       />
//     </div>

//     <div className="Profile_exit">
//       <Link to="/auth/signup">
//         <button>Выйти</button>
//       </Link>
//     </div>
//   </div>
//   <div className="ProfileSettings_description">
//     <div>
//       <p>Имя</p>
//       <input type="text"></input>
//     </div>
//     <div>
//       <p>Фамилия</p>
//       <input type="text"></input>
//     </div>
//     <div>
//       <p>Номер телефона</p>
//       <input type="text"></input>
//     </div>
//     <div>
//       <p>E-mail</p>
//       <input type="text"></input>
//     </div>
//     <div className="Profile_save">
//       <button>Сохранить</button>
//     </div>
//   </div>
// <div className="change-password">
//   <a href="#">Сменить пароль</a>
// </div>
// </div>
//   </div>
