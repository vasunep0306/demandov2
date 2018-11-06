import React, { Component } from "react";
import {
  getQuestions,
  getQuestion,
  setQuestion,
  unsetQuestion,
  deleteQuestion,
  clearResponses
} from "../../actions/questionActions";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

class DisplayQuestions extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getQuestions(this.props.match.params.classroomid);
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
    const { questions, loading } = this.props.questions;
    const cardStyle = {
      width: "18rem"
    };

    let questionsField, currQuestionMarker;
    currQuestionMarker = "";
    if (loading || questions === null) {
      questionsField = <h1> Loading </h1>;
    } else if (!loading && questions === null) {
      questionsField = <h1> Please add questions </h1>;
    } else {
      questionsField = questions.map(question => (
        <div key={question._id} className="card" style={{ cardStyle }}>
          {(() => {
            if (question.isCurrentQuestion) {
              currQuestionMarker = (
                <span className="currentquestion">Current Question</span>
              );
            } else {
              currQuestionMarker = "";
            }
            return currQuestionMarker;
          })()}

          <p>{question.questionbody}</p>
          {(() => {
            let field;
            switch (question.questiontype) {
              case "multiple choice":
                field = question.answerchoices.map((choice, index) => (
                  <ul key={index}>
                    <li>
                      <input type="radio" id={choice} name="answerchoice" />
                      {choice}
                    </li>
                  </ul>
                ));
                return <div>{field}</div>;
              default:
                return;
            }
          })()}
          <button
            className="setQuestionBtn sanesize btn btn-info"
            onClick={this.setQuestion.bind(this, question)}
          >
            Publish Question
          </button>
          <br />
          <button
            className="card-link hideQuestionBtn sanesize btn btn-success"
            onClick={this.hideQuestion.bind(this, question)}
          >
            Hide Question
          </button>
          <br />
          <button
            className="card-link hideQuestionBtn btn btn-danger sanesize"
            onClick={this.deleteQuestion.bind(this, question)}
          >
            Delete Question
          </button>
          <br />
          <button
            onClick={this.clearAllResponses.bind(this, question)}
            className="btn btn-danger"
          >
            Clear Responses
          </button>
          <Link
            to={`/${this.props.match.params.classroomid}/questions/${
              question._id
            }/getresponses`}
          >
            Get Responses
          </Link>
        </div>
      ));
    }

    return (
      <div className="card">
        {questionsField}
        <Link
          to={`/${
            this.props.match.params.classroomid
          }/questions/createQuestion`}
        >
          Add New Question
        </Link>
        <Link to={`/displayClasses`}>Back To CourseList</Link>
      </div>
    );
  }
}

DisplayQuestions.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  getQuestion: PropTypes.func.isRequired,
  unsetQuestion: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  clearResponses: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  questions: state.questions
});

export default connect(
  mapStateToProps,
  {
    getQuestions,
    getQuestion,
    setQuestion,
    unsetQuestion,
    deleteQuestion,
    clearResponses
  }
)(withRouter(DisplayQuestions));
