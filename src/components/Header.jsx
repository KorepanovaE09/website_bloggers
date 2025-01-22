import { Link } from "react-router-dom";
import "../css/Style_Header.css";
import logo from "../assets/img/логотип.png";
import walletIcon from "../assets/img/кошелек.png";

const Header = () => {
  return (
    <header>
      <img className="header_logo" src="#" alt="Логотип"></img>  
      <div className="header_right">
        <Link to="/balance">
          <button className="button_line">
            <img className="img_balance" src={walletIcon} alt = "Кошелек"/>
            Баланс
            </button>
        </Link>
        <Link to="/profile">
          <button className="button_profile">Имя пользователя</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
