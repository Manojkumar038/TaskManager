import React, { useState } from 'react';
import './styleSheets/LoginSignup.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const LoginSignup = () => {
    const [toggle, setToggle] = useState("Sign Up");

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
            <input type="text" placeholder="Username" />
          </div>
        )}

        <div className="input">
          <FontAwesomeIcon className="icon" icon={faEnvelope} />
          <input type="email" placeholder="Email " />
        </div>

        <div className="input">
          <FontAwesomeIcon className="icon" icon={faLock} />
          <input type="password" placeholder="Password" />
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
            setToggle("Sign Up");
          }}
        >
          SignUp
        </div>
        <div
          className={toggle === "Sign Up" ? "submit grey" : "submit"}
          onClick={() => {
            setToggle("Login");
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
}

export default LoginSignup
