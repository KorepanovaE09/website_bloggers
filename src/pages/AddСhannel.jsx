import { useState } from "react";
import socialNetworkData from "../mockData/socialNetworkData.js";
import categoriesData from "../mockData/categoriesData.js";
import "../css/Style_addChannel.css";

const AddChannel = ({ closeModal }) => {
  //   хранит выбранную соц сеть
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  //   отображение выпадающего списка
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectNetwork = (network) => {
    setSelectedNetwork(network);
    setIsDropdownOpen(false);
  };

  return (
    <div className="modal-addChannel" onClick={closeModal}>
      <div
        className="modal-conteiner-addChannel"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Расскажите о себе</h1>

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

        <div className="dropdown-network-content">
          <div className="dropdown-network">
            <button
              className="dropdown-network-btn"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedNetwork ? (
                <>
                  <img
                    className="dropdown-network-img"
                    src={selectedNetwork.src}
                    alt={selectedNetwork.name}
                  />
                  {selectedNetwork.name}
                </>
              ) : (
                "Выберите соцсеть"
              )}
            </button>

            {isDropdownOpen && (
              <ul className="dropdown-list-network">
                {socialNetworkData.map((network, index) => (
                  <li key={index} onClick={() => handleSelectNetwork(network)}>
                    <img
                      className="dropdown-network-img"
                      src={network.src}
                      alt={network.name}
                    />
                    {network.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="addChannel-name">
            <input
              className="addChannel-name-input"
              type="text"
              placeholder="Название канала"
            />
            <input type="url" placeholder="Ссылка на канал" />
          </div>

          <div className="addChannel-descroption">
            <textarea type="text" placeholder="Введите описание канала" />
          </div>

          <div className="addChannel-save">
            <button className="save-add-channel">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChannel;
