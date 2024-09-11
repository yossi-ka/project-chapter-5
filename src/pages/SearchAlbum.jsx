import "../css/searchAlbum.css";

import React, { useState, useRef, useEffect } from "react";

function SearchAlbum({ albums  ,  setAlbums   }) {
  const [by, setBy] = useState("id");
  const inputRef = useRef();

  const fetchAlbums = () => {
    fetch(
      "http://localhost:8000/albums?userId=" +
        JSON.parse(localStorage.getItem("user")).id
    )
      .then((res) => res.json())
      .then((data) => setAlbums(data));
  };

  useEffect(() => {
    fetchAlbums();
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
        setAlbums(() => albums.filter((album) => album.id === s));
    } else if (by === "title") {
        setAlbums(() => albums.filter((album) => album.title.includes(s)));
    }
  };

  return (
    <>
      <div className="albumsOptions-container">
        <div className="search-album">
          <form action="">
            <h3>Search By:</h3>
            <input
              onClick={chooseHandler}
              defaultChecked
              name="searchBy"
              id="album id"
              type="radio"
              value="id"
            />
            <label htmlFor="album id">album id</label>
            <input
              onClick={chooseHandler}
              name="searchBy"
              id="album title"
              type="radio"
              value="title"
            />
            <label htmlFor="album title">album title</label>
            <input
              ref={inputRef}
              type={by === "title" ? "text" : "number"}
              placeholder="search album"
              onChange={(e) => {
                if (e.target.value === "") fetchAlbums();
              }}
            />
            <button onClick={submitHandler}>Search</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchAlbum;
