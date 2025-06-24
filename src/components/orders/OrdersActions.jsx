const OrderActions = ({
  order,
  userRole,
  handleModalChangeStatus,
  handleModalDelete,
  refetchUserData
}) => {
  const isBlogger = userRole === "blogger";
  const isAdvertiser = userRole === "advertiser";

  const handle = {
    changeStatus: (status) =>
      handleModalChangeStatus(order.id, "status", status),
    delete: () => handleModalDelete(order.id),
  };

  if (isAdvertiser) {
    switch (order.status) {
      case "Ждёт подтверждения":
        return (
          <button className="red-btn" onClick={handle.delete}>
            Удалить
          </button>
        );
      case "Отклонен":
      case "Завершен":
        return (
          <button className="red-btn" onClick={handle.delete}>
            Удалить
          </button>
        );
      case "Ждет подтверждения от рекламодателя":
        return (
          <button
            className="green-btn"
            onClick={() => handle.changeStatus("Завершен")}
          >
            Подтвердить выполнение
          </button>
        );
    }
  } else if (isBlogger) {
    switch (order.status) {
      case "Ждёт подтверждения":
        return (
          <>
            <button
              className="green-btn"
              onClick={() => handle.changeStatus("В работе")}
            >
              Взять заказ
            </button>
            <button
              className="red-btn"
              onClick={() => handle.changeStatus("Отклонен")}
            >
              Отклонить заказ
            </button>
          </>
        );
      case "В работе":
        return (
          <button
            className="green-btn"
            onClick={() =>
              handle.changeStatus("Ждет подтверждения от рекламодателя")
            }
          >
            Подтвердить выполнение
          </button>
        );
      case "Отклонен":
      case "Завершен":
        return (
          <button className="red-btn" onClick={handle.delete}>
            Удалить
          </button>
        );
    }
  }
};

export default OrderActions;
