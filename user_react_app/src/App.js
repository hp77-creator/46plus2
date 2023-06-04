import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./redux/views/home";
import Login from "./redux/views/login";
import { useState } from "react";
import { useSelector } from "react-redux";
import History from "./redux/views/history";

function App() {
  const userState = useSelector((state) => state.user);
  
  
  if (!userState.isLoggedIn) {
    return <Login />;
  } else {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Routes>
    );
  }
}

export default App;
