import React, { Component } from "react";
import {
  getQuestionById,
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
    this.props.getQuestionById(this.props.match.params.questionid);
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

  clearAllResponses(question) {
    let finalconfirmation = window.confirm(
      "Are you sure you want to clear all responses? This action is irreversable"
    );
    if (finalconfirmation) {
      this.props.clearResponses(question._id);
    }
  }

  render() {
    const { question, loading } = this.props.questions;
    console.log(this.props);
    let questionField;
    if (loading || question === null) {
      questionField = <h1> Loading </h1>;
    } else if (!loading && question === null) {
      questionField = <h1> Please add questions </h1>;
    } else {
      let linksField = (
        <div>
          <span className="buttonfield">
            <button
              className="btn btn-success"
              onClick={this.setQuestion.bind(this, question)}
            >
              Publish Question
            </button>
          </span>
          <span className="buttonfield">
            <button
              className="btn btn-secondary"
              onClick={this.hideQuestion.bind(this, question)}
            >
              Hide Question
            </button>
          </span>
          <span className="buttonfield">
            <Link
              to={`/${this.props.match.params.classroomid}/${
                question._id
              }/editQuestion`}
              className="btn btn-light"
            >
              Edit Question
            </Link>
          </span>
          <span className="buttonfield">
            <Link
              to={`/${this.props.match.params.classroomid}/questions/${
                question._id
              }/getresponses`}
              className="btn btn-info"
            >
              See Responses
            </Link>
          </span>
          <span className="buttonfield">
            <button
              className="btn btn-warning"
              onClick={this.clearAllResponses.bind(this, question)}
            >
              Clear Responses
            </button>
          </span>
          <span className="buttonfield">
            <button
              className="btn btn-danger"
              onClick={this.deleteQuestion.bind(this, question)}
            >
              Delete Question
            </button>
          </span>
        </div>
      );
      if (question.questiontype === "multiple choice") {
        let answerField = question.answerchoices.map(answer => (
          <div>
            <li>{answer}</li>
            <br />
          </div>
        ));
        questionField = (
          <div className="container">
            <br />
            <div className="jumbotron">
              <h1>{question.questionbody}</h1>
              <h3>{question.correctanswer}</h3>
              <ol>{answerField}</ol>
              {linksField}
              <br />
              <br />
              <Link to={`/${this.props.match.params.classroomid}/questions`}>
                Back To Questions List
              </Link>
            </div>
          </div>
        );
      } else {
        questionField = (
          <div className="container">
            <br />
            <div className="jumbotron">
              <h1>{question.questionbody}</h1>
              <h3>{question.correctanswer}</h3>
              {linksField}
              <br />
              <br />
              <Link to={`/${this.props.match.params.classroomid}/questions`}>
                Back To Questions List
              </Link>
            </div>
          </div>
        );
      }
    }
    return <div>{questionField}</div>;
  }
}

QuestionPage.propTypes = {
  getQuestionById: PropTypes.func.isRequired,
  getClass: PropTypes.func.isRequired,
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
    getQuestionById,
    setQuestion,
    unsetQuestion,
    deleteQuestion,
    clearResponses
  }
)(withRouter(QuestionPage));
