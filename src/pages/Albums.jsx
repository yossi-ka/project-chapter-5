import "../css/albums.css";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Album from "./Album";
import SearchAlbum from "./SearchAlbum";
import AddAlbum from "./AddAlbum";

function Albums() {
  const [albums, setAlbums] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `http://localhost:8000/albums?userId=${
        JSON.parse(localStorage.getItem("user")).id
      }`
    )
      .then((res) => res.json())
      .then((data) => setAlbums(data));
  }, []);

  return (
    <>
    <button onClick={() => navigate("/albums/add")}>Add Album</button>
      <SearchAlbum albums={albums} setAlbums={setAlbums} />
      <div className="albums-container">
        {!albums ? (
          <>loading...</>
        ) : (
          albums.map((album) => (
            <Album className="album" key={album.id} {...album} />
          ))
        )}
      </div>
    </>
  );
}

export default Albums;
