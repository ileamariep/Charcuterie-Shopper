import React, { useEffect, useState } from "react";
import { TableRow, TableCell, TextField } from "@material-ui/core";
import { Create as CreateIcon, Save as SaveIcon } from "@material-ui/icons";
import { myAccountFetch } from "../api/users";
import UserOrders from "./UserOrders";
import "./MyAccount.css";

const myToken = JSON.parse(localStorage.getItem("token"));
const MyAccount = ({
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
  currentUserId,
  setCurrentUserId,
  resetUser,
  orderHistory,
  setOrderHistory,
}) => {
  const [myAccountData, setMyAccountData] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const myToken = JSON.parse(localStorage.getItem("token"));
    if (myToken) {
      const fetchData = async () => {
        try {
          let myUsername = await myAccountFetch(myToken);
          setMyAccountData(myUsername);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, []);

  const onEdit = () => {
    setEditMode(true);
  };

  const onSave = async (id) => {
    setEditMode(false);
    try {
      await fetch(`/api/users/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
        body: JSON.stringify({
          username: accountUsername,
          email: accountEmail,
          address: accountAddress,
          city: accountCity,
          state: accountState,
          zip: accountZip,
        }),
      });

      window.location.reload();
      resetUser();
    } catch (err) {
      console.log("Error updating user", err);
    }
  };

  return (
    <div id="user-container" align="center">
      <h1>My Account</h1>

      <div key={myAccountData.id} className="users-data">
        <TableRow key={myAccountData.id}>
          <TableCell component="th" scope="row"></TableCell>
          <TableCell align="center" className="light-background">
            Username
            <div>
              {editMode ? (
                <TextField
                  value={accountUsername}
                  onChange={(event) => {
                    setAccountUsername(event.target.value);
                  }}
                />
              ) : (
                myAccountData.username
              )}
            </div>
          </TableCell>
          <TableCell align="center" className="light-background">
            Email
            <div>
              {editMode ? (
                <TextField
                  value={accountEmail}
                  onChange={(event) => {
                    setAccountEmail(event.target.value);
                  }}
                />
              ) : (
                myAccountData.email
              )}
            </div>
          </TableCell>

          <TableCell align="center" className="light-background">
            Address
            <div>
              {editMode ? (
                <TextField
                  value={accountAddress}
                  onChange={(event) => {
                    setAccountAddress(event.target.value);
                  }}
                />
              ) : (
                myAccountData.address
              )}
            </div>
          </TableCell>
          <TableCell align="center" className="light-background">
            City
            <div>
              {editMode ? (
                <TextField
                  value={accountCity}
                  onChange={(event) => {
                    setAccountCity(event.target.value);
                  }}
                />
              ) : (
                myAccountData.city
              )}
            </div>
          </TableCell>
          <TableCell align="center" className="light-background">
            State
            <div>
              {editMode ? (
                <TextField
                  value={accountState}
                  onChange={(event) => {
                    setAccountState(event.target.value);
                  }}
                />
              ) : (
                myAccountData.state
              )}
            </div>
          </TableCell>
          <TableCell align="center" className="light-background">
            ZIP Code
            <div>
              {editMode ? (
                <TextField
                  value={accountZip}
                  onChange={(event) => {
                    setAccountZip(event.target.value);
                  }}
                />
              ) : (
                myAccountData.zip
              )}
            </div>
          </TableCell>
          <TableCell align="center" className="light-background">
            Edit
            <div>
              {editMode ? (
                <SaveIcon
                  style={{ cursor: "pointer" }}
                  fontSize="small"
                  onClick={() => {
                    onSave(currentUserId);
                  }}
                />
              ) : (
                <CreateIcon
                  style={{ cursor: "pointer" }}
                  fontSize="small"
                  onClick={onEdit}
                />
              )}
            </div>
          </TableCell>
        </TableRow>
      </div>

      <UserOrders
        currentUserId={currentUserId}
        setCurrentUserId={setCurrentUserId}
        orderHistory={orderHistory}
        setOrderHistory={setOrderHistory}
      />
    </div>
  );
};

export default MyAccount;
