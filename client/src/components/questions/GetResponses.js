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
    console.log(this.props);
    const { responsedata, loading } = this.props;
    let responseField;

    if (loading || responsedata === null) {
      responseField = <h1> Loading </h1>;
    } else if (responsedata.noResponses) {
      responseField = <h1>{responsedata.noResponses}</h1>;
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
        <Link to={`/${this.props.match.params.questionid}/questions`}>
          Go back to questions list
        </Link>
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
  responsedata: state.questions.responsedata
});

export default connect(
  mapStateToProps,
  { getResponseData }
)(withRouter(GetResponses));
