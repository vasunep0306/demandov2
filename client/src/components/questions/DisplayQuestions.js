import React, { Component } from "react";
import { getQuestions } from "../../actions/classroomActions";
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

  render() {
    const { questions } = this.props;
    return (
      <div>
        <h1>Questions for: {classroom.classtitle} </h1>
      </div>
    );
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
