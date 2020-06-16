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
          <span className="cardInput greenOutline" data-header="Status">Healthy</span>
        </div>
        <div className="cardFooter">
          <a href={`/projects/${item.project && item.project.id}/streams/${item.id}/edit/`} className='edit'>
            <span className="helper">Edit</span>
          </a>
          <a href={`/projects/${item.project && item.project.id}/streams/${item.id}/monitor`} className='monitor'>
            <span className="helper">Monitor</span>
          </a>
          <a href={`/projects/${item.project && item.project.id}/streams/${item.id}/analyse`} className='export'>
            <span className="helper">Analyse</span>
          </a>
          <a href={`/projects/${item.project && item.project.id}/streams/${item.id}/reset`} className='reset'>
            <span className="helper">Reset</span>
          </a>
          <a href={`/projects/${item.project && item.project.id}/streams/${item.id}/delete/`} className='delete'>
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

export default connect(mapStateToProps, mapDispatchToProps)(StreamValueCard);
