import React from "react";
import { Route, Switch } from "react-router-dom";
import { SHOP_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "../constants"

import Register from "./Register";
import Shop from "./Shop";
import Login from "./Login";


// import { getSomething } from "../api";

const Pages = (props) => {

  const { grabbedIngredients, setIngredients, resetIngredients } = props

  return (
    <div className="pages-container">
      <Switch>
        <Route exact path={SHOP_ROUTE}>
          <h1>SHOP ROUTE</h1>
          <Shop
            grabbedIngredients={grabbedIngredients}
            setIngredients={setIngredients}
            reset={resetIngredients}
          />
        </Route>
        <Route path={LOGIN_ROUTE}>
          <h1>LOGIN ROUTE</h1>
          <Login />
        </Route>
        <Route path={REGISTER_ROUTE}>
          <h1>REGISTER ROUTE</h1>
          <Register />
        </Route>
      </Switch>
    </div>
  );
};

export default Pages;
