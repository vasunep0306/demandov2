import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { showAllClassrooms } from "../../actions/classroomActions";

class RegisterForClassrooms extends Component {
  componentDidMount() {
    this.props.showAllClassrooms();
  }
  render() {
    return <div />;
  }
}

RegisterForClassrooms.propTypes = {
  classrooms: PropTypes.array.isRequired,
  showAllClassrooms: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  classrooms: state.classrooms
});
export default connect(
  mapStateToProps,
  { showAllClassrooms }
)(withRouter(RegisterForClassrooms));
