import React, { useEffect, useState } from "react";
import { TableRow, TableCell, TextField, Button } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import "./Admin.css";
import { getUsers, deleteUser, promoteUserToAdmin } from "../api/users";

const AdminUsers = () => {
  const [usersAccountData, setUsersAccountData] = useState([]);
  const [myAccountData, setMyAccountData] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [accountUsername, setAccountUsername] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const myToken = JSON.parse(localStorage.getItem("token"));
  // console.log(usersAccountData, "users account data");

  useEffect(() => {
    const myToken = JSON.parse(localStorage.getItem("token"));
    if (myToken) {
      const fetchData = async () => {
        try {
          let myUsers = await getUsers(myToken);
          const userArray = [myUsers].flat();
          // const account = await myOrdersFetch(myUsername, myToken);

          setUsersAccountData(userArray);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, []);

  const onDelete = async (id) => {
    try {
      await deleteUser(id, myToken);
      window.location.reload();
    } catch (err) {
      console.log("Error deleting user", err);
    }
  };

  const onPromote = async (id) => {
    try {
      await promoteUserToAdmin(id, true, myToken);
      window.location.reload();
    } catch (err) {
      console.log("Error deleting user", err);
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
              <TableCell component="th" scope="row">
                {/* {myAccountData.id} */}
              </TableCell>

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
                  {/* {myAccountData.email} */}
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
              <TableCell>{user.isAdmin ? "Admin" : "User"}</TableCell>
              <TableCell align="right">
                {/* <TableCell align="right"> */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onPromote(user.id)}
                >
                  Make Admin
                </Button>
                {/* </TableCell> */}
              </TableCell>
              <TableCell align="right">
                Delete User
                <DeleteIcon
                  fontSize="small"
                  onClick={() => {
                    onDelete(user.id);
                  }}
                />
              </TableCell>

              {/* <div>make admin {user.isAdmin}</div> */}
            </TableRow>
          );
        }
      })}
    </div>
  );
};
export default AdminUsers;
