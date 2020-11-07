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
} from "@fortawesome/free-solid-svg-icons";

/**
 * Common component widgets that will use font awesome
 */
const LandingsComponent = () => (
  <div>
    <Link to="/" className="nav-link">
      <span>
        <FontAwesomeIcon icon={faHome} /> Demando
      </span>
    </Link>
  </div>
);

const LogInComponent = () => (
  <div>
    <Link to="/login" className="nav-link">
      <span>
        <FontAwesomeIcon icon={faSignInAlt} /> Log In
      </span>
    </Link>
  </div>
);

const SignUpComponent = () => (
  <div>
    <Link to="/register" className="nav-link">
      <span>
        <FontAwesomeIcon icon={faUserPlus} /> Sign Up
      </span>
    </Link>
  </div>
);

const ShowMyCoursesTeachers = () => (
  <div>
    <Link to="/displayClasses" className="nav-link">
      <span>
        <FontAwesomeIcon icon={faBinoculars} /> View My Courses
      </span>
    </Link>
  </div>
);

const ShowDiscussions = () => (
  <div>
    <Link to="/myDiscussions" className="nav-link">
      <span>
        <FontAwesomeIcon icon={faCommentDots} /> My Discussions
      </span>
    </Link>
  </div>
);

const ShowMyCoursesStudents = () => (
  <div>
    <Link to="/myClasses" className="nav-link">
      <span>
        <FontAwesomeIcon icon={faBinoculars} /> View My Courses
      </span>
    </Link>
  </div>
);

const RegisterForCourse = () => (
  <div>
    <Link to="/registerForClassroom" className="nav-link">
      <span>
        <FontAwesomeIcon icon={faPlus} /> Register For A Course
      </span>
    </Link>
  </div>
);

const CreateCourse = () => (
  <div>
    <Link to="/createClass" className="nav-link">
      <span>
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
      <ul className="navbar-nav">
        <li className="nav-item">
          <LandingsComponent />
        </li>
        <li className="nav-item">
          <LogInComponent />
        </li>
        <li className="nav-item">
          <SignUpComponent />
        </li>
      </ul>
    );

    if (user.userType === "teacher") {
      {
        /* <Nav className="mr-auto">
            <Nav.Item>
              <LandingsComponent />
            </Nav.Item>
            <Nav.Item>
            <Link to="/dashboard" className="nav-link">
                Dashboard{" "}
              </Link>
            </Nav.Item>
          </Nav> */
      }
      authBar = (
        <Nav className="mr-auto">
          <Nav.Item>
            <LandingsComponent />
          </Nav.Item>
          <Nav.Item>
            <Link to="/dashboard" className="nav-link">
              Dashboard{" "}
            </Link>
          </Nav.Item>
          <Nav.Item>
            <CreateCourse />
          </Nav.Item>
          <Nav.Item>
            <ShowMyCoursesTeachers />
          </Nav.Item>
          <Nav.Item>
            <ShowDiscussions />
          </Nav.Item>
          <Nav.Item>
            <a
              href=""
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link"
            >
              <span>
                <i className="fas fa-sign-out-alt" />
              </span>{" "}
              Logout
            </a>
          </Nav.Item>
        </Nav>
        // <ul className="navbar-nav">
        //   <li className="nav-item">
        //     <LandingsComponent />
        //   </li>
        //   <li className="nav-item">
        //     <Link to="/dashboard" className="nav-link">
        //       Dashboard{" "}
        //     </Link>
        //   </li>
        //   <li className="nav-item">
        //     <CreateCourse />
        //   </li>
        //   <li className="nav-item">
        //     <ShowMyCoursesTeachers />
        //   </li>
        //   <li className="nav-item">
        //     <ShowDiscussions />
        //   </li>
        //   <li className="nav-item">
        //     <a
        //       href=""
        //       onClick={this.onLogoutClick.bind(this)}
        //       className="nav-link"
        //     >
        //       <span>
        //         <i className="fas fa-sign-out-alt" />
        //       </span>{" "}
        //       Logout
        //     </a>
        //   </li>
        // </ul>
      );
    } else {
      authBar = (
        <ul className="navbar-nav">
          <li className="nav-item">
            <LandingsComponent />
          </li>
          <li>
            <Link to="/dashboard" className="nav-link">
              Dashboard{" "}
            </Link>
          </li>
          <li className="nav-item">
            <ShowMyCoursesStudents />
          </li>
          <li>
            <RegisterForCourse />
          </li>
          <li className="nav-item">
            <ShowDiscussions />
          </li>
          <li className="nav-item">
            <a
              href=""
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link"
            >
              <span>
                <i className="fas fa-sign-out-alt" />
              </span>{" "}
              Logout
            </a>
          </li>
        </ul>
      );
    }

    return (
      <div className="Navbar">
        <nav class="navbar navbar-expand-lg bg-dark">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <i class="fas fa-bars" />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div classNames="navbar-nav">
              {isAuthenticated ? authBar : guestBar}
            </div>
          </div>
        </nav>
      </div>
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
