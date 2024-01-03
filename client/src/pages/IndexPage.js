import { useEffect, useState } from "react";
import React from 'react';
import Post from "../Post";
import TopPost from "../TopPost";
import { useLocation} from "react-router-dom";
import { Link} from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./Carousel.css";
import "../Footer.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Left from '../img/leftarrow.png';
import Right from '../img/rightarrow.png';
import Prize from '../img/prize.png';


export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [phonecarousel, setPhoneCarousel] = useState([]);
  const [top, setTop] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("cat");
  const postsPerPage = 5; 
  const carouselInterval = 3000; 
  const [showPhoneContainers, setShowPhoneContainers] = useState(false);
  const [showPhoneCarousel, setShowPhoneCarousel] = useState(false);
  

  useEffect(() => {
    let url = "http://localhost:4000/post";
    if (category) {
      url += `?cat=${category}`;
    }
  
    fetch(url)
      .then((response) => response.json())
      .then((posts) => {
        let sortedPosts = [...posts].sort(
          (a, b) => parseInt(b.views, 10) - parseInt(a.views, 10)
        );

        setPosts(posts);
        setCarousel(sortedPosts.slice(0, 3));
        setPhoneCarousel(sortedPosts.slice(0, 1));
        setTop(sortedPosts.slice(0, 6))
        setCurrentPage(1);
      });
  }, [category]);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.charset = "utf-8";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  

  const handleViewPost = (postId) => {
    fetch(`http://localhost:4000/view-post/${postId}`, {
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


  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
    
  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search?title=${searchQuery}`);
  };
  

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

useEffect(() => {
  const handleResize = () => {
    setShowPhoneContainers(window.innerWidth <= 900); 
  };


  handleResize();

 
  window.addEventListener("resize", handleResize);


  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

useEffect(() => {
  const handleResize = () => {
    setShowPhoneCarousel(window.innerWidth <= 1000); 
  };

 
  handleResize();


  window.addEventListener("resize", handleResize);


  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

  return (
    <>
   {!showPhoneCarousel && (  
<Carousel key={carousel.map(post => post._id).join(',')} showArrows={false} showThumbs={false} interval={4000} autoPlay infiniteLoop >

  <div id={`carousel-container-${category}`} className="carousel-container">
    {carousel.map((post, index) => (
      <Link to={`/post/${post._id}`} key={index} onClick={() => handleViewPost(post._id)}>
        <div>
          <img src={`http://localhost:4000/${post.cover}`} /> 
          <p className="legend">{post.title}</p>
        </div>
      </Link>
    ))}
  </div>

  <div id={`carousel-container-next-${category}`} className="carousel-container">
    {top.slice(3, 6).map((post, index) => (
      <Link to={`/post/${post._id}`} key={index} onClick={() => handleViewPost(post._id)}>
        <div>
          <img src={`http://localhost:4000/${post.cover}`} /> 
          <p className="legend">{post.title}</p>
        </div>
        
      </Link>
    ))}
  </div>


</Carousel>
   )}

{showPhoneCarousel && (  
<Carousel key={phonecarousel.map(post => post._id).join(',')} showArrows={false} showThumbs={false} interval={4000} autoPlay infiniteLoop >

  <div id={`carousel-container-${category}`} className="carousel-container">
    {phonecarousel.map((post, index) => (
      <Link to={`/post/${post._id}`} key={index}  onClick={() => handleViewPost(post._id)}>
        <div>
          <img src={`http://localhost:4000/${post.cover}`} /> 
          <p className="legend">{post.title}</p>
        </div>
      </Link>
    ))}
  </div>

  <div id={`carousel-container-next-${category}`} className="carousel-container">
    {top.slice(1,2).map((post, index) => (
      <Link to={`/post/${post._id}`} key={index}  onClick={() => handleViewPost(post._id)}>
        <div>
          <img src={`http://localhost:4000/${post.cover}`} /> 
          <p className="legend">{post.title}</p>
        </div>
      </Link>
    ))}
  </div>


    <div id={`carousel-container-next-${category}`} className="carousel-container">
    {top.slice(2,3).map((post, index) => (
      <Link to={`/post/${post._id}`} key={index}  onClick={() => handleViewPost(post._id)}>
        <div>
          <img src={`http://localhost:4000/${post.cover}`} /> 
          <p className="legend">{post.title}</p>
        </div>
      </Link>
    ))}
  </div>

  

    <div id={`carousel-container-next-${category}`} className="carousel-container">
    {top.slice(3,4).map((post, index) => (
      <Link to={`/post/${post._id}`} key={index}  onClick={() => handleViewPost(post._id)}>
        <div>
          <img src={`http://localhost:4000/${post.cover}`} /> 
          <p className="legend">{post.title}</p>
        </div>
      </Link>
    ))}
  </div>


</Carousel>
   )}
