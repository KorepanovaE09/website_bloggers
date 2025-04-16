import "../css/Style_channel.css";
import AddChannel from "./AddСhannel";
import { useState } from "react";

const Channel = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [price, setPrice] = useState(100);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setPrice("");
      return;
    }

    if (!isNaN(value) && value > 0) {
      setPrice(value);
    }
  };

  return (
    <div className="my-channels-conteiner">
      <div className="my-channels-conteiner-header">
        <h1>Каналы</h1>
        <button className="open-modal-btn-addChannel" onClick={openModal}>
          <svg className="plus-icon" viewBox="0 0 24 24">
            <line
              x1="12"
              y1="4"
              x2="12"
              y2="20"
              stroke="black"
              strokeWidth="1.5"
            />
            <line
              x1="4"
              y1="12"
              x2="20"
              y2="12"
              stroke="black"
              strokeWidth="1.5"
            />
          </svg>{" "}
          Добавить канал
        </button>

        {modalOpen && <AddChannel closeModal={closeModal} />}
      </div>

      <div className="my-channels-conteiner-grid">
        {[...Array(4)].map((_, index) => (
          <div className="my-channel-content">
            <div className="my-channel-header">
              <img
                className="network-icon"
                src="/img/network/instagram.jpg"
                alt=""
              ></img>
              <a key="" href="#" target="_blank" rel="noopener noreferrer">
                Название канала
              </a>
            </div>

            <div className="my-channel-description">
              <p>Описание канала описание описание описание</p>
            </div>

            <div className="my-channel-services">
              <ul className="services-list">
                <li key="" className="services-item">
                  <label className="services-label">
                    <input type="checkbox" />
                    услуга {index + 1}
                  </label>
                  <div className="services-price">
                    <input
                      type="number"
                      placeholder="Цена"
                      value={price}
                      onChange={handlePriceChange}
                      min="0"
                      step="1"
                    />
                    <span>₽</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="my-services-save">
              <button className="my-services-save-btn">Сохранить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Channel;
