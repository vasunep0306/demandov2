import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { showClassrooms, changeClasspin } from "../../actions/classroomActions";
import CreateQuestion from "../questions/CreateQuestion";

class DisplayClasses extends Component {
  componentDidMount() {
    this.props.showClassrooms(this.props.auth.user.id);
  }

  changePin(classroom) {
    let new_pin = prompt("Please enter new pin: ");
    let certainty = window.confirm(
      "Are you sure you want to change the classpin? "
    );
    if (certainty) {
      this.props.changeClasspin(new_pin, classroom._id);
      alert(
        `Successfully changed classpin to ${new_pin}. Please let your students know that the pin was changed`
      );
      window.location.reload(true);
    }
  }

  render() {
    try {
      const { classrooms, loading } = this.props.classrooms;
      let classroomArea;

      if (classrooms === null || loading) {
        classroomArea = <h1>Loading</h1>;
      } else if (classrooms.noclasses) {
        classroomArea = <h1>{classrooms.noclasses}</h1>;
      } else {
        classroomArea = classrooms.map(classroom => (
          <tr>
            <td>{classroom.classtitle}</td>
            <td>{classroom.classcode}</td>
            <td>
              <Link to={`/${classroom._id}/questions`}> Manage Questions </Link>
            </td>
            <td>{classroom.registeration_pin}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={this.changePin.bind(this, classroom)}
              >
                Edit Pin
              </button>
            </td>
            <td>
              <Link to={`/${classroom._id}/students`}> See Classlist </Link>
            </td>
            <td>
              <Link>Go to whiteboard</Link>
            </td>
          </tr>
        ));
      }
      return (
        <div>
          <h1>Here are your courses</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Course Name</th>
                <th scope="col">Course Code</th>
                <th scope="col">Course Questions</th>
                <th scope="col">Course Registeration Password</th>
                <th scope="col">Change Course Pin</th>
                <th scope="col">Current Students</th>
                <th scope="col">Dynamic Whiteboard</th>
              </tr>
            </thead>
            <tbody>{classroomArea}</tbody>
          </table>
          <Link to={`/createClass`} className="btn btn-info">
            Create a new course
          </Link>
        </div>
      );
    } catch (err) {
      window.location.reload(true);
    }
  }
}

DisplayClasses.propTypes = {
  classrooms: PropTypes.object.isRequired,
  showClassrooms: PropTypes.func.isRequired,
  changeClasspin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  classrooms: state.classrooms
});

export default connect(
  mapStateToProps,
  { showClassrooms, changeClasspin }
)(withRouter(DisplayClasses));
