import { useState } from "react";
import socialNetworkData from "../mockData/socialNetworkData.js";
import categoriesData from "../mockData/categoriesData.js";
import "../css/Style_addChannel.css";
import usePostData from "../hooks/usePostData.js";
import { useNavigate } from "react-router-dom";

const AddChannel = ({ closeModal }) => {
  const navigate = useNavigate()
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const {postData, error, isLoading} = usePostData();
  const [data, setData] = useState({
    nameChannel: "",
    linkChannel: "",
    description: "",
  });
  //   отображение выпадающего списка
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectNetwork = (network) => {
    setSelectedNetwork(network);
    setIsDropdownOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await postData("/newChannel", {
        ...data, network: selectedNetwork?.value,
      })
      navigate("/channel")
    }
    catch (err) {
      console.log("Ошибка создания канала", err)
    }
  }

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
                  <li
                    key={index}
                    name="network"
                    onClick={() => handleSelectNetwork(network)}
                  >
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
              name="nameChannel"
              placeholder="Название канала"
              onChange={handleChange}
            />
            <input
              type="url"
              name="linkChannel"
              placeholder="Ссылка на канал"
              onChange={handleChange}
            />
          </div>

          <div className="addChannel-descroption">
            <textarea
              type="text"
              name="description"
              placeholder="Введите описание канала"
              onChange={handleChange}
            />
          </div>

          <div className="addChannel-save">
            <button className="save-add-channel" onClick={() => handleSubmit()}>Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChannel;
