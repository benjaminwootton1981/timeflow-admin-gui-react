import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { StreamValueCard } from "../components";

const GroupView = ({ name, streams, setOpenGroup }) => {
  const [currentStreams, setCurrentStreams] = useState([]);

  useEffect(() => {
    setCurrentStreams(streams);
  }, [streams]);

  return (
    <div className="wrapper group">
      <h2 className="project-name">Manage Streams</h2>
      <h2 className="dashboard__header">{name}</h2>
      <div className="group__toggles">
        <button
          className={"btn create__group"}
          onClick={() => setOpenGroup(undefined)}
        >
          Go back
        </button>
      </div>
      <ReactSortable
        list={currentStreams}
        setList={setCurrentStreams}
        className={"streams"}
        animation={200}
        ghostClass="sortable-ghost"
        group={{ name: "root", put: true, pull: true }}
        handle=".handle"
        swapThreshold={0.5}
      >
        {currentStreams.map((stream) => {
          return (
            <StreamValueCard
              post={stream.value}
              key={stream.value.id}
              isDragging={stream.chosen}
            />
          );
        })}
      </ReactSortable>
    </div>
  );
};

export default GroupView;
