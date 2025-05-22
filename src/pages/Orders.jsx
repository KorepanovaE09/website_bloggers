import { useEffect, useState } from "react";
import "../css/Style_orders.css";
import network from "../assets/img/wallet.png";
import ordersData from "../mockData/ordersData";
import useData from "../hooks/useData";
import usePostData from "../hooks/usePostData";
import Loader from "../components/Loader";
import { useConfirmModal } from "../context/ConfirmModalContext";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const userType = "advertiser";
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isBlogger = userType === "blogger";
  const isAdvertiser = userType === "advertiser";

  const { showConfirmModal } = useConfirmModal();
  const { postData, postIsLoading, PostError } = usePostData();
  const { data, isLoading, isError, error, refetch } = useData("/orders");
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!token) {
      navigate("/auth/signup", {
        replace: true,
        // state: { from: window.location.pathname },
      });
      return;
    }
    if (data) {
      setOrders(data);
    }
  }, [navigate, data]);

  const selectedOrder = (orders || []).find(
    (order) => order.id === selectedOrderId
  );

  const handleChange = (orderId, field, value) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, [field]: value } : order
      )
    );
  };

  const handleSaveChange = async (orderId) => {
    try {
      const orderToSave = (orders || []).find((order) => order.id === orderId);
      await postData("/orders/edit-order", orderToSave);
      await refetch();
    } catch (err) {
      console.log("Ошибка сохранения", err);
    }
  };

  // const handleModalSaveChange = (orderId) => {
  //   showConfirmModal({
  //     title: "Отправка заказа",
  //     message: "Сохранить изменения?",
  //     onConfirm: () => handleSaveChange(orderId),
  //   });
  // };

  const handleDelete = async (orderId) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
    try {
      await postData("/delete-order", {
        order_id: orderId,
      });
    } catch (err) {
      console.log("Ошибка удаления заказа", err);
    }
  };

  const handleModalDelete = (orderId) => {
    showConfirmModal({
      title: "Удаление заказа",
      message: "Вы уверены, что хотите удалить заказ?",
      onConfirm: () => handleDelete(orderId),
    });
  };

  // const handleChangeStatus = async (orderId, status) => {
  //   try {
  //     const responce = await postData("orders/", {
  //       order_id: orderId,
  //       order_status: status,
  //     });
  //     const updateOrder = responce.data;

  //     setOrders((prev) =>
  //       prev.map((order) =>
  //         order.id === updateOrder.id
  //           ? { ...order, status: updateOrder.status }
  //           : order
  //       )
  //     );
  //   } catch (err) {
  //     console.log("Ошибка подтверждения заказа", err);
  //   }
  // };

  const handleModalChangeStatus = (orderId, field, value) => {
    showConfirmModal({
      title: "Подтверждение заказа",
      message: "Вы уверены, что хотите подтвердить выполнение заказа",
      onConfirm: () => {
        const updatedOrders = orders.map((order) =>
          order.id === orderId ? { ...order, [field]: value } : order
        );
        const updatedOrder = updatedOrders.find((order) => order.id === orderId);
        setOrders(updatedOrders);
        postData("/orders/edit-order", updatedOrder).then(() => {
          refetch();
        });
      },
    });
  };

  const isFieldDisabled = (status) => {
    return (
      status === "Отклонен" || status === "Подтвержден" || status === "Завершен"
    );
  };

  if (!data) {
    return <Loader />;
  }

  const getOrderActions = () => {
    if (isAdvertiser) {
      switch (selectedOrder.status) {
        case "Ждёт подтверждения":
          return (
            <button
              className="red-btn"
              onClick={() => handleModalDelete(selectedOrder.id)}
            >
              Удалить
            </button>
          );
        case "Подтвержден":
          return (
            <button
              className="green-btn"
              onClick={() =>
                handleModalChangeStatus(selectedOrder.id, "status", "Завершен")
              }
            >
              Подтвердить выполнение
            </button>
          );
        case "Отклонен":
        case "Завершен":
          return (
            <button
              className="red-btn"
              onClick={() => handleModalDelete(selectedOrder.id)}
            >
              Удалить
            </button>
          );
      }
    } else if (isBlogger) {
      switch (selectedOrder.status) {
        case "Ждёт подтверждения":
          return (
            <>
              <button
                className="green-btn"
                onClick={() =>
                  handleModalChangeStatus(selectedOrder.id, "Подтвержден")
                }
              >
                Взять заказ
              </button>
              <button
                className="red-btn"
                onClick={() =>
                  handleModalChangeStatus(selectedOrder.id, "Отклонен")
                }
              >
                Отклонить заказ
              </button>
            </>
          );
        case "Подтвержден":
          return (
            <button
              className="green-btn"
              onClick={() =>
                handleModalChangeStatus(
                  selectedOrder.id,
                  "Ждет подтверждения от рекламодателя"
                )
              }
            >
              Подтвердить выполнение
            </button>
          );
        case "Отклонен":
        case "Завершен":
          return (
            <button
              className="red-btn"
              onClick={() => handleModalDelete(selectedOrder.id)}
            >
              Удалить
            </button>
          );
      }
    }
  };

  return (
    <div className="orders-container">
      <div className="list-order">
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
                {order.title}
              </li>
            ))}
        </ul>
      </div>

      <div className="select-order-conteiner">
        {selectedOrder && (
          <div className="select-order-form">
            <div className="select-order-header">
              <div className="select-order-user">
                <img
                  className="network-icon"
                  src={`/img/network/${selectedOrder.network}.jpg`}
                  alt="Соц сеть"
                ></img>
                <h2>{selectedOrder.channelName}</h2>
              </div>
              <div className="select-order-status">
                <p>{selectedOrder.status}</p>
              </div>
            </div>

            <div className="select-order-right">
              <input
                type="text"
                className="select-order-type"
                value={selectedOrder.type}
                disabled
              />
              <div className="select-order-date">
                <p>Срок выполнения</p>
                <input
                  className="select-order-end-date"
                  type="date"
                  value={selectedOrder.endDate}
                  onChange={(e) =>
                    handleChange(selectedOrder.id, "endDate", e.target.value)
                  }
                  min={today}
                  disabled={isFieldDisabled(selectedOrder.status) || isBlogger}
                />
              </div>
            </div>

            <input
              className="select-order-name"
              type="text"
              //   placeholder={selectedItem || ""}
              value={selectedOrder.title}
              onChange={(e) =>
                handleChange(selectedOrder.id, "title", e.target.value)
              }
              disabled={isFieldDisabled(selectedOrder.status) || isBlogger}
            />

            <textarea
              type="text"
              className="selected-order-description"
              value={selectedOrder.description}
              placeholder="Описание заказа"
              onChange={(e) =>
                handleChange(selectedOrder.id, "description", e.target.value)
              }
              disabled={isFieldDisabled(selectedOrder.status) || isBlogger}
            ></textarea>

            <textarea
              type="text"
              className="selected-order-blg-comments"
              placeholder="Комментарии для рекламодателя"
              value={selectedOrder.bloggerComments}
              onChange={(e) =>
                handleChange(
                  selectedOrder.id,
                  "bloggerComments",
                  e.target.value
                )
              }
              disabled={isFieldDisabled(selectedOrder.status) || !isBlogger}
            ></textarea>

            <div className="select-order-bottom-btn">
              {!isFieldDisabled(selectedOrder.status) && (
                <div className="save-select-order">
                  <button
                    className="save-select-order-btn"
                    onClick={() => handleSaveChange(selectedOrder.id)}
                  >
                    Сохранить
                  </button>
                </div>
              )}
              <div className="select-order-actions">{getOrderActions()}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
