import "../css/sortTodos.css";
import React, { useContext } from "react";

function SortTodos({ setTodos }) {
  const sort = (e) => {
    switch (e.target.value) {
      case "A-Z":
        setTodos((prevTodos) =>
          [...prevTodos].sort((a, b) => a.title.localeCompare(b.title))
        );
        break;
      case "Z-A":
        setTodos((prevTodos) =>
          [...prevTodos].sort((a, b) => b.title.localeCompare(a.title))
        );
        break;
      case "Completed":
        setTodos((prevTodos) =>
          [...prevTodos].filter((todo) => todo.completed)
        );
        break;
      case "NotCompleted":
        setTodos((prevTodos) =>
          [...prevTodos].filter((todo) => !todo.completed)
        );
        break;
      case "CompletedLast":
        setTodos((prevTodos) =>
          [...prevTodos].sort((a, b) => a.completed - b.completed)
        );
        break;

      case "All":
        fetch(
          `http://localhost:8000/todos?userId=${
            JSON.parse(localStorage.getItem("user")).id
          }`
        )
          .then((res) => res.json())
          .then((data) => setTodos(data));
        break;

      default:
        break;
    }
  };

  return (
    <>
      <div className="sort-container">
        <h3>Sort by: </h3>
        <select onChange={sort} name="" id="">
          <option className="op" value="All">
            All
          </option>
          <option className="op" value="A-Z">
            A-Z
          </option>
          <option className="op" value="Z-A">
            Z-A
          </option>
          <option className="op" value="Completed">
            Completed
          </option>
          <option className="op" value="NotCompleted">
            Not completed
          </option>
          <option className="op" value="CompletedLast">
            Completed last
          </option>
        </select>
      </div>
    </>
  );
}

export default SortTodos;
