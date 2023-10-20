import React from "react";
import { Space, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import Footer from "./Footer";

const TodoTable = (props) => {
  const { todosList, editTodo, deleteTodo } = props;
  const columns = [
    {
      title: "Id",
      dataIndex: "todo_id",
      key: "todo_id",
    },
    {
      title: "Todo Name",
      dataIndex: "todo_name",
      key: "todo_name",
    },
    {
      title: "Todo Desc",
      dataIndex: "todo_desc",
      key: "todo_desc",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (_, record) => <p>{moment(record?.created_at).format()}</p>,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button className="icon-btn" onClick={() => editTodo(record)}>
            <EditOutlined />
          </button>
          <button className="icon-btn" onClick={() => deleteTodo(record)}>
            <DeleteOutlined />
          </button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={todosList} />

      <Footer />
    </div>
  );
};
export default TodoTable;
