import React, { useContext, useEffect, useState } from "react";
import { Button, Tooltip, Dropdown } from "antd";
import "./styles.css";
import { AppContext } from "../context/AppContext";
import a from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [profileDropdown, setProfileDropDown] = useState(false);
  const { googleSignIn, user, logOut } = useContext(AppContext);
  console.log(user?.accessToken);

  const items = [
    {
      key: "1",
      label: <p>{user?.displayName}</p>,
    },
    {
      key: "2",
      label: (
        <div className="logOut-btn">
          <Button
            type="default"
            shape="round"
            className="btn"
            onClick={(e) => handleLogout(e)}
          >
            Log Out
          </Button>
        </div>
      ),
      disabled: true,
    },
  ];

  useEffect(() => {
    toGetUserData();
  }, [user]);

  const toGetUserData = async () => {
    try {
      await fetch("http://localhost:5000/api/user/getUser", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    try {
      e.preventDefault();
      await googleSignIn();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogout = async (e) => {
    try {
      await logOut();
      setProfileDropDown(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="container">
        {user ? (
          <>
            <Link to="/">
              <img src={a} alt="img" className="i" />
            </Link>
            <Link to="/todos">
              <button className="intro-btn">My todos</button>
            </Link>
          </>
        ) : (
          <img src={a} alt="img" className="i" />
        )}

        {user ? (
          <Dropdown menu={{ items }} placement="right" arrow>
            <button
              className="profile-pic-btn"
              onClick={() => setProfileDropDown(!profileDropdown)}
            >
              <img
                src={user?.photoURL}
                className="profile-pic"
                alt="profile-pic"
              />
            </button>
          </Dropdown>
        ) : (
          <Tooltip title="">
            <Button
              className="btn"
              type="default"
              shape="round"
              onClick={(e) => handleGoogleSignIn(e)}
            >
              LOGIN
            </Button>
          </Tooltip>
        )}
      </div>

      {profileDropdown && <div></div>}
    </>
  );
};

export default Header;
