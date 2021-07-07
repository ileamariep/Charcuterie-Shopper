//https://www.pluralsight.com/guides/how-to-create-nested-tab-routes-with-react-router

import React, { useState, useEffect } from "react";
// import axios from "axios";
import "./Admin.css";

import { allOrders } from "../api/orders"
import { Switch, Route, Link } from "react-router-dom";
import {
  ADMIN_PRODUCTS_ROUTE,
  ADMIN_ORDERS_ROUTE,
  ADMIN_USERS_ROUTE,
} from "../constants";
import AdminOrders from "./AdminOrders";
import AdminUsers from "./AdminUsers";
import AdminProducts from "./AdminProducts";
import linkBontemps from "./img/bontemps.png"
import linkDoctor from "./img/doctoryourself.png"
import linkBelt from "./img/dietbelt.png"




const Admin = ({
  grabbedIngredients,
  setIngredients,
  currentUserId,
  reset,
  showDashLinks,
  setDashLinks,
}) => {

  const [ingredientName, setIngredientName] = useState('')
  const [ingredientDescription, setIngredientDescription] = useState('')
  const [ingredientPrice, setIngredientPrice] = useState('')
  const [ingredientCategory, setIngredientCategory] = useState('')
  const [ingredientStockQty, setIngredientStockQty] = useState()
  const [ingredientImg, setIngredientImg] = useState('')
  const [ingredientImgAlt, setIngredientImgAlt] = useState('')
  const [allGrabbedOrders, setAllOrders] = useState([])

  const retrieveAllOrders = async () => {
    allOrders()
      .then((orders) => {
        setAllOrders(orders);
      })
      .catch((error) => {
        console.log(error)
      });
  };


  useEffect(() => {
    const fetchProducts = async () => {
      await retrieveAllOrders();

    };
    fetchProducts();
  }, []);


  const handleLinkClick = () => {
    setDashLinks(false)
  }
  return (
    <>

      {showDashLinks ? (
        <>
          <div className="admin-page-title">Select an Admin Dashboard Below</div>
          <div className="admin-nav">
            <Link to={ADMIN_PRODUCTS_ROUTE} className="admin-link products-route"
              style={{
                backgroundImage: `url(${linkBontemps})`
              }}
              onClick={() => {
                handleLinkClick();
              }}
            >PRODUCTS</Link>
            <Link to={ADMIN_ORDERS_ROUTE} className="admin-link orders-route"
              style={{
                backgroundImage: `url(${linkDoctor})`
              }}
              onClick={() => {
                handleLinkClick();
              }}
            >ORDERS</Link>
            <Link to={ADMIN_USERS_ROUTE} className="admin-link orders-route"
              style={{
                backgroundImage: `url(${linkBelt})`
              }}
              onClick={() => {
                handleLinkClick();
              }}
            >USERS</Link>
          </div>
        </>
      ) : (
        <>
          <div className="tabs">
            <Switch>
              <Route path={ADMIN_PRODUCTS_ROUTE}>
                <AdminProducts
                  grabbedIngredients={grabbedIngredients}
                  setIngredients={setIngredients}
                  reset={reset}
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
                <AdminOrders
                  allGrabbedOrders={allGrabbedOrders}
                  setAllOrders={setAllOrders}
                />
              </Route>
              <Route path={ADMIN_USERS_ROUTE}>
                <AdminUsers />
              </Route>
            </Switch>
          </div>
        </>

      )}



    </>
  );
};

export default Admin;
