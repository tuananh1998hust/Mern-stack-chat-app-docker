import React, { Component } from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Component
import AvatarForm from "../components/AvatarForm";
// Action
import { loadUserList } from "../actions/userActions";

class Profile extends Component {
  componentDidMount() {
    this.props.loadUserList();
  }

  render() {
    const { id } = this.props.match.params;
    const { user } = this.props.user;
    const userCurrent = this.props.user.userList.find(user => user._id === id);

    return (
      <Container>
        <Row>
          <Link to="/home">Back</Link>
        </Row>
        {userCurrent ? (
          <Row className="mt-5">
            <Col sm="6" md={{ size: "2", offset: "3" }}>
              <img src={`${userCurrent.avatar}.png`} alt="avatar" />
            </Col>
            <Col sm="6" md="3">
              <p className="mb-0 p-2">{userCurrent.name}</p>
            </Col>
            <Col sm="12" md="3">
              {user ? user._id === id ? <AvatarForm /> : null : null}
            </Col>
          </Row>
        ) : (
          <Spinner style={{ width: "3rem", height: "3rem" }} />
        )}
      </Container>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  loadUserList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { loadUserList }
)(Profile);
