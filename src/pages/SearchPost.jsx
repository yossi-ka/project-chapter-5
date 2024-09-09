import "../css/searchPost.css";

import React, { useState, useRef, useEffect } from "react";

function SearchPost({ posts, setPosts }) {
  const [by, setBy] = useState("id");
  const inputRef = useRef();

  const fetchPosts = () => {
    fetch(
      "http://localhost:8000/posts?userId=" +
        JSON.parse(localStorage.getItem("user")).id
    )
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };

  useEffect(() => {
    fetchPosts();
    inputRef.current.value = "";
    inputRef.current.focus();
  }, [by]);

  const chooseHandler = (event) => {
    setBy(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const s = inputRef.current.value;

    if (by === "id") {
      setPosts(() => posts.filter((post) => post.id === s));
    } else if (by === "title") {
      setPosts(() => posts.filter((post) => post.title.includes(s)));
    }
  };

  return (
    <>
      <div className="postsOptions-container">
        <div className="search-post">
          <form action="">
            <h3>Search By:</h3>
            <input
              onClick={chooseHandler}
              defaultChecked
              name="searchBy"
              id="post id"
              type="radio"
              value="id"
            />
            <label htmlFor="post id">post id</label>
            <input
              onClick={chooseHandler}
              name="searchBy"
              id="post title"
              type="radio"
              value="title"
            />
            <label htmlFor="post title">post title</label>
            <input
              ref={inputRef}
              type={by === "title" ? "text" : "number"}
              placeholder="search post"
              onChange={(e) => {
                if (e.target.value === "") fetchPosts();
              }}
            />
            <button onClick={submitHandler}>Search</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchPost;
