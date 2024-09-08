import React from "react";

function Home() {
  return (
    <>
      <div className="home-container">
        <h1>Welcome back {JSON.parse(localStorage.getItem("user")).name} 🫲</h1>
      </div>
    </>
  );
}

export default Home;
