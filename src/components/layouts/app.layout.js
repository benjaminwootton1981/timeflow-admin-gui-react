import React, { Component } from "react";
import NavigationBar from "../common/navigation";
import "./styles.css";

class AppLayout extends Component {
  render() {
    return (
      <div className="main">
        <NavigationBar />
        {this.props.children}
      </div>
    );
  }
}

export default AppLayout;
