import { useState } from "react";
import "../css/Style_form_new_order.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import usePostData from "../hooks/usePostData";
import Loader from "../components/Loader";
import { useConfirmModal } from "../context/ConfirmModalContext";
import { validateForm } from "../utils/validateForm";
import Success from "../components/Success";
import Error from "../components/Error";
import Info from "../components/Info";

const Form_order = () => {
  const navigate = useNavigate();
  const { postData, isLoading, error } = usePostData();
  const { showConfirmModal } = useConfirmModal();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState({
    title: "",
    deadlineEnd: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    deadlineEnd: "",
    description: "",
  });

  const today = new Date().toISOString().split("T")[0];
  const price = searchParams.get("price");
  const pricelist_id = searchParams.get("service");
  const receiverId = searchParams.get("bloggerId");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleModalSaveChange = () => {
    showConfirmModal({
      title: "",
      message: "Вы уверены, что хотите отправить заявку?",
      onConfirm: () => handleSubmit(),
    });
  };

  const handleSubmit = async () => {
    try {
      await postData("/orders/create-order", {
        ...order,
        price,
        pricelist_id,
        receiverId,
      });
      setTimeout(() => navigate("/orders"), 3000);
      setShowSuccess(true);
    } catch (err) {
      setShowError(true);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="form-order">
      <div className="form-order-conteiner">
        <h1>ФОРМА ЗАКАЗА</h1>
        <div className="form-order-content">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleModalSaveChange();
            }}
          >
            <div className="form-order-input">
              <input
                className="form-order-name"
                name="title"
                type="text"
                placeholder="Название заказа"
                onChange={handleChange}
                required
              ></input>
              <input
                className="form-order-date"
                name="deadlineEnd"
                type="date"
                onChange={handleChange}
                min={today}
                required
              />
            </div>
            <textarea
              type="text"
              name="description"
              placeholder="Описание заказа"
              onChange={handleChange}
              required
            ></textarea>

            <div className="save-order">
              <button className="save-order-btn" type="submit">
                Отправить заявку {price && `(${price} руб.)`}
              </button>
            </div>
          </form>
        </div>
      </div>
      {showSuccess && (
        <Success title="Заказ создан!" onClose={() => setShowSuccess(false)} />
      )}
      {showError && (
        <Error title={errorMessage} onClose={() => setShowError(false)} />
      )}
      <Info title="Пожалуйста, не забудьте пополнить счёт — так блогер точно увидит ваш заказ!"/>
    </div>
  );
};

export default Form_order;
