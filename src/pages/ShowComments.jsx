import "../css/comments.css";
import React, { useState, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddComment from "./AddComment";

function ShowComments({ setShowComments, isSameUser }) {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchComments = () => {
    fetch(`http://localhost:8000/comments?postId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  };

  useLayoutEffect(fetchComments, []);

  const handleEditComment = (commId) => {
    navigate(`/posts/myposts/${id}/comments/${commId}/edit`);
  };

  const handleDeleteComment = (commId) => {
    fetch(`http://localhost:8000/comments/${commId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commId)
        );
      });
  };

  return (
    <>
      <div className="comments-container">
        <h1>Comments on Post {id}</h1>

        {comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <p className="comment-id">{comment.id}</p>
              <p className="comment-body">{comment.body}</p>
              <p>by: {comment.email}</p>
              {isSameUser || comment.email === JSON.parse(localStorage.getItem("user")).email && (
                <div className="comm-options">
                  <button onClick={() => handleEditComment(comment.id)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteComment(comment.id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}

        <button
          onClick={() => {
            navigate(-1);
            setShowComments(false);
          }}
        >
          Close
        </button>
      </div>
    </>
  );
}

export default ShowComments;
