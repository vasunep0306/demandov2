import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getResponseData } from "../../actions/questionActions";

class GetResponses extends Component {
  componentDidMount() {
    this.props.getResponseData(this.props.match.params.questionid);
  }
  render() {
    const { responsedata, loading } = this.props.questions;
    console.log(responsedata, loading);
    let responseField;

    if (loading || !responsedata) {
      console.log(17);
      responseField = (
        <div>
          <h1> Loading </h1>
        </div>
      );
    } else if (!loading && !responsedata) {
      console.log(24);
      responseField = (
        <div>
          <h1> Loading </h1>
        </div>
      );
    } else if (responsedata.noResponses) {
      responseField = (
        <div>
          <h1>{responsedata.noResponses}</h1>
        </div>
      );
    } else {
      console.log(37);
      responseField = responsedata.map(response => (
        <tr>
          {console.log(response.student.name)}
          <td>{response.student.name}</td>
          <td>{response.student.email}</td>
          <td>{response.responsebody}</td>
          <td>
            {response.correctness ? (
              <span>Correct</span>
            ) : (
              <span>Incorrect</span>
            )}
          </td>
        </tr>
      ));
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
        <Link to={`/${this.props.match.params.classroomid}/questions`}>
          Go back to questions list
        </Link>
      </div>
    );
  }
}

//TODO: Insert PropTypes here
GetResponses.propTypes = {
  getResponseData: PropTypes.func.isRequired,
  questions: PropTypes.object.isRequired
};

//TODO: Insert mapStateToProps here
const mapStateToProps = state => ({
  auth: state.auth,
  questions: state.questions,
  responsedata: state.questions.responsedata
});

export default connect(
  mapStateToProps,
  { getResponseData }
)(withRouter(GetResponses));
