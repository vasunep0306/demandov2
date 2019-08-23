import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserDiscussions } from "../../actions/classroomActions";

class MyDiscussions extends Component {
  componentDidMount() {
    this.props.getUserDiscussions(this.props.auth.user.id);
  }

  render() {
    let discussionList;
    let { discussions, loading } = this.props.classrooms;
    try {
      if (discussions === null || loading) {
        discussionList = <div>Loading</div>;
      } else if (discussions.no_posts) {
        discussionList = <div>{discussions.no_posts}</div>;
      } else {
        discussions = Array.from(this.props.classrooms.discussions);
        console.log(discussions);
        discussionList = discussions.map(discussion => (
          <tr>
            <td>{discussion.author.data.name}</td>
            <td>{discussion.discussionTopic}</td>
            <td>
              <Link
                to={`/${discussion.classroom}/${discussion._id}/discussionPage`}
              >
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
        <h2>My Discussions</h2>
        <p>Here are all your discussions</p>
        <table className="table table-striped">
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

MyDiscussions.propTypes = {
  getUserDiscussions: PropTypes.func.isRequired,
  discussions: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  classrooms: state.classrooms
});

export default connect(
  mapStateToProps,
  { getUserDiscussions }
)(withRouter(MyDiscussions));
