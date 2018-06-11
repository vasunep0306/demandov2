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
    const cardStyle = {
      width: "18rem"
    };
    if (classrooms === null || loading) {
      classroomArea = <h1>Loading</h1>;
    } else {
      classroomArea = classrooms.map(classroom => (
        <div className="card" style={{ cardStyle }}>
          <div className="card-body">
            <h5 className="card-title">{classroom.classtitle}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              crn:{classroom.crn}
            </h6>
            <p className="card-text">Class Code {classroom.classcode}</p>
            <button onClick={toggleQuestionForm}>Add Questions</button>
            <div id="questionForm">
              <br />
              <CreateQuestion classid={classroom._id} />
            </div>
          </div>
        </div>
      ));
    }
    return <div>{classroomArea}</div>;
  }
}

const toggleQuestionForm = () => {
  const form = document.getElementById("questionForm");
  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
};

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
