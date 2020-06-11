import React, { Component } from "react";
import { connect } from "react-redux";
import { HighValueCard } from "../../components";
import { getStreams } from "../../store/actions/serviceAction";
import "../global.scss";

class ManageStreamProcessor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: []
    };
  }

  componentDidMount() {
    this.props.onGetStream();
  }

  render() {
    const { streams } = this.props;
    return (
      <div className="mainContainer">
        <h6>Project: Customer Value Examination</h6>
        <h2>Manage Stream Processors</h2>
        <div className="rowContent">
          {streams &&
            streams.length > 0 &&
            streams.map(item => (
              <HighValueCard post={item} itemIdx={item.id} key={item.id} />
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    streams: state.ServiceReducer.streams
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetStream: () => {
      dispatch(getStreams());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageStreamProcessor);
