import React from "react";
import "./Header.css";
import Navigation from "./Navigation";
// import { storeCurrentUser, clearCurrentUser } from "../auth";
// import { getSomething } from "../api";

const Header = ({ isAdmin, setIsAdmin }) => {
  return (
    <div className="header">
      <h1>Grace Shopper</h1>
      <Navigation
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin} />
    </div>
  );
};

export default Header;
