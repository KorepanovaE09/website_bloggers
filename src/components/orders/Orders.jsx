import { useEffect, useState } from "react";
import "../../css/Style_orders.css";
import useData from "../../hooks/useData";
import usePostData from "../../hooks/usePostData";
import Loader from "../Loader";
import { useConfirmModal } from "../../context/ConfirmModalContext";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import ordersData from "../../mockData/ordersData";
import OrderList from "./OrdersList";
import OrderActions from "./OrdersActions";
import Success from "../Success";
import Error from "../Error";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const role = localStorage.getItem("activeRole") || user?.role
  const endpoint = `/orders?role=${role}`
  const { showConfirmModal } = useConfirmModal();
  const { postData, postIsLoading, PostError } = usePostData();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const { data, isLoading, isError, error, refetch } = useData(endpoint);
  // const [orders, setOrders] = useState([]);
  const [orders, setOrders] = useState(ordersData);
  const { refetch: refetchUserData } = useContext(AuthContext);


  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const today = new Date().toISOString().split("T")[0];

  const isBlogger = user?.role === "blogger";
  const isAdvertiser = user?.role === "advertiser";

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  // if (!data) {
  //   return <Loader />;
  // }

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
      setShowSuccess(true);
    } catch (err) {
      setShowError(true);
      console.log("Ошибка сохранения", err);
    }
  };

  const handleDelete = async (orderId) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
    try {
      await postData("/delete-order", {
        order_id: orderId,
      });
      setShowSuccess(true);
    } catch (err) {
      console.log("Ошибка удаления заказа", err);
      setShowError(true);
    }
  };

  const handleModalDelete = (orderId) => {
    showConfirmModal({
      title: "Удаление заказа",
      message: "Вы уверены, что хотите удалить заказ?",
      onConfirm: () => handleDelete(orderId),
    });
  };

  const handleModalChangeStatus = (orderId, field, value) => {
    showConfirmModal({
      title: "Подтверждение заказа",
      message: "Вы уверены, что хотите подтвердить выполнение заказа",
      onConfirm: () => {
        const updatedOrders = orders.map((order) =>
          order.id === orderId ? { ...order, [field]: value } : order
        );
        const updatedOrder = updatedOrders.find(
          (order) => order.id === orderId
        );
        setOrders(updatedOrders);
        postData("/orders/edit-order", updatedOrder).then(() => {
          refetch();
        });
      },
    });
  };

  const isFieldDisabled = (status) => {
    return (
      status === "Отклонен" ||
      status === "В работе" ||
      status === "Завершен" ||
      status === "Ждет подтверждения от рекламодателя"
    );
  };

  return (
    <div className="orders-container">
      <div className="list-order">
        <OrderList
          orders={orders}
          selectedOrderId={selectedOrderId}
          setSelectedOrderId={setSelectedOrderId}
        />
      </div>

      <div className="select-order-conteiner">
        {selectedOrder && (
          <div className="select-order-form">
            <div className="select-order-header">
              <div className="select-order-user">
                <img
                  className="network-icon"
                  src={selectedOrder.icon}
                  // src={`/img/network/${selectedOrder.network}.jpg`}
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
              <div className="select-order-actions">
                <OrderActions
                  order={selectedOrder}
                  userRole={user?.role}
                  handleModalChangeStatus={handleModalChangeStatus}
                  handleModalDelete={handleModalDelete}
                  refetchUserData = {refetchUserData}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {showSuccess && <Success onClose={() => setShowSuccess(false)} style={{ top: "92px" }} />}

      {showError && <Error onClose={() => setShowError(false)} style={{ top: "92px" }}/>}
    </div>
  );
};

export default Orders;
