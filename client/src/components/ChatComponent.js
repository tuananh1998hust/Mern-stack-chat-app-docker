import React, { Component } from "react";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import MessList from "./MessList";
import ChatHeader from "./ChatHeader";
import ChatForm from "./ChatForm";
// Actions
import { loadMessages } from "../actions/messActions";

class ChatComponent extends Component {
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
          <div>
            <ChatHeader chatWithUser={chatWithUser} />
            <MessList
              user={user}
              chatWithUser={chatWithUser}
              messList={messList}
            />
            {chatWithUser ? <ChatForm /> : null}
          </div>
        ) : null}
      </div>
    );
  }
}

ChatComponent.propTypes = {
  user: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  loadMessages: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  message: state.message
});

export default connect(
  mapStateToProps,
  { loadMessages }
)(ChatComponent);
