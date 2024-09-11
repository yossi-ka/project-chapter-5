import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditTodo() {
  const [tastate, setTastate] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const submitHandler = (event) => {
    event.preventDefault();

    fetch(`http://localhost:8000/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: event.target.body.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    navigate("/todos");
  };

  return (
    <>
      <form action="" onSubmit={submitHandler}>
        <label htmlFor="task">edit task</label>
        <textarea
          onChange={(e) => setTastate(e.target.value)}
          type="text"
          name="body"
          id="task"
        />
        <button
          disabled={!tastate}
          style={{
            cursor: !tastate ? "not-allowed" : "pointer",
            opacity: !tastate ? 0.5 : 1,
          }}
        >
          Update
        </button>
        <button onClick={() => navigate("/todos")}>Cancel</button>
      </form>
    </>
  );
}

export default EditTodo;
