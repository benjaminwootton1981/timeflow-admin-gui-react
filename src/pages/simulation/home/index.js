import React, { useEffect, useState } from "react";
import "./style.scss";
import { connect } from "react-redux";
import { getSimulations } from "../../../store/actions/serviceAction";
import EmptySimultionsSVG from "../../../assets/empty-simulations.svg";
import CreateGroupModal from "../../../modals/CreateGroupModal";
import { getId, getItems, getMapped } from "../../stream/home";
import SimulationValueCard from "../../../components/cards/SimulationValueCard";
import Sortable from "../../Sortable";
import GroupView from "../../GroupView";
import api from "../../../api";
import { keyBy } from "lodash";
import { message } from "antd";

function ManageSimulation(props) {
  const [simulations, setSimulations] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [allGroups, setAllGroups] = useState({
    base: [],
  });
  const [allItems, setAllItems] = useState([]);
  const [openGroup, setOpenGroup] = useState();

  const [project, setProject] = useState({});
  const projectId = props.match.params.id;
  const [groups, setGroups] = useState({});

  useEffect(() => {
    props.onGetSimulations(projectId);
  }, [projectId]);

  useEffect(() => {
    api.get(`projects/${projectId}`).then((response) => {
      setProject(response.data);
    });
  }, [projectId]);

  useEffect(() => {
    if (props.simulations) {
      const simulations = props.simulations.filter(
        (simulation) => !simulation.group
      );

      const newState = {
        base: simulations,
      };

      const mapped = getMapped(newState, "simulations");
      setAllGroups((state) => ({ ...state, ...newState }));
      setAllItems(mapped);
      setSimulations(simulations);
    }
  }, [props.simulations]);

  useEffect(() => {
    api
      .get("simulation_groups", {
        params: {
          project: projectId,
        },
      })
      .then((response) => {
        const groups = response.data;
        const groupMap = {};

        groups.forEach((group) => {
          groupMap[group.name] = group.simulations;
        });
        setAllGroups((state) => ({
          ...state,
          ...groupMap,
        }));
        setGroups(keyBy(groups, "name"));
      });
  }, [projectId]);

  useEffect(() => {
    const mapped = getMapped(allGroups, "simulations");
    setAllItems(mapped);
  }, [allGroups]);

  const createGroup = (name) => {
    api
      .post("simulation_groups/", {
        name: name,
        project: projectId,
      })
      .then((response) => {
        setGroups({ ...groups, [name]: response.data });
        setAllGroups({ ...allGroups, [name]: [] });
        setVisibleModal(false);
      })
      .catch((e) => {
        const data = e.response?.data;

        if (data) {
          message.error(data[0]);
        }
      });
  };

  const onDragEnd = (simulationId, sourceId, destinationId, newIndex) => {
    if (!simulationId.includes("simulation")) {
      return;
    }
    const reorderedSimulations = getItems(allItems, "simulations", null);

    api
      .post(`simulations/reorder/`, {
        id: getId(simulationId),
        group: !getId(destinationId) ? null : getId(destinationId),
        sort_order: newIndex,
        items: reorderedSimulations,
      })
      .then((response) => console.log(response.data))
      .catch((e) => console.log(e));
  };

  if (openGroup) {
    return (
      <GroupView
        name={openGroup.name}
        items={openGroup.simulations}
        setOpenGroup={setOpenGroup}
        ItemComponent={SimulationValueCard}
        type={"simulations"}
        project={projectId}
      />
    );
  }

  return (
    simulations && (
      <div className="wrapper">
        <h2 className="project-name">{project.name}</h2>
        <h2 className="dashboard__header">Manage Simulations</h2>
        <Sortable
          allItems={allItems}
          setAllItems={setAllItems}
          allGroups={groups}
          setOpenGroup={setOpenGroup}
          type={"simulations"}
          ItemComponent={SimulationValueCard}
          onDragEnd={onDragEnd}
        />
        {allItems.length === 0 && (
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
          style={{ borderTop: allItems.length === 0 ? "none" : undefined }}
        >
          <a
            className="btn"
            href={`/projects/${props.match.params.id}/simulations/new`}
          >
            Add Simulation
          </a>
          {allItems.length !== 0 && (
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
