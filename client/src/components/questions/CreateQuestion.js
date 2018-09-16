import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addQuestion } from "../../actions/questionActions";

class CreateQuestion extends Component {
  /**
   * questiontype: {
    type: String,
    required: true
  },
  questionbody: {
    type: String,
    required: true
  },
  correctanswer: {
    type: String,
    required: true
  },
  answerchoices: {
    type: String,
    required: this.isMultipleChoice
  },
   */
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
      for (let key in nextProps.errors) {
        alert(key + " -> " + nextProps.errors[key]);
      }
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const classroomid = this.props.classroomid;
    const newQuestion = {
      questiontype: this.state.questiontype,
      questionbody: this.state.questionbody,
      correctanswer: this.state.correctanswer
    };
    if (this.state.questiontype === "extended response") {
      newQuestion.answerchoices = "Not Applicable";
    } else {
      newQuestion.answerchoices = this.state.answerchoices;
    }
    this.props.addQuestion(classroomid, newQuestion);
  }
  render() {
    // Might keep or delete this because it doesnt seem to be used anywhere
    const answerChoices = (
      <input
        type="text"
        name="answerchoices"
        value={this.state.questionbody}
        onChange={this.onChange}
      />
    );
    return (
      <form onSubmit={this.onSubmit}>
        <label for="questiontype">Question Type: </label>
        <select
          name="questiontype"
          value={this.state.questiontype}
          onChange={this.onChange}
        >
          <option>*Please select question type</option>
          <option value="multiple choice"> Multiple Choice </option>
          <option value="textual response"> Textual Response </option>
        </select>
        <br />
        <label for="questionbody">Question Body: </label>
        <input
          type="text"
          name="questionbody"
          value={this.state.questionbody}
          onChange={this.onChange}
        />
        <br />
        <label for="correctanswer">Expected Answer: </label>
        <input
          type="text"
          name="correctanswer"
          value={this.state.correctanswer}
          onChange={this.onChange}
        />
        <br />
        <label for="answerchoices">Answer Choices: </label>
        <input
          type="text"
          name="answerchoices"
          value={this.state.answerchoices}
          onChange={this.onChange}
        />
        <span> Leave blank if your question is extended response </span>
        <br />
        <input type="submit" value="Create Question" />
      </form>
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
)(CreateQuestion);
