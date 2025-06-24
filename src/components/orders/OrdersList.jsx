const STATUS_COLORS = {
  "Ждёт подтверждения": "#ffe98f",
  "Ждет подтверждения от рекламодателя": "#ffe98f",
  "В работе": "#99ff99",
  Завершен: "#A3A3A3",
  Отклонен: "#A3A3A3",
};

const STATUS_box_shadow = {
  "Ждёт подтверждения": "rgb(255, 233, 143)",
  "Ждет подтверждения от рекламодателя": "rgb(255, 233, 143)",
  "В работе": "rgb(153, 255, 153)",
  Завершен: "rgb(163, 163, 163)",
  Отклонен: "rgb(163, 163, 163)",
};

const OrderList = ({ orders, selectedOrderId, setSelectedOrderId }) => {
  return (
    <ul>
      {[...orders]
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        .map((order) => (
          <li
            key={order.id}
            onClick={() => setSelectedOrderId(order.id)}
            className={`btn-select-order ${
              selectedOrderId === order.id ? "active" : ""
            }`}
          >
            <span
              className="status-order"
              style={{
                backgroundColor: STATUS_COLORS[order.status],
                boxShadow: `0 0 5px ${STATUS_box_shadow[order.status]}`,
              }}
            ></span>
            {order.title}
          </li>
        ))}
    </ul>
  );
};

export default OrderList;
