import "../css/Style_channel.css";
import AddChannel from "./AddСhannel";
import channelsData from "../mockData/myChannelsData";
import { useEffect, useState } from "react";
import useData from "../hooks/useData";
import usePostData from "../hooks/usePostData";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Channel = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [modalOpen, setModalOpen] = useState(false);
  const [channels, setChannels] = useState(channelsData);
  const { data, isLoading, isError, error } = useData("/my-channels", true);
  const { postData, postIsLoading, postError } = usePostData();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (!token) {
      navigate("/auth/signup", { replace: true });
      return;
    }
  }, [navigate]);

  const handlePriceChange = (channelId, serviceId, value) => {
    setChannels((prevChannels) =>
      prevChannels.map((channel) =>
        channel.id === channelId
          ? {
              ...channel,
              services: channel.services.map((service) =>
                service.id === serviceId
                  ? { ...service, price: value }
                  : service
              ),
            }
          : channel
      )
    );
  };

  const handleChange = (channelId, field, value) => {
    setChannels((prevChannels) =>
      prevChannels.map((channel) =>
        channel.id === channelId ? { ...channel, [field]: value } : channel
      )
    );
  };

  const handleSaveChange = async () => {
    try {
      await postData("save-channel", { token, ...channels });
    } catch (err) {
      console.log("Ошибка при сохранеии данных", err);
    }
  };

  if (!data) {
    return <Loader />;
  }

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
        {(data || channels).map((channel) => (
          <div className="my-channel-content">
            <div className="my-channel-header">
              <img
                className="network-icon"
                src={channel.networkIcon}
                alt=""
              ></img>
              {/* <a key="" href="#" target="_blank" rel="noopener noreferrer">
                Название канала
              </a> */}
              <input
                type="text"
                value={channel.channelName}
                onChange={(e) =>
                  handleChange(channel.id, "channelName", e.target.value)
                }
              />
            </div>

            <div className="my-channel-description">
              <textarea
                type="text"
                value={channel.description}
                onChange={(e) =>
                  handleChange(channel.id, "description", e.target.value)
                }
              />
            </div>

            <div className="my-channel-services">
              <ul className="services-list">
                {channel.services.map((service) => (
                  <li key={service.id} className="services-item">
                    <label className="services-label">
                      <input type="checkbox" />
                      {service.name}
                    </label>
                    <div className="services-price">
                      <input
                        type="number"
                        placeholder="Цена"
                        value={service.price}
                        onChange={(e) =>
                          handlePriceChange(
                            channel.id,
                            service.id,
                            e.target.value
                          )
                        }
                        min="0"
                        step="1"
                      />
                      <span>₽</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="my-services-save">
              <button
                className="my-services-save-btn"
                onClick={handleSaveChange}
              >
                Сохранить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Channel;
