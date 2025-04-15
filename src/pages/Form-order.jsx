import { useState } from "react";
import "../css/Style_form_order.css";
import { useSearchParams } from "react-router-dom";

const Form_order = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  
  const [searchParams] = useSearchParams()
  const orderPrice = searchParams.get('price')
  const bloggerId = searchParams.get('bloggerId');

  return (
    <div className="form-order">
      <div className="form-order-conteiner">
        <h1>ФОРМА ЗАКАЗА</h1>
        <div className="form-order-content">
          <div className="form-order-input">
            <input
              className="form-order-name"
              type="text"
              placeholder="Название заказа"
            ></input>
            <input
              className="form-order-date"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              min={today}
            />
          </div>

          <textarea type="text" placeholder="Описание заказа"></textarea>

          <div className="save-order">
            <button className="save-order-btn">
              Отправить заявку {orderPrice && `(${orderPrice} руб.)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form_order;
