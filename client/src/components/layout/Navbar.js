import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <ul>
          <li>
            <a className="active" href="#home">
              Demando
            </a>
          </li>
          <li>
            <a href="#contact">Log In</a>
          </li>
          <li>
            <a href="#about">Sign Up</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
