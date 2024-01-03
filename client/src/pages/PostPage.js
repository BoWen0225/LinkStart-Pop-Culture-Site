import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BottomPost from "../BottomPost";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { useLocation} from "react-router-dom";
import Twitter from '../img/twitter.png';
import Youtube from '../img/youtube.png';
import Facebook from '../img/facebook.png';
import Instagram from '../img/instagram.png';
import Footer from "../Footer";

export default function PostPage() {
  const location = useLocation();
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const category = postInfo?.category;

  useEffect(() => {
    fetch(`https://link-start-pop-culture-site.herokuapp.com/post/${id}`)
      .then((response) => {
        response.json().then((postInfo) => {
          setPostInfo(postInfo);
        });
      });
  }, [id]);

  useEffect(() => {
    if (category) {
      let url = `https://link-start-pop-culture-site.herokuapp.com/post?cat=${category}`;
      fetch(url)
        .then((response) => response.json())
        .then((fetchedPosts) => {
     
          const filteredPosts = fetchedPosts.filter((post) => post._id !== id);
      
          const adjustedPosts = filteredPosts.slice(0, 2).concat(filteredPosts.slice(2));
          
          setPosts(adjustedPosts.slice(0, 3));
        });
    }
  }, [category, id]);

  if (!postInfo) return '';
  
  const handleViewPost = (postId) => {
    fetch(`https://link-start-pop-culture-site.herokuapp.com/view-post/${postId}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'View count incremented successfully') {

        }
      })
      .catch((error) => {
        console.error('Error incrementing view count:', error);
      });
  };

  return (
    <div className="post-page">
      <div className="image">
        <img src={`https://link-start-pop-culture-site.herokuapp.com/${postInfo.cover}`} alt="" />
      </div>
   
    <div className="contents">
    {postInfo.category === 'technology' && (
  <h2 className="directory">Tech {">"} Article</h2>
)}

{postInfo.category === 'gaming' && (
  <h2 className="directory">Gaming {">"} Article</h2>
)}

{postInfo.category === 'shows' && (
  <h2 className="directory">Shows {">"} Article</h2>
)}

{postInfo.category === 'movies' && (
  <h2 className="directory">Movies {">"} Article</h2>
)}
      <h4 className="title">{postInfo.title}</h4>

      <p className="summary">{postInfo.summary}</p>
      <div className="sns-links">

      <a className="sns-icon" href="https://twitter.com/home" target="_blank">
      <img src={Twitter}alt="No image" />
      </a>
      
      <a className="sns-icon" href="https://www.youtube.com/" target="_blank">
      <img src={Youtube}alt="No image" />
      </a>

      <a className="sns-icon" href=" https://www.facebook.com/" target="_blank">
      <img src={Facebook}alt="No image" />
      </a>

      <a className="sns-icon" href="https://www.instagram.com/" target="_blank">
      <img src={Instagram}alt="No image" />
      </a>
      </div>
      
      
      <div className="author">
        
        {postInfo.author.profilePicture && (
          <img
            src={`https://link-start-pop-culture-site.herokuapp.com/uploads/${postInfo.author.profilePicture}`}
            alt="Profile Picture"
            className="profile-pic"
          />
        )}
        <span className="username">By: {postInfo.author.username}</span>
        <time className="date">Posted: {format(new Date(postInfo.createdAt), 'yyyy-MM-dd')}</time>
      </div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            Edit this post
          </Link>
        </div>
      )}
      
      <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
     
      <div className="colored-line"></div>
<div className="read-more">
        <h2 className="read-more">Read More</h2>
        <div className="posts2">
          {posts.length > 0 &&
            posts.map((post) => (
              <BottomPost
                key={post._id}
                {...post}
                onView={() => handleViewPost(post._id)}
                
          />
        ))}
        </div>
        </div>
      </div>
      <Footer/>
    </div>

  );
  
}