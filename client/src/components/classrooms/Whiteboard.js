import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//https://codepen.io/HarryGateaux/pen/BApxl
class Whiteboard extends Component {
  constructor(props) {
    super(props);
    if (this.props.auth.user.userType === "teacher") {
      this.state = {
        userType: this.props.auth.user.userType,
        brushColor: "#800909",
        lineWidth: 0,
        canvasStyle: {
          backgroundColor: "#000000"
        },
        clear: false
      };
    } else {
      this.state = {
        userType: this.props.auth.user.userType,
        brushColor: "#800909",
        lineWidth: 4,
        canvasStyle: {
          backgroundColor: "#000000"
        },
        clear: false
      };
    }
  }

  handleOnClickClear() {
    this.setState({
      clear: true
    });
  }
  handleOnClickChangeColorYellow() {
    this.setState({
      brushColor: "#ffff00",
      clear: false
    });
  }

  handleOnClickChangeColorRed() {
    this.setState({
      brushColor: "#800909",
      clear: false
    });
  }

  render() {
    let finalWhiteboard;
    const teacherWhiteboard = (
      <div>
        <DrawableCanvas {...this.state} />
        <button onClick={this.handleOnClickClear.bind(this)}>Clear all</button>
        <button onClick={this.handleOnClickChangeColorYellow.bind(this)}>
          Set color to Yellow
        </button>
        <button onClick={this.handleOnClickChangeColorRed.bind(this)}>
          Set color to Red
        </button>
      </div>
    );
    const studentWhiteboard = (
      <div>
        <DrawableCanvas {...this.state} />
      </div>
    );
    if (this.props.auth.user.userType === "student") {
      finalWhiteboard = studentWhiteboard;
    } else {
      finalWhiteboard = studentWhiteboard;
    }
    return (
      <div>
        <div>{finalWhiteboard}</div>
      </div>
    );
  }
}

Whiteboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Whiteboard);
