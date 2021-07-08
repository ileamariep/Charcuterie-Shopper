import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { SHOP_ROUTE } from "../constants";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();

  const [errorMessage, setErrorMessage] = useState();

  const registerUser = async () => {
    return await axios
      .post(`/api/users/register`, {
        username,
        password,
        email,
        address,
        city,
        state,
        zip,
      })
      .then(({ data: { token } }) => {
        if (token) {
          localStorage.setItem("token", JSON.stringify(token));
          window.location.href = `${SHOP_ROUTE}`;
        } else {
          let errM = setErrorMessage("Invalid Username or Password");
          errorMessage(errM);
        }
      })
      .catch(() => {
        let lastErr = setErrorMessage("Invalid Username or Password");

        errorMessage(lastErr);
      });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    registerUser();
  };

  return (
    <>
      <div className="register-form-container">
        <div className="register-card">
          <div className="register-image">
            <img src="images/oldad.jpg" alt="salesman" />
          </div>
          <div className="register-container">
            <h1>REGISTER</h1>
            <Form id="register-form" onSubmit={onFormSubmit}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter username"
                  required
                  onInput={(event) => {
                    setUsername(event.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  onInput={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Must be at least 8 characters"
                  required
                  onInput={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="address"
                  placeholder="Address"
                  required
                  onInput={(event) => {
                    setAddress(event.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="city"
                  placeholder="City"
                  required
                  onInput={(event) => {
                    setCity(event.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="state"
                  placeholder="State"
                  required
                  onInput={(event) => {
                    setState(event.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicZip">
                <Form.Label>Zipcode</Form.Label>
                <Form.Control
                  type="zip"
                  placeholder="Zipcode"
                  required
                  onInput={(event) => {
                    setZip(event.target.value);
                  }}
                />
              </Form.Group>
              <Button
                variant="primary"
                className="register-button"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
