import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { showClassrooms } from "../../actions/classroomActions";
import CreateQuestion from "../questions/CreateQuestion";

class DisplayClasses extends Component {
  componentDidMount() {
    this.props.showClassrooms(this.props.auth.user.id);
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
          <td>{classroom.name}</td>
          <td>{classroom.cid}</td>
          <td>
            <Link to={`/${classroom._id}/questions`}> Manage Questions </Link>
          </td>
          <td>
            <Link to={`/${classroom._id}/students`}> See Classlist </Link>
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
              <th scope="col">Course ID</th>
              <th scope="col">Course Questions</th>
              <th scope="col">Current Students</th>
            </tr>
          </thead>
          <tbody>{classroomArea}</tbody>
        </table>
      </div>
    );
  }
}

DisplayClasses.propTypes = {
  classrooms: PropTypes.object.isRequired,
  showClassrooms: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  classrooms: state.classrooms
});

export default connect(
  mapStateToProps,
  { showClassrooms }
)(withRouter(DisplayClasses));
