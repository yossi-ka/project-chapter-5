import React from "react";
import SearchPost from "./SearchPost";

function PostsOptions({ posts, setPosts }) {
  return <SearchPost posts={posts} setPosts={setPosts} />;
}

export default PostsOptions;
