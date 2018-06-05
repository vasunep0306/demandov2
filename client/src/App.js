import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
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
