import { useParams } from "react-router-dom";
import bloggersData from "../mockData/bloggersData";
import socialNetworkData from "../mockData/socialNetworkData";
import "../css/Style_bloggerDetails.css";
import { useState } from "react";

const BloggerDetails = () => {

  const { id } = useParams();
  const blogger = bloggersData.find((b) => b.id === parseInt(id));
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedService, setSelectedService] = useState(null)

  if (!blogger) {
    return <p>Блогер не найден</p>;
  }

  const handleServiceClick = (price, service) => {
    if (selectedService === service) {
      setSelectedService(null)
    } else {
      setSelectedService(service)
    }
    // setTotalPrice((prevTotal) => prevTotal + price)
  }

  return (
    <div className="blogger-details-page">
      <div className="blogger-details-header">
        <h1>{blogger.name}</h1>
        <p>{blogger.description}</p>
      </div>

      {Object.keys(blogger.network).map((network) => {
        const networkData = blogger.network[network];
        return (
          <div className="blogger-details-conteiner">
            <div className="blogger-details-conteiner-top">
            <div className="blogger-details-conteiner-left">
              <div className="blogger-details-conteiner-left-header">
                <a
                  key={network}
                  href={networkData.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="network-icon"
                    src={`/img/network/${network}.jpg`}
                    alt={network}
                  ></img>
                  <h2>{networkData.name}</h2>
                </a>
              </div>

              <p>{blogger.category}</p>
              <p>{networkData.description}</p>
            </div>

            <div className="blogger-details-conteiner-right">
              <p>Охваты: {networkData.reach}</p>
              <p>cpv: {networkData.cpv}</p>
              <p>er: {networkData.er}</p>
            </div>
            </div>

            <div className="blogger-details-conteiner-services">
              {networkData.services.map((service, index) => (
                <button key={index} className={`blogger-details-service-btn ${selectedService === service ? "active" : ""}`}
                onClick={() => handleServiceClick(service.price, service)}>
                  {service.name} - {service.price} руб.
                </button>
              ))}
            </div>

            <button className="blogger-details-pay">Купить</button>
          </div>
        );
      })}
    </div>
  );
};

export default BloggerDetails;
