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

  handleClick(id) {
    const form = document.getElementById(`questionForm${id}`);
    console.log(form);
    if (form.style.display === "none") {
      form.style.display = "block";
    } else {
      form.style.display = "none";
    }
  }

  render() {
    const { classrooms, loading } = this.props.classrooms;
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
              cid:
              {classroom.cid}
            </h6>
            <p className="card-text">Class Code {classroom.classcode}</p>
            <button onClick={this.handleClick.bind(this, classroom._id)}>
              Add Questions
            </button>
            <Link to={`/${classroom._id}/questions`}> Manage Questions </Link>
            <Link to={`/${classroom._id}/students`}> See Classlist </Link>
            <div key={classroom._id} id={`questionForm${classroom._id}`}>
              <br />
              <CreateQuestion key={classroom._id} classroomid={classroom._id} />
            </div>
          </div>
        </div>
      ));
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
