import { useState } from "react";
import "../css/Style_form_new_order.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import usePostData from "../hooks/usePostData";

const Form_order = () => {
  const navigate = useNavigate();
  const { postData, isLoading, error } = usePostData();
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState({
    order_name: "",
    order_endDate: "",
    order_description: "",
  });

  const today = new Date().toISOString().split("T")[0];
  const orderPrice = searchParams.get("price");
  const priceListTypeId = searchParams.get("service");
  const receiverId = searchParams.get("bloggerId");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await postData("/createorder", {
        ...order,
        priceListTypeId,
        receiverId,
      });
      navigate("/orders");
    } catch (err) {
      console.log("Ошибка при отпрвке формы заказа", err);
    }
  };

  return (
    <div className="form-order">
      <div className="form-order-conteiner">
        <h1>ФОРМА ЗАКАЗА</h1>
        <div className="form-order-content">
          <div className="form-order-input">
            <input
              className="form-order-name"
              name="order_name"
              type="text"
              placeholder="Название заказа"
              onChange={handleChange}
            ></input>
            <input
              className="form-order-date"
              name="order_endDate"
              type="date"
              onChange={handleChange}
              min={today}
            />
          </div>

          <textarea
            type="text"
            name="order_description"
            placeholder="Описание заказа"
            onChange={handleChange}
          ></textarea>

          <div className="save-order">
            <button className="save-order-btn" onClick={handleSubmit}>
              Отправить заявку {orderPrice && `(${orderPrice} руб.)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form_order;
