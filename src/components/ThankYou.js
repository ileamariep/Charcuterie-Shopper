import React from "react";
import "./ThankYou.css";
// import Navigation from "./Navigation";
// import { storeCurrentUser, clearCurrentUser } from "../auth";
// import { getSomething } from "../api";

const ThankYou = () => {
  return (
    <div className="thanks-container">
      <div className="thanks-card">
        <div className="thanks-image">
          <img src="images/bitters.jpg" alt="lady" />
        </div>
        <div className="thanks-info-right">
          <h1>Thank You for Your Order!</h1>
          <p>Your item will ship in 2-3 weeks.</p>
          <div className="guest-container">
            <div className="guest-head"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
