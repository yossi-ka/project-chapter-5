import React,{useRef} from "react";
// import "../css/editPost.css";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {
  const navigate = useNavigate();

  const titleRef = useRef();
  const bodyRef = useRef();

  const { id } = useParams();
  const submitHandler = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8000/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: titleRef.current.value,
        body: bodyRef.current.value,
        userId: JSON.parse(localStorage.getItem("user")).id,
      }),
    });

    navigate(-1);
  };

  return (
    <>
      <div className="editPost-container">
        <h1>Edit Post</h1>
        <form onSubmit={submitHandler}>
          <input ref={titleRef} type="text" placeholder="Title" />
          <input ref={bodyRef} type="text" placeholder="Body" />
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

export default EditPost;
