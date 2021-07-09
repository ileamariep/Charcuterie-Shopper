import React from "react";
import { Link } from "react-router-dom";
import {
  MYACCOUNT_ROUTE,
  REGISTER_ROUTE,
  LOGIN_ROUTE,
  CART_ROUTE,
  SHOP_ROUTE,
  ADMIN_ROUTE,
  HOME_ROUTE,
} from "../constants";
// import { clearCurrentUser } from "../auth";

const Navigation = ({
  currentUser,
  setCurrentUser,
  isAdmin,
  setIsAdmin,
  isUser,
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
  const myToken = JSON.parse(localStorage.getItem("token"));
  const logOut = () => {
    localStorage.clear("token");
    setIsAdmin(false);
    window.location.href = `${HOME_ROUTE}`;
  };

  const handleAdminClick = () => {
    setDashLinks(true);
  };

  const shopClick = () => {
    setHideViewButton(true);
    setShowQtyButton(false);
    setCartButton(false);
    reset();
  };

  if (myToken && !isAdmin) {
    //user
    return (
      <>
        <nav>
          <div className="topnav">
            <Link to={SHOP_ROUTE} onClick={shopClick}>
              Shop
            </Link>
            <Link to={MYACCOUNT_ROUTE}>My Account</Link>
            <Link to={CART_ROUTE}>Cart</Link>
            <Link
              to={LOGIN_ROUTE}
              id="logout-button"
              onClick={() => {
                logOut();
              }}
            >
              Logout
            </Link>
          </div>
        </nav>
      </>
    );
  } else if (myToken && isAdmin) {
    //admin
    return (
      <nav>
        <div className="topnav">
          <Link to={SHOP_ROUTE} onClick={shopClick}>
            Shop
          </Link>
          <Link to={MYACCOUNT_ROUTE}>My Account</Link>
          <Link
            to={ADMIN_ROUTE}
            onClick={() => {
              handleAdminClick();
            }}
          >
            Admin
          </Link>
          <Link to={CART_ROUTE}>Cart</Link>
          <Link
            to={SHOP_ROUTE}
            id="logout-button"
            onClick={() => {
              localStorage.clear("token");
              logOut();
            }}
          >
            Logout
          </Link>
        </div>
      </nav>
    );
  } else {
    // guest
    return (
      <nav>
        <div className="topnav">
          <Link to={SHOP_ROUTE} onClick={shopClick}>
            Shop
          </Link>
          <Link to={CART_ROUTE}>Cart</Link>
          <Link to={REGISTER_ROUTE}>Register</Link>
          <Link to={LOGIN_ROUTE}>Login</Link>
        </div>
      </nav>
    );
  }
};

export default Navigation;
