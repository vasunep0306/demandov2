import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getClass } from "../../actions/classroomActions";

class CreateDiscussion extends Component {
  componentDidMount() {
    this.props.getClass(this.props.match.params.classroomid);
  }

  render() {
    let { classroom, loading } = this.props.classrooms;
  }
}

CreateDiscussion.propTypes = {
  classroom: PropTypes.object.isRequired,
  getClass: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  classrooms: state.classrooms
});

export default connect(
  mapStateToProps,
  { getClass }
)(withRouter(CreateDiscussion));
