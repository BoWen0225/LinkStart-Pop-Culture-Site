import { useContext } from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import { UserContext } from "./UserContext";
import Gaming from './img/gaming.png';
import Technology from './img/laptop.png';
import Shows from './img/tv-show.png';
import Movies from './img/movie.png';
import Home from './img/Home.png';
import Profile from './img/profile.png';
import Logo from './img/LinkStart.png';
import Cross from './img/Cross.png';

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [currentCategory, setCurrentCategory] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
 

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }
  const username = userInfo?.username;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("cat");
    setCurrentCategory(category);
  }, [location.search]);

  const handleIconClick = (category) => {
    setCurrentCategory(category);
    navigate(`/?cat=${category}`);
  };
  useEffect(() => {
    const handleResize = () => {
      setShowDropdown(window.innerWidth <= 1000);
      setDrawerOpen(false);
    };
  

    handleResize();
  

    window.addEventListener("resize", handleResize);
  
 
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search?title=${searchQuery}`);
  };
  
  return (
    
    <header>
       {!showDropdown && (
      <Link to="/" className="logo">
        <img src={Logo} alt="No image" />
      </Link>
    )}

      {showDropdown && (
        <div className="phone-nav">
        <div className="hamburger-menu" onClick={handleDrawerToggle}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>

      </div>
                
                
                  </div>
      

      
    )} 
{showDropdown && (
<Link to="/" className="phone-logo">
  
<a onClick={handleDrawerToggle}>
                    <img src={Logo} alt="No image" />
                    </a>
                  </Link>)}
                  
                  {drawerOpen && <div className="backdrop" onClick={handleDrawerToggle}></div>}
     {drawerOpen && (
        <div className="drawer">
          
          <a onClick={handleDrawerToggle} ><img src={Cross} alt="No image" className="cross-image"></img></a>
          <div className="searchbar-phone">
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
      <Link to="/"className="drawer-item"onClick={handleDrawerToggle}><div><img src={Home} alt="No image" className="drawer-image" />Home</div></Link>
          <Link to="/?cat=gaming" className="drawer-item"onClick={handleDrawerToggle}><div><img src={Gaming} alt="No image" className="drawer-image"/>Gaming</div></Link>
          <Link to="/?cat=technology"className="drawer-item" onClick={handleDrawerToggle}><div><img src={Technology} alt="No image" className="drawer-image"/>Tech</div></Link>
          <Link to="/?cat=shows"className="drawer-item"onClick={handleDrawerToggle}><div><img src={Shows} alt="No image" className="drawer-image"/>Shows</div></Link>
          <Link to="/?cat=movies"className="drawer-item" onClick={handleDrawerToggle}><div><img src={Movies} alt="No image" className="drawer-image"/>Movies</div></Link>

          
          {username ? (
            <>
              <Link to="/create">Create new post</Link>
              <a onClick={logout}>Logout</a>
            </>
          ) : (
            <Link to="/login"onClick={handleDrawerToggle}>Login</Link>
          )}
        </div>
      )}
    
    
    
    {!showDropdown && ( 
      
      <nav className="icons">
        <Link to="/?cat=gaming" className={currentCategory === 'gaming' ? 'active' : ''}>
          <div className="icon"><img src={Gaming} alt="No image" /></div>Gaming
        </Link>
        <Link to="/?cat=technology" className={currentCategory === 'technology' ? 'active' : ''}>
          <div className="icon"><img src={Technology} alt="No image" /></div>Tech
        </Link>
        <Link to="/?cat=shows" className={currentCategory === 'shows' ? 'active' : ''}>
          <div className="icon"><img src={Shows} alt="No image" /></div>Shows
        </Link>
        <Link to="/?cat=movies" className={currentCategory === 'movies' ? 'active' : ''}>
          <div className="icon"><img src={Movies} alt="No image" /></div>Movies
        </Link>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            
           
          </>
        )}
      </nav>
    )}
    {!showDropdown && (
      <nav className="profile-icons"><Link to="/login"><div className="profile"><img src={Profile}alt="No image" /></div></Link></nav>
    )}
    </header>
  );
}