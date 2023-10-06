import React from "react";
import { Link } from "react-router-dom";

const MyTodos = () => {
  return (
    <div>
      <Link to="/">
        <button>Home</button>
      </Link>

      <h1>My Todos</h1>
    </div>
  );
};

export default MyTodos;
