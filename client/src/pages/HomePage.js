import React, { Component } from "react";
import { Container, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import UserList from "../components/UserList";
import ChatForm from "../components/ChatForm";
import MessList from "../components/MessList";

class HomePage extends Component {
  render() {
    const { chatWithUser } = this.props.user;

    return (
      <Container>
        <Row style={{ height: "100vh", position: "relative" }}>
          <Col sm="12" md="3">
            <UserList />
          </Col>
          <Col sm="12" md="9">
            <MessList />
            {chatWithUser ? (
              <ChatForm
                style={{ position: "absolute", bottom: "15px", width: "100%" }}
              />
            ) : null}
          </Col>
        </Row>
      </Container>
    );
  }
}

HomePage.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  null
)(HomePage);
