import React, { Component } from "react";
import { connect } from "react-redux";

class SimulationValueCard extends Component {
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
              <span className="cardInput" data-header="Number Of Events">2</span>
            </div>
            <div className="cardItem smallItem">
              <span className="cardInput" data-header="Number Of Errors">1</span>
            </div>
          </div>
          <span className="cardInput blueOutline" data-header="Status">Not Deployed</span>
        </div>
        <div className="cardFooter">
          <a href={`/projects/${item.project && item.project.id}/simulations/${item.id}/edit/`} className='edit'>
            <span className="helper">Edit</span>
          </a>
          <a href={`/projects/${item.project && item.project.id}/simulations/${item.id}/duplicate/`} className='duplicate'>
            <span className="helper">Duplicate</span>
          </a>
          <a href={`/projects/${item.project && item.project.id}/simulations/${item.id}/run/`} className='deploy'>
            <span className="helper">Deploy</span>
          </a>
          <a href={`/projects/${item.project && item.project.id}/simulations/${item.id}/stop/`} className='pause'>
            <span className="helper">Stop</span>
          </a>
          <a href={`/projects/${item.project && item.project.id}/simulations/${item.id}/delete/`} className='delete'>
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

export default connect(mapStateToProps, mapDispatchToProps)(SimulationValueCard);
