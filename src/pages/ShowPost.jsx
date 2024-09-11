import "../css/showPost.css";
import React, { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShowComments from "./ShowComments";
import AddComment from "./AddComment";

function ShowPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [owner, setOwner] = useState(null);
  const [isSameUser, setIsSameUser] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useLayoutEffect(() => {
    fetch(`http://localhost:8000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);

        fetch(`http://localhost:8000/users?id=${data.userId}`)
          .then((res) => res.json())
          .then((data) => setOwner(data[0].username));

        setIsSameUser(
          Number(data.userId) ===
            Number(JSON.parse(localStorage.getItem("user")).id)
        );
      });
  }, []);

  const deletePost = () => {
    fetch(`http://localhost:8000/posts/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => navigate("/posts/myposts"));
  };

  const handleComments = () => {
    navigate(`/posts/myposts/${id}/comments`);
    setShowComments(true);
  };

  const handleBack = () => {
    navigate("/posts/myposts");
    setShowComments(false);
  };

  const handleAddComment = () => {
    navigate(`/posts/myposts/${id}/comments/new`);
  };

  return (
    <>
      <div className="showPost-container">
        <p className="post-id">Post ID: {id}</p>
        <h1 className="post-title">Title: {post?.title} </h1>
        <h4 className="post-body">Body: {post?.body}</h4>
        <p className="post-user">By user: {owner}</p>

        {isSameUser && (
          <div className="post-options">
            <button
              onClick={() => navigate(`/posts/myposts/${id}/edit`)}
              className="edit"
            >
              📝
            </button>
            <button onClick={deletePost} className="delete">
              🗑️
            </button>
          </div>
        )}
       <button onClick={handleAddComment}>Add Comment</button>
        <button onClick={handleComments}>Show Comments</button>

        <button onClick={handleBack}>Go Back</button>
        {showComments && <ShowComments isSameUser={isSameUser} setShowComments={setShowComments} />}
      </div>
    </>
  );
}

export default ShowPost;
