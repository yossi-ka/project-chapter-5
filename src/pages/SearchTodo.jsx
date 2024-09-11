// import "../css/searchTodo.css";
// import React, { useRef } from "react";

// function SearchTodo({ todos, setTodos }) {
//   const inputRef = useRef();
//   const SubmitHandler = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <>
//       <div className="searchTodo-container">
//         <h1>Search By: </h1>
//         <form onSubmit={SubmitHandler}>
//           <input type="radio" id="id" name="search" value="id" />
//           <label htmlFor="id">id</label>
//           <input type="radio" id="title" name="search" value="title" />
//           <label htmlFor="title">title</label>
//           <input ref={inputRef} type="text" placeholder="Search..." />
//           <button>Search</button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default SearchTodo;

import "../css/searchTodo.css";

import React, { useState, useRef, useEffect } from "react";

function SearchTodo({ todos, setTodos }) {
  const [by, setBy] = useState("id");
  const inputRef = useRef();

  const fetchTodos = () => {
    fetch(
      "http://localhost:8000/todos?userId=" +
        JSON.parse(localStorage.getItem("user")).id
    )
      .then((res) => res.json())
      .then((data) => setTodos(data));
  };

  useEffect(() => {
    fetchTodos();
    inputRef.current.value = "";
    inputRef.current.focus();
  }, [by]);

  const chooseHandler = (event) => {
    setBy(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const s = inputRef.current.value;

    if (by === "id") {
      setTodos(() => todos.filter((todo) => todo.id === s));
    } else if (by === "title") {
      setTodos(() => todos.filter((todo) => todo.title.includes(s)));
    }
  };

  return (
    <>
      <div className="todosOptions-container">
        <div className="search-todo">
          <form action="">
            <h3>Search By:</h3>
            <input
              onClick={chooseHandler}
              defaultChecked
              name="searchBy"
              id="task id"
              type="radio"
              value="id"
            />
            <label htmlFor="task id">task id</label>
            <input
              onClick={chooseHandler}
              name="searchBy"
              id="todo title"
              type="radio"
              value="title"
            />
            <label htmlFor="post title">todo title</label>
            <input
              ref={inputRef}
              type={by === "title" ? "text" : "number"}
              placeholder="search tasks..."
              onChange={(e) => {
                if (e.target.value === "") fetchTodos();
              }}
            />
            <button onClick={submitHandler}>Search</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchTodo;
