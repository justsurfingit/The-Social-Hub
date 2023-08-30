import "./App.css";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Landing from "./Pages/Landing/Landing";
// Feed
// Profile
import RequireUser from "../src/Components/RequrieUser";
import Feed from "./Components/Feed/Feed";
import Profile from "./Components/Profile/Profile";
function App() {
  return (
    <div className="App">
      {/* <h1>working</h1> */}
      <Routes>
        {/* <Route path="/" element={<Landing />}></Route> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:userid" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
