import React, { useContext, useState } from "react";
import { Button, ConfigProvider, Dropdown } from "antd";
import "./styles.css";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Home = () => {
  const [profileDropdown, setProfileDropDown] = useState(false);
  const { googleSignIn, user, logOut } = useContext(AppContext);

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
    <ConfigProvider
      theme={{
        token: {
          // Seed Token

          borderRadius: 4,
          lineWidth: 2,
          // Alias Token
          colorBorder: "#ebbd6e",
          colorPrimaryHover: "green",
        },
      }}
    >
      <div className="container">
        <h1>TODOs</h1>

        {user && (
          <Link to="/todos">
            <Button className="intro-btn">My Todos</Button>
          </Link>
        )}

        {user ? (
          <Dropdown menu={{ items }} placement="bottom" arrow>
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
          <Button
            type="default"
            shape="round"
            onClick={(e) => handleGoogleSignIn(e)}
          >
            LOGIN
          </Button>
        )}
      </div>

      {profileDropdown && <div></div>}
    </ConfigProvider>
  );
};

export default Home;
