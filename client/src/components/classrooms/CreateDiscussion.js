import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getClass } from "../../actions/classroomActions";
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
  componentDidMount() {
    this.props.getClass(this.props.match.params.classroomid);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    let { classroom, loading } = this.props.classrooms;
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
    let classroomForm;
    if (classroom === null || loading) {
      classroomForm = <div>Loading</div>;
    } else {
      classroomForm = (
        <div className="container">
          <h2>Create A New Discussion</h2>
          <p>Please use the form below to create a new discussion:</p>
          <form>
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
    }
    return <div />;
  }
}

CreateDiscussion.propTypes = {
  classroom: PropTypes.object.isRequired,
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
  { getClass }
)(withRouter(CreateDiscussion));
