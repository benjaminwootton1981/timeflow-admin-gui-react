import React, { useEffect, useState } from "react";
import DragDropSelect from "../assets/group_drag_select.svg";
import GroupChildsSVG from "../assets/group_childs.svg";
import { ReactSortable } from "react-sortablejs";
import classNames from "classnames";
import PlayIconSVG from "../assets/play_icon.svg";
import { capitalize } from "lodash";
import api from "../api";
import { getItems, getId } from "./stream/home";

const GroupCard = ({
  group,
  items,
  allItems,
  setAllItems,
  setOpenGroup,
  type,
}) => {
  const [currentItems, setCurrentItems] = useState(items);

  useEffect(() => {
    const currentGroup = allItems.find((item) => item.value === group.name);
    setCurrentItems(currentGroup[type]);
  }, [allItems, type]);

  const updateItems = (groupList) => {
    // find the original group and update it with the new list
    const index = allItems.map((item) => item.value).indexOf(group.name);
    allItems[index][type] = groupList;
    setCurrentItems(groupList);
    setAllItems(allItems);
  };

  const onDragEnd = (streamId, sourceId, destinationId, newIndex) => {
    if (!streamId.includes("stream")) {
      return;
    }

    const reorderedItems = getItems(currentItems, type, group.id);

    api
      .post(`${type}/reorder/`, {
        id: getId(streamId),
        group: !getId(destinationId) ? null : getId(destinationId),
        sort_order: newIndex,
        items: reorderedItems,
      })
      .then((response) => console.log(response.data));
  };

  return (
    <div className="group__card drag_card_container">
      <h2 className="card__header handle">
        {group.name}
        <img
          src={DragDropSelect}
          className="card__header-right"
          alt="Drag Drop Select"
          onClick={() =>
            setOpenGroup({ name: group.name, [type]: currentItems })
          }
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
            name: group.name,
            pull: group.name !== "Organisation Shared Streams",
            put: (_, __, element) => {
              return !element.id.includes("group");
            },
          }}
          animation="150"
          fallbackOnBody
          swapThreshold={0.65}
          id={group.id}
          onEnd={(evt) => {
            const itemEl = evt.item; // dragged HTMLElement

            onDragEnd(itemEl.id, evt.from.id, evt.to.id, evt.newIndex);
          }}
        >
          {currentItems.map((item) => {
            return (
              <div
                className="tile-content"
                key={item.id}
                id={`group-${type}-${item.value.id}`}
              >
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
