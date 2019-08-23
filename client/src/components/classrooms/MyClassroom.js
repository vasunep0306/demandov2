import React, { Component } from "react";
import { getClass } from "../../actions/classroomActions";
import { getQuestion, answerQuestion } from "../../actions/questionActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";

class MyClassroom extends Component {
  constructor() {
    super();
    this.state = {
      responsebody: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onAnswerChange = this.onAnswerChange.bind(this);
    this.enabled = true;
  }
  componentDidMount() {
    this.props.getClass(this.props.match.params.classroomid);
    this.props.getQuestion(this.props.match.params.classroomid);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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
        this.state.responsebody.trim() == question.correctanswer.trim();
      alert(responsedata.correctness);
    }
    this.props.answerQuestion(question._id, responsedata);
    this.enabled = false;
  }
  render() {
    try {
      const { classroom, loading } = this.props.classrooms;
      const { question } = this.props.questions;
      const questionsLoading = this.props.questions.loading;
      let classroomArea, finalClassroomArea, header;
      let errors = this.state.errors;
      if (!isEmpty(errors.alreadyAnswered)) {
        alert(errors.alreadyAnswered);
      }
      if (classroom === null || loading) {
        header = <h2>Loading</h2>;
        classroomArea = <p>Wait for it to load</p>;
      } else if (classroom.noclassroom) {
        header = <h2>No classrooms.</h2>;
        classroomArea = <p>{classroom.noclassroom}</p>;
      } else {
        if (question == null || questionsLoading) {
          header = <h2>Loading</h2>;
          classroomArea = <p>Question is loading</p>;
        } else if (question.noCurrentQuestion) {
          header = <h2>{question.noCurrentQuestion}</h2>;
          classroomArea = <h3>Please check back with your professor</h3>;
        } else {
          // we want an html form where the student can answer the question.
          header = <h2>{question.questionbody}</h2>;
          if (question.questiontype === "textual response") {
            classroomArea = (
              <div>
                <br />
                <textarea
                  class="form-control"
                  name="responsebody"
                  value={this.state.responsebody}
                  onChange={this.onChange}
                />
                <br />
                <input
                  type="submit"
                  disabled={!this.enabled}
                  className="btn btn-success"
                />
              </div>
            );
          } else {
            let choices = question.answerchoices;
            let choiceArray;
            choiceArray = choices.map(choice => (
              <label htmlFor="responsebody" class="radio-inline">
                <input
                  class="radioanswerchoice"
                  type="radio"
                  name="responsebody"
                  value={choice}
                  checked={choice === this.state.responsebody}
                  onChange={this.onAnswerChange}
                />
                <span className="answerchoice">{choice}</span>
              </label>
            ));

            classroomArea = (
              <div className="container">
                {choiceArray}
                <input
                  type="submit"
                  disabled={!this.enabled}
                  className="btn btn-success"
                />
              </div>
            );
          }
        }
        finalClassroomArea = (
          <div className="container">
            <br />
            {header}
            <form onSubmit={this.onSubmit.bind(this)}>{classroomArea}</form>
          </div>
        );
      }
      return <div className="container">{finalClassroomArea}</div>;
    } catch (err) {
      this.props.history.push("/myClasses");
    }
  }
}
MyClassroom.propTypes = {
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
