import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class ShowStudentClassrooms extends Component {
  render() {
    return (
      <div>
        <h1>Hi</h1>
      </div>
    );
  }
}

ShowStudentClassrooms.propTypes = {
  classrooms: PropTypes.array.isRequired,
  showClassrooms: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  classrooms: state.classrooms
});

export default connect(
  mapStateToProps,
  { showClassrooms }
)(withRouter(DisplayClasses));
