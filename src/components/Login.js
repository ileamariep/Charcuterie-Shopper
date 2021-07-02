import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { SHOP_ROUTE } from "../constants";
import axios from "axios";
import "./Login.css";
// import { getUserById } from "../../db";
// import bottlesill from "..public/images/bottlesill";
// import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ setIsAdmin, isAdmin }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const loginUser = async () => {
    return await axios
      .post(`/api/users/login`, {
        username,
        password,
      })
      .then(({ data: { token } }) => {
        if (token) {
          localStorage.setItem("token", JSON.stringify(token));

          window.location.href = `${SHOP_ROUTE}`;
        } else {
          errorMessage("Invalid Username or Password");
        }
      })
      .catch(() => {
        setErrorMessage("Invalid Username or Password");
      });
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    await loginUser();
  };
  return (
    <>
      <div className="login-form-container">
        <div className="login-card">
          <div className="login-image">
            <img src="images/hunts.jpg" alt="salesman" />
          </div>
          <div className="login-container">
            <h1>LOGIN</h1>
            <Form id="login-form" onSubmit={onFormSubmit}>
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
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  onInput={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
