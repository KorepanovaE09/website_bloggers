import Bloggers_card from "./Bloggers_card";
import "../css/Style_bloggers.css";
import { useCallback, useEffect, useRef, useState } from "react";
import BloggerFilter from "./BloggersFilter";
import useData from "../hooks/useData";
import bloggersData from "../mockData/bloggersData";
import Loader from "../components/Loader";
import Progress from "../components/Progress";
import { lime } from "@mui/material/colors";


const Bloggers = () => {
  const { data: newData, isLoading, isError } = useData("/bloggers");
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (newData) {
      setData(newData);
    }
  }, [newData]);

  const handleUpdateFilter = (filterData) => {
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
      <Bloggers_card bloggers={data}/>
      {isLoading && <Progress />}
    </div>
  );
};

export default Bloggers;
