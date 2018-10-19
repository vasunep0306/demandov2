import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { isEmpty } from "../../validation/is-empty";

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
    // if (!(Object.keys(this.state.errors).length === 0)) {
    //   alert(JSON.stringify(this.state.errors));
    // } else if (Object.keys(this.state.errors).length === 0) {
    //   alert(`Successfully created new ${newUser.userType} ${newUser.name}`);
    // }
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
      <div className="container">
        <div className="row centered-form">
          <div className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">
                  Please sign up for Demando <small>It's free!</small>
                </h3>
              </div>
              <div className="panel-body">
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        id="fullname"
                        className="form-control input-sm"
                        placeholder="Full Name"
                      />
                      <span>{name}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        id="email"
                        className="form-control input-sm"
                        placeholder="Email Address"
                      />
                      <span>{email}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        id="password"
                        className="form-control input-sm"
                        placeholder="Password"
                      />
                      <span>{password}</span>
                    </div>

                    <div className="form-group">
                      <input
                        type="password"
                        name="password2"
                        id="password2"
                        value={this.state.password2}
                        onChange={this.onChange}
                        className="form-control input-sm"
                        placeholder="Confirm Password"
                      />
                      <span>{password2}</span>
                    </div>
                    <div className="form-group">
                      <select
                        name="userType"
                        value={this.state.userType}
                        onChange={this.onChange}
                      >
                        <option>*Please select user type</option>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                      </select>
                      <span>{userType}</span>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="secretKey"
                        id="secretKey"
                        value={this.state.secretKey}
                        onChange={this.onChange}
                        className="form-control input-sm"
                        placeholder="Please Enter Secret Key, leave off if student"
                      />
                      <span>{secretKey}</span>
                    </div>
                  </div>

                  <input
                    type="submit"
                    value="Register"
                    className="btn btn-info btn-block"
                  />
                </form>
              </div>
            </div>
          </div>
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
