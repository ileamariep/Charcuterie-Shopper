import React from "react";
import "./Header.css";
import Navigation from "./Navigation";
// import { storeCurrentUser, clearCurrentUser } from "../auth";
// import { getSomething } from "../api";

const Header = () => {
  return (
    <div className="header">
      <h1>Grace Shopper</h1>
      <Navigation />
    </div>
  );
};

export default Header;
