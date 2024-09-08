import "./App.css";
import Login from "./pages/Login";
import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ProtectedPages from "./ProtectedPages";
import Profile from "./pages/Profile";
import Todos from "./pages/Todos";
import Albums from "./pages/Albums";
import Posts from "./pages/Posts";
import Navbar from "./pages/Navbar";

export const userContext = createContext();

function App() {
  const [theresUser, setTheresUser] = useState(false);

  return (
    <>
      <userContext.Provider value={(theresUser, setTheresUser)}>
        <div className="App">
          {localStorage.getItem("user") && <Navbar />}
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route element={<ProtectedPages />}>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/todos" element={<Todos />} />
              <Route path="/albums" element={<Albums />} />
              <Route path="/posts" element={<Posts />} />
            </Route>
            <Route path="*" element={<h1>😳 PAGE NOT FOUND</h1>} />
          </Routes>
        </div>
      </userContext.Provider>
    </>
  );
}

export default App;
