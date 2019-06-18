import React, { Component } from "react";
import {
  getQuestion,
  setQuestion,
  unsetQuestion,
  deleteQuestion,
  clearResponses
} from "../../actions/questionActions";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

class QuestionPage extends Component {
  componentDidMount() {
    this.props.getQuestion(this.props.match.params.questionid);
  }

  render() {
    return <div />;
  }
}

DisplayQuestions.propTypes = {
  getQuestion: PropTypes.func.isRequired,
  unsetQuestion: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  clearResponses: PropTypes.func.isRequired,
  question: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  questions: state.questions
});

export default connect(
  mapStateToProps,
  {
    getQuestion,
    setQuestion,
    unsetQuestion,
    deleteQuestion,
    clearResponses
  }
)(withRouter(QuestionPage));
