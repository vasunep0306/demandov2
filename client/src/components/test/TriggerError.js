import React, { Component } from "react";

export default class TriggerError extends Component {
  triggerError() {
    alert(5 / 0);
  }
  render() {
    return (
      <div>
        <div className="container">
          <button>Trigger Unhandled Divide By Zero</button>
        </div>
      </div>
    );
  }
}
