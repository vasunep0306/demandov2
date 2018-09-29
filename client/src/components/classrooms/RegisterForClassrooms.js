import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  showAllClassrooms,
  registerForClassroom
} from "../../actions/classroomActions";

class RegisterForClassrooms extends Component {
  componentDidMount() {
    this.props.showAllClassrooms();
  }
  render() {
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
          <td>{classroom.cid}</td>
          <td>
            <button
              className="btn btn-info"
              onClick={this.registerForClass.bind(this, classroom)}
            >
              Register For A Classroom
            </button>
          </td>
        </tr>
      ));
    }
    return (
      <div>
        <h1>Here are all of the courses</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Course Name</th>
              <th scope="col">Course ID</th>
              <th scope="col">Register for Course</th>
            </tr>
          </thead>
          <tbody>{classroomArea}</tbody>
        </table>
      </div>
    );
  }
}

RegisterForClassrooms.propTypes = {
  classrooms: PropTypes.array.isRequired,
  showAllClassrooms: PropTypes.func.isRequired,
  registerForClassroom: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  classrooms: state.classrooms
});
export default connect(
  mapStateToProps,
  { showAllClassrooms, registerForClassroom }
)(withRouter(RegisterForClassrooms));
