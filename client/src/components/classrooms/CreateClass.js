import React, { Component } from "react";
import { createClassroom } from "../../actions/classroomActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";
import { Container, Card } from "react-bootstrap";

class CreateClass extends Component {
  constructor() {
    super();
    this.state = {
      classcode: "",
      classtitle: "",
      registeration_pin: "",
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
    // console.log(this.state);
    const newClass = {
      classcode: this.state.classcode,
      classtitle: this.state.classtitle,
      registeration_pin: this.state.registeration_pin
    };
    this.props.createClassroom(newClass, this.props.history);
  }
  render() {
    let { errors } = this.state;
    let classcode = !isEmpty(errors.classcode) ? errors.classcode : "",
      classtitle = !isEmpty(errors.classtitle) ? errors.classtitle : "",
      registeration_pin = !isEmpty(errors.registeration_pin)
        ? errors.registeration_pin
        : "";

    return (
      <Container>
        <br />
        <Card>
          <Card.Header as="h5" className="cardHeader">
              Create New Classroom
          </Card.Header>
          <Card.Body>
            <Card.Title>
              Use this form to create a class
            </Card.Title>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="classcode">Class code: </label>
              <input
                type="text"
                name="classcode"
                className="form-control"
                placeholder="classcode"
                value={this.state.classcode}
                onChange={this.onChange}
              />
              <span className="errorMsg">{classcode}</span>
            </div>

            <div className="form-group">
              <label htmlFor="classtitle">Class Title: </label>
              <input
                type="text"
                name="classtitle"
                className="form-control"
                placeholder="classtitle"
                value={this.state.classtitle}
                onChange={this.onChange}
              />
              <span className="errorMsg">{classtitle}</span>
            </div>
            <div className="form-group">
              <label htmlFor="registeration_pin">Registeration Pin: </label>
              <input
                type="text"
                name="registeration_pin"
                className="form-control"
                placeholder="Registeration Pin"
                value={this.state.registeration_pin}
                onChange={this.onChange}
              />
              <span className="errorMsg">{registeration_pin}</span>
            </div>
            <input type="submit" className="btn my_btn" />
          </form>
          </Card.Body>
        </Card>
        <br />
      </Container>
    );
  }
}

CreateClass.propTypes = {
  createClassroom: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createClassroom }
)(withRouter(CreateClass));
