import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import isEmpty from "../../validation/is-empty";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      userType: "",
      secretKey: "",
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
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      userType: this.state.userType,
      secretKey: this.state.secretKey
    };
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    let { errors } = this.state;
    let name = !isEmpty(errors.name) ? errors.name : "",
      email = !isEmpty(errors.email) ? errors.email : "",
      password = !isEmpty(errors.password) ? errors.password : "",
      password2 = !isEmpty(errors.password2) ? errors.password2 : "",
      userType = !isEmpty(errors.userType) ? errors.userType : "",
      secretKey = !isEmpty(errors.secretKey) ? errors.secretKey : "";

    return (
      <div className="register-outer-container">
        <div className="container">
          <br />
          <h1>
            Please sign up for Demando <small>It's free!</small>
          </h1>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Full Name: </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                id="fullname"
                placeholder="Full Name"
              />
              <span className="errorMsg">{name}</span>
            </div>
            <div className="form-group">
              <label>Email Address: </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                id="email"
                placeholder="Email Address"
              />
              <span className="errorMsg">{email}</span>
            </div>
            <div className="form-group">
              <label>Password: </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                id="password"
                placeholder="Password"
              />
              <span className="errorMsg">{password}</span>
            </div>
            <div className="form-group">
              <label>Confirm Password: </label>
              <input
                type="password"
                className="form-control"
                name="password2"
                value={this.state.password2}
                onChange={this.onChange}
                id="password2"
                placeholder="Password"
              />
              <span className="errorMsg">{password2}</span>
            </div>
            <div className="form-group">
              <label>User Type: </label>
              <select
                className="selectpicker"
                className="form-control"
                name="userType"
                value={this.state.userType}
                onChange={this.onChange}
              >
                <option>*Please select user type</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
              <span className="errorMsg">{userType}</span>
            </div>
            <div className="form-group">
              <label>Instructor Key: </label>
              <input
                type="text"
                className="form-control"
                name="secretKey"
                id="secretKey"
                value={this.state.secretKey}
                onChange={this.onChange}
                placeholder="Please Enter Secret Key, leave off if student"
              />
              <span className="errorMsg">{secretKey}</span>
            </div>
            <input type="submit" value="Sign Up" className="btn btn-primary" />
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
