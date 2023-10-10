import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const MyTodos = () => {
  return (
    <div className="home-container">
      <Header />
      <div className="my-todos-body">
        <h1>Welcome to My Todos</h1>
      </div>
    </div>
  );
};

export default MyTodos;
