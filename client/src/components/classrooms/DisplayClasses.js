import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { showClassrooms } from "../../actions/classroomActions";

class DisplayClasses extends Component {
  componentDidMount() {
    this.props.showClassrooms(this.props.auth.user.id);
  }

  render() {
    const { classrooms, loading } = this.props.classrooms;
    let classroomArea;
    if (classrooms === null || loading) {
      classroomArea = <h1>Loading</h1>;
    } else {
      classroomArea = (
        <div>
          <h1>Here are your classes </h1>
          <table>
            {classrooms.map(classroom => (
              <tr key={classroom._id}>
                <td>{classroom.classcode}</td>
                <td>{classroom.crn}</td>
                <td>{classroom.classtitle}</td>
              </tr>
            ))}
          </table>
        </div>
      );
    }
    return <div>{classroomArea}</div>;
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
