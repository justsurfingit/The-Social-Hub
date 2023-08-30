import React, { useState } from "react";
import "./signstyle.scss";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="con">
        <div className="form">
          <h2>Sign Up</h2>
          <div className="sections">
            <p>Email</p>
            <label htmlFor="Email"></label>
            <input type="email" name="Email" id="email" />
          </div>
          <div className="sections">
            <p>Password</p>
            <label htmlFor="Password"></label>
            <input
              type={showPassword ? "text" : "password"}
              name="Password"
              id="Password"
            />
          </div>
          <div className="sections">
            <p>Confirm Password</p>
            <label htmlFor="SetPassword"></label>
            <input
              type={showPassword ? "text" : "password"}
              name="SetPassword"
              id="SetPassword"
            />
          </div>

          <button className="btn" type="submit">
            Sign Up
          </button>
          <hr />
          <p>Alreay have an account?</p>
          <button className="btn">Login</button>
        </div>
      </div>
    </>
  );
};

export default Signup;
