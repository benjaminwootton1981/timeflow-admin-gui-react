import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StreamValueCard } from "../../../components";
import { getStreams } from "../../../store/actions/serviceAction";

import EmptyStreamsSVG from "../../../assets/empty-streams.svg";
import "./style.scss";
import CreateGroupModal from "../../../modals/CreateGroupModal";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { omit, size } from "lodash";
import DragDropSelect from "../../../assets/group_drag_select.svg";
import GroupChildsSVG from "../../../assets/group_childs.svg";
import DragDropGroup from "../../../assets/group_drag_drop.svg";

import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

const SortableItem = SortableElement(({ value, allGroups, isDragging }) => {
  const isGroup = !!allGroups[value];
  if (isGroup) {
    return <GroupCard group={value} streams={allGroups[value]} />;
  }

  return (
    <StreamValueCard post={value} key={value.id} isDragging={isDragging} />
  );
});

const SortableList = SortableContainer(
  ({ items, allGroups, currentDragIndex }) => {
    return (
      <div className={"streams"}>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${value.name || value}`}
            index={index}
            value={value}
            allGroups={allGroups}
            isDragging={currentDragIndex === index}
          />
        ))}
      </div>
    );
  }
);

export const GroupCard = ({ streams, group }) => {
  return (
    <div className="group__card drag_card_container">
      <h2 className="card__header">
        {group}
        <img
          src={DragDropSelect}
          className="card__header-right"
          alt="Drag Drop Select"
        />
      </h2>
      <div className="card__body">
        {streams.length > 0 && (
          <div className="card__body_header">
            <span>Running Streams</span>
            <div className="right">
              {streams.length}{" "}
              <img src={GroupChildsSVG} className="green" alt="Child Count" />
            </div>
          </div>
        )}
        {size(streams) === 0 && (
          <div className="content-empty">
            <img src={DragDropGroup} alt="Drag Drop Select Empty" />
            <p>
              Drag items here to add <br />
              them to the group.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
function ManageStream(props) {
  const [streams, setStreams] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [allGroups, setAllGroups] = useState({ base: [], orgStreams: [] });

  const [allItems, setAllItems] = useState([]);
  const [currentDragIndex, setCurrentDragIndex] = useState(-1);

  useEffect(() => {
    const groups = Object.keys(omit(allGroups, "base"));
    setAllItems(allGroups.base.concat(groups));
  }, [allGroups]);

  useEffect(() => {
    props.onGetStreams(props.match.params.id);
  }, []);

  useEffect(() => {
    const addType = (stream) => {
      stream.type = "stream";
      return stream;
    };

    if (props.streams) {
      const orgStreams = props.streams
        .filter((stream) => stream.share)
        .map(addType);

      const streams = props.streams
        .filter((stream) => !stream.share)
        .map(addType);

      setAllGroups((state) => ({ ...state, base: streams }));

      if (orgStreams.length) {
      }

      setStreams(streams);
    }
  }, [props.streams]);

  const createGroup = (name) => {
    setAllGroups({ ...allGroups, [name]: [] });
    setVisibleModal(false);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setAllItems(arrayMove(allItems, oldIndex, newIndex));
    setCurrentDragIndex(-1);
  };

  return (
    props.streams && (
      <div className="wrapper">
        <h2 className="project-name">
          {streams.length > 0 && streams[0].project && streams[0].project.name}
        </h2>
        <h2 className="dashboard__header">Manage Streams</h2>
        <SortableList
          items={allItems}
          onSortEnd={onSortEnd}
          allGroups={allGroups}
          axis={"xy"}
          updateBeforeSortStart={({ index }) => {
            setCurrentDragIndex(index);
          }}
          currentDragIndex={currentDragIndex}
          pressDelay={200}
        />
        {props.streams.length === 0 && (
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
          style={{ borderTop: props.streams.length === 0 ? "none" : undefined }}
        >
          <a
            className="btn"
            href={`/projects/${props.match.params.id}/streams/new`}
          >
            Add Stream
          </a>
          {streams.length !== 0 && (
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
