import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); 

  async function register(ev) {
    ev.preventDefault();

    
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("profilePicture", profilePicture); 

    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: formData, 
    });

    if (response.status === 200) {
      alert("Registration succeeded");
    } else {
      alert("Registration failed");
    }
  }

  return (
    <div className="login-all">
    <div className="login-background">
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(ev) => setProfilePicture(ev.target.files[0])}
      />

      <button className="auth-button">Register</button>
      <p>Have an LinkStart account?</p><Link to="/login">Sign in here</Link>
    </form>
    </div>
     <Footer/>
     </div>
  );
}
