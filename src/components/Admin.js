//https://www.pluralsight.com/guides/how-to-create-nested-tab-routes-with-react-router

import React, { useEffect, useState } from "react";
// import axios from "axios";
import "./Admin.css";
import { getUsers } from "../api/users";

import { Switch, Route, Link } from "react-router-dom";
import {
  ADMIN_PRODUCTS_ROUTE,
  ADMIN_ORDERS_ROUTE,
  ADMIN_USERS_ROUTE,
} from "../constants";
import AdminOrders from "./AdminOrders";
import AdminUsers from "./AdminUsers";
import AdminProducts from "./AdminProducts";
// import { getSomething } from "../api";



const Admin = ({
  grabbedIngredients,
  setIngredients,
  resetIngredients,
  setResetIngredients,
  currentUserId,
}) => {

  const [ingredientName, setIngredientName] = useState('')
  const [ingredientDescription, setIngredientDescription] = useState('')
  const [ingredientPrice, setIngredientPrice] = useState('')
  const [ingredientCategory, setIngredientCategory] = useState('')
  const [ingredientStockQty, setIngredientStockQty] = useState()
  const [ingredientImg, setIngredientImg] = useState('')
  const [ingredientImgAlt, setIngredientImgAlt] = useState('')
  return (
    <>
      <div className="admin-nav">
        <Link to={ADMIN_PRODUCTS_ROUTE}>PRODUCTS</Link>
        <Link to={ADMIN_ORDERS_ROUTE}>ORDERS</Link>
        <Link to={ADMIN_USERS_ROUTE}>USERS</Link>
      </div>

      <div className="tabs">
        <Switch>
          <Route path={ADMIN_PRODUCTS_ROUTE}>
            <AdminProducts
              grabbedIngredients={grabbedIngredients}
              setIngredients={setIngredients}
              resetIngredients={resetIngredients}
              setResetIngredients={setResetIngredients}
              ingredientName={ingredientName}
              setIngredientName={setIngredientName}
              ingredientDescription={ingredientDescription}
              setIngredientDescription={setIngredientDescription}
              ingredientPrice={ingredientPrice}
              setIngredientPrice={setIngredientPrice}
              ingredientCategory={ingredientCategory}
              setIngredientCategory={setIngredientCategory}
              ingredientStockQty={ingredientStockQty}
              setIngredientStockQty={setIngredientStockQty}
              ingredientImg={ingredientImg}
              setIngredientImg={setIngredientImg}
              ingredientImgAlt={ingredientImgAlt}
              setIngredientImgAlt={setIngredientImgAlt}
            />
          </Route>

          <Route path={ADMIN_ORDERS_ROUTE}>
            <AdminOrders />
          </Route>
          <Route path={ADMIN_USERS_ROUTE}>
            <AdminUsers />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default Admin;
