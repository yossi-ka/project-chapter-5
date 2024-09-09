import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/newPost.css";

function NewPost() {
  const navigate = useNavigate();
  const title = useRef();
  const body = useRef();

  const addPost = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.current.value,
        body: body.current.value,
        userId: JSON.parse(localStorage.getItem("user")).id,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(() => navigate("/posts/myposts"));
  };

  return (
    <form className="new-post" onSubmit={addPost}>
      <p>new post</p>
      <input type="text" ref={title} />
      <textarea cols="30" rows="10" ref={body}></textarea>
      <button>submit</button>
    </form>
  );
}

export default NewPost;
