import { useState } from "react";
import socialNetworkData from "../mockData/socialNetworkData.js";
import categoriesData from "../mockData/categoriesData.js";
import "../css/Style_addChannel.css";
import usePostData from "../hooks/usePostData.js";
import { useNavigate } from "react-router-dom";
import useData from "../hooks/useData.js";
import {
  addChannel_already_exists,
  validateFormAddChannel,
} from "../utils/validateForm.js";

const AddChannel = ({ closeModal, onSuccess, onError }) => {
  const navigate = useNavigate();
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const { data: networkData, refetch } = useData("/data/networks");
  const { postData, error, isLoading } = usePostData();
  const [data, setData] = useState({
    platform_name: "",
    sociallink_channel_name: "",
    sociallink_profile_url: "",
    sociallink_description: "",
  });
  const [errors, setErrors] = useState({
    platform_name: "",
    already_exists: "",
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
    if (!validateFormAddChannel(data, setErrors)) return;

    try {
      await postData("/channels/create-channel", {
        ...data,
      });
      onSuccess?.();
      await refetch();
      closeModal();
    } catch (err) {
      onError?.();
      if (addChannel_already_exists(err.response, setErrors)) return;
      closeModal();
      console.log("Ошибка создания канала", err);
    }
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
          <form className="addChannel-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="dropdown-network">
              <button
              type="button"
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
                  {networkData?.networks?.map((network, index) => (
                    <li
                      key={index}
                      name="network"
                      onClick={() => {
                        handleSelectNetwork(network);
                        handleChange({
                          target: {
                            name: "platform_name",
                            value: network.name,
                          },
                        });
                      }}
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
              {errors.platform_name && (
                <p className="error-message">
                  * Поле обязательно для заполнения
                </p>
              )}
            </div>

            <div className="addChannel-name">
              <div>
                <input
                  className="addChannel-name-input"
                  type="text"
                  name="sociallink_channel_name"
                  placeholder="Название канала"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <input
                  type="url"
                  name="sociallink_profile_url"
                  placeholder="Ссылка на канал"
                  onChange={handleChange}
                  className="input_profile_url"
                  required
                />
                {errors.sociallink_profile_url && (
                  <p className="error-message">
                    {errors.sociallink_profile_url}
                  </p>
                )}
              </div>
            </div>

            <div className="addChannel-descroption">
              <textarea
                type="text"
                name="sociallink_description"
                placeholder="Введите описание канала"
                onChange={handleChange}
                required
              />
              {errors.already_exists && (
                <p className="error-message">{errors.already_exists}</p>
              )}
            </div>

            <div className="addChannel-save">
              <button className="save-add-channel" type="submit">
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddChannel;
