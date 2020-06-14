import React, { Component } from "react";
import { connect } from "react-redux";

class StreamValueCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const item = this.props.post;
    return (
      <div className="Valuecard">
        <h2 className="valueHeader">
          {item.display_name}
        </h2>
        <div className="cardBody">
          <div className="grid">
            <div className="cardItem smallItem">
              <span className="cardInput" data-header="Number Of Events">2</span>
            </div>
            <div className="cardItem smallItem">
              <span className="cardInput" data-header="Number Of Errors">1</span>
            </div>
          </div>
          <span className="cardInput redOutline" data-header="Status">Error</span>
        </div>
        <div className="cardFooter">
          <button>
             {/*EDIT - Needs to go to - /projects/2/streamprocessors/3/edit/ -->*/}
            <i className="fa fa-pencil purple"></i>
          </button>
          <button>
             {/*DUPLICATE -  Needs to go to - /projects/2/streamprocessors/3/duplicate/-->*/}
            <i className="fa fa-window-restore purple"></i>
          </button>
          <button>
             {/*DEPLOY - Needs to go to - /projects/2/streamprocessors/3/run/ -->*/}
            <i className="fa fa-paper-plane purple"></i>
          </button>
          <button>
           {/*STOP - Needs to go to - /projects/2/streamprocessors/3/stop/ -->*/}
            <i className="fa fa-pause purple"></i>
          </button>
          <button>
           {/*MONITOR - Needs to go to - /projects/2/streamprocessors/3/monitor/ -->*/}
            <i className="fa fa-bar-chart purple"></i>
          </button>
          <button className="redOutline">
            {/*DELETE  Needs to go to - /projects/2/streamprocessors/3/delete/ -->*/}
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

export default connect(mapStateToProps, mapDispatchToProps)(StreamValueCard);
