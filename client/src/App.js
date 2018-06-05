import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
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
        <div className="landing">
          <h1>Landing goes here </h1>
        </div>
        <div className="footer">
          <h1> Footer goes here </h1>
        </div>
      </div>
    );
  }
}

export default App;
