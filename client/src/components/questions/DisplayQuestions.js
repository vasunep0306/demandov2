import React, { Component } from "react";
import { getQuestions } from "../../actions/questionActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class DisplayQuestions extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getQuestions(this.props.match.params.classroomid);
  }
  setQuestion(question) {
    if (!!localStorage.question) {
      this.unsetQuestion();
    }
    localStorage.question = JSON.stringify(question);
    alert("successfully set question");
  }
  unsetQuestion() {
    localStorage.question = null;
  }

  render() {
    const { questions, loading } = this.props.questions;
    const cardStyle = {
      width: "18rem"
    };

    let questionsField;
    if (loading || questions === null) {
      questionsField = <h1> Loading </h1>;
    } else if (!loading && questions === null) {
      questionsField = <h1> Nothing found </h1>;
    } else {
      questionsField = questions.map(question => (
        <div key={question._id} className="card" style={{ cardStyle }}>
          <p>{question.questionbody}</p>
          {(() => {
            let field;
            switch (question.questiontype) {
              case "multiple choice":
                field = question.answerchoices.map((choice, index) => (
                  <ul key={index}>
                    <li> {choice} </li>
                  </ul>
                ));
                return <div>{field}</div>;
              default:
                return;
            }
          })()}
          <button onClick={this.setQuestion.bind(this, question)}>
            Publish Question
          </button>
          <br />
          <button onClick={this.unsetQuestion}>Hide Question</button>
        </div>
      ));
    }

    return <div>{questionsField}</div>;
  }
}

DisplayQuestions.propTypes = {
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
)(withRouter(DisplayQuestions));
