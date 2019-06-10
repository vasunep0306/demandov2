import React, { Component } from "react";
import CrashReporter from "./CrashReporter";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }
  render() {
    if (this.state.errorInfo) {
      localStorage.setItem("errorObject", this.state);
      return <Redirect to="/crashed" />;
    }
    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
