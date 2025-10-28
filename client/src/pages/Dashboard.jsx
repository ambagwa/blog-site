import { Navbar } from "@/components/Navbar";
import React from "react";
import { Explore } from "./Explore";
import { MyBlogs } from "./MyBlogs";
import { Routes, Route, Navigate } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="explore" />} />
          <Route path="explore" element={<Explore />} />
          <Route path="my-blogs" element={<MyBlogs />} />
        </Routes>
      </div>
    </>
  );
};

export default Dashboard;
