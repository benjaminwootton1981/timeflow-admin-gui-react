import React, { useEffect, useState } from "react";
import DragDropSelect from "../assets/group_drag_select.svg";
import GroupChildsSVG from "../assets/group_childs.svg";
import { ReactSortable } from "react-sortablejs";
import classNames from "classnames";
import PlayIconSVG from "../assets/play_icon.svg";
import { capitalize } from "lodash";

const GroupCard = ({ group, allItems, setAllItems, setOpenGroup, type }) => {
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    const currentGroup = allItems.find((item) => item.value === group);
    setCurrentItems(currentGroup.streams);
  }, [allItems]);

  const updateItems = (groupList) => {
    const index = allItems.map((item) => item.value).indexOf(group);
    allItems[index].streams = groupList;
    setCurrentItems(groupList);
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
          onClick={() => setOpenGroup({ name: group, [type]: currentItems })}
        />
      </h2>
      <div className="card__body">
        {currentItems.length > 0 && (
          <div className="card__body_header">
            <span>Running {capitalize(type)}</span>
            <div className="right">
              {currentItems.length}{" "}
              <img src={GroupChildsSVG} className="green" alt="Child Count" />
            </div>
          </div>
        )}

        <ReactSortable
          list={currentItems}
          setList={(list) => updateItems(list)}
          className={classNames("group__card_content", {
            "empty-list": currentItems.length === 0,
          })}
          group={{
            name: group,
            pull: group !== "Organisation Shared Streams",
            put: (_, __, element) => {
              return !element.id.includes("group");
            },
          }}
          animation="150"
          fallbackOnBody
          swapThreshold={0.65}
        >
          {currentItems.map((item) => {
            return (
              <div className="tile-content" key={item.id}>
                {item.value.display_name || item.value.name}{" "}
                <img src={PlayIconSVG} alt="Play" />
              </div>
            );
          })}
        </ReactSortable>
      </div>
    </div>
  );
};

export default GroupCard;
