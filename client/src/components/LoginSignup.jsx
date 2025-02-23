import React, { useState } from 'react';
import './styleSheets/LoginSignup.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const LoginSignup = () => {
    const [toggle, setToggle] = useState("Sign Up");

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async () => {
        console.log(userData);
        try {
            const url = toggle === "Login"
            ? "http://localhost:5000/api/auth/login"
            : "http://localhost:5000/api/auth/register";
            const response = await axios.post(url, userData);
            const data = response.data; 
            console.log(data);
            alert(data.message);
        }catch (error) {
          console.error('Registration error: ', error);
          alert("Something went wrong");
        }
    }
  return (
    <div className="container">
      <div className="header">
        <div className="text">{toggle}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {toggle === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <FontAwesomeIcon className="icon" icon={faUser} />
            <input type="text" placeholder="Username" name='name' onChange={handleChange}/>
          </div>
        )}

        <div className="input">
          <FontAwesomeIcon className="icon" icon={faEnvelope} />
          <input type="email" placeholder="Email" name='email' onChange={handleChange} />
        </div>

        <div className="input">
          <FontAwesomeIcon className="icon" icon={faLock} />
          <input type="password" placeholder="Password" name='password' onChange={handleChange} />
        </div>
      </div>

      {toggle === "Sign Up" ? (
        <div></div>
      ) : (
        <div className="forgot-password">
          Forgot Password.? <a href="#forgotpassword link">Click Here</a>
        </div>
      )}

      <div className="submit-container">
        <div
          className={toggle === "Login" ? "submit grey" : "submit"}
          onClick={() => {
            if(toggle === "Login"){
                setToggle("Sign Up");
            }else{
                handleSubmit();
            }
          }}
        >
          SignUp
        </div>
        <div
          className={toggle === "Sign Up" ? "submit grey" : "submit"}
          onClick={() => {
            if(toggle === "Sign Up"){
                setToggle("Login");
            }else{
                handleSubmit();
            }
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
}

export default LoginSignup
