import "../css/navbar.css";
import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

function Navber() {
  const navigate = useNavigate();
  return (
    <>
      <div className="navbar-container">
        <div className="btn1">
          <a
            className="btn logout"
            onClick={() => {
              navigate("/login");
              localStorage.removeItem("user");
            }}
          >
            Logout
          </a>
        </div>
        {localStorage.getItem("user") && (
          <h1>Hi there {JSON.parse(localStorage.getItem("user")).name}!</h1>
        )}
        <div className="btn2">
          <Link to="/profile" className="btn profile">
            Profile
          </Link>
          <Link to="/todos" className="btn todos">
            Todos
          </Link>
          <Link to="/albums" className="btn albums">
            Albums
          </Link>
          <Link to="/posts/myposts" className="btn posts">
            Posts
          </Link>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Navber;
