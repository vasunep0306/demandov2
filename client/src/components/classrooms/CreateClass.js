import React, { Component } from "react";

export default class CreateClass extends Component {
  render() {
    return (
      <div>
        <h1> Use this form to create a class </h1>
        <form>
          <label htmlFor="classcode">Class code: </label>
          <input type="text" name="classcode" placeholder="classcode" />
          <br />
          <label htmlFor="crn">Crn: </label>
          <input type="text" name="crn" placeholder="crn" />
          <br />
          <label htmlFor="classtitle">Class Title: </label>
          <input type="text" name="classtitle" placeholder="classtitle" />
          <br />
        </form>
      </div>
    );
  }
}
