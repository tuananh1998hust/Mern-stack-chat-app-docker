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

import { registerUser } from "../actions/userActions";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password, password2 } = this.state;

    const user = { name, email, password, password2 };

    this.props.registerUser(user);

    this.setState({ password: "", password2: "" });
  };

  render() {
    const { name, email, password, password2 } = this.state;
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
            <h2 className="text-center mb-2">Register Chat</h2>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                {msg
                  ? msg.map((item, index) => (
                      <Alert color="danger" key={index}>
                        {item}
                      </Alert>
                    ))
                  : null}
                <Input
                  className="mb-2"
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.onChange}
                  placeholder="Name..."
                />
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
                <Input
                  className="mb-2"
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={this.onChange}
                  placeholder="Confirm Password..."
                />
              </FormGroup>
              <Button outline color="success" block>
                Signup
              </Button>
            </Form>
            <div className="d-flex align-items-center">
              <p className="mb-0 ml-2 p-2">Have Account ?</p>
              <Link to="/">Signin</Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

Register.propTypes = {
  user: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
