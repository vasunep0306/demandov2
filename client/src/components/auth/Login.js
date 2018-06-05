import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="login">
        <div className="box">
          <form>
            <h1>Log In</h1>
            <label for="email">Email: </label>
            <input className="email" type="email" name="email" />
            <label for="password">Password: </label>
            <input className="password" type="password" name="password" />
            <br />
            <br />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
