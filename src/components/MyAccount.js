import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
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
  orderHistory,
  setOrderHistory,
}) => {
  const [myAccountData, setMyAccountData] = useState("");
  const [editMode, setEditMode] = useState(false);

  const getMyData = async () => {
    const myToken = JSON.parse(localStorage.getItem("token"));
    if (myToken) {
      try {
        let myUsername = await myAccountFetch(myToken);
        setMyAccountData(myUsername);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchMe = async () => {
      await getMyData();
    };
    fetchMe();
  }, []);

  const onEdit = async () => {
    try {
      await myAccountFetch();
      setEditMode(true);
    } catch (error) {
      console.log(error, "can't edit my account");
    }
  };

  const onSave = async (id) => {
    setEditMode(false);

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
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        getMyData();
      })
      .catch(console.error);
  };

  return (
    <div id="user-container" align="center">
      <div className='my-user-header-top'><h1>My Account</h1></div>

      <div key={myAccountData.id} className="users-data-continer">


        <div align="center" className="light-background my-container">
          <div className='my-user-title'>Username</div>
          <div className='text-field-container'>
            {editMode ? (
              <TextField
                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                value={accountUsername}
                onChange={(event) => {
                  setAccountUsername(event.target.value);
                }}
              />
            ) : (
              myAccountData.username
            )}
          </div>
        </div>
        <div align="center" className="light-background my-container">
          <div className='my-user-title'>Email</div>
          <div className='text-field-container'>
            {editMode ? (
              <TextField
                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                value={accountEmail}
                onChange={(event) => {
                  setAccountEmail(event.target.value);
                }}
              />
            ) : (
              myAccountData.email
            )}
          </div>
        </div>

        <div align="center" className="light-background my-container">
          <div className='my-user-title'>Address</div>
          <div className='text-field-container'>
            {editMode ? (
              <TextField
                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                value={accountAddress}
                onChange={(event) => {
                  setAccountAddress(event.target.value);
                }}
              />
            ) : (
              myAccountData.address
            )}
          </div>
        </div>
        <div align="center" className="light-background my-container">
          <div className='my-user-title'>City</div>
          <div className='text-field-container'>
            {editMode ? (
              <TextField
                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                value={accountCity}
                onChange={(event) => {
                  setAccountCity(event.target.value);
                }}
              />
            ) : (
              myAccountData.city
            )}
          </div>

        </div>
        <div align="center" className="light-background my-container">
          <div className='my-user-title'>State</div>
          <div className='text-field-container'>
            {editMode ? (
              <TextField
                value={accountState}
                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                onChange={(event) => {
                  setAccountState(event.target.value);
                }}
              />
            ) : (
              myAccountData.state
            )}
          </div>
        </div>
        <div align="center" className="light-background my-container">
          <div className='my-user-title'>Zip Code</div>
          <div className='text-field-container'>
            {editMode ? (
              <TextField
                value={accountZip}
                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                onChange={(event) => {
                  setAccountZip(event.target.value);
                }}
              />
            ) : (
              myAccountData.zip
            )}
          </div>
        </div>
        <div align="center" className="light-background my-container">
          <div className='my-user-title'>Edit</div>
          <div className='text-field-container'>
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
        </div>
      </div>
      <div className='user-order-history-container'>
        <div className='my-user-header-bottom'><h1>My Order History</h1></div>
        <UserOrders
          currentUserId={currentUserId}
          setCurrentUserId={setCurrentUserId}
          orderHistory={orderHistory}
          setOrderHistory={setOrderHistory}
        />
      </div>
    </div>
  );
};

export default MyAccount;
