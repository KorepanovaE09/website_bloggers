import { useState } from "react";
import "../css/Style_orders.css";
import network from "../assets/img/wallet.png";

const Orders = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [endDate, setEndDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const item = [
    "Продаю тапки",
    "Господи спаси и помоги",
    "нашей системой В дальнейшем планируем создание ИИ, который будет автоматически подбирать блогеров.",
    "Светлый родник",
    "Студсовет пошел на",
  ];

  return (
    <div className="orders-container">
      <div className="list-order">
        <ul>
          {item.map((item, index) => (
            <li
              key={index}
              onClick={() => setSelectedItem(item)}
              className={`btn-select-order ${
                selectedItem === item ? "active" : ""
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="select-order-conteiner">
        {selectedItem && (
          <div className="select-order-form">
            <div className="select-order-header">
              <div className="select-order-user">
                <img
                  className="network-icon"
                  src={network}
                  alt="Соц сеть"
                ></img>
                <h2>Имя получателя</h2>
              </div>
              <div className="select-order-status">
              <input
                type="text"
                className="select-order-status-input"
                value="Ждет подтверждения"
                disabled
              />
              </div>
            </div>

            <div className="select-order-right">
              <input
                type="text"
                className="select-order-type"
                value="Тип услуги"
                disabled
              />
              <div className="select-order-date">
                <p>Срок выполнения</p>
                <input
                  className="select-order-end-date"
                  type="date"
                  value={endDate}
                  onChange={handleDateChange}
                  min={today}
                />
              </div>
            </div>

            <input
              className="select-order-name"
              type="text"
              placeholder={selectedItem || ""}
              value={selectedItem || ""}
              onChange={(e) => setSelectedItem(e.target.value)}
            />

            <textarea
              type="text"
              className="selected-order-description"
              placeholder="Описание заказа"
            ></textarea>

            <div className="save-select-order">
              <button className="save-select-order-btn">Сохранить</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
