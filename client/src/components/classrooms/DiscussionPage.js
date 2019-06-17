import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
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
      comment: ""
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

  onSubmit(e) {}

  render() {
    const { comments, loading, discussion } = this.props.classrooms;
    let commentArea;
    if (discussion === null || loading) {
      commentArea = <h1>Loading</h1>;
    } else if (comments === null || loading) {
      commentArea = <h1>Loading</h1>;
    } else if (comments.nocomments) {
      commentArea = <div className="container" />;
    }
    return <div className="container">{commentArea}</div>;
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
