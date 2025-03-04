import Bloggers_card from "./Bloggers_card";
import "../css/Style_bloggers.css";
import { useEffect, useState } from "react";
import BloggerFilter from "./BloggersFilter";

const Bloggers = () => {
  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      // document.body.style.overflow = "hidden";
    };
  }, []);

  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  return (
    <div className="bloggers-page">
      <div className="bloggers-header">
        <h1>Блогеры</h1>
        <button className="open-modal-filter" onClick={openModal}>Применить фильтр</button>
      </div>

      {modalOpen && <BloggerFilter closeModal={closeModal} />}
      <Bloggers_card />
    </div>
  );
};

export default Bloggers;
