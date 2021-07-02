import "./App.css";
import React, { useEffect, useState } from "react";
import { Header, Pages } from "./components";
import { myAccountFetch } from "./api";
import { allIngredients } from "./api/ingredients";

const App = () => {
  const [grabbedIngredients, setIngredients] = useState([]);
  const [resetIngredients, setResetIngredients] = useState([]);
  const [isAdmin, setIsAdmin] = useState(null);
  const [currentUserId, setCurrentUserId] = useState()
  const [currentUserGuest, setCurrentUserGuest] = useState()
  // const [errorMessage, setErrorMessage] = useState();
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
        setCurrentUserId(user.id)
        currentUserGuest(user.isGuest)

      })
      .catch((error) => {
        // something something errors
      });
  };



  useEffect(() => {
    const fetchProducts = async () => {
      await retrieveIngredients();
      await retrieveUser()
    };
    fetchProducts();
  }, []);


  return (
    <div className="App">
      <header>
        <Header
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />
      </header>
      <main>
        <Pages
          grabbedIngredients={grabbedIngredients}
          setIngredients={setIngredients}
          resetIngredients={resetIngredients}
          setResetIngredients={setResetIngredients}
          currentUserId={currentUserId}
          setCurrentUserId={setCurrentUserId}
          currentUserGuest={currentUserGuest}
          setCurrentUserGuest={setCurrentUserGuest}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />
      </main>
    </div>
  );
};
export default App;
