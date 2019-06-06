import React from "react";
import { Link } from "react-router-dom";

// Imgs
import setting from "../imgs/settings.png";

const MessHeader = ({ user }) => (
  <div
    className="mess-header d-flex align-items-center justify-content-between mt-3 mb-3 pb-3"
    style={{
      borderBottom: "1px solid #DDD"
    }}
  >
    <Link className="setting" to={`/profile/${user._id}`}>
      <img alt="setting" src={setting} width="32" height="32" />
    </Link>
    <p
      className="head-name text-center mb-0"
      style={{
        fontSize: "24px",
        fontWeight: "600"
      }}
    >
      Messenger
    </p>
    <p className="empty" />
  </div>
);

export default MessHeader;
