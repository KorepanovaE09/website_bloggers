import { useState, useEffect, useContext } from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import "../css/Style_bloggers_card.css";
import Loader from "../components/Loader";
import { AuthContext } from "../context/AuthContext";

const BloggersCard = ({ bloggers, lastElement }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [selectedNetwork, setSelectedNetwork] = useState({});
  const [selectedService, setSelectedService] = useState({});
  const [analyticsData, setAnalyticsData] = useState({});

  // для отображения данных аналитики первой соц сети в списке
  useEffect(() => {
    const defaultNetwork = {};
    const defaultAnalytics = {};

    (bloggers || []).forEach((blogger) => {
      const firstNetwork = Object.keys(blogger.network)[0];
      defaultNetwork[blogger.id] = firstNetwork;
      defaultAnalytics[blogger.id] = blogger.network[firstNetwork];

      const firstService = blogger.network[firstNetwork]?.services?.[0];
      if (firstService) {
        setSelectedService((prev) => ({
          ...prev,
          [blogger.id]: {
            service: firstService,
            price: firstService.price,
            id: firstService.id,
          },
        }));
      }
    });
    setSelectedNetwork(defaultNetwork);
    setAnalyticsData(defaultAnalytics);
  }, [bloggers]);

  const handleNetworkSelect = (bloggerId, network) => {
    setSelectedNetwork((prev) => ({
      ...prev,
      [bloggerId]: network,
    }));

    setAnalyticsData((prev) => ({
      ...prev,
      [bloggerId]: bloggers.find((blogger) => blogger.id === bloggerId).network[
        network
      ],
    }));

    const firstService = bloggers.find((blogger) => blogger.id === bloggerId)
      .network[network]?.services?.[0];
    if (firstService) {
      setSelectedService((prev) => ({
        ...prev,
        [bloggerId]: {
          service: firstService,
          price: firstService.price,
          id: firstService.id,
        },
      }));
    }
  };

  const handleServiceChange = (bloggerId, service) => {
    setSelectedService((prev) => ({
      ...prev,
      [bloggerId]: {
        service: service,
        price: service.price,
        id: service.id,
      },
    }));
  };

  if (!bloggers) {
    return <Loader />;
  }

  return (
    <div className="bloggers_container">
      {bloggers.map((blogger, index) => {
        return (
          <div
            className="blogger_card"
            key={blogger.id}
          >
            <Link to={`/blogger/${blogger.id}`} state={{ blogger }}>
              <div className="blogger_card_head">
                <div className="blogger_card_head_user">
                  <img src={blogger.src} alt={blogger.alt} />
                </div>
                <div className="blogger_card_head_info">
                  <h2>{analyticsData[blogger.id]?.name}</h2>
                  <p>{blogger.category}</p>
                </div>
              </div>

              <p className="blogger-card-description">
                {analyticsData[blogger.id]?.description}
              </p>

              <div className="blogger_card_analytic">
                <p>Подписчики: {analyticsData[blogger.id]?.followers}</p>
                <p>Охваты: {analyticsData[blogger.id]?.reach}</p>
                <p>ER: {analyticsData[blogger.id]?.er}</p>
              </div>
            </Link>

            <div className="blogger-card-network">
              {Object.keys(blogger.network).map((network) => {
                return (
                  <img
                    key={network}
                    src={blogger.network[network].icon}
                    alt="соц сеть"
                    className={`network-icon ${
                      selectedNetwork[blogger.id] === network ? "active" : ""
                    }`}
                    onClick={() => handleNetworkSelect(blogger.id, network)}
                  />
                );
              })}
            </div>

            <div className="blogger-card-services">
              {selectedNetwork[blogger.id] && (
                <select
                  onChange={(e) => {
                    const selectedService = JSON.parse(e.target.value);
                    handleServiceChange(blogger.id, selectedService);
                  }}
                >
                  {blogger.network[selectedNetwork[blogger.id]]?.services?.map(
                    (service, index) => (
                      <option key={index} value={JSON.stringify(service)}>
                        {service.name}
                      </option>
                    )
                  )}
                </select>
              )}
              <Link
                to={`/form-order?price=${
                  selectedService[blogger.id]?.price
                }&bloggerId=${blogger.id}&service=${
                  selectedService[blogger.id]?.id
                }`}
                className="blogger-card-services-link"
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    navigate("/auth/signup", { replace: true });
                  }
                }}
              >
                <button className="blogger-card-services-btn">
                  {selectedService[blogger.id]?.price
                    ? `${selectedService[blogger.id]?.price} руб.`
                    : "Выберите услугу"}
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BloggersCard;
