import Bloggers_card from "./Bloggers_card";
import "../css/Style_bloggers.css";
import { useEffect } from "react";

const Bloggers = () => {
  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "hidden";
    };
  }, []);

  return (
    <div className="bloggers-page">
      <div className="bloggers-header">
        <h1>Блогеры</h1>
        <button className="open-modal-filter">Применить фильтр</button>
      </div>
      <Bloggers_card />
    </div>
  );
};

export default Bloggers;
