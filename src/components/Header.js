import React from "react";
import "./Header.css";
import Navigation from "./Navigation";
import linkBackground from "./img/DruggistNewFinal.png";

const Header = ({
  isAdmin,
  setIsAdmin,
  grabbedIngredients,
  setIngredients,
  showDashLinks,
  setDashLinks,
  reset,
  hideViewButton,
  setHideViewButton,
  showQtyButton,
  setShowQtyButton,
  showCartButton,
  setCartButton,
}) => {
  return (
    <div className="header-container">
      <div
        className="header-img-container"
        style={{
          backgroundImage: `url(${linkBackground})`,
        }}
      ></div>
      <div className="navigation-container">
        <Navigation
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          grabbedIngredients={grabbedIngredients}
          setIngredients={setIngredients}
          showDashLinks={showDashLinks}
          setDashLinks={setDashLinks}
          reset={reset}
          hideViewButton={hideViewButton}
          setHideViewButton={setHideViewButton}
          showQtyButton={showQtyButton}
          setShowQtyButton={setShowQtyButton}
          showCartButton={showCartButton}
          setCartButton={setCartButton}
        />
      </div>
    </div>
  );
};

export default Header;
