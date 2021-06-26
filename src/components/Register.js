import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { createNewUser } from "../api";
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
        } else {
          setErrorMessage("Invalid Username or Password");
        }
      })
      .catch(() => {
        setErrorMessage("Invalid Username or Password");
      });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    registerUser();
  };

  return (
    <>
      <Form id="register-form" onSubmit={onFormSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
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
            onInput={(event) => {
              setEmail(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
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
            onInput={(event) => {
              setState(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formBasicZip">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="zip"
            placeholder="Zipcode"
            onInput={(event) => {
              setZip(event.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Register;
