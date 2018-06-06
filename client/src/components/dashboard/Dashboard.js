import React, { Component } from "react";

class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;
    const teacher = user.userType === "teacher";
    const student = user.userType === "student";
    let dashboardContent;
    if (teacher) {
      dashboardContent = (
        <div>
          <h1>Welcome Professor</h1>
        </div>
      );
    }
    return <div />;
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
