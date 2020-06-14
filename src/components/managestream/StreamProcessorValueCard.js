import React, { Component } from "react";
import { connect } from "react-redux";

class StreamProcessorValueCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const item = this.props.post;
    return (
      <div className="Valuecard">
        <h2 className="valueHeader">
          {item.name}
        </h2>
        <div className="cardBody">
          <div className="grid">
            <div className="cardItem smallItem">
              <span className="cardInput" data-header="Requested Replicas">2</span>
            </div>
            <div className="cardItem smallItem">
              <span className="cardInput" data-header="Actual Replicas">1</span>
            </div>
          </div>
          <span className="cardInput redOutline" data-header="Status">Error</span>
        </div>
        <div className="cardFooter">
          <a href={`/projects/${item.project}/streamprocessors/${item.id}/edit/`} className='edit'>
             {/*EDIT - Needs to go to - /projects/2/streamprocessors/3/edit/ -->*/}
            <span className="helper">Edit</span>
          </a>
          <a href={`/projects/${item.project}/streamprocessors/${item.id}/duplicate/`} className='duplicate'>
             {/*DUPLICATE -  Needs to go to - /projects/2/streamprocessors/3/duplicate/-->*/}
            <span className="helper">Duplicate</span>
          </a>
          <a href={`/projects/${item.project}/streamprocessors/${item.id}/run/`} className='deploy'>
             {/*DEPLOY - Needs to go to - /projects/2/streamprocessors/3/run/ -->*/}
            <span className="helper">Deploy</span>
          </a>
          <a href={`/projects/${item.project}/streamprocessors/${item.id}/stop/`} className='pause'>
           {/*STOP - Needs to go to - /projects/2/streamprocessors/3/stop/ -->*/}
            <span className="helper">Stop</span>
          </a>
          <a href={`/projects/${item.project}/streamprocessors/${item.id}/monitor/`} className='monitor'>
           {/*MONITOR - Needs to go to - /projects/2/streamprocessors/3/monitor/ -->*/}
            <span className="helper">Monitor</span>
          </a>
          <a href={`/projects/${item.project}/streamprocessors/${item.id}/delete/`} className='delete'>
            {/*DELETE  Needs to go to - /projects/2/streamprocessors/3/delete/ -->*/}
            <span className="helper">Delete</span>
          </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(StreamProcessorValueCard);
