import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getQuestions } from "../../actions/questionActions";
import { getClass } from "../../actions/classroomActions";

class QuestionList extends Component {
  componentDidMount() {
    this.props.getQuestions(this.props.match.params.classroomid);
    this.props.getClass(this.props.match.params.classroomid);
  }
  render() {
    const { questions, loading } = this.props.questions;
    const { classroom } = this.props.classrooms;
    let questionsField;
    let classTitle;
    if (classroom === null || loading) {
      classTitle = "extracting class...";
    } else if (loading || questions === null) {
      classTitle = "extracting class...";
      questionsField = <h1> Loading </h1>;
    } else if (!loading && questions === null) {
      classTitle = classroom.classtitle;
      questionsField = <h1> Please add questions </h1>;
    } else {
      classTitle = classroom.classtitle;
      questionsField = questions.map(question => (
        <tr>
          <td>{question.questiontype}</td>
          <td>{question.questionbody}</td>
          <td>{question.correctanswer}</td>
          <td>{question.isCurrentQuestion ? "True" : "False"}</td>
          <td>
            <Link to={`/${question._id}/manageQuestion`}>Manage Question</Link>
          </td>
        </tr>
      ));
    }

    return (
      <div>
        <div className="container">
          <br />
          <h2>Questions For {classTitle}</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Question Type</th>
                <th>Question Body</th>
                <th>Correct Answer</th>
                <th>Is Current Question</th>
                <th>More Actions</th>
              </tr>
            </thead>
            <tbody>{questionsField}</tbody>
          </table>
          <Link
            to={`/${
              this.props.match.params.classroomid
            }/questions/createQuestion`}
            className="btn btn-info"
          >
            Create A Question
          </Link>
        </div>
      </div>
    );
  }
}

QuestionList.propTypes = {
  classroom: PropTypes.object.isRequired,
  getQuestions: PropTypes.func.isRequired,
  getClass: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  questions: state.questions,
  classrooms: state.classrooms
});

export default connect(
  mapStateToProps,
  { getQuestions, getClass }
)(withRouter(QuestionList));
