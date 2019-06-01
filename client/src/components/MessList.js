import React, { Component } from "react";
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
      <div>
        {loading ? (
          <Spinner style={{ width: "3rem", height: "3rem" }} />
        ) : user && chatWithUser ? (
          messList
            .filter(mess => {
              return (
                (mess.from === user._id && mess.to === chatWithUser._id) ||
                (mess.from === chatWithUser._id && mess.to === user._id)
              );
            })
            .map(mess => (
              <div key={mess._id}>
                <p className="user-name mb-0 ml-5" style={{ marginLeft: "50" }}>
                  {mess.from === user._id ? user.name : chatWithUser.name}
                </p>
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
                  <p className="mb-0 ml-3">{mess.mess}</p>
                </div>
              </div>
            ))
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
