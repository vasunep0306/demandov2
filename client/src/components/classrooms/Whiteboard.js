import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import assign from "object-assign";
import { withRouter } from "react-router-dom";

//https://codepen.io/HarryGateaux/pen/BApxl
class Whiteboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brushColor: "#FFFF00",
      lineWidth: 4,
      cursor: "pointer",
      canvasStyle: {
        backgroundColor: "#00FFDC"
      },
      clear: false
    };
  }

  handleOnTouchStart(e) {
    if (this.props.auth.user.userType === "student") {
      alert("Only professors can edit the whiteboard");
      this.setState({
        drawing: false
      });
    } else {
      const rect = this.state.canvas.getBoundingClientRect();
      this.state.context.beginPath();
      this.setState({
        lastX: e.targetTouches[0].pageX - rect.left,
        lastY: e.targetTouches[0].pageY - rect.top,
        drawing: true
      });
    }
  }

  handleOnMouseDown(e) {
    if (this.props.auth.user.userType === "student") {
      alert("Only professors can edit the whiteboard");
      this.setState({
        drawing: false
      });
    } else {
      const rect = this.state.canvas.getBoundingClientRect();
      this.state.context.beginPath();

      this.setState({
        lastX: e.clientX - rect.left,
        lastY: e.clientY - rect.top,
        drawing: true
      });
    }
  }

  handleOnTouchMove(e) {
    if (this.state.drawing) {
      const rect = this.state.canvas.getBoundingClientRect();
      const lastX = this.state.lastX;
      const lastY = this.state.lastY;
      let currentX = e.targetTouches[0].pageX - rect.left;
      let currentY = e.targetTouches[0].pageY - rect.top;
      this.draw(lastX, lastY, currentX, currentY);
      this.setState({
        lastX: currentX,
        lastY: currentY
      });
    }
  }

  handleOnMouseMove(e) {
    if (this.state.drawing) {
      const rect = this.state.canvas.getBoundingClientRect();
      const lastX = this.state.lastX;
      const lastY = this.state.lastY;
      let currentX = e.clientX - rect.left;
      let currentY = e.clientY - rect.top;

      this.draw(lastX, lastY, currentX, currentY);
      this.setState({
        lastX: currentX,
        lastY: currentY
      });
    }
  }

  handleonMouseUp() {
    this.setState({
      drawing: false
    });
  }

  draw(lX, lY, cX, cY) {
    const newContext = this.state.context;
    newContext.strokeStyle = this.props.brushColor;
    newContext.lineWidth = this.props.lineWidth;
    this.setState({
      context: newContext
    });
    this.state.context.moveTo(lX, lY);
    this.state.context.lineTo(cX, cY);
    this.state.context.stroke();
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
    let Canvas;
    if (this.props.auth.user.userType === "teacher") {
      Canvas = (
        <div>
          <canvas
            style={this.canvasStyle()}
            onMouseDown={this.handleOnMouseDown.bind(this)}
            onTouchStart={this.handleOnTouchStart.bind(this)}
            onMouseMove={this.handleOnMouseMove.bind(this)}
            onTouchMove={this.handleOnTouchMove.bind(this)}
            onMouseUp={this.handleonMouseUp.bind(this)}
            onTouchEnd={this.handleonMouseUp.bind(this)}
          />
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
      );
    } else {
      Canvas = (
        <div>
          <canvas
            style={this.canvasStyle()}
            onMouseDown={this.handleOnMouseDown.bind(this)}
            onTouchStart={this.handleOnTouchStart.bind(this)}
            onMouseMove={this.handleOnMouseMove.bind(this)}
            onTouchMove={this.handleOnTouchMove.bind(this)}
            onMouseUp={this.handleonMouseUp.bind(this)}
            onTouchEnd={this.handleonMouseUp.bind(this)}
          />
        </div>
      );
    }
    return <div>{Canvas}</div>;
  }
}

Whiteboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Whiteboard));
