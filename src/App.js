import "./App.css";
import React, { useEffect, useState } from "react";
import { Header, Pages } from "./components";
import { allIngredients } from "./api";

const App = () => {
  const [grabbedIngredients, setIngredients] = useState([]);
  const [resetIngredients, setResetIngredients] = useState([])

  const retrieveIngredients = () => {

    allIngredients()
      .then(ingredient => {
        setIngredients(ingredient);
        setResetIngredients(ingredient)

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
      <header>
        <Header />
      </header>
      <main>
        <Pages
          grabbedIngredients={grabbedIngredients}
          setIngredients={setIngredients}
          reset={resetIngredients}
        />
      </main>
    </div>

  )

  // return (
  //   <div className="App">
  //     <Header />
  //     <Register />
  //     <Login />
  //     <Shop
  //       grabbedIngredients={grabbedIngredients}
  //       setIngredients={setIngredients}
  //       reset={retrieveIngredients}
  //     />
  //   </div>
  // );
};

export default App;


