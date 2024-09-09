import "../css/post.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function Post({ id, title, body }) {
  const navigate = useNavigate();

  const deletePost = () => {
    fetch(`http://localhost:8000/posts/${id}`, {
      method: "DELETE",
    }).then(() => navigate("/posts/myposts"));
  };

  return (
    <div
      onClick={() => navigate(`/posts/myposts/${id}`)}
      className="post-container"
    >
      <p className="post-id">{id}</p>
      <h3 className="post-title">{title}</h3>
      <div style={{border: '1px solid black'}} className="post-delete" onClick={deletePost}>
        🗑️
      </div>
    </div>
  );
}

export default Post;
