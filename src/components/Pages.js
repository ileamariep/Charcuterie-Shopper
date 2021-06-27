import React from "react";
import { Route, Switch } from "react-router-dom";
import "./pages.css";
import { SHOP_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "../constants"

import Register from "./Register";
import Shop from "./Shop";
import Login from "./Login";


// import { getSomething } from "../api";

const Pages = (props) => {

  const { grabbedIngredients, setIngredients, resetIngredients, setResetIngredients } = props

  return (
    <div className="pages-container">
      <Switch>
        <Route exact path={SHOP_ROUTE}>
          <Shop
            grabbedIngredients={grabbedIngredients}
            setIngredients={setIngredients}
            resetIngredients={resetIngredients}
            setResetIngredients={setResetIngredients}
          />
        </Route>
        <Route path={LOGIN_ROUTE}>
          <Login />
        </Route>
        <Route path={REGISTER_ROUTE}>
          <Register />
        </Route>
      </Switch>
    </div>
  );
};

export default Pages;
