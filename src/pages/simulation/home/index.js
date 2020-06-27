import React, { useEffect, useState } from "react";
import "./style.scss";
import { connect } from "react-redux";
import { getSimulations } from "../../../store/actions/serviceAction";
import EmptySimultionsSVG from "../../../assets/empty-simulations.svg";
import CreateGroupModal from "../../../modals/CreateGroupModal";
import { getMapped } from "../../stream/home";
import SimulationValueCard from "../../../components/cards/SimulationValueCard";
import Sortable from "../../Sortable";
import GroupView from "../../GroupView";

function ManageSimulation(props) {
  const [simulations, setSimulations] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [allGroups, setAllGroups] = useState({
    base: [],
  });
  const [allItems, setAllItems] = useState([]);
  const [openGroup, setOpenGroup] = useState();

  const projectId = props.match.params.id;

  useEffect(() => {
    props.onGetSimulations(projectId);
  }, [projectId]);

  useEffect(() => {
    if (props.simulations) {
      const simulations = props.simulations;

      const newState = {
        base: simulations,
      };

      const mapped = getMapped(newState, "simulations");
      setAllGroups(newState);
      setAllItems(mapped);
      setSimulations(simulations);
    }
  }, [props.simulations]);

  useEffect(() => {
    const mapped = getMapped(allGroups, "simulations");
    setAllItems(mapped);
  }, [allGroups]);

  const createGroup = (name) => {
    setAllGroups({ ...allGroups, [name]: [] });
    setVisibleModal(false);
  };

  if (openGroup) {
    return (
      <GroupView
        name={openGroup.name}
        items={openGroup.simulations}
        setOpenGroup={setOpenGroup}
        ItemComponent={SimulationValueCard}
      />
    );
  }

  return (
    simulations && (
      <div className="wrapper">
        <h2 className="project-name">
          {simulations.length > 0 &&
            simulations[0].project &&
            simulations[0].project.name}
        </h2>
        <h2 className="dashboard__header">Manage Simulations</h2>
        <Sortable
          allItems={allItems}
          setAllItems={setAllItems}
          allGroups={allGroups}
          setOpenGroup={setOpenGroup}
          type={"simulations"}
          ItemComponent={SimulationValueCard}
        />
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
        <div
          className="dashboard__footer"
          style={{ borderTop: simulations.length === 0 ? "none" : undefined }}
        >
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
