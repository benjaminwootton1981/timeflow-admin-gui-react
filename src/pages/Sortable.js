import React from "react";
import GroupCard from "./GroupCard";
import { ReactSortable } from "react-sortablejs";

const Sortable = ({
  allItems,
  setAllItems,
  allGroups,
  setOpenGroup,
  type,
  ItemComponent,
  onDragEnd,
}) => {
  return (
    <ReactSortable
      list={allItems}
      setList={setAllItems}
      className={"streams"}
      animation={200}
      ghostClass="sortable-ghost"
      group={{ name: "root", put: true, pull: true }}
      handle=".handle"
      swapThreshold={0.5}
      onEnd={(evt) => {
        const itemEl = evt.item; // dragged HTMLElement

        onDragEnd(itemEl.id, evt.from.id, evt.to.id, evt.newIndex);
      }}
      id={"group-0"}
    >
      {allItems.map((item) => {
        const group = allGroups[item.value];
        if (group) {
          return (
            <div key={item.id} id={`group-${group.id}`}>
              <GroupCard
                group={group}
                items={item[type]}
                allItems={allItems}
                setAllItems={setAllItems}
                setOpenGroup={setOpenGroup}
                type={type}
              />
            </div>
          );
        }

        return (
          <div key={item.id} id={`${type}-${item.value.id}`}>
            <ItemComponent post={item.value} isDragging={item.chosen} />
          </div>
        );
      })}
    </ReactSortable>
  );
};

export default Sortable;
