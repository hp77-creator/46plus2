import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./redux/views/home";
import Login from "./redux/views/login";
import { useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const userState = useSelector((state) => state.user);

  if (!userState.isLoggedIn) {
    return <Login />;
  } else {
    return <Home />;
  }
}

export default App;
