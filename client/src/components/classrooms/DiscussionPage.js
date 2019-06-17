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
    this.props.getComments(this.props.match.params.discussionid);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {}

  render() {
    const { comments, loading, discussion } = this.props.classrooms;
    return (
      <div>
        <p>Page will go here</p>
      </div>
    );
  }
}

DiscussionPage.propTypes = {
  classrooms: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getComments: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  getDiscussion: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getComments, addComment, getDiscussion }
)(withRouter(DiscussionPage));
