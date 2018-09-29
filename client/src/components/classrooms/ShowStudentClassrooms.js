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
      console.log(this.props);
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
          <div className="card" style={{ cardStyle }}>
            <div className="card-body">
              <h5 className="card-title">{classroom.classtitle}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                cid:
                {classroom.cid}
              </h6>
              <p className="card-text">Class Code {classroom.classcode}</p>
              <Link to={`/${classroom._id}/answers`}>Go To Classroom</Link>
            </div>
          </div>
        ));
      }
      return (
        <div>
          <h1>Here are your classes: {this.props.auth.user.name}</h1>
          <div>{classroomArea}</div>
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
