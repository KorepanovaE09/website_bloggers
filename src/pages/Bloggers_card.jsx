import { useState, useEffect } from "react";
import bloggersData from "../mockData/bloggersData";
import { Link } from "react-router-dom";
import "../css/Style_bloggers_card.css";

const BloggersCard = () => {
  const [selectedNetwork, setSelectedNetwork] = useState({});
  const [selectedPrice, setSelectedPrice] = useState({});
  const [analyticsData, setAnalyticsData] = useState({});

  // Инициализация первой социальной сети и данных аналитики для каждого блогера
  useEffect(() => {
    const defaultNetwork = {};
    const defaultAnalytics = {};
    bloggersData.forEach((blogger) => {
      const firstNetwork = Object.keys(blogger.network)[0];
      defaultNetwork[blogger.id] = firstNetwork;
      defaultAnalytics[blogger.id] = blogger.network[firstNetwork];
    });
    setSelectedNetwork(defaultNetwork);
    setAnalyticsData(defaultAnalytics);
  }, []);

  const handleNetworkSelect = (bloggerId, network) => {
    setSelectedNetwork((prev) => ({
      ...prev,
      [bloggerId]: network,
    }));

    setAnalyticsData((prev) => ({
      ...prev,
      [bloggerId]: bloggersData.find((blogger) => blogger.id === bloggerId).network[network],
    }));

    setSelectedPrice((prev) => ({
      ...prev,
      [bloggerId]: "",
    }));
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
          <Link to={`/blogger/${blogger.id}`}>
            <div className="blogger_card_head">
              <div className="blogger_card_head_user">
                <img src={blogger.src} alt={blogger.alt} />
              </div>
              <div className="blogger_card_head_info">
                <h2>{analyticsData[blogger.id]?.name}</h2>
                <p>{blogger.category}</p>
              </div>
            </div>

            <p className="blogger-card-description">{analyticsData[blogger.id]?.description}</p>

            <div className="blogger_card_analytic">
              <p>Подписчики: {analyticsData[blogger.id]?.followers}</p>
              <p>Охваты: {analyticsData[blogger.id]?.reach}</p>
              <p>CPV: {analyticsData[blogger.id]?.cpv}</p>
              <p>ER: {analyticsData[blogger.id]?.er}</p>
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