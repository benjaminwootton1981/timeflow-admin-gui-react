import React, { Component } from "react";
import { connect } from "react-redux";

class HighValueCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const item = this.props.post;
    return (
      <div className="Valuecard">
        <div className="valueHeader">
          <span className="headerTitle">{item.display_name}</span>
        </div>
        <div className="cardBody padding-10">
          <div className="cardItem rowContent">
            <div className="cardItem smallItem">
              <span className="itemTitle">Requested Replicas</span>
              <span className="cardInput">2</span>
            </div>
            <div className="cardItem smallItem">
              <span className="itemTitle">Actual Replicas</span>
              <span className="cardInput">1</span>
            </div>
          </div>
          <div className="cardItem">
            <span className="itemTitle">Status</span>
            <span className="cardInput redOutline">Error</span>
          </div>
        </div>
        <div className="border-line"></div>
        <div className="cardFooter rowContent padding-10">
          <button>
            <i className="fa fa-pencil purple"></i>
          </button>
          <button>
            <i className="fa fa-window-restore purple"></i>
          </button>
          <button>
            <i className="fa fa-paper-plane purple"></i>
          </button>
          <button>
            <i className="fa fa-pause purple"></i>
          </button>
          <button>
            <i className="fa fa-file-text purple"></i>
          </button>
          <button>
            <i className="fa fa-bar-chart purple"></i>
          </button>
          <button className="redOutline">
            <i className="fa fa-trash-o danger"></i>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HighValueCard);
