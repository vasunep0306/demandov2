import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getStudents } from "../../actions/classroomActions";
import { getClass } from "../../actions/classroomActions";

class ClassList extends Component {
  componentDidMount() {
    this.props.getClass(this.props.match.params.classroomid);
    this.props.getStudents(this.props.match.params.classroomid);
  }

  render() {
    let listOfStudents;
    const { students, classroom, loading } = this.props.classrooms;
    if (classroom === null || loading) {
      listOfStudents = <h1>Loading</h1>;
    } else if (students === null || loading) {
      listOfStudents = <h1>Loading</h1>;
    } else if (students.nostudents) {
      listOfStudents = <h1>{students.nostudents}</h1>;
    } else {
      let studentData = students.map(student => (
        <tr>
          <td>{student.name}</td>
          <td>{student.email}</td>
        </tr>
      ));
      listOfStudents = (
        <div>
          <h1>Classlist</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Student Name</th>
                <th scope="col">Student Email</th>
                <th scope="col">Teacher Action</th>
              </tr>
            </thead>
            <tbody>{studentData}</tbody>
          </table>
        </div>
      );
    }
    return <div>{listOfStudents}</div>;
  }
}
ClassList.propTypes = {
  classroom: PropTypes.object.isRequired,
  getStudents: PropTypes.func.isRequired,
  students: PropTypes.array.isRequired,
  getClass: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  classrooms: state.classrooms
});

export default connect(
  mapStateToProps,
  { getStudents, getClass }
)(withRouter(ClassList));
