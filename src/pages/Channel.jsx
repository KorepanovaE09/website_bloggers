import "../css/Style_channel.css";
import AddChannel from "./AddСhannel";
import { useState } from "react";

const Channel = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="modal-conteiner-addChannel">
      <h1>Каналы</h1>
      <button className="open-modal-btn-addChannel" onClick={openModal}>
       <svg className="plus-icon" viewBox="0 0 24 24">
        <line x1="12" y1="4" x2="12" y2="20" stroke="black" strokeWidth="1.5"/>
        <line x1="4" y1="12" x2="20" y2="12"stroke="black" strokeWidth="1.5"/>
        </svg> Добавить канал
      </button>

      {modalOpen && <AddChannel closeModal={closeModal} />}
    </div>
  );
};

export default Channel;
