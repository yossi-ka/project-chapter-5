import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import SortTodos from "./SortTodos";
import { useNavigate } from "react-router-dom";
import SearchTodo from "./SearchTodo";
function Todos() {
  const navigate = useNavigate();
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
        <button
          style={{ width: "150px" }}
          onClick={() => navigate("/todos/addtodo")}
        >
          + Add Task
        </button >
        <SearchTodo todos={todos} setTodos={setTodos} />
        <SortTodos todos={todos} setTodos={setTodos} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            {...todo}
            onUpdate={handleTodoUpdate}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
    </>
  );
}

export default Todos;
