import React from "react";
import { Navigate } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

const ProtectedRoute = ({ children }) => {
  const auth = () => Boolean(localStorage?.token);

  return auth() ? (
    <>
      <Header />
      <SideBar children={children} />
    </>
  ) : (
    <Navigate to='/' />
  );
};

export default ProtectedRoute;
