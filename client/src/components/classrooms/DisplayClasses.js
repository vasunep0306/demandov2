import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { showClassrooms } from "../../actions/classroomActions";

class DisplayClasses extends Component {
  render() {
    return <div />;
  }
}

DisplayClasses.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  showClassrooms: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { showClassrooms }
)(withRouter(DisplayClasses));
