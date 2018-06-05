import React, { Component } from "react";

class Register extends Component {
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
                <form role="form">
                  <div className="row">
                    <div className="form-group">
                      <input
                        type="text"
                        name="fullname"
                        id="fullame"
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
                        id="password"
                        className="form-control input-sm"
                        placeholder="Password"
                      />
                    </div>

                    <div class="form-group">
                      <input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        className="form-control input-sm"
                        placeholder="Confirm Password"
                      />
                    </div>
                    <div class="form-group">
                      <select>
                        <option>*Please select user type</option>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                      </select>
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

export default Register;
