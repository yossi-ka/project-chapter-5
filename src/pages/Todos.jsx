import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import SortTodos from "./SortTodos";

function Todos() {
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/todos?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const handleTodoUpdate = (id, completed) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  };

  return (
    <>
      <div className="sort">
        <h1>Todos List:</h1>
        <SortTodos todos={todos} setTodos={setTodos} />
      </div>
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} onUpdate={handleTodoUpdate} />
      ))}
    </>
  );
}

export default Todos;
