import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { capitalize } from "lodash";

const GroupView = ({
  name,
  items,
  setOpenGroup,
  ItemComponent,
  type,
  project,
}) => {
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    setCurrentItems(items);
  }, [items]);

  return (
    <div className="wrapper group">
      <h2 className="project-name">Manage {capitalize(type)}</h2>
      <h2 className="dashboard__header">{name}</h2>
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

      <div className="group__toggles">
        <a className="btn" href={`/react/projects/${project}/${type}/new`}>
          Add {capitalize(type.slice(0, -1))}
        </a>
        <button
          className={"btn create__group"}
          onClick={() => setOpenGroup(undefined)}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default GroupView;
