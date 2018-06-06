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
        <form>
          <label htmlFor="classcode">Class code: </label>
          <input
            type="text"
            name="classcode"
            placeholder="classcode"
            value={this.state.classcode}
          />
          <br />
          <label htmlFor="crn">Crn: </label>
          <input
            type="text"
            name="crn"
            placeholder="crn"
            value={this.state.crn}
          />
          <br />
          <label htmlFor="classtitle">Class Title: </label>
          <input
            type="text"
            name="classtitle"
            placeholder="classtitle"
            value={this.state.classtitle}
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
