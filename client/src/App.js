// Default imports
import React, { Component } from "react";
import "./App.css";

// Routers
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Private route/Common Routes
import PrivateRoute from "./components/common/PrivateRoute";
import NoMatch from "./components/common/NoMatch";
import CrashReporter from "./components/common/CrashReporter";
import ErrorBoundary from "./components/common/ErrorBoundary";

// Redux Modules
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

// Main Components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateClass from "./components/classrooms/CreateClass";
import DisplayClasses from "./components/classrooms/DisplayClasses";
import QuestionList from "./components/questions/QuestionList";
import QuestionPage from "./components/questions/QuestionPage";
import CreateQuestion from "./components/questions/CreateQuestion";
import EditQuestion from "./components/questions/EditQuestion";
import GetResponses from "./components/questions/GetResponses";
import RegisterForClassrooms from "./components/classrooms/RegisterForClassrooms";
import ShowStudentClassrooms from "./components/classrooms/ShowStudentClassrooms";
import MyClassroom from "./components/classrooms/MyClassroom";
import ClassList from "./components/classrooms/ClassList";
import DiscussionList from "./components/classrooms/DiscussionList";
import CreateDiscussion from "./components/classrooms/CreateDiscussion";
import DiscussionPage from "./components/classrooms/DiscussionPage";
// Test Components
import TriggerError from "./components/test/TriggerError";

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
            <div>
              <ErrorBoundary>
                <Navbar />
                {/* Default Route */}
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/testErrors" component={TriggerError} />
                  <Route exact path="/crashed" component={CrashReporter} />
                  {/* Dashboard Route */}
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  {/* teacher route for creating a course */}
                  <PrivateRoute
                    exact
                    path="/createClass"
                    component={CreateClass}
                  />
                  {/* teacher route for displaying course questions */}
                  <PrivateRoute
                    exact
                    path="/:classroomid/questions"
                    component={QuestionList}
                  />
                  {/* teacher route for displaying course questions */}
                  <PrivateRoute
                    exact
                    path="/:classroomid/:questionid/manageQuestion"
                    component={QuestionPage}
                  />
                  {/* teacher route for displaying students */}
                  <PrivateRoute
                    exact
                    path="/:classroomid/students"
                    component={ClassList}
                  />
                  {/* teacher route for displaying courses */}
                  <PrivateRoute
                    exact
                    path="/displayClasses"
                    component={DisplayClasses}
                  />
                  {/* Teacher route for creating a question */}
                  <PrivateRoute
                    exact
                    path="/:classroomid/questions/createQuestion"
                    component={CreateQuestion}
                  />
                  {/* Teacher route for editing a question */}
                  <PrivateRoute
                    exact
                    path="/:classroomid/:questionid/editQuestion"
                    component={EditQuestion}
                  />
                  {/* route for accessing discussion list */}
                  <PrivateRoute
                    exact
                    path="/:classroomid/discussionList"
                    component={DiscussionList}
                  />
                  {/* Route for creating a discussion */}
                  <PrivateRoute
                    exact
                    path="/:classroomid/createDiscussion"
                    component={CreateDiscussion}
                  />

                  {/* Route for contributing to a discussion */}
                  <PrivateRoute
                    exact
                    path="/:classroomid/:discussionid/discussionPage"
                    component={DiscussionPage}
                  />
                  {/* Student route for showing his/her registered courses */}
                  <PrivateRoute
                    exact
                    path="/myClasses"
                    component={ShowStudentClassrooms}
                  />
                  {/* Student route for answering a question */}
                  <PrivateRoute
                    exact
                    path="/:classroomid/answers"
                    component={MyClassroom}
                  />
                  {/* Teacher route for viewing responses */}
                  <PrivateRoute
                    exact
                    path="/:classroomid/questions/:questionid/getresponses"
                    component={GetResponses}
                  />
                  {/* Student route for registering for a course */}
                  <PrivateRoute
                    exact
                    path="/registerForClassroom"
                    component={RegisterForClassrooms}
                  />
                  <Route component={NoMatch} />
                </Switch>
                <Footer />
              </ErrorBoundary>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
