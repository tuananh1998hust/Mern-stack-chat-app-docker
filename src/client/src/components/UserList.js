import React, { Component } from "react";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import MessHeader from "./MessHeader";
// Actions
import { loadUserList, setChatWithUser } from "../actions/userActions";

class UserList extends Component {
  componentDidMount() {
    this.props.loadUserList();
  }

  onClick = id => {
    this.props.setChatWithUser(id);
  };

  render() {
    const { userList, user } = this.props.user;

    return (
      <div>
        {userList && user ? (
          <div>
            <MessHeader user={user} />
            {userList
              .filter(userItem => userItem._id !== user._id)
              .map(userItem => (
                <div
                  className="d-flex align-items-center mb-3 p-3"
                  key={userItem._id}
                  style={{ borderBottom: "1px solid #DDD" }}
                  onClick={this.onClick.bind(this, userItem._id)}
                >
                  <img
                    width="48"
                    height="48"
                    src={userItem.avatar}
                    alt="avatar"
                    className="border-rounded-circle"
                  />
                  <p className="mb-0 ml-2 p-2">{userItem.name}</p>
                </div>
              ))}
          </div>
        ) : (
          <Spinner style={{ width: "3rem", height: "3rem" }} />
        )}
      </div>
    );
  }
}

UserList.propTypes = {
  user: PropTypes.object.isRequired,
  loadUserList: PropTypes.func.isRequired,
  setChatWithUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { loadUserList, setChatWithUser }
)(UserList);
