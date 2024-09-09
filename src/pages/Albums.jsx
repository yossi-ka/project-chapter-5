import "../css/albums.css";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Album from "./Album";

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
      <div className="albums-container">
        {!albums ? (
          <>loading...</>
        ) : (
          albums.map((album) => (
            <Album
              className="album"
              key={album.id}
              {...album}
            />
          ))
        ) }
      </div>
    </>
  );
}

export default Albums;
