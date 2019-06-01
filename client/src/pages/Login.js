import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Alert,
  Button,
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  Row
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loginUser } from "../actions/userActions";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = { email, password };

    this.props.loginUser(user);

    this.setState({ password: "" });
  };

  render() {
    const { email, password } = this.state;
    const { msg } = this.props.user;
    const token = localStorage.getItem("token");

    if (token) {
      return <Redirect to="/home" />;
    }

    return (
      <Container>
        <Row>
          <Col
            style={{
              marginTop: "50px",
              padding: "75px 25px",
              border: "1px solid #DDD",
              borderRadius: "5px"
            }}
            sm="12"
            md={{ size: 4, offset: 7 }}
          >
            <h2 className="text-center mb-2">Login Chat</h2>
            <Form onSubmit={this.onSubmit}>
              {msg
                ? msg.map((item, index) => (
                    <Alert color="danger" key={index}>
                      {item}
                    </Alert>
                  ))
                : null}
              <FormGroup>
                <Input
                  className="mb-2"
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  placeholder="Email..."
                />
                <Input
                  className="mb-2"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  placeholder="Password..."
                />
              </FormGroup>
              <Button outline color="success" block>
                Signin
              </Button>
            </Form>
            <div className="d-flex align-items-center">
              <p className="mb-0 ml-2 p-2">Don't Have Account ?</p>
              <Link to="/register">Signup</Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
