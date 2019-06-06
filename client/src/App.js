// Default imports
import React, { Component } from "react";
import "./App.css";

// Routers
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Private route/Common Routes
import PrivateRoute from "./components/common/PrivateRoute";
import NoMatch from "./components/common/NoMatch";

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
import CreateQuestion from "./components/questions/CreateQuestion";
import EditQuestion from "./components/questions/EditQuestion";
import GetResponses from "./components/questions/GetResponses";
import RegisterForClassrooms from "./components/classrooms/RegisterForClassrooms";
import ShowStudentClassrooms from "./components/classrooms/ShowStudentClassrooms";
import MyClassroom from "./components/classrooms/MyClassroom";
import ClassList from "./components/classrooms/ClassList";
import Whiteboard from "./components/classrooms/Whiteboard";

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
            {/* 404 Page Route */}
            <Switch>
              <Route component={NoMatch} />
            </Switch>
            {/* Dashboard Route */}
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            {/* teacher route for creating a course */}
            <Switch>
              <PrivateRoute exact path="/createClass" component={CreateClass} />
            </Switch>
            {/* teacher route for displaying course questions */}
            <Switch>
              <PrivateRoute
                exact
                path="/:classroomid/questions"
                component={DisplayQuestions}
              />
            </Switch>
            {/* teacher route for displaying students */}
            <Switch>
              <PrivateRoute
                exact
                path="/:classroomid/students"
                component={ClassList}
              />
            </Switch>
            {/* teacher route for displaying courses */}
            <Switch>
              <PrivateRoute
                exact
                path="/displayClasses"
                component={DisplayClasses}
              />
            </Switch>
            {/* Teacher route for creating a question */}
            <Switch>
              <PrivateRoute
                exact
                path="/:classroomid/questions/createQuestion"
                component={CreateQuestion}
              />
            </Switch>
            {/* Teacher route for editing a question */}
            <Switch>
              <PrivateRoute
                exact
                path="/:classroomid/:questionid/editQuestion"
                component={EditQuestion}
              />
            </Switch>

            {/* teacher route for accessing whiteboard */}
            <Switch>
              <PrivateRoute
                exact
                path="/:classroomid/showDynamicWhiteboard"
                component={Whiteboard}
              />
            </Switch>
            {/* Student route for showing his/her registered courses */}
            <Switch>
              <PrivateRoute
                exact
                path="/myClasses"
                component={ShowStudentClassrooms}
              />
            </Switch>

            {/* Student route for answering a question */}
            <Switch>
              <PrivateRoute
                exact
                path="/:classroomid/answers"
                component={MyClassroom}
              />
            </Switch>

            {/* Teacher route for viewing responses */}
            <Switch>
              <PrivateRoute
                exact
                path="/:classroomid/questions/:questionid/getresponses"
                component={GetResponses}
              />
            </Switch>

            {/* Student route for registering for a course */}
            <Switch>
              <PrivateRoute
                exact
                path="/registerForClassroom"
                component={RegisterForClassrooms}
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
