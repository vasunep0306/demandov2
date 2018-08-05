import React, { Component } from "react";
import { getClass } from "../../actions/classroomActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class MyClassroom extends Component {
  componentDidMount() {
    this.props.getClass(this.props.match.params.classroomid);
  }
  render() {
    console.log(this.props);
    const { classroom, loading } = this.props.classrooms;
    let classroomArea;
    if (classroom === null || loading) {
      classroomArea = <h1>Loading</h1>;
    } else if (classroom.noclassroom) {
      classroomArea = <h1>{classroom.noclassroom}</h1>;
    } else {
      if (!classroom.currentQuestion) {
        classroomArea = (
          <div>
            <h1>
              Welcome to <em>{classroom.classtitle}</em>
            </h1>
            <p>
              The teacher hasn't really published a question yet. Please click
              refresh
            </p>
          </div>
        );
      } else {
        // we want an html form where the student can answer the question.
        classroomArea = <h1>{classroom.currentQuestion}</h1>;
      }
    }
    return <div>{classroomArea}</div>;
  }
}

MyClassroom.propTypes = {
  errors: PropTypes.object.isRequired,
  classrooms: PropTypes.object.isRequired,
  getClass: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  classrooms: state.classrooms
});

export default connect(
  mapStateToProps,
  { getClass }
)(withRouter(MyClassroom));
