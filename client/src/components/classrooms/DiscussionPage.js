import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getComments,
  addComment,
  getDiscussion
} from "../../actions/classroomActions";

class DiscussionPage extends Component {
  constructor() {
    super();
    this.state = {
      comment_text: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getDiscussion(this.props.match.params.discussionid);
    this.props.getComments(this.props.match.params.discussionid);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    let discussion_id = this.props.match.params.discussionid;
    let new_comment = { comment: this.state.comment_text };

    this.props.addComment(discussion_id, new_comment, this.props.history);
    this.setState({
      comment_text: ""
    });
  }

  render() {
    const { comments, loading, discussion } = this.props.classrooms;
    let commentArea;
    if (discussion === null || loading) {
      commentArea = <h1>Loading</h1>;
    } else if (comments === null || loading) {
      commentArea = <h1>Loading</h1>;
    } else if (comments.nocomments) {
      commentArea = (
        <div className="container">
          <br />
          <div className="container">
            <h1>{discussion.discussionTopic}</h1>
            <h3>{discussion.discussionSubject}</h3>
            <p>
              Posted by: <em>{discussion.author.data.name}</em>
            </p>
            <p>{discussion.discussionBody}</p>
          </div>
          <hr />
          <div className="container">
            <h4>{comments.nocomments}</h4>
          </div>
          <hr />
          <div className="container">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="comment">Add To Discussion:</label>
                <textarea
                  className="form-control"
                  rows="5"
                  id="comment"
                  name="comment_text"
                  value={this.state.comment_text}
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn btn-success">
                Post
              </button>
            </form>
          </div>
        </div>
      );
    } else {
      let each_comment = comments.map(comment => (
        <div className="card">
          <div className="card-body">
            <p>
              <strong>{comment.user.name}: </strong>
              {comment.comment}
            </p>
          </div>
        </div>
      ));
      commentArea = (
        <div className="container">
          <br />
          <div className="container">
            <h1>{discussion.discussionTopic}</h1>
            <h3>{discussion.discussionSubject}</h3>
            <p>
              Posted by: <em>{discussion.author.data.name}</em>
            </p>
            <p>{discussion.discussionBody}</p>
          </div>
          <hr />
          <div className="container">{each_comment}</div>
          <hr />
          <div className="container">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="comment">Add To Discussion:</label>
                <textarea
                  className="form-control"
                  rows="5"
                  id="comment"
                  name="comment_text"
                  value={this.state.comment_text}
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn btn-success">
                Post
              </button>
            </form>
            <br />
            <Link to={`/${this.props.match.params.classroomid}/discussionList`}>
              View Discussions
            </Link>
          </div>
          <br />
        </div>
      );
    }
    return <div>{commentArea}</div>;
  }
}

DiscussionPage.propTypes = {
  discussion: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  getComments: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  getDiscussion: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  classrooms: state.classrooms
});

export default connect(
  mapStateToProps,
  { getComments, addComment, getDiscussion }
)(withRouter(DiscussionPage));
