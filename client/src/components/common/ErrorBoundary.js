import React, { Component } from "react";
import CrashReporter from "./CrashReporter";
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
      console.log("true");
      return <CrashReporter errorObject={this.state} />;
    }
    console.log("false");
    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
