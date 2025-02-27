import { useState } from "react";
import bloggersData from "../mockData/bloggersData";
import { Link } from "react-router-dom";
import "../css/Style_bloggers_card.css";
import { use } from "react";

const BloggersCard = () => {
  const [selectedNetwork, setSelectedNetwork] = useState({});
  const [selectedPrice, setSelectedPrice] = useState([]);

  // для каждого блогера записываем первую соц сеть из списка
  useState(() => {
    const defaultNetwork = {};
    bloggersData.forEach((blogger) => {
      const firstNetwork = Object.keys(blogger.network)[0];
      defaultNetwork[blogger.id] = firstNetwork;
    });
    setSelectedNetwork(defaultNetwork);
  }, []);

  const handleNetworkSelect = (bloggerId, network) => {
    setSelectedNetwork((prev) => ({
      // копируем все предыдущие данные, чтобы не удалить у остальных блогеров
      ...prev,
      [bloggerId]: network,
    }));
    setSelectedPrice((prev) => ({
      ...prev,
      [bloggerId]: ""
    }))
  };

  const handleServiceChange = (bloggerId, price) => {
    setSelectedPrice((prev) => ({
      ...prev,
      [bloggerId]: price,
    }));
  };

  return (
    <div className="bloggers_container">
      {bloggersData.map((blogger) => (
        <div className="blogger_card" key={blogger.id}>
          {/* Карточка блогера */}
          <Link to={`/blogger/${blogger.id}`}>
            <div className="blogger_card_head">
              <div className="blogger_card_head_user">
                <img src={blogger.src} alt={blogger.alt} />
              </div>
              <div className="blogger_card_head_info">
                <h2>{blogger.name}</h2>
                <p>{blogger.category}</p>
              </div>
            </div>

            <p className="blogger-card-description">{blogger.description}</p>

            <div className="blogger_card_analytic">
              <p>Подписчики: {blogger.followers}</p>
              <p>Охваты: {blogger.reach}</p>
              <p>CPV: {blogger.cpv}</p>
              <p>ER: {blogger.er}</p>
            </div>
          </Link>

          <div className="blogger-card-network">
            {Object.keys(blogger.network).map((network) => (
              <img
                key={network}
                src={`/img/network/${network}.jpg`}
                alt={network}
                className={`network-icon ${
                  selectedNetwork[blogger.id] === network ? "active" : ""
                }`}
                onClick={() => handleNetworkSelect(blogger.id, network)}
              />
            ))}
          </div>

          <div className="blogger-card-services">
            {selectedNetwork[blogger.id] && (
              <select
                onChange={(e) =>
                  handleServiceChange(blogger.id, e.target.value)
                }
              >
                {blogger.network[selectedNetwork[blogger.id]].services.map(
                  (service, index) => (
                    <option key={index} value={service.price}>
                      {service.name}
                    </option>
                  )
                )}
              </select>
            )}
            <button className="blogger-card-services-btn">
              {selectedPrice[blogger.id]
                ? `${selectedPrice[blogger.id]} руб.`
                : "Выберите услугу"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BloggersCard;
