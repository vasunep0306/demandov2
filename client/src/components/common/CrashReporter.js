import React, { Component } from "react";

class CrashReporter extends Component {
  render() {
    return (
      <div className="error_page_container">
        <div className="error_page">
          <h1 className="error_title">Error 505</h1>
          <h1>Demando has stopped working</h1>
          <h3>
            An undexpected error has occured. Would you like to report this?
          </h3>
          <br />
          <button id="sendreport" className="btn btn-success">
            Send
          </button>

          <button value="Don't Send" className="btn btn-danger">
            Don't Send
          </button>
        </div>
      </div>
    );
  }
}

export default CrashReporter;
