import "../css/todo.css";
import React, { useState } from "react";

function Todo({ id, title, completed, onUpdate }) {
  const [complete, setComplete] = useState(completed);

  const clickHandler = () => {
    fetch(`http://localhost:8000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        completed: !complete,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setComplete(!complete);
        onUpdate(id, !complete);
      });
  };

  return (
    <div className={complete ? "todo-container complete" : "todo-container"}>
      <input type="checkbox" checked={complete} onChange={clickHandler} />
      <h1>{title}</h1>
    </div>
  );
}

export default Todo;
