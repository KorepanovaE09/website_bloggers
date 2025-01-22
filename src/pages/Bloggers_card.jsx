import bloggersData from "../mockData/bloggersData";
import { Link } from "react-router-dom";
import "../css/Style_bloggers_card.css";

const BloggersList = () => {
  return (
    <div>
      <div className="bloggers_container">
        {bloggersData.map((blogger) => (
          <Link to={`/blogger/${blogger.id}`} key={blogger.id}>
            <div className="blogger_card">
              <div className="blogger_vard_left">
                <div className="blogger_card_head">
                  <div className="blogger_card_head_user">
                    <img src={blogger.src} alt={blogger.alt} />
                  </div>
                  <div className="blogger_card_head_info">
                    <h2>{blogger.name}</h2>
                    <p>Категория: {blogger.category}</p>
                  </div>
                </div>
                <div className="blogger_card_head_description">
                  <p>Подписчики: {blogger.followers}</p>
                  <p>{blogger.description}</p>
                </div>
              </div>
              <div className="blogger_card_analytic">
                <p>Охваты {blogger.reach}</p>
                <p>cpv {blogger.cpv}</p>
                <p>er {blogger.er}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BloggersList;
