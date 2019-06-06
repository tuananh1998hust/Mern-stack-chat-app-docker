import React, { Component } from "react";

class MessList extends Component {
  render() {
    const { messList, user, chatWithUser } = this.props;

    return (
      <div
        style={{
          overflow: "auto",
          height: "75vh",
          width: "100%",
          padding: "20px"
        }}
      >
        {messList
          .filter(mess => {
            return (
              (mess.from === user._id && mess.to === chatWithUser._id) ||
              (mess.from === chatWithUser._id && mess.to === user._id)
            );
          })
          .map(mess => {
            if (mess.from === user._id) {
              return (
                <div className="d-flex align-items-center mb-3" key={mess._id}>
                  <img src={user.avatar} alt="avatar" width="48" height="48" />
                  <p
                    className="mb-0 ml-3"
                    style={{
                      maxWidth: "50%",
                      padding: "5px 10px",
                      borderRadius: "20px",
                      backgroundColor: "#DDD",
                      wordWrap: "break-word"
                    }}
                  >
                    {mess.mess}
                  </p>
                </div>
              );
            } else {
              return (
                <div
                  className="d-flex flex-row-reverse align-items-center mb-3"
                  key={mess._id}
                >
                  <img
                    src={chatWithUser.avatar}
                    alt="avatar"
                    width="48"
                    height="48"
                  />

                  <p
                    className="mb-0 mr-3"
                    style={{
                      maxWidth: "50%",
                      padding: "5px 10px",
                      borderRadius: "20px",
                      backgroundColor: "#88C2DE",
                      wordWrap: "break-word"
                    }}
                  >
                    {mess.mess}
                  </p>
                </div>
              );
            }
          })}
      </div>
    );
  }
}

export default MessList;
