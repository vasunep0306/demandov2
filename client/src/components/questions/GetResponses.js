import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getResponseData } from "../../actions/questionActions";

class GetResponses extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getResponseData(this.props.match.params.questionid);
  }
  render() {
    const { responsedata, loading } = this.props.questions;
    let responseField;
    if (loading || responsedata === null) {
      responseField = <h1> Loading </h1>;
    } else if (!loading && responsedata === null) {
      responseField = <h1> Question probably not published </h1>;
    } else {
      responseField = responsedata.map(response => {
        <tr>
          <td>{response.student.name}</td>
          <td>{response.student.email}</td>
          <td>{response.responsebody}</td>
          <td>{response.correctness}</td>
        </tr>;
      });
    }
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Student Name</th>
              <th scope="col">Student Email</th>
              <th scope="col">Response Body</th>
              <th scope="col">Correctness</th>
            </tr>
          </thead>
          <tbody>{responseField}</tbody>
        </table>
      </div>
    );
  }
}

//TODO: Insert PropTypes here
GetResponses.propTypes = {
  getResponseData: PropTypes.func.isRequired,
  responsedata: PropTypes.array.isRequired
};

//TODO: Insert mapStateToProps here
const mapStateToProps = state => ({
  auth: state.auth,
  responsedata: state.responsedata
});

export default connect(
  mapStateToProps,
  { getResponseData }
)(withRouter(GetResponses));
