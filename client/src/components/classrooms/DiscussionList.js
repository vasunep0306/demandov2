import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getDiscussions, getClass } from "../../actions/classroomActions";

class DiscussionList extends Component {
  componentDidMount() {
    this.props.getClass(this.props.match.params.classroomid);
    this.props.getDiscussions(this.props.match.params.classroomid);
  }

  render() {
    let discussionList;
    let headerTitle;
    let { discussions, classroom, loading } = this.props.classrooms;
    try {
      if (classroom === null || loading) {
        discussionList = <div>Loading</div>;
        headerTitle = "Page is still loading";
      } else if (discussions === null || loading) {
        discussionList = <div>Loading</div>;
        headerTitle = "Page is still loading";
      } else if (discussions.nodiscussions) {
        headerTitle = `Discussions for ${classroom.classtitle}`;
        discussionList = <div>{discussions.nodiscussions}</div>;
      } else {
        headerTitle = `Discussions for ${classroom.classtitle}`;
        discussions = Array.from(this.props.classrooms.discussions);
        discussionList = discussions.map(discussion => (
          <tr>
            <td>{discussion.author.data.name}</td>
            <td>{discussion.discussionTopic}</td>
            <td>
              <Link to={`/${discussion._id}/discussionPage`}>
                Go To Discussion
              </Link>
              {/* <a href="#">Go To Discussion</a> */}
            </td>
            <td>{discussion.date.slice(0, 10)}</td>
          </tr>
        ));
      }
    } catch (err) {
      discussionList = (
        <tr>
          <td>{err.message}</td>
        </tr>
      );
    }

    return (
      <div className="container">
        <br />
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
        <Link
          to={`/${this.props.match.params.classroomid}/createDiscussion`}
          className="btn btn-info"
        >
          Create a new discussion
        </Link>
      </div>
    );
  }
}

DiscussionList.propTypes = {
  classroom: PropTypes.object.isRequired,
  getDiscussions: PropTypes.func.isRequired,
  discussions: PropTypes.array.isRequired,
  getClass: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
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
