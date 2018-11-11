import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//https://codepen.io/HarryGateaux/pen/BApxl
class Whiteboard extends Component {
  render() {
    return (
      <div>
        <div id="sketch">
          <canvas ref="canvas" id="paint" width={640} height={425} />
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
