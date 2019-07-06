import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addQuestion } from "../../actions/questionActions";
import { withRouter, Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class CreateQuestion extends Component {
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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
        : "",
      answerchoicesnotcsv = !isEmpty(errors.answerchoicesnotcsv)
        ? errors.answerchoicesnotcsv
        : "";
    return (
      <div className="container">
        <br />
        <div className="card">
          <h5 className="card-header bg-dark text-white">New Question</h5>
          <div className="card-body">
            <h5 className="card-title">Please Create A Question</h5>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="questiontype">Question Type: </label>
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
                <label htmlFor="questionbody">Question Body: </label>
                <input
                  type="text"
                  className="form-control"
                  name="questionbody"
                  value={this.state.questionbody}
                  onChange={this.onChange}
                />
                <span className="errorMsg">{questionbody}</span>
              </div>
              <div className="form-group">
                <label htmlFor="correctanswer">Expected Answer: </label>
                <input
                  type="text"
                  className="form-control"
                  name="correctanswer"
                  value={this.state.correctanswer}
                  onChange={this.onChange}
                />
                <span className="errorMsg">{correctanswer}</span>
              </div>
              {this.state.questiontype === "multiple choice" ? (
                <div className="form-group">
                  <label htmlFor="answerchoices">
                    Remaining choices(comma separated list of strings):
                  </label>
                  <input
                    type="text"
                    name="answerchoices"
                    className="form-control"
                    value={this.state.answerchoices}
                    onChange={this.onChange}
                  />
                  <span className="errorMsg">{answerchoices}</span>
                  <span className="errorMsg">{answerchoicesnotcsv}</span>
                </div>
              ) : (
                <p />
              )}
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-success"
                  value="Create Question"
                />
              </div>
            </form>
            <Link to={`/${this.props.match.params.classroomid}/questions`}>
              <span>
                <i className="fas fa-backward" />
              </span>{" "}
              Go Back To List Of Questions
            </Link>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

CreateQuestion.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classroomid: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addQuestion }
)(withRouter(CreateQuestion));
