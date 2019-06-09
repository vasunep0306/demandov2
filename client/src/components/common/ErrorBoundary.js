import React, { Component } from "react";
import CrashReporter from "./CrashReporter";

export default class ErrorBoundary extends Component {
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
      return <CrashReporter errorObject={this.state} />;
    }
    return this.props.children;
  }
}
