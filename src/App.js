import "./App.css";
import Login from "./pages/Login";
import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

export const userContext = createContext();

function App() {
  const [theresUser, setTheresUser] = useState(false);
  return (
    <>
      <userContext.Provider value={setTheresUser}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={theresUser ? <Home /> : <Login />} />
            </Routes>
          </BrowserRouter>
        </div>
      </userContext.Provider>
    </>
  );
}

export default App;
