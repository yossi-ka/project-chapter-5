import React, { useState } from "react";
import "../css/addTodo.css";
import { useNavigate } from "react-router-dom";
function AddTodo() {
  const navigate = useNavigate();
  const [tastate, setTastate] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const numOfTodos = fetch("http://localhost:8000/todos").then((res) => {
      return res.json();
    });
    numOfTodos.then((data) => {
      fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: JSON.parse(localStorage.getItem("user")).id,
          id: data.length + 1,
          title: tastate,
          completed: false,
        }),
      });
    });
    navigate("/todos");
  };

  return (
    <>
      <h1 className="add-todo-title">Add task</h1>
      <form className="add-todo-form">
        <textarea
          onChange={(e) => setTastate(e.target.value)}
          className="add-todo-textarea"
          name="mission"
          id="mission"
          placeholder="Enter your task"
        ></textarea>
        <button
          className={tastate ? "add-todo-button" : "add-todo-button disabled"}
          type="submit"
          onClick={handleSubmit}
          disabled={!tastate}
        >
          Add
        </button>

        <button className="add-todo-button" onClick={() => navigate("/todos")}>
          Cancel
        </button>
      </form>
    </>
  );
}

export default AddTodo;
