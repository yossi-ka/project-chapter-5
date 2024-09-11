import "../css/post.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function Post({ id, title, body }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/myposts/${id}`);
  };

  return (
    <div onClick={handleClick} className="post-container">
      <p className="post-id">{id}</p>
      <h3 className="post-title">{title}</h3>
    </div>
  );
}

export default Post;
