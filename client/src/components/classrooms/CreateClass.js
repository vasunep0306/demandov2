import React, { Component } from "react";
import { createClassroom } from "../../actions/classroomActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import suggest_crn from "../../validation/generate_crn";

class CreateClass extends Component {
  constructor() {
    super();
    this.state = {
      classcode: "",
      crn: "",
      classtitle: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    // console.log(this.state);
    const newClass = {
      classcode: this.state.classcode,
      crn: this.state.crn,
      classtitle: this.state.classtitle
    };
    this.props.createClassroom(newClass, this.props.history);
  }
  render() {
    let suggestion = suggest_crn();
    return (
      <div>
        <h1> Use this form to create a class </h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="classcode">Class code: </label>
          <input
            type="text"
            name="classcode"
            placeholder="classcode"
            value={this.state.classcode}
            onChange={this.onChange}
          />
          <br />
          <label htmlFor="crn">Crn: </label>
          <input
            type="text"
            name="crn"
            placeholder={suggestion}
            value={this.state.crn}
            onChange={this.onChange}
          />
          <br />
          <label htmlFor="classtitle">Class Title: </label>
          <input
            type="text"
            name="classtitle"
            placeholder="classtitle"
            value={this.state.classtitle}
            onChange={this.onChange}
          />
          <br />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

CreateClass.propTypes = {
  createClassroom: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createClassroom }
)(withRouter(CreateClass));
