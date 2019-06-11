import React, { Component } from "react";
import { Form, Input } from "reactstrap";
import io from "socket.io-client";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { sendMessage } from "../actions/messActions";

class ChatForm extends Component {
  constructor() {
    super();
    this.state = {
      mess: ""
    };

    this.socket = io("http://localhost:5000");
    this.socket.on("send-mess", newMess => this.onSocket(newMess));
  }

  onChange = e => {
    this.setState({ mess: e.target.value });
  };

  onKeyUp = e => {
    const { mess } = this.state;
    const { user, chatWithUser } = this.props.user;

    if (e.keyCode === 13) {
      const newMess = {
        from: user._id,
        to: chatWithUser._id,
        mess
      };

      this.socket.emit("send-mess", newMess);

      this.setState({ mess: "" });
    }
  };

  onSocket = newMess => {
    this.props.sendMessage(newMess);
  };

  render() {
    const { mess } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Input
          type="textarea"
          placeholder="Add New Messages..."
          value={mess}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
        />
      </Form>
    );
  }
}

ChatForm.propTypes = {
  user: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { sendMessage }
)(ChatForm);
