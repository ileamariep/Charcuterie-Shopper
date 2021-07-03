import React, { useEffect, useState } from "react";
// import axios from "axios";
import { TableRow, TableCell, TextField } from "@material-ui/core";
import { Create as CreateIcon, Save as SaveIcon } from "@material-ui/icons";
import "./MyAccount.css";
import { myAccountFetch } from "../api";

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
}) => {
  const [myAccountData, setMyAccountData] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const myToken = JSON.parse(localStorage.getItem("token"));
    if (myToken) {
      const fetchData = async () => {
        try {
          let myUsername = await myAccountFetch(myToken);
          // const userArray = [myUsername].flat();
          // const account = await myOrdersFetch(myUsername, myToken);
          console.log(myUsername, "account data after flat");
          setMyAccountData(myUsername);
          console.log(myUsername, "account data after flat again");
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

  const onSave = (id) => {
    setEditMode(false);
    window.location.reload();
    fetch(`/api/users/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
      body: JSON.stringify({
        name: accountUsername,
        email: accountEmail,
        address: accountAddress,
        city: accountCity,
        state: accountState,
        zip: accountZip,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch(console.error);
  };

  return (
    <div id="user-container" align="center">
      <h1>My Account</h1>

      <div key={myAccountData.id}>
        <TableRow key={myAccountData.id}>
          <TableCell component="th" scope="row">
            {/* {myAccountData.id} */}
          </TableCell>
          <TableCell align="center">
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
          <TableCell align="center">
            Email
            <div>
              {/* {myAccountData.email} */}
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

          <TableCell align="center">
            Address
            <div>
              {/* {accountAddress} */}
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
          <TableCell align="center">
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
          <TableCell align="center">
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
          <TableCell align="center">
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
          <TableCell align="center">
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
    </div>
  );
};
export default MyAccount;
