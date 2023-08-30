import React from "react";
import Signup from "./Signup.js";
import "./Landing.scss";

const Landing = () => {
  return (
    <div className="main-holder">
      <div className="Banner"></div>
      <div className="LogSign">
        <Signup />
      </div>
    </div>
  );
};

export default Landing;
