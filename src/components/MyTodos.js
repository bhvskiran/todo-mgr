import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

import Header from "./Header";
import CreateTodoModal from "./CreateTodoModal";
import TodoTable from "./TodoTable";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import EditTodo from "./EditTodo";
import DeleteTodo from "./DeleteTodo";

const MyTodos = () => {
  const [todoName, setTodoName] = useState("");
  const [todoDesc, setTodoDesc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();
  // const [editTheTodo, setEditTodo] = useState("");
  // const [editDesc, setEditDesc] = useState("");
  const [todosList, setTodosList] = useState([
    {
      id: 1,
      user_name: "Bookworm",
      todo_desc: "A lover of books.",
      created_at: "2023-10-16 18:46:53 PST",
    },
    {
      id: 2,
      user_name: "Penmaster",
      todo_desc: "A skilled writer.",
      created_at: "2023-10-16 18:46:53 PST",
    },
    {
      id: 3,
      user_name: "Talker",
      todo_desc: "Someone who is all talk and no action.",
      created_at: "2023-10-16 18:46:53 PST",
    },
    {
      id: 4,
      user_name: "Techie",
      todo_desc: "A person who is very interested in computers and technology.",
      created_at: "2023-10-16 18:46:53 PST",
    },
    {
      id: 5,
      user_name: "Phone Fiend",
      todo_desc: "Someone who is addicted to using their phone.",
      created_at: "2023-10-16 18:46:53 PST",
    },
    {
      id: 6,
      user_name: "Couch Potato",
      todo_desc:
        "A lazy person who spends a lot of time sitting on the couch watching TV.",
      created_at: "2023-10-16 18:46:53 PST",
    },
    {
      id: 7,
      user_name: "Gamer",
      todo_desc:
        "Someone who enjoys playing tabletop games, such as board games, card games, and role-playing games.",
      created_at: "2023-10-16 18:46:53 PST",
    },
    {
      id: 8,
      user_name: "Seeker",
      todo_desc: "A person who is always looking for new opportunities.",
      created_at: "2023-10-16 18:46:53 PST",
    },
    {
      id: 9,
      user_name: "Curious George",
      todo_desc:
        "Someone who enjoys looking at other people's houses and yards.",
      created_at: "2023-10-16 18:46:53 PST",
    },
    {
      id: 10,
      user_name: "Tea Lover",
      todo_desc: "Someone who enjoys drinking tea.",
      created_at: "2023-10-16 18:46:53 PST",
    },
    {
      id: 11,
      user_name: "Foodie",
      todo_desc: "Someone who enjoys eating and trying new foods.",
      created_at: "2023-10-16 18:46:53 PST",
    },
  ]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const todoObj = {
      id: uuidv4(),
      user_name: todoName,
      todo_desc: todoDesc,
      created_at: moment().format(),
    };
    setTodosList([...todosList, todoObj]);
    console.log(todoObj);
    setTodoName("");
    setTodoDesc("");
    setIsModalOpen(false);
  };

  const handleEditTodo = () => {
    console.log("edit create btn is clicked");
  };

  const editTodo = (obj) => {
    setTodoName(obj?.user_name);
    setTodoDesc(obj?.todo_desc);
    setIsEditOpen(true);
    console.log("edited Id no: ", obj?.id);
  };

  const handleEditCancel = () => {
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

  const handleDeleteTodo = () => {
    console.log("clicked on delete todo");
    setIsDeleteOpen(false);
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
