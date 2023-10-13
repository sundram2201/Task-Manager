import React from "react";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const role = localStorage.role;
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          background: "#031713",
          color: "white",
          padding: "10px",
        }}>
        <div>Logo</div>
        <div>Task Manager</div>
        <div>
          <p style={{ display: "inline-block", paddingRight: "8px" }}>
            Logged in as <b>{role}</b>
          </p>
          <Space direction='vertical'>
            <Button type='primary' onClick={() => handleLogout()}>
              Log Out
            </Button>
          </Space>
        </div>
      </div>
    </>
  );
};
export default Header;
