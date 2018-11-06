import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getQuestionById } from "../../actions/questionActions";
import { withRouter, Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class EditQuestion extends Component {
  constructor() {
    super();
    this.state = {
      questiontype: "",
      questionbody: "",
      correctanswer: "",
      answerchoices: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getQuestionById(this.props.match.params.questionid);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.question.question) {
      const question = nextProps.question.question;
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const classroomid = this.props.match.params.classroomid;
    const newQuestion = {
      questiontype: this.state.questiontype,
      questionbody: this.state.questionbody,
      correctanswer: this.state.correctanswer
    };
    if (this.state.questiontype === "textual response") {
      newQuestion.answerchoices = "Not Applicable";
    } else {
      newQuestion.answerchoices = this.state.answerchoices;
    }
    this.props.addQuestion(classroomid, newQuestion, this.props.history);
  }
  render() {
    let { errors } = this.state;
    let questiontype = !isEmpty(errors.questiontype) ? errors.questiontype : "",
      questionbody = !isEmpty(errors.questionbody) ? errors.questionbody : "",
      correctanswer = !isEmpty(errors.correctanswer)
        ? errors.correctanswer
        : "",
      answerchoices = !isEmpty(errors.answerchoices)
        ? errors.answerchoices
        : "";
    return (
      <div>
        <Link to={`/${this.props.match.params.classroomid}/questions`}>
          Go Back To List
        </Link>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label for="questiontype">Question Type: </label>
            <select
              name="questiontype"
              className="form-control"
              value={this.state.questiontype}
              onChange={this.onChange}
            >
              <option>*Please select question type</option>
              <option value="multiple choice"> Multiple Choice </option>
              <option value="textual response"> Textual Response </option>
            </select>
            <span className="errorMsg">{questiontype}</span>
          </div>

          <div className="form-group">
            <label for="questionbody">Question Body: </label>
            <input
              type="text"
              className="classinputx form-control"
              name="questionbody"
              value={this.state.questionbody}
              onChange={this.onChange}
            />
            <span className="errorMsg">{questionbody}</span>
          </div>

          <div className="form-group">
            <label for="correctanswer">Expected Answer: </label>
            <input
              type="text"
              className="classinputy form-control"
              name="correctanswer"
              value={this.state.correctanswer}
              onChange={this.onChange}
            />
            <span className="errorMsg">{correctanswer}</span>
          </div>
          {this.state.questiontype === "multiple choice" ? (
            <div className="form-group">
              <label for="answerchoices">Remaining choices: </label>
              <input
                type="text"
                name="answerchoices"
                className="classinputx form-control"
                value={this.state.answerchoices}
                onChange={this.onChange}
              />
              <span className="errorMsg">{answerchoices}</span>
            </div>
          ) : (
            <p />
          )}
          <input
            className="btn btn-success"
            type="submit"
            value="Create Question"
          />
        </form>
      </div>
    );
  }
}

EditQuestion.propTypes = {
  getQuestionById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getQuestionById }
)(withRouter(EditQuestion));
