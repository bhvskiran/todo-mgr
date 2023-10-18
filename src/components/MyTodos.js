import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

import Header from "./Header";
import CreateTodoModal from "./CreateTodoModal";
import TodoTable from "./TodoTable";
// import { v4 as uuidv4 } from "uuid";
// import moment from "moment";
import EditTodo from "./EditTodo";
import DeleteTodo from "./DeleteTodo";
import { AppContext } from "../context/AppContext";

const MyTodos = () => {
  const { user } = useContext(AppContext);
  const [todoName, setTodoName] = useState("");
  const [todoDesc, setTodoDesc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();
  // const [editTheTodo, setEditTodo] = useState("");
  // const [editDesc, setEditDesc] = useState("");
  const [todosList, setTodosList] = useState([]);

  useEffect(() => {
    // in place of componentdimount
    toGetAllTodos();
  }, []);

  const toGetAllTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/todo/all-todos", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      const data = await response.json();
      if (data?.total_count > 0) {
        setTodosList(data?.records);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    try {
      const payload = {
        todoName: todoName,
        todoDesc: todoDesc,
      };
      console.log(payload);
      const response = await fetch("http://localhost:5000/api/todo/create", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      // const data = await response.json();
      console.log("post data", response);

      setTodoName("");
      setTodoDesc("");
      setIsModalOpen(false);
      todosList.length = 0;
      toGetAllTodos();
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleEditTodo = async () => {
    try {
      const payload = {
        todoName: todoName,
        todoDesc: todoDesc,
      };
      // console.log("edit Todo", payload, selectedTodo);
      const response = await fetch(
        `http://localhost:5000/api/todo/update-todo/${selectedTodo?.todo_id}`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      // const data = await response.json();
      console.log("post data", response);

      setTodoName("");
      setTodoDesc("");
      setIsEditOpen(false);
      todosList.length = 0;
      toGetAllTodos();
    } catch (error) {
      console.log(error?.message);
    }
  };

  const editTodo = (obj) => {
    setSelectedTodo(obj);
    setTodoName(obj?.todo_name);
    setTodoDesc(obj?.todo_desc);
    setIsEditOpen(true);
    console.log("edited Id no: ", obj?.id);
  };

  const handleEditCancel = () => {
    setSelectedTodo();
    setTodoName("");
    setTodoDesc("");
    setIsEditOpen(false);
  };

  const handleCreateCancel = () => {
    setTodoName("");
    setTodoDesc("");
    setIsModalOpen(false);
  };

  const deleteTodo = (obj) => {
    setSelectedTodo(obj);
    setIsDeleteOpen(true);
    console.log("Deleted Id no: ", obj?.id);
  };

  const handleDeleteTodo = async () => {
    try {
      // console.log("edit Todo", payload, selectedTodo);
      const response = await fetch(
        `http://localhost:5000/api/todo/delete-todo/${selectedTodo?.todo_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      // const data = await response.json();
      console.log("post data", response);

      setIsDeleteOpen(false);
      todosList.length = 0;
      toGetAllTodos();
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleDeleteCancel = () => {
    setSelectedTodo();
    setIsDeleteOpen(false);
  };

  return (
    <div className="home-container">
      <Header />
      <div className="my-todos-body">
        <div className="empty-div"></div>
        <div className="my-heading">
          <h1>Welcome to My Todos</h1>
        </div>
        <div className="new-todo-button">
          <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
            New Todo
          </Button>
        </div>
      </div>
      <TodoTable
        todosList={todosList}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
      />
      {/* button */}
      {isModalOpen && (
        <CreateTodoModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={() => handleCreateCancel()}
          todoName={todoName}
          setTodoName={setTodoName}
          todoDesc={todoDesc}
          setTodoDesc={setTodoDesc}
        />
      )}
      {isEditOpen && (
        <EditTodo
          isEditOpen={isEditOpen}
          handleOk={() => handleEditTodo()}
          handleCancel={() => handleEditCancel()}
          todoName={todoName}
          setTodoName={setTodoName}
          todoDesc={todoDesc}
          setTodoDesc={setTodoDesc}
        />
      )}
      {isDeleteOpen && (
        <DeleteTodo
          isDeleteOpen={isDeleteOpen}
          handleOk={() => handleDeleteTodo()}
          selectedTodo={selectedTodo}
          handleCancel={() => handleDeleteCancel()}
        />
      )}
    </div>
  );
};

export default MyTodos;
