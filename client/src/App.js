import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Navbar">
          <nav className="navigation-bar">
            <ul>
              <li className="nav-item">
                <a href="#">Home</a>
              </li>
              <li className="nav-item">
                <a href="#">News</a>
              </li>
              <li className="nav-item">
                <a href="#">Contact</a>
              </li>
              <li className="nav-item">
                <a href="#">About</a>
              </li>
            </ul>
          </nav>
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
