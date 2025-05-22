import "../css/Style_profile_settings.css";
import { useEffect, useState } from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import useData from "../hooks/useData";
import usePostData from "../hooks/usePostData";
import { useConfirmModal } from "../context/ConfirmModalContext";
import Loader from "./Loader";
import ChangePassword from "../pages/ChangePassword";

const Profile = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch } = useData("/user/profile");
  const { data: dataLocation } = useData("/data/locations");
  const { postData, postIsLoading, postError } = usePostData();
  const { showConfirmModal } = useConfirmModal();
  const [img, setImg] = useState(null);
  const [profileData, setProfileData] = useState({
    user_avatar_url: "",
    user_firstname: "",
    user_lastname: "",
    user_nickname: "",
    // user_phone_code: "",
    user_phone: "",
    user_email: "",
    user_country: "",
    user_city: "",
  });

  useEffect(() => {
    // if (!token) {
    //   navigate("/auth/signup", { replace: true });
    //   return;
    // }

    if (data?.user) {
      setProfileData({
        ...data.user,
      });
    }
  }, [data]);

  const handleChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChange = async () => {
    try {
      let payload;

      if (profileData.user_avatar_url instanceof File) {
        payload = new FormData();
        for (const key in profileData) {
          payload.append(key, profileData[key]);
        }
      } else {
        payload = { ...profileData };
      }

      await postData("/user/edit_profile", payload);
      await refetch();
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

  if (!data || isLoading) {
    return <Loader />;
  }

  return (
    <div className="Profile">
      <div className="Profile_title">
        <h1>Настройки профиля</h1>
      </div>

      <div className="ProfileSettings">
        <div className="ProfileSettings_top">
          <div className="ProfileSettings_avatar">
            <img
              src={
                typeof profileData.user_avatar_url === "string"
                  ? profileData.user_avatar_url
                  : profileData.user_avatar_url
                  ? URL.createObjectURL(profileData.user_avatar_url)
                  : ""
              }
              alt="avatar"
            ></img>
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
              onChange={(e) =>
                handleChange("user_avatar_url", e.target.files[0])
              }
            />
          </div>

          <div className="Profile_exit">
            {/* <Link to="/auth/signup"> */}
            <input
              type="text"
              placeholder="Никнейм"
              value={profileData.user_nickname}
              onChange={(e) => handleChange("user_nickname", e.target.value)}
            />
            <button onClick={() => handleModalLogout()}>Выйти</button>
            {/* </Link> */}
          </div>
        </div>
        <div className="ProfileSettings_description">
          <div>
            <input
              type="text"
              placeholder="Имя"
              value={profileData.user_firstname}
              onChange={(e) => handleChange("user_firstname", e.target.value)}
            ></input>
          </div>
          <div>
            <input
              type="text"
              placeholder="Фамилия"
              value={profileData.user_lastname}
              onChange={(e) => handleChange("user_lastname", e.target.value)}
            ></input>
          </div>

          <div>
            <PhoneInput
              country={"ru"}
              value={profileData.user_phone}
              onChange={(phone) => handleChange("user_phone", phone)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="E-mail"
              value={profileData.user_email}
              onChange={(e) => handleChange("user_email", e.target.value)}
            ></input>
          </div>

          <div className="prifile-settings-country">
            <select
              name="user_country"
              value={profileData?.user_country}
              onChange={(e) => {
                handleChange("user_country", e.target.value);
                // setSelectedSity("");
              }}
            >
              <option value="" disabled>
                Страна
              </option>
              {dataLocation?.locations &&
                Object.keys(dataLocation?.locations).map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
            </select>
          </div>

          {profileData.user_country &&
            dataLocation.locations &&
            dataLocation.locations[profileData.user_country] && (
              <div className="prifile-settings-country">
                <select
                  name="user_city"
                  value={profileData?.user_city}
                  onChange={(e) => handleChange("user_city", e.target.value)}
                >
                  <option value="" disabled>
                    {" "}
                    Город
                  </option>
                  {dataLocation?.locations[profileData.user_country].map(
                    (city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}

          <div className="save">
            <button onClick={handleSaveChange}>Сохранить</button>
          </div>
        </div>
        <div className="change-password">
          <Link
            to="/change-password"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Сменить пароль
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
