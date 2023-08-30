import React from "react";
import user from "../../Assests/user.png";
import "./Avatar.scss";
function Avatar({ src }) {
  return (
    <div className="avatar">
      <img src={src ? src : user} alt="default" />
    </div>
  );
}

export default Avatar;
