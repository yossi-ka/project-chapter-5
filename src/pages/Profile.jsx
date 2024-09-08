import React from "react";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div className="profile-container">
        <h1>Profile</h1>
        <p>Name: {user.name}</p>
        <p>Website: {user.website}</p>
        <p>Phone: {user.phone}</p>
        <p>Email: {user.email}</p>
        {/* <p>Company: {user.company.name}</p> */}
      </div>
    </>
  );
}

export default Profile;
