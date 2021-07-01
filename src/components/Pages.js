import React from "react";
import { Route, Switch } from "react-router-dom";
import "./pages.css";
import {
  SHOP_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  MYACCOUNT_ROUTE,
  CART_ROUTE,
  ADMIN_ROUTE,
  HOME_ROUTE,
} from "../constants";
import Admin from "./Admin";
import Cart from "./Cart";
import MyAccount from "./MyAccount";
import Register from "./Register";
import Shop from "./Shop";
import Login from "./Login";
import Home from "./Home";

// import { getSomething } from "../api";

const Pages = (props) => {
  const {
    grabbedIngredients,
    setIngredients,
    resetIngredients,
    setResetIngredients,
    currentUser,
    setCurrentUser,
    currentUserId,
    setCurrentUserId,
    isAdmin,
    setIsAdmin,
    currentUserGuest,
    setCurrentUserGuest
  } = props;

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
            currentUserId={currentUserId}
            setCurrentUserId={setCurrentUserId}
            currentUserGuest={currentUserGuest}
            setCurrentUserGuest={setCurrentUserGuest}
          />
        </Route>
        <Route path={MYACCOUNT_ROUTE}>
          <MyAccount />
        </Route>
        <Route path={ADMIN_ROUTE}>
          <Admin isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
            grabbedIngredients={grabbedIngredients}
            setIngredients={setIngredients}
            resetIngredients={resetIngredients}
            setResetIngredients={setResetIngredients} />
        </Route>
        <Route path={CART_ROUTE}>
          <Cart />
        </Route>
        <Route path={LOGIN_ROUTE}>
          <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Route>
        <Route path={REGISTER_ROUTE}>
          <Register currentUser={currentUser} setCurrentUser={setCurrentUser} />
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
