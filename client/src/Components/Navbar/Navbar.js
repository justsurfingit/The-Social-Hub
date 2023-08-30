import React from "react";
// import user from "../../Assests/user.png";
import "./Navbar.scss";
import Avatar from "../Avatar/Avatar";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <h2 onClick={() => navigate("/")} className="hover-class">
        The Social Hub
      </h2>
      <Avatar />
    </div>
  );
};

export default Navbar;
