import React from "react";
import {
  SimulationValueCard,
  StreamProcessorValueCard,
  StreamValueCard,
} from "../index";
import { Draggable, Droppable } from "react-beautiful-dnd";

const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging && "lightblue",
  ...draggableStyle,
});

const DragItem = ({ item, index }) => (
  <Draggable draggableId={item.name} index={index} key={item.name}>
    {(provided, snapshot) => (
      <div
        className="drag_card_container"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
      >
        {item.type === "stream" && (
          <StreamValueCard post={item} itemIdx={item.id} />
        )}
        {item.type === "simulation" && (
          <SimulationValueCard post={item} itemIdx={item.id} />
        )}
        {item.type === "streamprocessor" && (
          <StreamProcessorValueCard post={item} itemIdx={item.id} />
        )}
      </div>
    )}
  </Draggable>
);

export default DragItem;
