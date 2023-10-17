import React from "react";
import { Button, Modal } from "antd";

const DeleteTodo = (props) => {
  const { isDeleteOpen, handleOk, handleCancel, selectedTodo } = props;
  return (
    <>
      <Modal
        title="Delete Todo"
        open={isDeleteOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Are you sure you want to Delete the Todo, {selectedTodo?.user_name}?
        </p>
      </Modal>
    </>
  );
};

export default DeleteTodo;
