import React, { Component } from "react";

export default class CreateClass extends Component {
  render() {
    return (
      <div>
        <h1> Use this form to create a class </h1>
        <form>
          <label htmlFor="classcode">Classcode: </label>
          <input type="text" name="classcode" placeholder="classcode" />
        </form>
      </div>
    );
  }
}
