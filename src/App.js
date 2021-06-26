import "./App.css";
import React, { useEffect, useState } from "react";
import { Header, Register, Login, Shop } from "./components";
import { allIngredients } from "./api";

const App = () => {
  const [grabbedIngredients, setIngredients] = useState([]);

  const retrieveIngredients = () => {

    allIngredients()
      .then(ingredient => {
        setIngredients(ingredient);
      })
      .catch(error => {
        // something something errors
      });
  }

  useEffect(() => {

    retrieveIngredients()

  }, []);
  return (
    <div className="App">
      <Header />
      <Register />
      <Login />
      <Shop
        grabbedIngredients={grabbedIngredients}
        setIngredients={setIngredients}
        reset={retrieveIngredients}
      />
    </div>
  );
};

export default App;
