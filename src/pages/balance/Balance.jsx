import BalanceHistory from "./BalanceHistory";
import useData from "../../hooks/useData";
import Loader from "../../components/Loader";
import "../../css/Style_balance.css";
import usePostData from "../../hooks/usePostData";
import { useState, useContext, useEffect } from "react";
import Success from "../../components/Success";
import Error from "../../components/Error";
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import ConfirmAction from "../../components/ConfirmAction";

const Balance = () => {
  const { data, refetch } = useData("/user/transactions");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [operation, setOperation] = useState();
  const { postData } = usePostData();
  const [amount, setAmount] = useState();
  const { user, refetch: refetchUserData } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const state = location.state;
    if (state && typeof state.password !== "undefined") {
      if (state.password) {
        setShowSuccess(true);
        setErrorMessage("Неверный пароль");
      } else {
        setShowError(true);
      }
      window.history.replaceState({}, document.title);
    }
  }, []);

  if (!data) {
    return <Loader />;
  }

  const confirmModal = () => {
    setShowConfirm(true);
  };

  const handleSubmit = async (password) => {
    try {
      await postData(`/balance/${operation}`, { amount: +amount, password });
      setAmount("");
      await refetchUserData();
      await refetch();
      setShowSuccess(true);
    } catch (err) {
      if (err.response?.status === 402) {
        setErrorMessage("Недостаточно средств для выполнения операции");
      } else {
        setErrorMessage("Произошла ошибка при выполнении операции");
      }
      setShowError(true);
      console.log(err);
    }
  };

  return (
    <div className="transaction">
      <div className="balance-top">
        <div className="balance-action">
          <input
            className="balance-action-input"
            type="number"
            placeholder="Введите сумму"
            value={amount || ""}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            className={`btn-deposit ${!amount ? "disabled" : ""}`}
            disabled={!amount}
            onClick={() => {
              confirmModal();
              setOperation("deposit");
            }}
          >
            Пополнить
          </button>
          <button
            className="btn-withdraw"
            onClick={() => {
              confirmModal();
              setOperation("withdraw");
            }}
          >
            Снять
          </button>
        </div>
        {(user?.role === "advertiser") && (
          <input
            type="text"
            className="frozen_balance"
            value={`${data?.frozen_balance} руб. заморожено`}
            disabled
          />
        )}
      </div>

      <div className="balance-history">
        <h1>История платежей</h1>
        <BalanceHistory data={data?.transactions} />
      </div>

      {showConfirm && (
        <ConfirmAction
          action={handleSubmit}
          onClose={() => setShowConfirm(false)}
        />
      )}

      {showSuccess && (
        <Success
          onClose={() => setShowSuccess(false)}
          style={{ top: "91px" }}
        />
      )}

      {showError && (
        <Error
          title={errorMessage}
          onClose={() => setShowError(false)}
          style={{ top: "91px" }}
        />
      )}
    </div>
  );
};

export default Balance;

//
