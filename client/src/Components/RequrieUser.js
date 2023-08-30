import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Login from "../Pages/Login/Login";
import { getitem, KEY_ACCESS } from "../Utils/localStorage";

const RequrieUser = () => {
  const user = getitem(KEY_ACCESS);
  //acess key doesn;t gaurantee the user
  return (
    // this is an example of conditional routing
    user ? <Outlet /> : <Navigate to="/login" />
  );
};

export default RequrieUser;
