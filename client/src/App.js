import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import { loadUser } from "./actions/userActions";

// Pages
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";

const PrivateRoute = ({ component: Component, token, ...rest }) => (
  <Route
    {...rest}
    render={props => (!token ? <Redirect to="/" /> : <Component {...props} />)}
  />
);

class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    const { token } = this.props.user;

    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute path="/home" exact component={HomePage} token={token} />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { loadUser }
)(App);
