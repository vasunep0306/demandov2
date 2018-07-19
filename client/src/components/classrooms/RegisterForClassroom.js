import React, { Component } from "react";

class RegisterForClassroom extends Component {
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    // console.log(this.state);
  }
  render() {
    return (
      <div>
        <h1>Welcome to Demando</h1>
        <p>Please register for a class</p>
        <label htmlFor="crn">Crn: </label>
        <form noValidate onSubmit={this.onSubmit}>
          <input
            type="text"
            name="crn"
            placeholder="crn"
            onChange={this.onChange}
          />
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

export default RegisterForClassroom;
