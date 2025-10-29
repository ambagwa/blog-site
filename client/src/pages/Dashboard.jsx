import { Navbar } from "@/components/Navbar";
import React from "react";
import { Explore } from "./Explore";
import { MyBlogs } from "./MyBlogs";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUserRole } from "@/utils/auth";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="explore" />} />
          <Route path="my-blogs" element={<MyBlogs />} />
          <Route
            path="explore"
            element={
              <AdminRoute>
                <Explore />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};

// Admin route wrapper
const AdminRoute = ({ children }) => {
  const userRole = getUserRole();

  if(userRole !== "admin") {
    return <Navigate to="/dashboard/my-blogs" replace />
  }

  return children;
}

export default Dashboard;
