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
  }
  render() {
    return (
      <form>
        <input type="submit" />
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
