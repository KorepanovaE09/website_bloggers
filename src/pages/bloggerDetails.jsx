import { useParams } from "react-router-dom";
import bloggersData from "../mockData/bloggersData";

const BloggerDetails = () => {
  const { id } = useParams();
  const blogger = bloggersData.find((b) => b.id === parseInt(id));

  if (!blogger) {
    return <p>Блогер не найден</p>;
  }

  return (
    <div>
      <h1>{blogger.name}</h1>
      <p>Подписчики: {blogger.followers}</p>
      <p>Категория: {blogger.category}</p>
    </div>
  );
};

export default BloggerDetails;
