import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

class QuestionList extends Component {
  render() {
    return <div />;
  }
}

QuestionList.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  questions: state.questions
});

export default connect(
  mapStateToProps,
  { getQuestions }
)(withRouter(QuestionList));
