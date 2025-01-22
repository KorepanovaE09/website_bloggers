import { Link } from "react-router-dom";
import "../css/Style_balance.css";

const Balance = () => {
  return (
    <div className="MyBalance_form">
      <div className="MyBalance_top">
        <div className="MyBalance_title">
          <h1>Мой баланс</h1>
        </div>
        <div className="MyBalance_sum">
          <h2>₽</h2>
        </div>
      </div>
      <div className="MyBalance_payment">
        <h2> Введите сумму </h2>
        <input type="text" className="MyBalancePayment_input"></input>
        <button className="MyBalancePayment_button">Пополнить баланс</button>
      </div>
    </div>
  );
};

export default Balance;
