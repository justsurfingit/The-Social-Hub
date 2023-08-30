import React from "react";
import { axiosclient } from "../../Utils/axiosClient";
import { useState } from "react";
import "./Signup.scss";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      console.log(name);
      const response = await axiosclient.post("/auth/signup", {
        username: name,
        email: email,
        password: password,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="main-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="username"
            value={name}
            onChange={(event) => {
              setname(event.target.value);
            }}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="your-email@example.com"
            value={email}
            onChange={(event) => {
              setemail(event.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(event) => {
              setpassword(event.target.value);
            }}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
