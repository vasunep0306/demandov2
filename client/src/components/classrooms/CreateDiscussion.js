import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createDiscussion } from "../../actions/classroomActions";
import isEmpty from "../../validation/is-empty";

class CreateDiscussion extends Component {
  constructor() {
    super();
    this.state = {
      discussionTopic: "",
      discussionSubject: "",
      discussionBody: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    let classroom_id = this.props.match.params.classroomid;
    const newDiscussion = {
      discussionTopic: this.state.discussionTopic,
      discussionSubject: this.state.discussionSubject,
      discussionBody: this.state.discussionBody
    };
    this.props.createDiscussion(
      classroom_id,
      this.props.history,
      newDiscussion
    );
  }

  render() {
    // get errors if any
    let { errors } = this.state;
    let discussionTopic = !isEmpty(errors.discussionTopic)
        ? errors.discussionTopic
        : "",
      discussionSubject = !isEmpty(errors.discussionSubject)
        ? errors.discussionSubject
        : "",
      discussionBody = !isEmpty(errors.discussionBody)
        ? errors.discussionBody
        : "";
    let discussionForm;
    discussionForm = (
      <div className="container">
        <h2>Create A New Discussion</h2>
        <p>Please use the form below to create a new discussion:</p>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="usr">Discussion Topic:</label>
            <input
              type="text"
              className="form-control"
              id="usr"
              name="discussionTopic"
              value={this.state.discussionTopic}
              onChange={this.onChange}
            />
            <span className="errorMsg">{discussionTopic}</span>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Discussion Subject:</label>
            <input
              type="text"
              className="form-control"
              id="pwd"
              name="discussionSubject"
              value={this.state.discussionSubject}
              onChange={this.onChange}
            />
            <span className="errorMsg">{discussionSubject}</span>
          </div>
          <div className="form-group">
            <label htmlFor="comment">Discussion Body:</label>
            <textarea
              className="form-control"
              rows="5"
              id="comment"
              name="discussionBody"
              value={this.state.discussionBody}
              onChange={this.onChange}
            />
            <span className="errorMsg">{discussionBody}</span>
          </div>
          <button type="submit" className="btn btn-primary">
            Post To Discussion Board
          </button>
        </form>
      </div>
    );

    return <div>{discussionForm}</div>;
  }
}

CreateDiscussion.propTypes = {
  createDiscussion: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createDiscussion }
)(withRouter(CreateDiscussion));
