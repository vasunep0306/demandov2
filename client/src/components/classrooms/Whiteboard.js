import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DrawableCanvas from "react-drawable-canvas";

//https://codepen.io/HarryGateaux/pen/BApxl
class Whiteboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brushColor: "#800909",
      lineWidth: 4,
      canvasStyle: {
        backgroundColor: "#000000"
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

  render() {
    return (
      <div>
        <div>
          <DrawableCanvas {...this.state} />
          <button onClick={this.handleOnClickClear.bind(this)}>
            Clear all
          </button>
          <button onClick={this.handleOnClickChangeColorYellow.bind(this)}>
            Set color to Yellow
          </button>
          <button onClick={this.handleOnClickChangeColorRed.bind(this)}>
            Set color to Red
          </button>
        </div>
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
