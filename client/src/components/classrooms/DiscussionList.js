import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getAuthor } from "../../actions/authActions";
import { getDiscussions, getClass } from "../../actions/classroomActions";

class DiscussionList extends Component {
  componentDidMount() {
    this.props.getClass(this.props.match.params.classroomid);
    this.props.getDiscussion(this.props.match.params.classroomid);
  }

  render() {
    let discussionList;
    let { discussions, classroom, loading } = this.props.classrooms;
    if (classroom === null || loading) {
      discussionList = <h1>Loading</h1>;
    } else if (discussions === null || loading) {
      discussionList = <h1>Loading</h1>;
    } else if (discussions.nodiscussion) {
      listOfStudents = <h1>{discussions.nodiscussion}</h1>;
    } else {
    }
  }
}

DiscussionList.propTypes = {
  classroom: PropTypes.object.isRequired,
  getDiscussions: PropTypes.func.isRequired,
  discussions: PropTypes.array.isRequired,
  getClass: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  removeStudent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  classrooms: state.classrooms
});
export default connect(
  mapStateToProps,
  { getDiscussions, getClass }
)(withRouter(DiscussionList));
