import Bloggers_card from "./Bloggers_card";
import "../css/Style_bloggers.css";
import { useEffect, useState } from "react";
import BloggerFilter from "./BloggersFilter";
import useData from "../hooks/useData";
import bloggersData from "../mockData/bloggersData";
import { use } from "react";
import Loader from "../components/Loader";

const Bloggers = () => {
  const { data: initialData, isLoading, isError } = useData("/bloggers");
  const [data, setData] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    // document.body.style.overflow = "auto";
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const handleUpdateFilter = (filterData) => {
    // setIsFiltering(true);
    setData(filterData);
  };

  return (
    <div className="bloggers-page">
      <div className="bloggers-header">
        <h1>Блогеры</h1>
        <button className="open-modal-filter" onClick={openModal}>
          Применить фильтр
        </button>
      </div>

      {modalOpen && (
        <BloggerFilter
          closeModal={closeModal}
          updateFilter={handleUpdateFilter}
        />
      )}
      <Bloggers_card bloggers={data} />
    </div>
  );
};

export default Bloggers;
