
import { useNavigate } from "react-router-dom";

export default function BottomPost({_id, title, category, summary, cover, createdAt, author, onView }) {
  const navigate = useNavigate();


   const handleView = () => {
     onView();
     navigate(`/post/${_id}`);
   };

  return (
    <div className="post3">
      <div className="image">
        <div
          style={{ cursor: 'pointer' }}
          onClick={handleView}
        >
          <img src={`http://localhost:4000/${cover}`} alt="" />
        </div>
      </div>
      <div className="texts">
        <h2
          style={{ cursor: 'pointer' }}
          onClick={handleView}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}