<div className="posts-container">

{category ? (
  <h2 className={`posts-title ${category}`}>
    {category === 'technology' && 'Tech '}
    {category === 'gaming' && 'Gaming '}
    {category === 'shows' && 'Shows '}
    {category === 'movies' && 'Movies '}
  </h2>
) : (
  <h2 className="posts-title">All Posts </h2>
)}

<div className="posts">
{currentPosts.map((post, index) => (
  <React.Fragment key={post._id}>
    <Post
      key={post._id}
      {...post}
      onView={() => handleViewPost(post._id)}
    />
    {index < currentPosts.length - 1 && <div className="post-divider"></div>}
  </React.Fragment>
))}
          
        </div>
        

        {!showPhoneContainers && (     
<div className="sidebar">

<div className="searchbar">
        <h3>Find Article</h3>
        <form onSubmit={handleSearch}>
    <input 
      type="text" 
      value={searchQuery}
      onChange={handleInputChange} 
    />
    <button type='submit'>Search</button>
  </form>
      </div>
     
<div className="top-posts">
<div className="prize-container">
<img classname="prize" src={Prize}alt="No image" />
</div>
  <h3 className="Ranking">Ranking</h3>
  <div className="posts3">
      {top.length > 0 &&
        top.slice(0,5).map((post,index) => (
          <TopPost
            key={post._id}
            rank={index + 1} 
            {...post}
            onView={() => handleViewPost(post._id)} 
            
          />
        ))}
        
        </div>
  </div>
  
  <div className="twitter-timeline">
  <a class="twitter-timeline" href="https://twitter.com/LinkStart_site?ref_src=twsrc%5Etfw">Tweets by LinkStart_site</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  </div>
  
</div>
  )}     
</div>
  
<div className="pagination">
  {currentPage !== 1 && (
    <Link
      className="leftarrow"
      onClick={() => {
        setCurrentPage(currentPage - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      to={`?page=${currentPage - 1}${category ? `&cat=${category}` : ''}`}
    >
      <img src={Left} alt="No image" />
    </Link>
  )}

  {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map(
    (_, index) => (
      <Link
        className={`numbers ${
          currentPage === index + 1 ? 'current-page' : ''
        }`}
        key={index}
        to={`?page=${index + 1}${category ? `&cat=${category}` : ''}`}
        onClick={() => {
          setCurrentPage(index + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        {index + 1}
      </Link>
    )
  )}

  {currentPage !== Math.ceil(posts.length / postsPerPage) && (
    <Link
      className="rightarrow"
      onClick={() => {
        setCurrentPage(currentPage + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      to={`?page=${currentPage + 1}${category ? `&cat=${category}` : ''}`}
    >
      <img src={Right} alt="No image" />
    </Link>
  )}
</div>
{showPhoneContainers && (
  <div className="top-posts-phone">
  <div className="prize-container">
  <img classname="prize" src={Prize}alt="No image" />
  </div>
    <h3 className="Ranking">Ranking</h3>
    <div className="posts3">
        {top.length > 0 &&
          top.slice(0,5).map((post,index) => (
            <TopPost
              key={post._id}
              rank={index + 1}
              {...post}
              onView={() => handleViewPost(post._id)}
              
            />
          ))}
          
          </div>
    </div>
)}
{showPhoneContainers && (
<div className="twitter-timeline-phone">
  <a class="twitter-timeline" href="https://twitter.com/LinkStart_site?ref_src=twsrc%5Etfw">Tweets by LinkStart_site</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  </div>
)}
<Footer/>
    </>
  );
 
}


