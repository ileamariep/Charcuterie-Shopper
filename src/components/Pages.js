import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./pages.css";
import {
  ADMIN_ROUTE,
  ADMIN_USERS_ROUTE,
  CART_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  MYACCOUNT_ROUTE,
  REGISTER_ROUTE,
  SHOP_ROUTE,
  THANKYOU_ROUTE,
} from "../constants";
import Admin from "./Admin";
import AdminUsers from "./AdminUsers";
import Cart from "./Cart";
import Home from "./Home";
import Login from "./Login";
import MyAccount from "./MyAccount";
import Register from "./Register";
import Shop from "./Shop";
import ThankYou from "./ThankYou";

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
    orderHistory,
    setOrderHistory,
    showDashLinks,
    setDashLinks,
    hideViewButton,
    setHideViewButton,
    showQtyButton,
    setShowQtyButton,
    showCartButton,
    setCartButton,
    setErrorMessage,
  } = props;

  return (
    <div className="pages-container">
      <Switch>
        <Route exact path={HOME_ROUTE}>
          <Home
            setCurrentUserId={setCurrentUserId}
            setCurrentUserGuest={setCurrentUserGuest}
          />
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
            hideViewButton={hideViewButton}
            setHideViewButton={setHideViewButton}
            showQtyButton={showQtyButton}
            setShowQtyButton={setShowQtyButton}
            showCartButton={showCartButton}
            setCartButton={setCartButton}
          />
        </Route>
        <Route path={MYACCOUNT_ROUTE}>
          {currentUserGuest ? (
            <Redirect to={SHOP_ROUTE} />
          ) : (
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
              currentUserGuest={currentUserGuest}
              setCurrentUserGuest={setCurrentUserGuest}
              orderHistory={orderHistory}
              setOrderHistory={setOrderHistory}
            />
          )}
        </Route>
        <Route path={ADMIN_ROUTE}>
          {isAdmin ? (
            <Admin
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              grabbedIngredients={grabbedIngredients}
              setIngredients={setIngredients}
              reset={reset}
              showDashLinks={showDashLinks}
              setDashLinks={setDashLinks}
              currentUserId={currentUserId}
              setCurrentUserId={setCurrentUserId}
            />
          ) : (
            <Redirect to={SHOP_ROUTE} />
          )}
        </Route>
        <Route path={LOGIN_ROUTE}>
          <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </Route>
        <Route path={REGISTER_ROUTE}>
          <Register
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setErrorMessage={setErrorMessage}
          />
        </Route>
        <Route path={CART_ROUTE}>
          <Cart currentUserId={currentUserId} />
        </Route>
        <Route exact path={ADMIN_USERS_ROUTE}>
          <AdminUsers
            currentUserId={currentUserId}
            setCurrentUserId={setCurrentUserId}
          />
        </Route>

        <Route path={THANKYOU_ROUTE}>
          <ThankYou />
        </Route>
      </Switch>
    </div>
  );
};

export default Pages;
