import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Tasks from "../pages/Tasks";
import ProtectedRoute from "./ProtectedRoute";

const MainRouter = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/tasks'
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route exact path='/*' element='404' />
      </Routes>
    </>
  );
};

export default MainRouter;
