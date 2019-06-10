import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

/**
 * Common component widgets that will use font awesome
 */
const LandingsComponent = () => (
  <div>
    <Link to="/">
      <span>
        <i className="fas fa-home" /> Demando
      </span>
    </Link>
  </div>
);

const LogInComponent = () => (
  <div>
    <Link to="/login">
      <span>
        <i className="fas fa-sign-in-alt" /> Log In
      </span>
    </Link>
  </div>
);

const SignUpComponent = () => (
  <div>
    <Link to="/register">
      <span>
        <i className="fas fa-user-plus" /> Sign Up
      </span>
    </Link>
  </div>
);

const ShowMyCourses = () => (
  <div>
    <Link to="/displayClasses">
      <span>
        <i class="fas fa-binoculars" /> View My Courses
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
      <ul>
        <li>
          <LandingsComponent />
        </li>
        <li>
          <LogInComponent />
        </li>
        <li>
          <SignUpComponent />
        </li>
      </ul>
    );

    if (user.userType === "teacher") {
      authBar = (
        <ul>
          <li>
            <LandingsComponent />
          </li>
          <li>
            <Link to="/dashboard">Dashboard </Link>
          </li>
          <li>
            <ShowMyCourses />
          </li>
          <li>
            <a href="" onClick={this.onLogoutClick.bind(this)}>
              <span>
                <i className="fas fa-sign-out-alt" />
              </span>{" "}
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      authBar = (
        <ul>
          <li>
            <LandingsComponent />
          </li>
          <li>
            <Link to="/dashboard">My Page </Link>
          </li>
          <li>
            <a href="" onClick={this.onLogoutClick.bind(this)}>
              <span>
                <i className="fas fa-sign-out-alt" />
              </span>{" "}
              Logout
            </a>
          </li>
        </ul>
      );
    }

    return <div className="Navbar">{isAuthenticated ? authBar : guestBar}</div>;
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
