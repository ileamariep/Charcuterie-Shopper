import React from "react";
import { Route, Switch } from "react-router-dom";
import "./pages.css";
import { SHOP_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, HOME_ROUTE, CART_ROUTE, ADMIN_ROUTE } from "../constants"

import Register from "./Register";
import Shop from "./Shop";
import Login from "./Login";
import Home from "./Home";
import Cart from "./Cart";
import Admin from "./Admin";


// import { getSomething } from "../api";

const Pages = (props) => {

  const { grabbedIngredients, setIngredients, resetIngredients, setResetIngredients } = props

  return (
    <div className="pages-container">
      <Switch>
        <Route exact path={HOME_ROUTE}>
          <Home />
        </Route>
        <Route path={SHOP_ROUTE}>
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
        <Route path={CART_ROUTE}>
          <Cart />
        </Route>
        <Route path={ADMIN_ROUTE}>
          <Admin />
        </Route>
      </Switch>
    </div>
  );
};

export default Pages;
