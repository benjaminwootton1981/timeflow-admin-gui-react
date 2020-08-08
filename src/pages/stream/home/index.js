import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { StreamValueCard } from "../../../components";
import { getStreams } from "../../../store/actions/serviceAction";

import EmptyStreamsSVG from "../../../assets/empty-streams.svg";
import "./style.scss";
import CreateGroupModal from "../../../modals/CreateGroupModal";
import { keyBy, omit, last, filter } from "lodash";
import GroupView from "../../GroupView";
import Sortable from "../../Sortable";
import api from "../../../api";
import { message } from "antd";

export const getMapped = (allGroups, type) => {
  const groups = Object.keys(omit(allGroups, "base"));
  const mapped = [];
  allGroups.base.concat(groups).forEach((value, index) => {
    const items = allGroups[value]?.map((value, index) => ({
      id: value.id,
      value,
    }));
    const mappedItem = {
      id: value.id || value,
      value,
      [type]: items,
    };
    mapped.push(mappedItem);
  });

  return mapped;
};

export const getId = (input) => {
  return parseInt(last(input.split("-")));
};

export const getItems = (allItems, type, group) => {
  return allItems
    .filter((item) => !item[type])
    .map((item, index) => ({ id: item.id, sort_order: index, group }));
};

export const reorderAllGroups = (allItems, allGroups, setAllGroups) => {
  const updatedItems = keyBy(allItems, "id");
  const base = filter(allItems, (item) => {
    return !item.streams;
  }).map((s) => s.value);
  const groups = { ...allGroups, base };
  Object.keys(groups).forEach((key) => {
    const streams = updatedItems[key]?.streams;
    if (streams) {
      groups[key] = streams.map((s) => s.value);
    }
  });

  setAllGroups(groups);
};

function ManageStream(props) {
  const [streams, setStreams] = useState([]);
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
    props.onGetStreams(projectId);
  }, [projectId]);

  useEffect(() => {
    api.get(`projects/${projectId}`).then((response) => {
      setProject(response.data);
    });
  }, [projectId]);

  useEffect(() => {
    if (props.streams) {
      const streams = props.streams.filter(
        (stream) => !stream.share && !stream.group
      );

      const newState = {
        base: streams,
      };

      const mapped = getMapped(newState, "streams");
      setAllGroups((state) => ({ ...state, ...newState }));
      setAllItems(mapped);
      setStreams(streams);
    }
  }, [props.streams]);

  useEffect(() => {
    api
      .get("stream_groups", {
        params: {
          project: projectId,
        },
      })
      .then((response) => {
        const groups = response.data;
        const groupMap = {};

        groups.forEach((group) => {
          groupMap[group.name] = group.streams;
        });
        setAllGroups((state) => ({
          ...state,
          ...groupMap,
        }));
        setGroups(keyBy(groups, "name"));
      });
  }, [projectId]);

  useEffect(() => {
    const mapped = getMapped(allGroups, "streams");
    setAllItems(mapped);
  }, [allGroups]);

  const createGroup = (name) => {
    api
      .post("stream_groups/", { name: name, project: projectId })
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

  const deleteGroup = (group) => {
    api.delete(`stream_groups/${group.id}/`).then(() => {
      setGroups(omit(groups, group.name));
      setAllGroups(omit(allGroups, group.name));
    });
  };

  const reorderGroups = () => {
    reorderAllGroups(allItems, allGroups, setAllGroups);
  };

  const onDragEnd = (streamId, sourceId, destinationId, newIndex) => {
    console.log(streamId);
    if (!streamId.includes("stream")) {
      return;
    }
    const reorderedStreams = getItems(allItems, "streams", null);

    api
      .post(`streams/reorder/`, {
        id: getId(streamId),
        group: !getId(destinationId) ? null : getId(destinationId),
        sort_order: newIndex,
        items: reorderedStreams,
      })
      .then(reorderGroups)
      .catch((e) => console.log(e));
  };

  if (openGroup) {
    return (
      <GroupView
        name={openGroup.name}
        items={openGroup.streams}
        setOpenGroup={setOpenGroup}
        ItemComponent={StreamValueCard}
        type={"streams"}
        project={projectId}
      />
    );
  }

  return (
    <div className="wrapper">
      <h2 className="project-name">{project.name}</h2>
      <h2 className="dashboard__header">Manage Streams</h2>
      <Sortable
        allItems={allItems}
        setAllItems={setAllItems}
        allGroups={groups}
        setOpenGroup={setOpenGroup}
        type={"streams"}
        ItemComponent={StreamValueCard}
        onDragEnd={onDragEnd}
        onGroupDelete={deleteGroup}
        reorderGroups={reorderGroups}
      />
      {allItems.length === 0 && (
        <div className="empty">
          <span className="empty__text">No streams are available.</span>
          <img
            src={EmptyStreamsSVG}
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
          href={`/projects/${props.match.params.id}/streams/new`}
        >
          Add Stream
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
  );
}

const mapStateToProps = (state) => {
  return {
    streams: state.ServiceReducer.streams,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetStreams: (id) => {
      dispatch(getStreams(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageStream);
