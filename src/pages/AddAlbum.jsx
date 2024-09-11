import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddAlbum() {
  const navigate = useNavigate();
  const [album, setAlbum] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/albums", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: JSON.parse(localStorage.getItem("user")).id,
        title: album,
      }),
    });

    navigate("/albums");
  };

  return (
    <>
      <div className="add-album-container">
        <h1>Add Album</h1>
        <form>
          <input onChange={(e) => setAlbum(e.target.value)} type="text" placeholder="Album Title" />
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </>
  );
}

export default AddAlbum;
