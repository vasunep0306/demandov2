import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      userType: "",
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
      if (nextProps.errors.name) {
        alert(nextProps.errors.name);
      }
      if (nextProps.errors.email) {
        alert(nextProps.errors.email);
      }
      if (nextProps.errors.password) {
        alert(nextProps.errors.password);
      }
      if (nextProps.errors.password2) {
        alert(nextProps.errors.password2);
      }
      if (nextProps.errors.userType) {
        alert(nextProps.errors.userType);
      }
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
      userType: this.state.userType
    };
    alert(`Successfully created new user ${newUser.name}`);
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
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
                    </div>

                    <div class="form-group">
                      <input
                        type="password"
                        name="password2"
                        id="password2"
                        value={this.state.password2}
                        onChange={this.onChange}
                        className="form-control input-sm"
                        placeholder="Confirm Password"
                      />
                    </div>
                    <div class="form-group">
                      <select
                        name="userType"
                        value={this.state.userType}
                        onChange={this.onChange}
                      >
                        <option>*Please select user type</option>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        name="secretKey"
                        id="secretKey"
                        value={this.state.secretKey}
                        onChange={this.onChange}
                        className="form-control input-sm"
                        placeholder="Please Enter Secret Key, leave off if student"
                      />
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
