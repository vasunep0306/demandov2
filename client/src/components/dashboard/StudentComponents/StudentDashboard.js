import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Card, CardDeck } from "react-bootstrap";

class StudentDashboard extends Component {
  render() {
    const { user } = this.props;

    return (
      <Container>
        <h1 className="dashboardHeader">Welcome {user.name}</h1>
        <h2 className="dashBoardInfo">
          User Type: <span style={{ color: "green" }}>{user.userType}</span>
        </h2>
        <CardDeck>
          <Card className="dashboardCard">
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>
                Register for a course
              </Card.Title>
              <Card.Text style={{ textAlign: "center" }}>
                Please click <Link to="/registerForClassroom">here </Link> to
                register for a course class
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="dashboardCard">
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>
                View Classrooms
              </Card.Title>
              <Card.Text style={{ textAlign: "center" }}>
                Or go <Link to="/myClasses">here </Link> to see all of your
                classrooms
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
        {/* <h1>Welcome {user.name}</h1>
        <h2>
          User Type: <span style={{ color: "green" }}>{user.userType}</span>
        </h2>
        <p>
          Please click <Link to="/registerForClassroom">here </Link> to register
          for a course class
        </p>
        <small>
          The student will see a list of courses in a tabular format.
        </small>
        <p>
          Or go <Link to="/myClasses">here </Link> to see all of your classrooms
        </p> */}
      </Container>
    );
  }
}

StudentDashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default StudentDashboard;
