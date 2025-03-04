import { useState } from "react";
import "../css/Style_bloggers_filter.css";

const BloggerFilter = ({ closeModal }) => {
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
            <input className="filter-input-name" placeholder="Поиск по имени"></input>
            <select>
                <option value="" disabled selected>Выбрать категорию</option>
            </select>
            <select>
                <option disabled selected>Выбрать соцсеть</option>
            </select>

            <p>Пол блогера</p>
            <div className="filter-gender">
                <button>Мужской</button>
                <button>Женский</button>
            </div>

            <select>
                <option disabled selected>Страна блогера</option>
            </select>
            <select>
                <option disabled selected>Город блогера</option>
            </select>

            <p>Количество подписчиков</p>
            <div className="input-conteiner-followers">
                <input className="input-filter-number" placeholder="От"></input>
                <input className="input-filter-number" placeholder="До"></input>
            </div>

            <p>Цена за размещение</p>
            <div className="input-conteiner-price">
                <input className="input-filter-number" placeholder="От"></input>
                <input className="input-filter-number" placeholder="До"></input>
            </div>
        </div>

        <div className="modal-filter-drop-save">
            <button className="filter-drop">Сбросить</button>
            <button className="filter-save">Сохранить</button>
        </div>
      </div>
    </div>
  );
};

export default BloggerFilter;
