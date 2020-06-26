import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { StreamValueCard } from "../../../components";
import { getStreams } from "../../../store/actions/serviceAction";

import EmptyStreamsSVG from "../../../assets/empty-streams.svg";
import "./style.scss";
import CreateGroupModal from "../../../modals/CreateGroupModal";
import { omit } from "lodash";
import DragDropSelect from "../../../assets/group_drag_select.svg";
import GroupChildsSVG from "../../../assets/group_childs.svg";
import { ReactSortable } from "react-sortablejs";
import PlayIconSVG from "../../../assets/play_icon.svg";
import classNames from "classnames";

export const GroupCard = ({ group, allItems, setAllItems }) => {
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
      <h2 className="card__header handle">
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
          className={classNames("group__card_content", {
            "empty-list": currentStreams.length === 0,
          })}
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
  const projectId = props.match.params.id;

  const getMapped = useCallback((allGroups) => {
    const groups = Object.keys(omit(allGroups, "base"));
    const mapped = [];
    allGroups.base.concat(groups).forEach((value, index) => {
      mapped.push({
        id: value.id || value,
        value,
        streams: allGroups[value]?.map((value, index) => ({
          id: value.id,
          value,
        })),
      });
    });

    return mapped;
  }, []);

  useEffect(() => {
    props.onGetStreams(projectId);
  }, [projectId]);

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

      const newState = {
        base: streams,
      };

      if (orgStreams.length) {
        newState.orgStreams = orgStreams;
      }

      const mapped = getMapped(newState);
      setAllGroups(newState);
      setAllItems(mapped);
      setStreams(streams);
    }
  }, [props.streams, getMapped]);

  useEffect(() => {
    const mapped = getMapped(allGroups);
    setAllItems([...mapped]);
  }, [allGroups, getMapped]);

  const createGroup = (name) => {
    setAllGroups({ ...allGroups, [name]: [] });
    setVisibleModal(false);
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
          ghostClass="sortable-ghost"
          group={{ name: "root", put: true, pull: true }}
          handle=".handle"
          swapThreshold={0.5}
        >
          {allItems.map((item) => {
            const isGroup = !!allGroups[item.value];
            if (isGroup) {
              return (
                <div key={item.id} id={`group-${item.id}`}>
                  <GroupCard
                    group={item.value}
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
