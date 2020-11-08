import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { createDiscussion } from "../../actions/classroomActions";
import isEmpty from "../../validation/is-empty";
import { Container, Card } from "react-bootstrap";

class CreateDiscussion extends Component {
  constructor() {
    super();
    this.state = {
      discussionTopic: "",
      discussionSubject: "",
      discussionBody: "",
      errors: {},
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
      discussionBody: this.state.discussionBody,
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
      <Container>
        <br />
        <Card>
          <Card.Header as="h5" className="cardHeader">
            Create New Discussion
          </Card.Header>
          <Card.Body>
            <Card.Title>Create A New Discussion or <Link to={`/${this.props.match.params.classroomid}/discussionList`}>go back to discusccions page</Link>.</Card.Title>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="usr">Discussion Topic:</label>
                <input
                  type="text"
                  className="form-control"
                  id="usr"
                  name="discussionTopic"
                  placeholder="Topic of Discussion"
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
                  placeholder="Subject of Discussion"
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
                  placeholder="Body of Discussion"
                  name="discussionBody"
                  value={this.state.discussionBody}
                  onChange={this.onChange}
                />
                <span className="errorMsg">{discussionBody}</span>
              </div>
              <input
                value="Create Discussion"
                type="submit"
                className="btn my_btn"
              />
            </form>
          </Card.Body>
        </Card>
        <br /> <br />
      </Container>
    );

    return <div>{discussionForm}</div>;
  }
}

CreateDiscussion.propTypes = {
  createDiscussion: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { createDiscussion })(
  withRouter(CreateDiscussion)
);
