import React, { useEffect, useState } from "react";
import Post from "./Post";
import "../css/post.css";
import PostsOptions from "./PostsOptions";

function Posts() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch(
      `http://localhost:8000/posts?userId=${
        JSON.parse(localStorage.getItem("user")).id
      }`
    )
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <PostsOptions posts={posts} setPosts={setPosts} />
      <div className="posts-grid">
        {!posts ? (
          <>loading...</>
        ) : (
          posts.map((post) => <Post className="post" key={post.id} {...post} />)
        )}
      </div>
    </>
  );
}

export default Posts;
