import React from "react";
import { Modal, Input } from "antd";

const CreateTodoModal = (props) => {
  const {
    isModalOpen,
    handleOk,
    handleCancel,
    todoName,
    setTodoName,
    todoDesc,
    setTodoDesc,
  } = props;
  return (
    <Modal
      title="Create New Todo"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="my-modal">
        <lable for="name">Todo Name:</lable>
        <Input
          placeholder="Basic usage"
          className="input"
          type="text"
          id="name"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
        />
        <br />
        <lable for="description">Todo description:</lable>
        <Input
          placeholder="Basic usage"
          className="input"
          type="text"
          id="description"
          value={todoDesc}
          onChange={(e) => setTodoDesc(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default CreateTodoModal;
