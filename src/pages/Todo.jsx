import "../css/todo.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Todo({ id, title, completed, onUpdate, todos, setTodos }) {
  const navigate = useNavigate();
  const [complete, setComplete] = useState(completed);
  const [deleteBox, setDeleteBox] = useState(false);
  const [editBox, setEditBox] = useState(false);

  const handleDelete = (id) => {
    setDeleteBox(true);
    fetch(`http://localhost:8000/todos/${id}`, {
      method: "DELETE",
    }).then(() => setTodos(todos.filter((todo) => todo.id !== id)));
  };

  const handleEdit = (id) => {
    navigate(`/todos/${id}/edit`);
    setEditBox(true);
  };

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
    <div
      data-id={id}
      className={complete ? "todo-container complete" : "todo-container"}
    >
      <h3>{id}</h3>
      <h1>{title}</h1>
      <div className="todoOptions">
        {" "}
        <input type="checkbox" checked={complete} onChange={clickHandler} />
        <div className="op edit" onClick={() => handleEdit(id)}>
          ✏️
        </div>
        <div className="op delete" onClick={() => handleDelete(id)}>
          🗑️
        </div>{" "}
      </div>
    </div>
  );
}

export default Todo;
