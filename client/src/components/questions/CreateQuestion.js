import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CreateQuestion extends Component {
  render() {
    return <h1> This is the create question form </h1>;
  }
}

const mapStateToProps = state => ({
  classroom: state.classroom
});

export default CreateQuestion;
