// Default imports
import React, { Component } from "react";
import "./App.css";

// Routers
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Private route
import PrivateRoute from "./components/common/PrivateRoute";

// Redux Modules
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

// Components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateClass from "./components/classrooms/CreateClass";
import DisplayClasses from "./components/classrooms/DisplayClasses";
import DisplayQuestions from "./components/questions/DisplayQuestions";
import RegisterForClassroom from "./components/classrooms/RegisterForClassroom";
import ShowStudentClassrooms from "./components/classrooms/ShowStudentClassrooms";
import MyClassroom from "./components/classrooms/MyClassroom";
import ClassList from "./components/classrooms/ClassList";
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

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
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/createClass" component={CreateClass} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/myClasses"
                component={ShowStudentClassrooms}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/:classroomid/answers"
                component={MyClassroom}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/:classroomid/questions"
                component={DisplayQuestions}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/:classroomid/students"
                component={ClassList}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/displayClasses"
                component={DisplayClasses}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/registerForClassroom"
                component={RegisterForClassroom}
              />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
