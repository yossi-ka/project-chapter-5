import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ShowAlbum() {
  const [allphotos, setAllPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { id } = useParams();

  useLayoutEffect(() => {
    fetch(`http://localhost:8000/photos?albumId=${id}`)
      .then((res) => res.json())
      .then((data) => setAllPhotos(data));
  }, [id]);

  useEffect(() => {
    setCurrentPhotoIndex(0);
    setHasMore(allphotos.length > 10);
  }, [allphotos]);

  const handleDelete = (phId) => {
    fetch(`http://localhost:8000/photos/${phId}`, {
      method: "DELETE",
    }).then(() => {
      setAllPhotos(allphotos.filter((photo) => photo.id !== phId));
    });
  };

  const loadMore = () => {
    setCurrentPhotoIndex((prevIndex) => prevIndex + 3);
    setHasMore(currentPhotoIndex + 20 < allphotos.length);
  };

  const handleEdit = (phId, phUrl) => {
    const newURL = prompt("Update URL:", phUrl);
    if (newURL) {
      fetch(`http://localhost:8000/photos/${phId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thumbnailUrl: newURL }),
      }).then(() => {
        setAllPhotos(
          allphotos.map((photo) =>
            photo.id === phId ? { ...photo, thumbnailUrl: newURL } : photo
          )
        );
      });
    }
  };

  const handleAdd = () => {
    const newUrl = prompt("Url:");
    const newTitle = prompt("Title:");
    if (newUrl && newTitle) {
      fetch(`http://localhost:8000/photos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          albumId: id,
          title: newTitle,
          url: newUrl,
          thumbnailUrl: newUrl,
        }),
      })
        .then((res) => res.json())
        .then((newPhoto) => {
          setAllPhotos([...allphotos, newPhoto]);
        });
    }
  };

  const currentPhotos = allphotos.slice(
    currentPhotoIndex,
    currentPhotoIndex + 10
  );

  return (
    <>
      <div className="photos">
        <button onClick={handleAdd}>+ Add photo</button>
        {!allphotos.length ? (
          <div>Loading...</div>
        ) : (
          currentPhotos.map((photo) => (
            <div key={photo.id}>
              <h1>
                {photo.id} - {photo.title}
              </h1>
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <div className="ph-options">
                <button onClick={() => handleDelete(photo.id)}>🗑️</button>
                <button
                  onClick={() => handleEdit(photo.id, photo.thumbnailUrl)}
                >
                  Edit URL
                </button>
              </div>
            </div>
          ))
        )}
        {hasMore && <button onClick={loadMore}>Load More</button>}
      </div>
    </>
  );
}

export default ShowAlbum;
