import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import assign from "object-assign";

class Whiteboard extends React.Component {
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
    <div>
      <p>Canvas will go here</p>
    </div>;
  }
}

export default connect(mapStateToProps)(Whiteboard);
