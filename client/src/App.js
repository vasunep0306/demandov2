// Default imports
import React, { Component } from "react";
import "./App.css";

// Routers
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux Modules
import { Provider } from "react-redux";
import store from "./store";

// Components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Footer />
        </div>
      </Router>
      </Provider
    );
  }
}

export default App;
