import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadMessages } from "../actions/messActions";

class MessList extends Component {
  componentDidMount() {
    this.props.loadMessages();
  }

  render() {
    const { messList, loading } = this.props.message;
    const { user, chatWithUser } = this.props.user;
    return (
      <div style={{ overflow: "auto", height: "80vh" }}>
        {loading ? (
          <Spinner style={{ width: "3rem", height: "3rem" }} />
        ) : user && chatWithUser ? (
          <div>
            <Link
              className="chat-header text-center"
              to={`/profile/${chatWithUser._id}`}
              style={{
                fontSize: "28px",
                fontWeight: "600",
                color: "#000",
                marginBottom: "25px",
                padding: "10px",
                borderBottom: "1px solid #DDD",
                backgroundColor: "#88C2DE",
                display: "block"
              }}
            >
              {chatWithUser.name}
            </Link>
            {messList
              .filter(mess => {
                return (
                  (mess.from === user._id && mess.to === chatWithUser._id) ||
                  (mess.from === chatWithUser._id && mess.to === user._id)
                );
              })
              .map(mess => (
                <div key={mess._id}>
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={
                        mess.from === user._id
                          ? `${user.avatar}.png`
                          : `${chatWithUser.avatar}.png`
                      }
                      alt="avatar"
                      width="48"
                      height="48"
                    />
                    <p
                      className="mb-0 ml-3"
                      style={{
                        padding: "5px 10px",
                        borderRadius: "20px",
                        backgroundColor:
                          mess.from === user._id ? "#DDD" : "#88C2DE"
                      }}
                    >
                      {mess.mess}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        ) : null}
      </div>
    );
  }
}

MessList.propTypes = {
  user: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  message: state.message
});

export default connect(
  mapStateToProps,
  { loadMessages }
)(MessList);
