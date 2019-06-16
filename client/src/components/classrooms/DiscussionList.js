import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getAuthor } from "../../actions/authActions";
import { getDiscussions, getClass } from "../../actions/classroomActions";

class DiscussionList extends Component {}

DiscussionList.propTypes = {
  classroom: PropTypes.object.isRequired,
  getDiscussions: PropTypes.func.isRequired,
  getClass: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  removeStudent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  classrooms: state.classrooms
});
export default connect(
  mapStateToProps,
  { getDiscussions, getClass }
)(withRouter(DiscussionList));
