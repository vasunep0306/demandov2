import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { myClassrooms } from "../../actions/classroomActions";
import { connect } from "react-redux";

class ShowStudentClassrooms extends Component {
  componentDidMount() {
    this.props.myClassrooms();
  }
  render() {
    const { user, classrooms } = this.props;
    const { loading } = this.props.classrooms;
    let classroomArea;
    const cardStyle = {
      width: "18rem"
    };
    if (classrooms === null || loading) {
      classroomArea = <h1>Loading</h1>;
    } else if (classrooms.noclasses) {
      classroomArea = <h1>{classrooms.noclasses}</h1>;
    } else {
      classroomArea = classrooms.map(classroom => (
        <div className="card" style={{ cardStyle }}>
          <div className="card-body">
            <h5 className="card-title">{classroom.classtitle}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              crn:{classroom.crn}
            </h6>
            <p className="card-text">Class Code {classroom.classcode}</p>
            <a href="#">Go To Classroom</a>
          </div>
        </div>
      ));
    }
    return (
      <div>
        <h1>Here are your classes {user.name}</h1>
        <div>{classroomArea}</div>
      </div>
    );
  }
}

ShowStudentClassrooms.propTypes = {
  classrooms: PropTypes.array.isRequired,
  myClassrooms: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  classrooms: state.classrooms,
  user: PropTypes.object.isRequired
});

export default connect(
  mapStateToProps,
  { myClassrooms }
)(withRouter(ShowStudentClassrooms));
