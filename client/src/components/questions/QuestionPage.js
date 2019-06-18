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

  setQuestion(question) {
    this.props.setQuestion(this.props.match.params.classroomid, question._id);
    alert("successfully set question");
  }

  hideQuestion(question) {
    this.props.unsetQuestion(this.props.match.params.classroomid, question._id);
    alert("successfully hid question from students");
  }

  deleteQuestion(question) {
    let classroomid = this.props.match.params.classroomid;
    let questionid = question._id;
    let finalconfirmation = window.confirm(
      "Are you sure you want to delete this question? The process is irreversabe"
    );
    if (finalconfirmation) {
      this.props.deleteQuestion(classroomid, questionid);
      alert("Your question has been deleted");
      window.location.reload(true);
    } else {
      alert("you decided to keep your question");
    }
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
