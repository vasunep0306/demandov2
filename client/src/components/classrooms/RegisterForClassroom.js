import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { registerForClassroom } from "../../actions/classroomActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class RegisterForClassroom extends Component {
  constructor() {
    super();
    this.state = {
      crn: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      if (nextProps.errors) {
        alert(nextProps.errors);
      }
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const courseData = {
      crn: this.state.crn
    };
    this.props.registerForClassroom(courseData);
    alert("successfully registered for course");
  }
  render() {
    return (
      <div>
        <h1>Welcome to Demando</h1>
        <p>Please register for a class</p>
        <label htmlFor="crn">crn: </label>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="crn"
            placeholder="crn"
            value={this.state.crn}
            onChange={this.onChange}
          />
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

RegisterForClassroom.propTypes = {
  classrooms: PropTypes.object.isRequired,
  registerForClassroom: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerForClassroom }
)(withRouter(RegisterForClassroom));
