import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar as NavigationBar, Nav, NavDropdown } from "react-bootstrap";

import {
  faHome,
  faSignInAlt,
  faUserPlus,
  faBinoculars,
  faCommentDots,
  faPlus,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Common component widgets that will use font awesome
 */
const LandingsComponent = () => (
  <div className="navigation_item">
    <Link to="/" className="nav-link navigation_item">
      <span className="my_icon">
        <FontAwesomeIcon icon={faHome} /> Demando
      </span>
    </Link>
  </div>
);

const LogInComponent = () => (
  <div>
    <Link to="/login" className="nav-link navigation_item">
      <span className="my_icon">
        <FontAwesomeIcon icon={faSignInAlt} /> Log In
      </span>
    </Link>
  </div>
);

const SignUpComponent = () => (
  <div>
    <Link to="/register" className="nav-link navigation_item">
      <span className="my_icon">
        <FontAwesomeIcon icon={faUserPlus} /> Sign Up
      </span>
    </Link>
  </div>
);

const ShowMyCoursesTeachers = () => (
  <div>
    <Link to="/displayClasses" className="nav-link navigation_item">
      <span className="my_icon">
        <FontAwesomeIcon icon={faBinoculars} /> View My Courses
      </span>
    </Link>
  </div>
);

const ShowDiscussions = () => (
  <div>
    <Link to="/myDiscussions" className="nav-link navigation_item">
      <span className="my_icon">
        <FontAwesomeIcon icon={faCommentDots} /> My Discussions
      </span>
    </Link>
  </div>
);

const ShowMyCoursesStudents = () => (
  <div>
    <Link to="/myClasses" className="nav-link navigation_item">
      <span className="my_icon">
        <FontAwesomeIcon icon={faBinoculars} /> View My Courses
      </span>
    </Link>
  </div>
);

const RegisterForCourse = () => (
  <div>
    <Link to="/registerForClassroom" className="nav-link navigation_item">
      <span className="my_icon">
        <FontAwesomeIcon icon={faPlus} />{" "}
        Register For A Course
      </span>
    </Link>
  </div>
);

const CreateCourse = () => (
  <div>
    <Link to="/createClass" className="nav-link navigation_item">
      <span className="my_icon">
        <FontAwesomeIcon icon={faPlus} /> Create A Class
      </span>
    </Link>
  </div>
);

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    let authBar, guestBar;

    guestBar = (
      <Nav className="mr-auto">
        <Nav.Item className="nav_element">
          <LandingsComponent />
        </Nav.Item>
        <Nav.Item className="nav_element">
          <LogInComponent />
        </Nav.Item>
        <Nav.Item className="nav_element">
          <SignUpComponent />
        </Nav.Item>
      </Nav>
    );

    if (user.userType === "teacher") {
      authBar = (
        <Nav className="mr-auto">
          <Nav.Item className="nav_element">
            <LandingsComponent />
          </Nav.Item>
          <Nav.Item className="nav_element">
            <Link to="/dashboard" className="nav-link navigation_item">
              <span className="my_icon">Dashboard</span>
            </Link>
          </Nav.Item>
          <Nav.Item className="nav_element">
            <CreateCourse />
          </Nav.Item>
          <Nav.Item className="nav_element">
            <ShowMyCoursesTeachers />
          </Nav.Item>
          <Nav.Item className="nav_element">
            <ShowDiscussions />
          </Nav.Item>
          <Nav.Item className="nav_element">
            <a
              href=""
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link navigation_item"
            >
              <span className="my_icon">
                <FontAwesomeIcon icon={faSignOutAlt} />
                Logout
              </span>
            </a>
          </Nav.Item>
        </Nav>
      );
    } else {
      authBar = (
        <Nav className="mr-auto">
          <Nav.Item className="nav_element">
            <LandingsComponent />
          </Nav.Item>
          <Nav.Item className="nav_element">
            <Link to="/dashboard" className="nav-link">
              <span className="my_icon">Dashboard</span>
            </Link>
          </Nav.Item>
          <Nav.Item className="nav_element">
            <ShowMyCoursesStudents />
          </Nav.Item>
          <Nav.Item className="nav_element">
            <RegisterForCourse />
          </Nav.Item>
          <Nav.Item className="nav_element">
            <ShowDiscussions />
          </Nav.Item>
          <Nav.Item className="nav_element">
            <a
              href=""
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link navigation_item"
            >
              <span className="my_icon">
                <FontAwesomeIcon icon={faSignOutAlt} />
                Logout
              </span>
            </a>
          </Nav.Item>
        </Nav>
      );
    }

    return (
      <NavigationBar
        className="Navbar"
        expand="lg"
        variant="dark"
        collapseOnSelect
      >
        <NavigationBar.Toggle
          aria-controls="responsive-navbar-nav"
          className=".navbar-toggler-icon"
        />
        <NavigationBar.Collapse>
          {isAuthenticated ? authBar : guestBar}
        </NavigationBar.Collapse>
      </NavigationBar>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
