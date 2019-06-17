import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getComments, addComment } from "../../actions/classroomActions";

class DiscussionPage extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  render() {
    return (
      <div>
        <p>TBD</p>
      </div>
    );
  }
}

DiscussionPage.propTypes = {
  classroom: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getComments: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getComments, addComment }
)(withRouter(DiscussionPage));
