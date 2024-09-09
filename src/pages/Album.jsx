import "../css/albums.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function Album({ ...album }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="album" onClick={() => navigate(`/albums/${album.id}`)}>
        <p className="album-id">{album.id}</p>
        <h3 className="album-title">{album.title}</h3>
      </div>
    </>
  );
}

export default Album;
