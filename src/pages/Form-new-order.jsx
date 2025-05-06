import { useState } from "react";
import "../css/Style_form_new_order.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import usePostData from "../hooks/usePostData";
import Loader from "../components/Loader";

const Form_order = () => {
  const navigate = useNavigate();
  const { postData, isLoading, error } = usePostData(true);
  // const [isLoading, setIsLoading]
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState({
    title: "",
    deadlineEnd: "",
    description: "",
  });

  const today = new Date().toISOString().split("T")[0];
  const price = searchParams.get("price");
  // const price = parseInt(searchParams.get("price"), 10);
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
        price,
        priceListTypeId,
        receiverId,
      });
      navigate("/orders");
    } catch (err) {
      console.log("Ошибка при отпрвке формы заказа", err);
    }
  };

  if (isLoading) {
    return (<Loader/>)
  }

  return (
    <div className="form-order">
      <div className="form-order-conteiner">
        <h1>ФОРМА ЗАКАЗА</h1>
        <div className="form-order-content">
          <div className="form-order-input">
            <input
              className="form-order-name"
              name="title"
              type="text"
              placeholder="Название заказа"
              onChange={handleChange}
            ></input>
            <input
              className="form-order-date"
              name="deadlineEnd"
              type="date"
              onChange={handleChange}
              min={today}
            />
          </div>

          <textarea
            type="text"
            name="description"
            placeholder="Описание заказа"
            onChange={handleChange}
          ></textarea>

          <div className="save-order">
            <button className="save-order-btn" onClick={handleSubmit}>
              Отправить заявку {price && `(${price} руб.)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form_order;
