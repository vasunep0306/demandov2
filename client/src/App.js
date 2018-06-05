import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Landing />
        <div className="footer">
          <h1> Footer goes here </h1>
        </div>
      </div>
    );
  }
}

export default App;
