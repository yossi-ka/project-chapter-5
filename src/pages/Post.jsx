import "../css/post.css";
import React from "react";

function Post({ id, title, body }) {
  return (
    <div className="post-container">
      <div>
        <p className="post-id">{id}</p>
        <h3 className="post-title">{title}</h3>
      </div>
    </div>
  );
}

export default Post;
