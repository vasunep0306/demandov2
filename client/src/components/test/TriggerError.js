import React, { Component } from "react";

export default class TriggerError extends Component {
  render() {
    var status = true;
    if (status) {
      throw new Error("400");
    }
    return (
      <div>
        <div className="container">Trigger Unhandled Divide By Zero</div>
      </div>
    );
  }
}
