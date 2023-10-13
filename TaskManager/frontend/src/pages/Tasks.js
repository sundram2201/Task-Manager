import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { Modal, Button, Select, Form, Input } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { serverUrl } from "../utils/BaseUrl";
import { CreateTaskApi, GetTaskListApi, getMemberListApi } from "../utils/Apis";
const { Option } = Select;

const updatedTask = async (status, task_id) => {
  try {
    const res = await axios.put(
      `${serverUrl}/task/edit-task`,
      { status, task_id },
      {
        headers: {
          token: localStorage?.token,
        },
      }
    );
    if (res.status === 200) {
      toast.success("task updated successfully");
    }
  } catch (err) {
    toast.error(err?.response?.data?.error);
  }
};

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Name of User",
    dataIndex: "assignedTo",
    key: "assignedTo",
    render: (e) => e?.name,
  },
  {
    title: "Assigned To",
    dataIndex: "assignedTo",
    key: "assignedTo",
    render: (e) => e?.email,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (e, i) => {
      return (
        <>
          {localStorage?.role === "admin" ? (
            <Tag
              color={
                e === "progress" ? "blue" : e === "pending" ? "red" : "green"
              }
              key={e}
            >
              {e.toUpperCase()}
            </Tag>
          ) : (
            <Select
              placeholder="Select Status"
              defaultValue={e}
              onChange={(e) => updatedTask(e, i?._id)}
              allowClear
            >
              <Option value="pending">Pending</Option>
              <Option value="progress">Progress</Option>
              <Option value="completed">Completed</Option>
            </Select>
          )}
        </>
      );
    },
  },
  {
    title: "Created Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (e) => e?.split("T")[0],
  },
];

const Tasks = () => {
  const [taskData, setTaskData] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = async () => {
    setIsModalOpen(true);
    const res = await getMemberListApi();
    try {
      if (res.status === 200) {
        setMemberList(res?.data?.data);
      }
    } catch (err) {
      return err;
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    const errorFields = errorInfo?.errorFields || [];
    const errorNames = errorFields.map((field) => field?.name[0]);
    toast.error(errorNames.join(", ") + " Invalid");
  };

  const getTaskList = async () => {
    const res = await GetTaskListApi();
    try {
      if (res.status === 200) {
        let newData = res?.data?.data?.map((items) => ({
          ...items,
          key: items._id,
        }));
        setTaskData(newData);
      }
    } catch (err) {
      toast.error(err?.response?.data?.error);
    }
  };

  const CreateTask = async (values) => {
    const res = await CreateTaskApi(values);

    try {
      if (res.status === 201) {
        toast.success("Task created successfully");
        getTaskList();
        setIsModalOpen(false);
      }
    } catch (err) {
      toast.error(err?.response?.data?.error);
    }
  };

  const checkIsAdmin = () => {
    return localStorage?.role === "admin" ? (
      <Button
        className="modalFooter"
        type="primary"
        onClick={showModal}
        style={{
          border: "1px solid #001529",
          background: "#001529",
          color: "white",
          padding: "5px 15px",
          borderRadius: "10px",
        }}
      >
        Create Task
      </Button>
    ) : (
      ""
    );
  };

  useEffect(() => {
    getTaskList();
  }, []);

  return (
    <>
      {checkIsAdmin()}
      <Modal title="Create a Task" open={isModalOpen} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={CreateTask}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please enter your title!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter your Description!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="assignedTo"
            label="Assigned To"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select a user" allowClear>
              {memberList.map((item,i) => {
                return <Option value={item?._id} key={i}>{`${item?.name} - ${item?.email}`}</Option>;
              })}
            </Select>
          </Form.Item>

          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select placeholder="Select a task" allowClear>
              <Option value="pending">Pending</Option>
              <Option value="progress">Progress</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Remarks"
            name="remarks"
            rules={[{ required: true, message: "Please enter your Remarks!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={taskData} />
    </>
  );
};
export default Tasks;
