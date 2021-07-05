import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import {
  MYACCOUNT_ROUTE,
  REGISTER_ROUTE,
  LOGIN_ROUTE,
  CART_ROUTE,
  SHOP_ROUTE,
  ADMIN_ROUTE,
} from "../constants";
// import { clearCurrentUser } from "../auth";

const Navigation = ({
  currentUser,
  setCurrentUser,
  isAdmin,
  setIsAdmin,
  isUser,
}) => {
  const myToken = JSON.parse(localStorage.getItem("token"));
  const logOut = () => {
    localStorage.clear("token");
    setIsAdmin(false);
    window.location.href = `${SHOP_ROUTE}`;
  };

  if (myToken && !isAdmin) {
    //user
    return (
      <nav>
        <div className="topnav">
          {/* <Link to={HOME_ROUTE}>Home</Link> */}
          <Link to={SHOP_ROUTE}>Shop</Link>
          <Link to={MYACCOUNT_ROUTE}>My Account</Link>
          <Link to={CART_ROUTE}>Cart</Link>
          <Link
            to={SHOP_ROUTE}
            id="logout-button"
            onClick={() => {
              logOut();
            }}
          >
            Logout
          </Link>
        </div>
      </nav>
    );
    //else if (myToken && isAdmin)
  } else if (myToken && isAdmin) {
    //admin
    return (
      <nav>
        <div className="topnav">
          <Link to={SHOP_ROUTE}>Shop</Link>
          <Link to={MYACCOUNT_ROUTE}>My Account</Link>
          <Link to={ADMIN_ROUTE}>Admin</Link>
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
          <Link to={SHOP_ROUTE}>Shop</Link>
          <Link to={CART_ROUTE}>Cart</Link>
          <Link to={REGISTER_ROUTE}>Register</Link>
          <Link to={LOGIN_ROUTE}>Login</Link>
        </div>
      </nav>
    );
  }
};

export default Navigation;
