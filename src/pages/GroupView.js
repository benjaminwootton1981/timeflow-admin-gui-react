import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";

const GroupView = ({ name, items, setOpenGroup, ItemComponent }) => {
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    setCurrentItems(items);
  }, [items]);

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
        list={currentItems}
        setList={setCurrentItems}
        className={"streams"}
        animation={200}
        ghostClass="sortable-ghost"
        group={{ name: "root", put: true, pull: true }}
        handle=".handle"
        swapThreshold={0.5}
      >
        {currentItems.map((stream) => {
          return (
            <ItemComponent
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
