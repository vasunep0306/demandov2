import React, { Component } from "react";
import { createClassroom } from "../../actions/classroomActions";
import PropTypes from "prop-types";

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
          <label htmlFor="crn">Crn: </label>
          <input
            type="text"
            name="crn"
            placeholder="crn"
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
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default CreateClass;
