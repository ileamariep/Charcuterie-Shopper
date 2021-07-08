import React, { useEffect, useState } from "react";
import { TableRow, TableCell, TextField, Button } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { getUsers, deleteUser, promoteUserToAdmin } from "../api/users";
import { ADMIN_USERS_ROUTE, SHOP_ROUTE } from "../constants";
import { Redirect } from "react-router-dom";
import "./Admin.css";

const AdminUsers = () => {
  const [usersAccountData, setUsersAccountData] = useState([]);
  // const [myAccountData, setMyAccountData] = useState("");
  // const [currentUser, setCurrentUser] = useState();

  const [editMode, setEditMode] = useState(false);
  const [accountUsername, setAccountUsername] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const myToken = JSON.parse(localStorage.getItem("token"));

  const getMyUserData = async () => {
    const myToken = JSON.parse(localStorage.getItem("token"));
    if (myToken) {
      try {
        let myUsers = await getUsers(myToken);
        const userArray = [myUsers].flat();
        // const account = await myOrdersFetch(myUsername, myToken);
        setUsersAccountData(userArray);
      } catch (error) {
        console.error(error);
      }
    };

  }

  useEffect(() => {
    const fetchUsers = async () => {
      await getMyUserData();
    };
    fetchUsers();
  }, []);

  const onDelete = async (id) => {
    try {
      await deleteUser(id, myToken);
      // window.location.href = `${ADMIN_USERS_ROUTE}`;
      getMyUserData()
    } catch (error) {
      console.log("Error deleting user", error);
    }
  };

  const onPromote = async (id) => {
    try {
      await promoteUserToAdmin(id, true, myToken);
      getMyUserData()
      // window.location.href = `${ADMIN_USERS_ROUTE}`;
    } catch (error) {
      console.log("Error deleting user", error);
    }
  };

  return (
    <div id="users-container" align="center">
      <h1>User Accounts</h1>
      {usersAccountData.map((user, idx) => {
        if (user.username == null) {
          return (
            <div key={user.id} user={user}>
              <div>Guest From ZIP Code:{user.zip}</div>
            </div>
          );
        } else {
          return (
            <TableRow key={user.id} user={user}>
              <TableCell component="th" scope="row"></TableCell>

              <TableCell align="center">
                Username
                <div>
                  {editMode ? (
                    <TextField
                      value={user.username}
                      onChange={(event) => {
                        setAccountUsername(event.target.value);
                      }}
                    />
                  ) : (
                    user.username
                  )}
                </div>
              </TableCell>
              <TableCell align="center">
                Email
                <div>
                  {editMode ? (
                    <TextField
                      value={user.email}
                      onChange={(event) => {
                        setAccountEmail(event.target.value);
                      }}
                    />
                  ) : (
                    user.email
                  )}
                </div>
              </TableCell>
              <TableCell align="center">
                Account
                <div>{user.isAdmin ? "Admin" : "User"}</div>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  visibility={user.isAdmin ? "hidden" : "visible"}
                  onClick={() => onPromote(user.id)}
                >
                  Make Admin
                </Button>
              </TableCell>
              <TableCell align="center">
                Delete User
                <div>
                  <DeleteIcon
                    visibility={user.isAdmin ? "hidden" : "visible"}
                    fontSize="small"
                    onClick={() => {
                      onDelete(user.id);
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          );
        }
      })}
    </div>
  );
};
export default AdminUsers;
