const STATUS_COLORS = {
  "Ждёт подтверждения": "#ffe98f",                      
  "Ждет подтверждения от рекламодателя": "#ffe98f",    
  "В работе": "#99ff99",                                
  "Завершен": "#A3A3A3",                                
  "Отклонен": "#A3A3A3",                                
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
            <span className="status-order" style={{backgroundColor: STATUS_COLORS[order.status]}}></span>
            {order.title}
          </li>
        ))}
    </ul>
  );
};

export default OrderList;
