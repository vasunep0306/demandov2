import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class TeacherDashboard extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <h1>Welcome {user.name}</h1>
        <h2>
          User Type: <span style={{ color: "green" }}>{user.userType}</span>
        </h2>
        <p>
          Please click <Link to="/registerForClassroom">here </Link> to register
          for a course class
        </p>
        <small>
          The student will have a search bar where they can find a course by the
          given crn.
        </small>
        <p>
          Or go <Link to="/myClasses">here </Link> to see all of your classrooms
        </p>
      </div>
    );
  }
}

TeacherDashboard.propTypes = {
  user: PropTypes.object.isRequired
};

export default TeacherDashboard;
