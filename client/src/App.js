import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={HomePage} />
        </div>
      </Router>
    );
  }
}

export default App;
