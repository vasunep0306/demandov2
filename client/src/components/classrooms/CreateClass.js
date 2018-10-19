import React, { Component } from "react";
import { createClassroom } from "../../actions/classroomActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

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
    let errors = this.state.errors;
    let classcode = !isEmpty(errors.classcode) ? errors.classcode : "",
      classtitle = !isEmpty(errors.classtitle) ? errors.classtitle : "",
      registeration_pin = !isEmpty(errors.registeration_pin) ? errors.registeration_pin : "",

    return (
      <div>
        <h1> Use this form to create a class </h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="classcode">Class code: </label>
          <input
            type="text"
            name="classcode"
            placeholder="classcode"
            value={this.state.classcode}
            onChange={this.onChange}
          />
          <br />
          <span className="errorMsg">{classcode}</span>
          <br />

          <label htmlFor="classtitle">Class Title: </label>
          <input
            type="text"
            name="classtitle"
            placeholder="classtitle"
            value={this.state.classtitle}
            onChange={this.onChange}
          />
          <br />
          <span className="errorMsg">{classtitle}</span>
          <br />

          <label htmlFor="registeration_pin">Registeration Pin: </label>
          <input
            type="text"
            name="registeration_pin"
            placeholder="Registeration Pin"
            value={this.state.registeration_pin}
            onChange={this.onChange}
          />
          <br />
          <span className="errorMsg">{registeration_pin}</span>
          <br />
          <input type="submit" />
        </form>
      </div>
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
