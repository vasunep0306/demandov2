import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Card, CardDeck } from "react-bootstrap";

class TeacherDashboard extends Component {
  render() {
    const { user } = this.props;
    return (
      <Container>
        <h1 className="dashboardHeader">Welcome Professor {user.name}</h1>
        <h2 className="dashBoardInfo">
          User Type: <span style={{ color: "green" }}>{user.userType}</span>
        </h2>
        <CardDeck>
          <Card className="dashboardCard">
            <Card.Body>
              <Card.Title style={{textAlign: "center"}}>Create A Classroom</Card.Title>
              <Card.Text style={{textAlign: "center"}}>
                Please click <Link to="/createClass">here </Link> to create a
                class.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="dashboardCard">
            <Card.Body>
              <Card.Title style={{textAlign: "center"}}>Display My Classrooms</Card.Title>
              <Card.Text style={{textAlign: "center"}}>
                Or go <Link to="/displayClasses">here </Link> to see your
                classrooms
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
      </Container>
    );
  }
}

TeacherDashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default TeacherDashboard;
