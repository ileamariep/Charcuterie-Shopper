import React, { useEffect, useState } from "react";
// import axios from "axios";
import "./Admin.css";
import { getUsers } from "../api";

const UserOrders = () => {
  const [usersAccountData, setUsersAccountData] = useState([]);
  console.log(usersAccountData, "users account data");
  useEffect(() => {
    const myToken = JSON.parse(localStorage.getItem("token"));
    if (myToken) {
      const fetchData = async () => {
        try {
          let myUsers = await getUsers(myToken);
          const userArray = [myUsers].flat();
          // const account = await myOrdersFetch(myUsername, myToken);
          console.log(myUsers, "account data after flat");
          setUsersAccountData(userArray);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, []);
  return (
    <div id="users-container">
      {usersAccountData.map((user, idx) => {
        if (user.username == null) {
          return (
            <div key={user.id} user={user}>
              <div>Guest From ZIP Code:{user.zip}</div>
            </div>
          );
        } else {
          return (
            <div key={user.id} user={user}>
              <div>username: {user.username}</div>
              <div>email: {user.email}</div>
              <div>address:{user.address}</div>
              <div>city:{user.city}</div>
              <div>state:{user.state}</div>
              <div>ZIP:{user.zip}</div>
            </div>
          );
        }
      })}
    </div>
  );
};
export default UserOrders;
