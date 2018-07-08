import React, { Component } from "react";

class RegisterForClassroom extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Demando</h1>
        <p>Please register for a class</p>
        <label htmlFor="crn">Crn: </label>
        <form>
          <input type="text" name="crn" placeholder="crn" />
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
}

export default RegisterForClassroom;
