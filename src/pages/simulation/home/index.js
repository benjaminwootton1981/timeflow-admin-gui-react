import React, { useState, useEffect } from "react";
import { SimulationValueCard } from "../../../components";
import './style.scss';
import {connect} from "react-redux";
import {getSimulations} from "../../../store/actions/serviceAction";
import EmptySimultionsSVG from '../../../assets/empty-simulations.svg';

function ManageSimulation(props) {

  const [simulations, setSimulations] = useState([
      {display_name: "Test User1"},
      {display_name: "Test User2"},
      {display_name: "Test User3"},
  ]);

  useEffect(() => {
      props.onGetSimulations(props.match.params.id);
  }, [])

  useEffect(() => {
      setSimulations(props.simulations)
  }, [props.simulations])

    return (simulations &&
        <div className="wrapper">
            <h2 className="project-name">{simulations.length > 0 && simulations[0].project && simulations[0].project.name}</h2>
            <h2 className="dashboard__header">Manage Simulations</h2>
            <div className="rowContent">
                {simulations &&
                simulations.length > 0 &&
                simulations.map(item => (
                    <SimulationValueCard post={item} itemIdx={item.id} key={item.id} />
                ))}
            </div>
            {
                simulations.length === 0 && (
                    <div className="empty">
                        <span className="empty__text">No simulations are available.</span>
                        <img src={EmptySimultionsSVG} width="155" height="134" alt="no data"
                             className="empty__image" />
                    </div>
                )
            }
            <div className="dashboard__footer">
                <a className="btn" href={`/projects/${props.match.params.id}/simulations/new`}>
                    Add Simulation
                </a>
                {
                    simulations.length !== 0 && (
                        <a className="btn create__group" href="#create-groupd-modal" id="create_ground" rel="modal:open">
                            <span>+ Create a Group</span>
                        </a>
                    )
                }
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        simulations: state.ServiceReducer.simulations
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetSimulations: (id) => {
            dispatch(getSimulations(id));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageSimulation);
