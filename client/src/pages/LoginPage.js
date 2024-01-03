import {useContext, useState} from "react";
import { Navigate } from "react-router";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import Footer from "../Footer";


export default function LoginPage(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const[redirect,setRedirect]=useState(false);
    const {setUserInfo}=useContext(UserContext);
    async function login(ev){
        ev.preventDefault();
        const response=await fetch('http://localhost:4000/login',{
            method:'POST',
            body:JSON.stringify({username,password}),
    headers:{'Content-Type':'application/json'},
    credentials:'include',
});
if(response.ok){
    response.json().then(userInfo=>{
        setUserInfo(userInfo);
        setRedirect(true);
    });
    }else{
        alert('wrong credentials')
    }
}
if(redirect){
    return<Navigate to={'/'}/>
}
    return (
        <div className="login-all">
        <div className="login-background">
            <div className="login-box">
        
            <form className="login" onSubmit={login}>
                 <h1>Login</h1>
                <input type="text"
                 placeholder="username"
                  value={username}
                  onChange={ev=>setUsername(ev.target.value)}/>

                <input type="password" 
                placeholder="password" 
                value={password}
                onChange={ev=>setPassword(ev.target.value)}/>
                <button className="auth-button">Login</button>
                <p>New to LinkStart?</p><Link to="/register">Create a free account</Link>
            </form>
            </div>
           
            </div>
            <Footer/>
            </div>
            
            
        
    );
}