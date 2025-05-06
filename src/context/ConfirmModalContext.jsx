import { createContext, useContext, useState } from "react";
import "../css/Style_confirm_model.css"

const ConfirmModalContext = createContext();
const useConfirmModal = () => useContext(ConfirmModalContext);

const ConfirmModalProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const showConfirmModal = ({ title, message, onConfirm }) => {
    setModalContent({ title, message, onConfirm });
    setIsVisible(true);
  };

  const handleConfirm = () => {
    modalContent.onConfirm();
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <ConfirmModalContext.Provider value={{ showConfirmModal }}>
      {children}
      {isVisible && (
        <div className="modal-confirm">
          <div className="modal-confirm-content">
            <h1>{modalContent.title}</h1>
            <p>{modalContent.message}</p>
            <div className="modal-confirm-buttons">
              <button className="green-btn" onClick={handleConfirm}>
                Да
              </button>
              <button className="red-btn" onClick={handleCancel}>
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmModalContext.Provider>
  );
};

export { useConfirmModal };
export default ConfirmModalProvider;
