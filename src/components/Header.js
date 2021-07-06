
import React from "react";
import "./Header.css";
import Navigation from "./Navigation";
// import { storeCurrentUser, clearCurrentUser } from "../auth";
// import { getSomething } from "../api";

const Header = ({ isAdmin, setIsAdmin, grabbedIngredients, setIngredients, showDashLinks,
  setDashLinks }) => {

  return (
    <div className="header">
      <h1>Grace Shopper</h1>
      <Navigation
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        grabbedIngredients={grabbedIngredients}
        setIngredients={setIngredients}
        showDashLinks={showDashLinks}
        setDashLinks={setDashLinks} />

    </div>
  );
};

export default Header;
