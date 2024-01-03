import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({_id, title, category, summary, cover, createdAt, author, onView }) {
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
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`} onClick={handleView}>
          <img src={`http://localhost:4000/${cover}`} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`} onClick={handleView}>
          <h2>{title}</h2>
        </Link>
        <p className={categoryClassName}>{categoryName}</p>
        
        <p className="info">
          <img
            className="profile-pic"
            src={`http://localhost:4000/uploads/${author.profilePicture}`}
            alt={author.username}
          />
          <a className="author">{author.username}</a>
          <time className="date">{formattedDate}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}