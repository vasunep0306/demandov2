import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getStudents } from "../../actions/classroomActions";
import { getClass } from "../../actions/classroomActions";

class ClassList extends Component {
  componentDidMount() {
    this.props.getClass(this.props.match.params.classroomid);
  }
  render() {
    return (
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
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
ClassList.propTypes = {
  classroom: PropTypes.object.isRequired,
  getStudents: PropTypes.func.isRequired,
  getClass: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getStudents, getClass }
)(withRouter(ClassList));
