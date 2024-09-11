import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditComment() {
  const navigate = useNavigate();
  const [inputSt, setInputSt] = useState("");
  const { commId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/comments/${commId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body: inputSt,
      }),
    });
    navigate(-2);
  };

  return (
    <>
      <div>Edit Comment {commId}</div>
      <form action="">
        <input onChange={(e) => setInputSt(e.target.value)} type="text" />
        <button disabled={inputSt === ""} onClick={handleSubmit}>
          Submit
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate(-2);
          }}
        >
          Cancel
        </button>
      </form>
    </>
  );
}

export default EditComment;
