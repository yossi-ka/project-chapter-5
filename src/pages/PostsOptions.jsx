import React from "react";
import SearchPost from "./SearchPost";
import { useNavigate } from "react-router-dom";

function PostsOptions({ posts, setPosts }) {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/posts/myposts/new")}>
        📝 New Post
      </button>
      <SearchPost posts={posts} setPosts={setPosts} />
    </>
  );
}

export default PostsOptions;
