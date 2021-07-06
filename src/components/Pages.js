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
  THANKYOU_ROUTE,
  SINGLE_PRODUCT_ROUTE,
} from "../constants";
import Admin from "./Admin";
import Cart from "./Cart";
import MyAccount from "./MyAccount";
import Register from "./Register";
import Shop from "./Shop";
import Login from "./Login";
import Home from "./Home";
import UserOrders from "./UserOrders";
import ThankYou from "./ThankYou";
import SingleProductView from "./SingleProductView"


// import { getSomething } from "../api";

const Pages = (props) => {
  const {
    grabbedIngredients,
    setIngredients,
    currentUser,
    setCurrentUser,
    currentUserId,
    setCurrentUserId,
    isAdmin,
    setIsAdmin,
    currentUserGuest,
    setCurrentUserGuest,
    accountUsername,
    setAccountUsername,
    accountEmail,
    setAccountEmail,
    accountAddress,
    setAccountAddress,
    accountCity,
    setAccountCity,
    accountState,
    setAccountState,
    accountZip,
    setAccountZip,
    reset,
    showDashLinks,
    setDashLinks
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
            currentUserId={currentUserId}
            setCurrentUserId={setCurrentUserId}
            currentUserGuest={currentUserGuest}
            setCurrentUserGuest={setCurrentUserGuest}
            reset={reset}
          />
        </Route>
        <Route path={MYACCOUNT_ROUTE}>
          <MyAccount
            accountUsername={accountUsername}
            setAccountUsername={setAccountUsername}
            accountEmail={accountEmail}
            setAccountEmail={setAccountEmail}
            accountAddress={accountAddress}
            setAccountAddress={setAccountAddress}
            accountCity={accountCity}
            setAccountCity={setAccountCity}
            accountState={accountState}
            setAccountState={setAccountState}
            accountZip={accountZip}
            setAccountZip={setAccountZip}
            currentUserId={currentUserId}
            setCurrentUserId={setCurrentUserId}
          />
          <UserOrders />
        </Route>
        <Route path={ADMIN_ROUTE}>
          <Admin
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
            grabbedIngredients={grabbedIngredients}
            setIngredients={setIngredients}
            reset={reset}
            showDashLinks={showDashLinks}
            setDashLinks={setDashLinks}
          />
        </Route>
        <Route path={LOGIN_ROUTE}>
          <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Route>
        <Route path={REGISTER_ROUTE}>
          <Register currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Route>
        <Route path={CART_ROUTE}>
          <Cart currentUserId={currentUserId} />
        </Route>
        <Route path={ADMIN_ROUTE}>
          <Admin />
        </Route>
        <Route path={THANKYOU_ROUTE}>
          <ThankYou />
        </Route>
        <Route path={SINGLE_PRODUCT_ROUTE}>
          <SingleProductView />
        </Route>
      </Switch>
    </div>
  );
};

export default Pages;
