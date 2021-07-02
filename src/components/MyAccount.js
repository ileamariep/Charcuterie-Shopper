import React, { useEffect, useState } from "react";
// import axios from "axios";
import "./MyAccount.css";
import { myAccountFetch } from "../api";
const MyAccount = () => {
  const [myAccountData, setMyAccountData] = useState([]);
  console.log(myAccountData, "my account data");
  useEffect(() => {
    const myToken = JSON.parse(localStorage.getItem("token"));
    if (myToken) {
      const fetchData = async () => {
        try {
          let myUsername = await myAccountFetch(myToken);
          const userArray = [myUsername].flat();
          // const account = await myOrdersFetch(myUsername, myToken);
          console.log(myUsername, "account data after flat");
          setMyAccountData(userArray);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, []);
  return (
    <div id="user-container">
      {myAccountData.map((user, idx) => {
        return (
          <div key={user.id} user={user}>
            <div>username: {user.username}</div>
            <div>email: {user.email}</div>
            <div>address:{user.address}</div>
            <div>city:{user.city}</div>
            <div>state:{user.state}</div>
            <div>zip:{user.zip}</div>
          </div>
        );
      })}
    </div>
  );
};
export default MyAccount;
