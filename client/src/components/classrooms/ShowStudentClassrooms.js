import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { myClassrooms } from "../../actions/classroomActions";
import { connect } from "react-redux";

class ShowStudentClassrooms extends Component {
  componentDidMount() {
    this.props.myClassrooms(this.props.auth.user.id);
  }
  render() {
    try {
      const { classrooms, loading } = this.props.classrooms;
      let classroomArea;
      const cardStyle = {
        width: "18rem"
      };
      if (classrooms === null || loading) {
        classroomArea = <h1>Loading</h1>;
      } else if (classrooms.noClassrooms) {
        classroomArea = <h1>{classrooms.noClassrooms}</h1>;
      } else {
        classroomArea = classrooms.map(classroom => (
          <tr>
            <td>{classroom.classtitle}</td>
            <td>{classroom.cid}</td>
            <td>{classroom.classcode}</td>
            <Link to={`/${classroom._id}/answers`}>Go To Classroom</Link>
          </tr>
        ));
      }
      return (
        <div>
          <h1>Here are your classes: {this.props.auth.user.name}</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Course Name</th>
                <th scope="col">Course ID</th>
                <th scope="col">Class Code</th>
                <th scope="col">Course Dashboard</th>
              </tr>
            </thead>
            <tbody>{classroomArea}</tbody>
          </table>
        </div>
      );
    } catch (err) {
      window.location.reload(true);
    }
  }
}

ShowStudentClassrooms.propTypes = {
  classrooms: PropTypes.object.isRequired,
  myClassrooms: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  classrooms: state.classrooms,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { myClassrooms }
)(withRouter(ShowStudentClassrooms));
