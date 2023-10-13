import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { Modal, Button, Form, Input } from "antd";
import { toast } from "react-hot-toast";
import { CreateMemberApi, getMemberListApi } from "../utils/Apis";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Joined Date",
    key: "createdAt",
    dataIndex: "createdAt",
    render: (e) => (
      <Tag color={"green"} key={e}>
        {e.split("T")[0]}
      </Tag>
    ),
  },
];

const Dashboard = () => {
  const [memData, setMemData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const CreateMember = async (values) => {
    const res = await CreateMemberApi(values);
    try {
      if (res.status === 201) {
        toast.success("user added successfully");
        getMemberList();
      }
    } catch (err) {
      toast.error(err?.response?.data?.error);
    }
  };
  const getMemberList = async () => {
    const res = await getMemberListApi();

    try {
      if (res.status === 200) {
        setMemData(res?.data?.data);
      }
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getMemberList();
  }, []);

  return (
    <>
      <Button
        className='modalFooter'
        type='primary'
        onClick={() => {
          setIsModalOpen(true);
        }}
        style={{
          border: "1px solid #001529",
          background: "#001529",
          color: "white",
          padding: "5px 15px",
          borderRadius: "10px",
        }}>
        Add Member
      </Button>
      <Modal
        title='Add a member'
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}>
        <Form
          name='basic'
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
          onFinish={CreateMember}
          onFinishFailed={onFinishFailed}
          autoComplete='off'>
          <Form.Item
            label='Name'
            name='name'
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={memData} />
    </>
  );
};
export default Dashboard;
