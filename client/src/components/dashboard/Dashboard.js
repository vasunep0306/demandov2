import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TeacherDashboard from "./TeacherComponents/TeacherDashboard";
import StudentDashboard from "./StudentComponents/StudentDashboard";

class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;
    const teacher = user.userType === "teacher";
    const student = user.userType === "student";
    let dashboardContent;
    if (teacher) {
      dashboardContent = <TeacherDashboard user={user} />;
    }
    if (student) {
      dashboardContent = <StudentDashboard user={user} />;
    }
    return dashboardContent;
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
