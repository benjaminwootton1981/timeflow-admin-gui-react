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
    >
      {allItems.map((item) => {
        const isGroup = !!allGroups[item.value];
        if (isGroup) {
          return (
            <div key={item.id} id={`group-${item.id}`}>
              <GroupCard
                group={item.value}
                allItems={allItems}
                setAllItems={setAllItems}
                setOpenGroup={setOpenGroup}
                type={type}
              />
            </div>
          );
        }

        return (
          <div key={item.id}>
            <ItemComponent post={item.value} isDragging={item.chosen} />
          </div>
        );
      })}
    </ReactSortable>
  );
};

export default Sortable;
