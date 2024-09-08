import "../css/Login.css";
import React, { useLayoutEffect, useRef, useContext } from "react";
import { userContext } from "../App";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Login() {
  const setuser = useContext(userContext);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  let data = {};

  useLayoutEffect(() => {
    fetch("http://localhost:8000/users")
      .then((json) => json.json())
      .then((d) => (data = d));
  }, []);


  const submitHandler = (event) => {
    event.preventDefault();
    data.forEach((user) => {
      if (
        user.name === usernameRef.current.value &&
        user.website === passwordRef.current.value
      ) {
        localStorage.setItem("user", JSON.stringify(user));
        setuser(true);
        navigate("/home");
      }
    });
  };

  return (
    <>
      <div className="login-container">
        <form className="login-box" onSubmit={submitHandler}>
          <label htmlFor="username">Enter your username</label>
          <input ref={usernameRef} type="text" id="username" />
          <label htmlFor="password">Enter your password</label>
          <input ref={passwordRef} type="password" id="password" />
          <button>Ok, Let's go..</button>
        </form>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
