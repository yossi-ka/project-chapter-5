import React,{useState} from "react";
import { useParams, useNavigate, json } from "react-router-dom";

function AddComment() {

  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8000/comments`, {
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body: comment,
        postId: id,
        name: JSON.parse(localStorage.getItem("user")).username,
        email: JSON.parse(localStorage.getItem("user")).email,
      }),
    }).then(() => navigate(`/posts/myposts/${id}`));
  };

  return (
    <>
      <div className="add-comment-container">
        <form>
          <textarea onChange={(e) => setComment(e.target.value)} type="text" placeholder="Add Comment" />
      
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </>
  );
}

export default AddComment;
