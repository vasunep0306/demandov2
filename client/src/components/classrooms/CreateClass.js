import React, { Component } from "react";
import { createClassroom } from "../../actions/classroomActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import suggest_cid from "../../validation/generate_cid";
const suggestion = suggest_cid();
class CreateClass extends Component {
  constructor() {
    super();
    this.state = {
      classcode: "",
      cid: "",
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
      cid: this.state.cid,
      classtitle: this.state.classtitle
    };
    this.props.createClassroom(newClass, this.props.history);
  }
  render() {
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
          <label htmlFor="cid">cid: </label>
          <input
            type="text"
            name="cid"
            placeholder={suggestion}
            value={this.state.cid}
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
