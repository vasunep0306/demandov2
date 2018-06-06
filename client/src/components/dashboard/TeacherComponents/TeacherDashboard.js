import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class TeacherDashboard extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>Welcome Professor {user.name}</h1>
        <p>
          Please click <Link to="/createClass">here </Link> to create a class
        </p>
        <p>
          Or go <Link to="/displayClasses">here </Link> to see your classes
        </p>
      </div>
    );
  }
}

TeacherDashboard.propTypes = {
  user: PropTypes.object.isRequired
};

export default TeacherDashboard;
