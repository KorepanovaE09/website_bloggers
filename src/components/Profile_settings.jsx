import "../css/Style_profile_settings.css";
import { useEffect, useState } from "react";
import { Link, replace, useNavigate, useLocation } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import useData from "../hooks/useData";
import usePostData from "../hooks/usePostData";
import { useConfirmModal } from "../context/ConfirmModalContext";
import Loader from "./Loader";
import Success from "./Success";
import Error from "./Error";
import {
  validateFormProfileUnique,
} from "../utils/validateForm";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading, isError, error, refetch } = useData(
    "/user/profile",
    true
  );
  const { data: dataLocation } = useData("/data/locations");
  const { data: dataCategories } = useData("/data/categories");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const { postData, postIsLoading, postError } = usePostData();
  const { showConfirmModal } = useConfirmModal();
  const [profileData, setProfileData] = useState({
    user_avatar_url: "",
    user_firstname: "",
    user_lastname: "",
    user_nickname: "",
    user_phone_code: "",
    user_phone: "",
    user_email: "",
    user_country: "",
    user_city: "",
    user_category_name: "",
  });
  const [errors, setErrors] = useState({
    user_firstname: "",
    user_lastname: "",
    user_nickname: "",
    user_phone: "",
    user_email: "",
    unique: "",
  });

  useEffect(() => {
    if (data?.user) {
      setProfileData(data.user);
    }
  }, [data]);

 

  useEffect(() => {
    const state = location.state;
    if (state && typeof state.passwordChange !== "undefined") {
      if (state.passwordChange) {
        setShowSuccess(true);
      } else {
        setShowError(true);
      }
      window.history.replaceState({}, document.title);
    }
  }, []);

  const handleChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
      unique:
        field === "user_nickname" ||
        field === "user_email" ||
        field === "user_phone"
          ? ""
          : prev.unique,
    }));
  };

  const handleSaveChange = async () => {
    let payload;
    if (profileData.user_avatar_url instanceof File) {
      payload = new FormData();
      for (const key in profileData) {
        payload.append(key, profileData[key]);
      }
    } else {
      payload = { ...profileData };
    }

    try {
      await postData("/user/edit-profile", payload);
      await refetch();
      setShowSuccess(true);
    } catch (err) {
      if (validateFormProfileUnique(err, setErrors)) return;
      console.log("Ошибка при сохранении данных", err);
    }
  };

  const handleLogout = async () => {
    try {
      await postData("/auth/logout", {});
      navigate("/auth/signup", { replace: true, state: null });
      localStorage.clear();
    } catch (err) {
      console.log("Ошибка при выходе", err);
    }
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

  console.log(profileData.user_phone);

  return (
    <div className="Profile_body">
      <div className="Profile">
        <div className="Profile_title">
          <h1>Настройки профиля</h1>
        </div>

        <div className="ProfileSettings">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveChange();
            }}
          >
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
                <div className="username-conteiner">
                  <input
                    className={
                      errors.unique || errors.user_nickname ? "error" : ""
                    }
                    required
                    id="inputField"
                    placeholder="Username"
                    type="text"
                    value={profileData.user_nickname}
                    onChange={(e) =>
                    handleChange("user_nickname", e.target.value)
                  }
                  />
                  <label class="usernameLabel" for="inputField">
                    Username
                  </label>
                  <svg viewBox="0 0 448 512" class="userIcon">
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path>
                  </svg>
                </div>

                {errors.user_nickname && (
                  <p className="error-message">{errors.user_nickname}</p>
                )}
                <button class = "btn-line" type="button" onClick={() => handleModalLogout()}>
                  Выйти
                </button>
              </div>
            </div>
            <div className="ProfileSettings_description">
              <div className="input-errors-group">
                <input
                  type="text"
                  placeholder="Имя"
                  className={errors.user_firstname ? "error" : ""}
                  value={profileData.user_firstname}
                  onChange={(e) =>
                    handleChange("user_firstname", e.target.value)
                  }
                  required
                ></input>
                {errors.user_firstname && (
                  <p className="error-message">{errors.user_firstname}</p>
                )}
              </div>

              <div className="input-errors-group">
                <input
                  type="text"
                  className={errors.user_lastname ? "error" : ""}
                  placeholder="Фамилия"
                  value={profileData.user_lastname}
                  onChange={(e) =>
                    handleChange("user_lastname", e.target.value)
                  }
                  required
                ></input>
                {errors.user_lastname && (
                  <p className="error-message">{errors.user_lastname}</p>
                )}
              </div>

              <div className="input-errors-group">
                {profileData.user_phone && (
                  <PhoneInput
                    country={profileData?.user_phone_code}
                    value={profileData.user_phone}
                    onChange={(phone) => handleChange("user_phone", phone)}
                    className={
                      errors.unique || errors.user_phone ? "error" : ""
                    }
                    required
                  />
                )}

                {errors.user_phone && (
                  <p className="error-message">{errors.user_phone}</p>
                )}
              </div>

              <div className="input-errors-group">
                <input
                  type="text"
                  className={errors.unique || errors.user_email ? "error" : ""}
                  placeholder="E-mail"
                  value={profileData.user_email}
                  onChange={(e) => handleChange("user_email", e.target.value)}
                  required
                ></input>
                {errors.user_email && (
                  <p className="error-message">{errors.user_email}</p>
                )}
              </div>

              <div className="prifile-settings-country">
                <select
                  name="user_country"
                  value={profileData?.user_country}
                  onChange={(e) => {
                    handleChange("user_country", e.target.value);
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

              {dataLocation?.locations &&
                dataLocation?.locations[profileData.user_country] && (
                  <div className="prifile-settings-country">
                    <select
                      name="user_city"
                      value={profileData?.user_city}
                      onChange={(e) =>
                        handleChange("user_city", e.target.value)
                      }
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

              <select
                name="categories"
                value={profileData.user_category_name}
                onChange={(e) =>
                  handleChange("user_category_name", e.target.value)
                }
              >
                <option value="" disabled>
                  Выбрать категорию
                </option>
                {(dataCategories?.categories || []).map((categorie) => (
                  <option
                    key={categorie.contentcategory_id}
                    value={categorie.category_name}
                  >
                    {categorie.category_name}
                  </option>
                ))}
              </select>

              {errors.unique && (
                <p className="error-message">{errors.unique}</p>
              )}

              <div className="save">
                <button type="submit">Сохранить</button>
              </div>
            </div>
          </form>
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

      {showSuccess && (
        <Success
          title="Изменения сохранены!"
          onClose={() => setShowSuccess(false)}
        />
      )}

      {showError && (
        <Error
          onClose={() => setShowError(false)}
        />
      )}
    </div>
  );
};

export default Profile;
