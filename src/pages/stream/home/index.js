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
import { ReactSortable } from "react-sortablejs";
import PlayIconSVG from "../../../assets/play_icon.svg";

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

export const GroupCard = ({ group, groups, allItems, setAllItems }) => {
  const [currentStreams, setCurrentStreams] = useState([]);

  useEffect(() => {
    const currentGroup = allItems.find((item) => item.value === group);
    setCurrentStreams(currentGroup.streams);
  }, [allItems]);

  const updateItems = (groupList) => {
    const index = allItems.map((item) => item.value).indexOf(group);
    allItems[index].streams = groupList;
    setCurrentStreams(groupList);
    setAllItems(allItems);
  };

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
        {currentStreams.length > 0 && (
          <div className="card__body_header">
            <span>Running Streams</span>
            <div className="right">
              {currentStreams.length}{" "}
              <img src={GroupChildsSVG} className="green" alt="Child Count" />
            </div>
          </div>
        )}

        <ReactSortable
          list={currentStreams}
          setList={(list) => updateItems(list)}
          className="group__card_content"
          group={{
            name: group,
            pull: true,
            put: (_, __, element) => {
              return !element.id.includes("group");
            },
          }}
          animation="150"
          fallbackOnBody
          swapThreshold={0.65}
        >
          {currentStreams.map((item) => {
            return (
              <div className="tile-content" key={item.id}>
                {item.value.display_name} <img src={PlayIconSVG} alt="Play" />
              </div>
            );
          })}
        </ReactSortable>
      </div>
    </div>
  );
};
function ManageStream(props) {
  const [streams, setStreams] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [allGroups, setAllGroups] = useState({
    base: [],
    orgStreams: [],
  });

  const [allItems, setAllItems] = useState([]);
  const [currentDragIndex, setCurrentDragIndex] = useState(-1);
  const groups = Object.keys(omit(allGroups, "base"));

  useEffect(() => {
    const mapped = allGroups.base.concat(groups).map((value, index) => ({
      id: index + 1,
      value,
      streams: allGroups[value],
    }));
    setAllItems(mapped);
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

      setAllGroups((state) => ({
        ...state,
        base: streams,
      }));

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
        <ReactSortable
          list={allItems}
          setList={setAllItems}
          className={"streams"}
          animation={200}
          delayOnTouchStart={true}
          delay={2}
          ghostClass="sortable-ghost"
          group={{ name: "root", put: groups, pull: true }}
        >
          {allItems.map((item) => {
            const isGroup = !!allGroups[item.value];
            if (isGroup) {
              return (
                <div key={item.id} id={`group-${item.id}`}>
                  <GroupCard
                    streams={item.streams}
                    group={item.value}
                    groups={groups}
                    setAllGroups={setAllGroups}
                    allItems={allItems}
                    setAllItems={setAllItems}
                  />
                </div>
              );
            }

            return (
              <div key={item.id}>
                <StreamValueCard post={item.value} isDragging={item.chosen} />
              </div>
            );
          })}
        </ReactSortable>
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
