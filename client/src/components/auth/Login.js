import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import isEmpty from "../../validation/is-empty";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      const noEmail = nextProps.errors.email;
      const noPassword = nextProps.errors.password;
      const message = `${noEmail} or ${noPassword}`;
      if (noEmail) {
        alert(message);
      } else if (noPassword) {
        alert(message);
      }
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    let email = !isEmpty(errors.email) ? errors.email : "",
      password = !isEmpty(errors.password) ? errors.password : "";
    return (
      <div className="login">
        <div className="box">
          <form onSubmit={this.onSubmit}>
            <h1>Log In</h1>
            <label htmlFor="email">Email: </label>
            <input
              className="email"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
            />
            <br />
            <span className="errorMsg">{email}</span>
            <br />
            <label for="password">Password: </label>
            <input
              className="password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <span className="errorMsg">{password}</span>
            <br />
            <br />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
