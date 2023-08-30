import React from "react";
import { axiosclient } from "../../Utils/axiosClient";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
// Navbar
const Home = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Home;
