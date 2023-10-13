import React from "react";
import { Navigate } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

export const getToken = () => localStorage.getItem("token");
export const isAuth = () => Boolean(getToken());

const ProtectedRoute = ({ children }) => {
  // const auth = isAuth();

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
