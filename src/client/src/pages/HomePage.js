import React from "react";
import { Col, Row } from "reactstrap";

// Components
import UserList from "../components/UserList";
import ChatComponent from "../components/ChatComponent";

const HomePage = () => (
  <Row style={{ height: "100vh" }}>
    <Col
      sm="12"
      md="3"
      style={{
        padding: "0px",
        paddingLeft: "25px",
        borderRight: "1px solid #DDD"
      }}
    >
      <UserList />
    </Col>
    <Col
      sm="12"
      md="9"
      style={{
        padding: "0px"
      }}
    >
      <ChatComponent />
    </Col>
  </Row>
);

export default HomePage;
