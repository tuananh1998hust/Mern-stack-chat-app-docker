import React, { Component } from "react";
import { Container, Col, Row } from "reactstrap";

// Components
import UserList from "../components/UserList";
import ChatForm from "../components/ChatForm";
import MessList from "../components/MessList";

class HomePage extends Component {
  render() {
    return (
      <Container>
        <Row style={{ height: "100vh", position: "relative" }}>
          <Col sm="12" md="3">
            <UserList />
          </Col>
          <Col sm="12" md="9">
            <MessList />
            <ChatForm
              style={{ position: "absolute", bottom: "15px", width: "100%" }}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HomePage;
