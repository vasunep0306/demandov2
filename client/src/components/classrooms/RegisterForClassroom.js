import React, { Component } from "react";

class RegisterForClassroom extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Demando</h1>
        <p>Please register for a class</p>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="classcode"
            placeholder="classcode"
            value={this.state.classcode}
            onChange={this.onChange}
          />
        </form>
      </div>
    );
  }
}

export default RegisterForClassroom;
