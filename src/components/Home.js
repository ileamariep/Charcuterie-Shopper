import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../constants";
import Button from "react-bootstrap/Button";
import { getGuestUser } from "../api/users";
import { SHOP_ROUTE } from "../constants";
import { useHistory } from "react-router-dom";

const Home = ({ setCurrentUserId, setCurrentUserGuest }) => {
  const [guestZip, setGuestZip] = useState("");
  const history = useHistory();

  const handleGuestSubmit = async () => {
    const zipTostring = guestZip.toString();
    const guestUser = await getGuestUser(zipTostring);
    setCurrentUserId(guestUser.id);
    console.log(guestUser.id);
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
          <div className="guest-container">
            <div className="guest-head">Browse as a Guest</div>

            <div className="email-container">
              <label>
                <div className="email-label">Zip Code</div>
                <input
                  name="zip"
                  value={guestZip}
                  onInput={(event) => {
                    setGuestZip(event.target.value);
                  }}
                  required
                />
              </label>
              <Button
                type="submit"
                className="guest-submit"
                onClick={() => handleGuestSubmit(guestZip)}
              >
                Continue As Guest
              </Button>
            </div>
            <div className="log-or-reg">
              <p>
                Already a user? <Link to={LOGIN_ROUTE}>Login</Link> or{" "}
                <Link to={REGISTER_ROUTE}>Register</Link> for an account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
