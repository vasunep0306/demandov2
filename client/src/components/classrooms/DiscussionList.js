import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getAuthor } from "../../actions/authActions";
import { getDiscussions, getClass } from "../../actions/classroomActions";

class DiscussionList extends Component {}

export default connect(
  mapStateToProps,
  { getAuthor, getDiscussions, getClass }
)(withRouter(DiscussionList));
