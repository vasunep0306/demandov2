import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DrawableCanvas from "react-drawable-canvas";

class Whiteboard extends Component {
  getInitialState() {
    return {
      brushColor: "#800909",
      lineWidth: 4,
      canvasStyle: {
        backgroundColor: "#00FFDC"
      },
      clear: false
    };
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

  handleOnClickChangeColorRed() {
    this.setState({
      brushColor: "#800909",
      clear: false
    });
  }

  render() {
    return (
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
  }
}

Whiteboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Whiteboard);
