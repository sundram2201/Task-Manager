import React, { useEffect, useState } from "react";
import { Layout, Menu, theme } from "antd";
import Tasks from "../pages/Tasks";
import { useNavigate } from "react-router-dom";
const { Content, Sider } = Layout;

const SideBar = ({ children }) => {
  const [role, setRole] = useState("");
  const [taskList, setTaskList] = useState(false);
  const navigate = useNavigate();

  const isRoleUser = role === "user" ? ["Tasks"] : ["Tasks", "Members"];

  const items = isRoleUser?.map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: icon,
  }));

  const handleClick = (event) => {
    if (event.key == 2) {
      setTaskList(false);
      navigate("/dashboard");
    } else if (event.key == 1) {
      navigate("/tasks");
      setTaskList(true);
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    setRole(localStorage.role);
  }, []);

  return (
    <Layout hasSider>
      <Sider
        style={{
          height: "100vh",
          left: 0,
          top: 0,
          bottom: 0,
        }}>
        <div className='demo-logo-vertical' />
        <Menu theme='dark' mode='inline' defaultSelectedKeys={["1"]} items={items} onClick={(e) => handleClick(e)} />
      </Sider>
      <Layout
        className='site-layout'
        style={{
          margin: 10,
        }}>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
            }}>
            {taskList ? <Tasks /> : children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default SideBar;
