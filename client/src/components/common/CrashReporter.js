import React, { Component } from "react";
import PropTypes from "prop-types";
import { sendErrorReport } from "../../actions/crashActions";
import { withRouter } from "react-router-dom";

class CrashReporter extends Component {
  constructor(props) {
    super(props);
  }

  sendReport() {
    if (localStorage.errorObject) {
      this.props.sendErrorReport(localStorage);
    }
  }
  doNotSendReport() {
    alert("in do not send report");
  }

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
          <button
            id="sendreport"
            className="btn btn-success"
            onClick={this.sendReport.bind(this)}
          >
            Send
          </button>

          <button
            className="btn btn-danger"
            onClick={this.doNotSendReport.bind(this)}
          >
            Don't Send
          </button>
        </div>
      </div>
    );
  }
}

CrashReporter.propTypes = {
  sendErrorReport: PropTypes.func.isRequired
};

export default withRouter(CrashReporter);
