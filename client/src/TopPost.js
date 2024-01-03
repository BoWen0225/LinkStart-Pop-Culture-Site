import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function TopPost({_id, title, category, summary, cover, createdAt, author, onView, views, rank }) {
  const formattedDate = format(new Date(createdAt), "yyyy-MM-dd");

  const categoryMapping = {
    gaming: "Games",
    technology: "Tech",
    shows: "TV Show",
    movies: "Movie",
   
  };

  const categoryName = categoryMapping[category] || category;


  const categoryClassName = `category-${category}`;

  const handleView = () => {
    onView();
  };

  return (
    <div className="top-post">
      <div className="image">
        <Link to={`/post/${_id}`} onClick={handleView}>
          <div className="ranking-overlay">
            <div className="ranking">{rank}</div>
          </div>
          <img src={`http://localhost:4000/${cover}`} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`} onClick={handleView}>
          <h2>{title}</h2>
        </Link>
        <p className="views">{views} views</p>
      </div>
    </div>
  );
}