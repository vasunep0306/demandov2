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
    let headerTitle;
    let { discussions, classroom, loading } = this.props.classrooms;
    if (classroom === null || loading) {
      discussionList = <h1>Loading</h1>;
      headerTitle = "Page is still loading";
    } else if (discussions === null || loading) {
      discussionList = <h1>Loading</h1>;
      headerTitle = "Page is still loading";
    } else if (discussions.nodiscussions) {
      headerTitle = `Discussions for ${classroom.classtitle}`;
      discussionList = <h1>{discussions.nodiscussions}</h1>;
    } else {
      headerTitle = `Discussions for ${classroom.classtitle}`;
      discussions = Array.from(this.props.classrooms.discussions);
      discussionList = discussions.map(discussion => {
        <div>
          <tr>
            <td>{getAuthor(discussion.author)}</td>
            <td>{discussion.discussionTopic}</td>
            <td>
              <a href="#">Go To Discussion</a>
            </td>
            <td>{discussion.date}</td>
          </tr>
        </div>;
      });
    }

    return (
      <div className="container">
        <h2>{headerTitle}</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Author Name</th>
              <th>Discussion Topic</th>
              <th>Link</th>
              <th>Date Posted</th>
            </tr>
          </thead>
          <tbody>{discussionList}</tbody>
        </table>
      </div>
    );
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
