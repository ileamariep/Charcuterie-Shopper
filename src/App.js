import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Header, Pages } from "./components";
import { allIngredients, myAccountFetch } from "./api";

const App = () => {
  const [grabbedIngredients, setIngredients] = useState([]);
  const [resetIngredients, setResetIngredients] = useState([]);
  const [isAdmin, setIsAdmin] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const myToken = JSON.parse(localStorage.getItem("token"));

  const retrieveIngredients = async () => {
    allIngredients()
      .then((ingredient) => {
        setIngredients(ingredient);
        setResetIngredients(ingredient);
      })
      .catch((error) => {
        // something something errors
      });
  };

  const retrieveUser = async () => {
    myAccountFetch(myToken)
      .then((user) => {
        setIsAdmin(user.isAdmin);
      })
      .catch((error) => {
        // something something errors
      });
  }


  useEffect(() => {

    const fetchProducts = async () => {
      await retrieveIngredients();
      let myUsername = await myAccountFetch(myToken);
      const userArray = [myUsername.isAdmin].flat()
      setIsAdmin(userArray);

    }
    fetchProducts()

  }, []);
  return (
    <div className="App">
      <header>
        <Header
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin} />
      </header>
      <main>
        <Pages
          grabbedIngredients={grabbedIngredients}
          setIngredients={setIngredients}
          resetIngredients={resetIngredients}
          setResetIngredients={setResetIngredients}
        />
      </main>
    </div>
  );
};
export default App;
