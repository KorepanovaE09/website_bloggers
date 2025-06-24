import { useEffect, useState } from "react";
import "../css/Style_bloggers_filter.css";
import useData from "../hooks/useData";
import usePostData from "../hooks/usePostData";
import categoriesData from "../mockData/categoriesData";
import countryCityData from "../mockData/countryCityData";
import Loader from "../components/Loader";
import newStyled from "@emotion/styled";

localStorage.removeItem("bloggerFilters");

const BloggerFilter = ({ closeModal, updateFilter }) => {
  const { data: dataLocation } = useData("/data/locations");
  const { data: dataCategories } = useData("/data/categories");
  const { data: dataNetwork } = useData("/data/networks");
  const { postData, postError, postIsLoading } = usePostData();

  const [formData, setFormData] = useState(() => {
    const savedFilters = localStorage.getItem("bloggerFilters");
    return savedFilters
      ? JSON.parse(savedFilters)
      : {
          name: "",
          categories: "",
          network: "",
          gender: "",
          country: "",
          city: "",
          start_followers: "",
          end_followers: "",
          start_price: "",
          end_price: "",
        };
  });

  useEffect(() => {
    localStorage.setItem("bloggerFilters", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = () => {
    const clearedData = {
      name: "",
      categories: "",
      network: "",
      gender: "",
      country: "",
      city: "",
      start_followers: "",
      end_followers: "",
      start_price: "",
      end_price: "",
    };

    setFormData(clearedData);
    localStorage.setItem("bloggerFilters", JSON.stringify(clearedData));
    handleSaveСhange({});
  };

  const handleSaveСhange = async (dataToSend) => {
    const filteredData = Object.fromEntries(
      Object.entries(dataToSend).filter(([key, value]) => value !== "")
    );

    closeModal();
    try {
      const response = await postData("/bloggers/filter", filteredData);
      console.log("Ответ после postData:", response);
      if (response.bloggers) {
        updateFilter(response.bloggers);
      }
    } catch (err) {
      console.log("Ошибка при фильтрации", err);
    }
  };

  // if (isFiltering) {
  //   return <Loader/>
  // }

  return (
    <div className="modal-filter" onClick={closeModal}>
      <div
        className="modal-conteiner-filter"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Фильтр</h1>
        <button className="close-modal" onClick={closeModal}>
          <svg className="close-icon" viewBox="0 0 24 24">
            <line
              x1="4"
              y1="4"
              x2="20"
              y2="20"
              stroke="black"
              strokeWidth="1.5"
            />
            <line
              x1="20"
              y1="4"
              x2="4"
              y2="20"
              stroke="black"
              strokeWidth="1.5"
            />
          </svg>
        </button>

        <div className="modal-filter-content">
          <input
            className="filter-input-name"
            placeholder="Поиск по имени"
            name="name"
            value={formData.name}
            onChange={handleChange}
          ></input>
          <p>Категория</p>
          <select
            name="categories"
            value={formData.categories}
            onChange={handleChange}
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
          <p>Социальная сеть</p>
          <select
            name="network"
            value={formData.network}
            onChange={handleChange}
          >
            <option value="" disabled>
              Выбрать соцсеть
            </option>
            {(dataNetwork?.networks || []).map((network) => (
              <option
                key={network.socialplatform_id}
                value={network.socialplatform_name}
              >
                {network.socialplatform_name}
              </option>
            ))}
          </select>

          <p>Страна</p>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="" disabled>
              Выбрать страну
            </option>
            {Object.keys(dataLocation?.locations || []).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <p>Город</p>
          <select name="city" value={formData.city} onChange={handleChange}>
            <option value="" disabled>
              Выбрать город
            </option>
            {formData.country &&
              (dataLocation?.locations?.[formData.country] || []).map(
                (city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                )
              )}
          </select>

          <p>Количество подписчиков</p>
          <div className="input-conteiner-followers">
            <input
              type="number"
              className="input-filter-number"
              name="start_followers"
              placeholder="От"
              value={formData.start_followers}
              onChange={handleChange}
            ></input>
            <input
              type="number"
              className="input-filter-number"
              name="end_followers"
              placeholder="До"
              value={formData.end_followers}
              onChange={handleChange}
            ></input>
          </div>

          <p>Цена за размещение</p>
          <div className="input-conteiner-price">
            <input
              type="number"
              className="input-filter-number"
              name="start_price"
              value={formData.start_price}
              placeholder="От"
              onChange={handleChange}
            ></input>
            <input
              type="number"
              className="input-filter-number"
              name="end_price"
              value={formData.end_price}
              placeholder="До"
              onChange={handleChange}
            ></input>
          </div>
        </div>

        <div className="modal-filter-drop-save">
          <button className="filter-drop" onClick={() => handleClear()}>
            Сбросить
          </button>
          <button
            className="filter-save"
            onClick={() => handleSaveСhange(formData)}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default BloggerFilter;
