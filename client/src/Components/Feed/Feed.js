import React from "react";
import Avatar from "../Avatar/Avatar";
import Post from "../Post/Post";
// Avatar
import "./Feed.scss";
const Feed = () => {
  return (
    <>
      <div className="feed">
        <div className="left-side">
          <Post />
          <Post />
        </div>
        <div className="right-side">
          <div className="following">
            <h3>You are following</h3>
            <div className="people">
              <div className="user-section">
                <Avatar />
                <h4>Robin</h4>
              </div>
              <p>Follow</p>
            </div>
            <div className="people">
              <div className="user-section">
                <Avatar />
                <h4>Robin</h4>
              </div>

              <p>Follow</p>
            </div>
            <div className="people">
              <div className="user-section">
                <Avatar />
                <h4>Robin</h4>
              </div>
              <p>Follow</p>
            </div>
            <div className="people">
              <div className="user-section">
                <Avatar />
                <h4>Robin</h4>
              </div>
              <p>Follow</p>
            </div>
          </div>
          <div className="suggestions">
            <h3>Suggestions for you</h3>
            <div className="people">
              <div className="user-section">
                <Avatar />
                <h4>Robin</h4>
              </div>
              <p>Follow</p>
            </div>
            <div className="people">
              <div className="user-section">
                <Avatar />
                <h4>Robin</h4>
              </div>
              <p>Follow</p>
            </div>
            <div className="people">
              <div className="user-section">
                <Avatar />
                <h4>Robin</h4>
              </div>
              <p>Follow</p>
            </div>
            <div className="people">
              <div className="user-section">
                <Avatar />
                <h4>Robin</h4>
              </div>
              <p>Follow</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
