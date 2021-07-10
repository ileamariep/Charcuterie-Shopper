import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../constants";
import { getGuestUser } from "../api/users";
import { SHOP_ROUTE } from "../constants";
import { useHistory } from "react-router-dom";
import "./Home.css";

const Home = ({ setCurrentUserId, setCurrentUserGuest }) => {
  const [guestZip, setGuestZip] = useState("");
  const history = useHistory();

  const handleGuestSubmit = async () => {
    const zipTostring = guestZip.toString();
    const guestUser = await getGuestUser(zipTostring);
    setCurrentUserId(guestUser.id);
    setCurrentUserGuest(true);
    history.push(`${SHOP_ROUTE}`);
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <div className="home-image">
          {" "}
          <img src="images/home-image.jpg" alt="salesman" />
        </div>
        <div className="home-info-right">
          <h1>Ready to Cure What Ails You?</h1>
          <p>
            Built on our promise of quality! Elixirs delivered to your door.
          </p>
          <div className="log-or-reg">
            <h2>
              <Link to={LOGIN_ROUTE}>Login</Link> or{" "}
              <Link to={REGISTER_ROUTE}>Register</Link> for an account to start
              shoping.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
