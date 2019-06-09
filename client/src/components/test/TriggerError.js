import React, { Component } from "react";

export default class TriggerError extends Component {
  triggerError() {
    throw 500;
  }
  render() {
    return (
      <div>
        <div className="container">
          <button
            className="btn btn-warning"
            onClick={this.triggerError.bind(this)}
          >
            Trigger Unhandled Divide By Zero
          </button>
        </div>
      </div>
    );
  }
}
