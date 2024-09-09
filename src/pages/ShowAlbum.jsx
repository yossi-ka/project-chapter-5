import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ShowAlbum() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { id } = useParams();

  const fetchPhotos = () => {
    fetch(`http://localhost:8000/photos?albumId=${id}/photos?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
        setLoading(false);
        if (data.length < 10) {
          setHasMore(false);
        }
      });
  };

  useEffect(() => fetchPhotos(), []);

  //   const handleScroll = (event) => {
  //     if (
  //       window.innerHeight + event.target.scrollTop >=
  //       event.target.scrollHeight
  //     ) {
  //       setLoading(true);
  //       setPage(page + 1);
  //       fetchPhotos();
  //     }
  //   };

  const handleScroll = (e) => {
    const scrollPosition = e.target.scrollTop;
    const scrollHeight = e.target.scrollHeight;
    const clientHeight = e.target.clientHeight;

    if (scrollPosition + clientHeight >= scrollHeight * 0.8) {
      // do something when scrolled to 80% of the content
      console.log("Scrolled to 80% of the content");
    }
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <>
      <div className="photos">
        {!photos.length ? (
          <div>Loading...</div>
        ) : (
          photos.map((photo) => (
            <div key={photo.id}>
              <h1>
                {photo.id} - {photo.title}
              </h1>
              <img src={photo.url} />
            </div>
          ))
        )}
        {loading && <div>Loading more photos...</div>}
        {!hasMore && <div>No more photos to show.</div>}
      </div>
    </>
  );
}

export default ShowAlbum;
