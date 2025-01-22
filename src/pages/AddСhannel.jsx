import { useState } from "react";
import CountryList from "react-select-country-list";
import "../css/Style_addChannel.css"

const AddChannel = ({closeModal}) => {
  //   хранит выбранную соц сеть
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  //   отображение выпадающего списка
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isMale, setIsMale] = useState(false)
  const [isFemale, setIsFemale] = useState(false)

  const [selectedCountry, setSelectedCountry] = useState("")

  const handleSelectNetwork = (network) => {
    setSelectedNetwork(network);
    setIsDropdownOpen(false);
  };

  const handleGenderSelect = (gender) => {
    if (gender === "female") {
        setIsFemale(true)
        setIsMale(false)
    }
    else if (gender === "male") {
        setIsMale(true)
        setIsFemale(false)
    }
  }

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value)
  }

  const socialNetwork = [
    {
      name: "Instagram",
      img: "https://wowblogger.ru/_nuxt/img/instagram.596a637.svg",
    },
    { name: "YouTube", img: "https://avatars.mds.yandex.net/i?id=14833da2aec158d75423d3c736e7d0c4_l-5246466-images-thumbs&n=13" },
    { name: "Telegram", img: "https://avatars.mds.yandex.net/i?id=238d2d66c028d2b1601346e8f7341c56_l-5433869-images-thumbs&n=13" },
    {name: "Вконтакте", img: "https://avatars.mds.yandex.net/i?id=38854c1e46a1901f45b0d607643fa76d_l-4715391-images-thumbs&n=13"}
  ];
  return (
    <div className="modal-addChannel" onClick={closeModal}>
      <div
        className="modal-addChannelContent"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Расскажите о себе</h1>

        <button className="close-modal-btn-addChannel" onClick={closeModal}>
        <svg className="close-icon" viewBox="0 0 24 24">
        <line x1="4" y1="4" x2="20" y2="20" stroke="black" strokeWidth="1.5"/>
        <line x1="20" y1="4" x2="4" y2="20" stroke="black" strokeWidth="1.5"/>
        </svg>
        </button>

        <div className="dropdown-network">
          <button className="dropdown-network-btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {selectedNetwork ? (
              <>
                <img className = "dropdown-network-img" src={selectedNetwork.img} alt={selectedNetwork.name} />
                {selectedNetwork.name}
              </>
            ) : (
              "Выберите соцсеть"
            )}
          </button>

          {isDropdownOpen && (
            <ul className="dropdown-list-network">
              {socialNetwork.map((network, index) => (
                <li key={index} onClick={() => handleSelectNetwork(network)}>
                  <img className = "dropdown-network-img" src={network.img} alt={network.name} />
                  {network.name}
                </li>
              ))}
            </ul>
          )}

          <div className="modal-addChannel-gender">
            <p> Ваш пол </p>
            <div className="modal-addChannel-gender-btn">
                <button className={isFemale ? "selected-gender" : ""} onClick={() => handleGenderSelect("female")}>Женский</button>
                <button className={isMale ? "selected-gender" : ""} onClick={() => handleGenderSelect("male")}>Мужской</button>
            </div>
          </div>

          <div className="modal-addChannel-country">
            <p>Выберите Страну</p>
            <input 
            type="text" 
            value={selectedCountry}
            onChange={handleCountryChange}
            placeholder="Введите страну"></input>
          </div>

        </div>
        <button className="save-add-channel">Сохранить</button>
      </div>
    </div>
  );
};

export default AddChannel;
