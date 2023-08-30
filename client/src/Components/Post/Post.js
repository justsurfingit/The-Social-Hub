import React from "react";
import dump from "../../Assests/dump.jpeg";
import Avatar from "../Avatar/Avatar";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./Post.scss";
const Post = () => {
  return (
    <>
      <div className="post">
        <div className="header">
          <div className="profile-av">
            <Avatar />
          </div>
          <h3>Arun Panwar</h3>
        </div>
        <div className="content">
          <div className="post-img">
            <img src={dump} alt="" />
          </div>
        </div>
        <div className="footer">
          <div className="likes-info">
            <div className="like">
              <AiOutlineHeart size={28} />
            </div>
            <h4>15 Likes</h4>
          </div>
          <div className="caption">
            <p classname="car-p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              eius quis dolore inventore id reiciendis modi et delectus ducimus.
              Est.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
