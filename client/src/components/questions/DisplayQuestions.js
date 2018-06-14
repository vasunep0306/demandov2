import React, { Component } from "react";
import { getClass } from "../../actions/classroomActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class DisplayQuestions extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getClass(this.props.match.params.classroomid);
  }

  render() {
    const { classroom } = this.props;
    console.log(this.props);
    return (
      <div>
        <h1>Questions for: </h1>
      </div>
    );
  }
}

DisplayQuestions.propTypes = {
  getClass: PropTypes.func.isRequired,
  classroom: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  classroom: state.classrooms.classroom
});

export default connect(
  mapStateToProps,
  { getClass }
)(withRouter(DisplayQuestions));
