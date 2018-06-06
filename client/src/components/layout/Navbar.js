import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const guestBar = (
      <ul>
        <li>
          <Link to="/">Demando</Link>
        </li>
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/register">Sign Up</Link>
        </li>
      </ul>
    );

    const authBar = (
      <ul>
        <li>
          <Link to="/">Demando</Link>
        </li>
        <li>
          <a href="" onClick={this.onLogoutClick.bind(this)}>
            Logout
          </a>
        </li>
      </ul>
    );

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
