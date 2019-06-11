import React from "react";

const ChatHeader = ({ chatWithUser }) => (
  <div
    className="mt-3 mb-3 pb-3"
    style={{
      borderBottom: "1px solid #DDD"
    }}
  >
    <p
      className="text-center mb-0"
      style={{
        fontSize: "24px"
      }}
    >
      {chatWithUser.name}
    </p>
  </div>
);

export default ChatHeader;
