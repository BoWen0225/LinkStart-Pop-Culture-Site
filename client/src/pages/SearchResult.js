import { useEffect, useState } from "react";
import React from 'react';
import Post from "../Post";
import { useLocation} from "react-router-dom";

export default function SearchResults() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("title");
  
  useEffect(() => {
    fetch("https://link-start-pop-culture-site.herokuapp.com/post")
      .then((response) => response.json())
      .then((allPosts) => {
        const filteredPosts = allPosts.filter((post) => 
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setPosts(filteredPosts);
      });
  }, [searchQuery]);


  return (
    <div className="results-container">
      <h1>Search Results for "{searchQuery}"</h1>
      {posts.map((post,index) => (
        <React.Fragment key={post._id}>
        <Post
          key={post._id}
          {...post}
         
        />
        {index < posts.length - 1 && <div className="post-divider"></div>}
        </React.Fragment>
      ))}
      
    </div>
  );
}