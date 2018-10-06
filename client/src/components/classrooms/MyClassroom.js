import React, { Component } from "react";
import { getClass } from "../../actions/classroomActions";
import { getQuestion } from "../../actions/questionActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class MyClassroom extends Component {
  componentDidMount() {
    this.props.getClass(this.props.match.params.classroomid);
    this.props.getQuestion(this.props.match.params.classroomid);
  }
  onSubmit(e) {
    e.preventDefault();
    /*
    {
      student: {
        name: {
          type: String
        },
        email: {
          type: String
        }
      },
      responsebody: {
        type: String,
        required: true
      },
      correctness: {
        type: Boolean,
        default: false
      }
    }
    */
    const response = {};
    response.student = {
      name: this.state.name,
      email: this.state.email
    };
    response.body = this.state.responsebody;
    if (question.questiontype === "multiple choice") {
      // handle multiple choice logic
      response.correctness = this.state.responsebody === question.correctanswer;
    } else {
      // handle textual response logic
      response.correctness = false;
    }
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
        } else if (question.noCurrentQuestion) {
          classroomArea = (
            <div>
              <h1>
                Welcome to <em>{classroom.classtitle}</em>
              </h1>
              <p>{question.noCurrentQuestion}</p>
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
                <input type="text" name="responsebody" />
                <input type="submit" />
              </div>
            );
          } else {
            let choices = question.answerchoices;
            let choiceArray;
            choiceArray = choices.map(choice => (
              <div>
                <input type="radio" name="responsebody" value={choice} />
                {choice}
                <br />
              </div>
            ));

            classroomArea = (
              <div>
                {header}
                {choiceArray}
                <input type="submit" />
              </div>
            );
          }
          finalClassroomArea = (
            <div>
              <form onSubmit={this.onSubmit.bind(this, question)}>
                {classroomArea}
              </form>
            </div>
          );
        }
      }
      return <div>{classroomArea}</div>;
    } catch (err) {
      alert(err);
    }
  }
}
MyClassroom.propTypes = {
  errors: PropTypes.object.isRequired,
  classrooms: PropTypes.object.isRequired,
  questions: PropTypes.object.isRequired,
  getClass: PropTypes.func.isRequired,
  getQuestion: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  classrooms: state.classrooms,
  questions: state.questions
});

export default connect(
  mapStateToProps,
  { getClass, getQuestion }
)(withRouter(MyClassroom));
