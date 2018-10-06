import React, { Component } from "react";
import { getClass } from "../../actions/classroomActions";
import { getQuestion, answerQuestion } from "../../actions/questionActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class MyClassroom extends Component {
  constructor() {
    super();
    this.state = {
      student: {
        name: "",
        email: ""
      },
      responsebody: "",
      correctness: false
    };
    this.onChange = this.onChange.bind(this);
    this.onAnswerChange = this.onAnswerChange.bind(this);
    this.enabled = true;
  }
  componentDidMount() {
    this.props.getClass(this.props.match.params.classroomid);
    this.props.getQuestion(this.props.match.params.classroomid);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onAnswerChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { question } = this.props.questions;
    const responsedata = {};
    responsedata.student = {
      name: this.props.auth.user.name,
      email: this.props.auth.user.email
    };
    responsedata.responsebody = this.state.responsebody;
    if (question.questiontype === "multiple choice") {
      // handle multiple choice logic
      responsedata.correctness =
        this.state.responsebody.trim() === question.correctanswer.trim();
    } else {
      // handle textual response logic
      responsedata.correctness = false;
    }
    this.props.answerQuestion(question._id, responsedata);
    this.enabled = false;
  }
  render() {
    try {
      const { classroom, loading } = this.props.classrooms;
      const { question } = this.props.questions;
      const questionsLoading = this.props.questions.loading;
      let classroomArea, finalClassroomArea;
      if (classroom === null || loading) {
        classroomArea = <h1>Loading</h1>;
      } else if (classroom.noclassroom) {
        classroomArea = <h1>{classroom.noclassroom}</h1>;
      } else {
        if (question == null || questionsLoading) {
          classroomArea = <h1>Question is loading</h1>;
        } else if (classroom.noCurrentQuestion) {
          classroomArea = (
            <div>
              <h1>
                Welcome to <em>{classroom.classtitle}</em>
              </h1>
              <p>{classroom.noCurrentQuestion}</p>
            </div>
          );
        } else {
          // we want an html form where the student can answer the question.
          let header = <h1>{question.questionbody}</h1>;
          if (question.questiontype === "textual response") {
            classroomArea = (
              <div>
                {header}
                <br />
                <input
                  type="text"
                  name="responsebody"
                  value={this.state.responsebody}
                  onChange={this.onChange}
                />
                <input type="submit" disabled={!this.enabled} />
              </div>
            );
          } else {
            let choices = question.answerchoices;
            let choiceArray;
            choiceArray = choices.map(choice => (
              <div>
                <input
                  type="radio"
                  name="responsebody"
                  value={choice}
                  checked={choice === this.state.responsebody}
                  onChange={this.onAnswerChange}
                />
                {choice}
                <br />
              </div>
            ));

            classroomArea = (
              <div>
                {header}
                {choiceArray}
                <input type="submit" disabled={!this.enabled} />
              </div>
            );
          }
          finalClassroomArea = (
            <div>
              <form onSubmit={this.onSubmit.bind(this)}>{classroomArea}</form>
            </div>
          );
        }
      }
      return <div>{finalClassroomArea}</div>;
    } catch (err) {
      this.props.history.push("/myClasses");
    }
  }
}
MyClassroom.propTypes = {
  errors: PropTypes.object.isRequired,
  classrooms: PropTypes.object.isRequired,
  questions: PropTypes.object.isRequired,
  getClass: PropTypes.func.isRequired,
  getQuestion: PropTypes.func.isRequired,
  answerQuestion: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  classrooms: state.classrooms,
  questions: state.questions
});

export default connect(
  mapStateToProps,
  { getClass, getQuestion, answerQuestion }
)(withRouter(MyClassroom));
