import {React,useEffect,useState} from 'react';
import Twitter from './img/twitter.png';
import Youtube from './img/youtube.png';
import Facebook from './img/facebook.png';
import Instagram from './img/instagram.png';
import Icon from './img/square-logo.png';

export default function Header(){
  const [showPhoneContainers, setShowPhoneContainers] = useState(false);
  useEffect(() => {
    
  const handleResize = () => {
    setShowPhoneContainers(window.innerWidth <= 1200); 
  };


  handleResize();


  window.addEventListener("resize", handleResize);


  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

  return (
    <footer className="footer-container">
      <div className="footer-content">
      {!showPhoneContainers && (     
      <div className="footer-section-logo"> <img classname="logo" src={Icon} alt="Facebook" /></div>
      )}
        <div className="footer-section">
       
          <h3>About Us</h3>
          <p>Your go-to source for the latest in pop culture news and trends. LinkStart has a wide selection of curated articles by our community authors to browse for free</p>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@linkstart.com</p>
          <p>Phone: (555) 123-4567</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <p>Stay connected on social media:</p>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={Facebook} alt="Facebook" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={Twitter} alt="Twitter" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={Instagram} alt="Instagram" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={Youtube} alt="Youtube" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-divider"></div>
      <div className="footer-bottom">
        <p>&copy; 2023 LinkStart co. All rights reserved.</p>
      </div>
    </footer>
  );
};

