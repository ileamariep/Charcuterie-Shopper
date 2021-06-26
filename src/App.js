import "./App.css";
import React, { useEffect, useState } from "react";
import { Header, Register, Login } from "./components";

const App = () => {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  });
  return (
    <div className="App">
      <Header />
      <Register />
      <Login />
    </div>
  );
};

export default App;
