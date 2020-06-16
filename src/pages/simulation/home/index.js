import React, { useState, useEffect } from "react";
import { GroupCard, SimulationValueCard } from "../../../components";
import "./style.scss";
import { connect } from "react-redux";
import { getSimulations } from "../../../store/actions/serviceAction";
import EmptySimultionsSVG from "../../../assets/empty-simulations.svg";
import CreateGroupModal from "../../../modals/CreateGroupModal";

function ManageSimulation(props) {
  const [simulations, setSimulations] = useState([
    { display_name: "Test User1" },
    { display_name: "Test User2" },
    { display_name: "Test User3" },
  ]);
  const [groups, setGroups] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    props.onGetSimulations(props.match.params.id);
  }, []);

  useEffect(() => {
    setSimulations(props.simulations);
  }, [props.simulations]);

  const createGroup = (name) => {
    groups.push({
      name,
    });
    setGroups(groups);
    setVisibleModal(false);
  };

  return (
    simulations && (
      <div className="wrapper">
        <h2 className="project-name">
          {simulations.length > 0 &&
            simulations[0].project &&
            simulations[0].project.name}
        </h2>
        <h2 className="dashboard__header">Manage Simulations</h2>
        <div className="rowContent">
          {groups.map((group, index) => (
            <GroupCard key={`group-${index}`} item={group} />
          ))}
          {simulations &&
            simulations.length > 0 &&
            simulations.map((item) => (
              <SimulationValueCard
                post={item}
                itemIdx={item.id}
                key={item.id}
              />
            ))}
        </div>
        {simulations.length === 0 && (
          <div className="empty">
            <span className="empty__text">No simulations are available.</span>
            <img
              src={EmptySimultionsSVG}
              width="155"
              height="134"
              alt="no data"
              className="empty__image"
            />
          </div>
        )}
        <div className="dashboard__footer">
          <a
            className="btn"
            href={`/projects/${props.match.params.id}/simulations/new`}
          >
            Add Simulation
          </a>
          {simulations.length !== 0 && (
            <button
              className="btn create__group"
              onClick={() => setVisibleModal(true)}
            >
              <span>+ Create a Group</span>
            </button>
          )}
        </div>

        <CreateGroupModal
          show={visibleModal}
          closeModal={() => setVisibleModal(false)}
          createGroup={createGroup}
        />
      </div>
    )
  );
}

const mapStateToProps = (state) => {
  return {
    simulations: state.ServiceReducer.simulations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetSimulations: (id) => {
      dispatch(getSimulations(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSimulation);