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
        backgroundColor: "#00FFDC"
      },
      clear: false
    };
  }
  render() {
    return (
      <div>
        <div>
          <DrawableCanvas />
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
