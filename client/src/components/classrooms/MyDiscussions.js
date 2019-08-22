import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserDiscussions } from "../../actions/classroomActions";

class MyDiscussions extends Component {
  render() {
    return (
      <div>
        <p>placeholder</p>
      </div>
    );
  }
}

MyDiscussions.propTypes = {
  getUserDiscussions: PropTypes.func.isRequired,
  discussions: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  classrooms: state.classrooms
});

export default connect(
  mapStateToProps,
  { getUserDiscussions }
)(withRouter(MyDiscussions));
