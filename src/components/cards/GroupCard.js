import React, { useState } from "react";
import { Droppable, Draggable } from 'react-beautiful-dnd';

import DragDropGroup from '../../assets/group_drag_drop.svg';
import DragDropSelect from '../../assets/group_drag_select.svg';
import GroupChildsSVG from '../../assets/group_childs.svg';
import PlayIconSVG from '../../assets/play_icon.svg';

const Item = ({ name, index }) => (
    <Draggable key={name} draggableId={name} index={index}>
        {provided => {
            return (
                <div
                    className="menu-item tile tile-centered"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="tile-content">{name} <img src={PlayIconSVG} alt="Play" /> </div>
                </div>
            );
        }}
    </Draggable>
);

const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging && ("lightblue"),
    ...draggableStyle,
});


export default function GroupCard({item, index}) {
  return (
    <Draggable
      draggableId={`group-${index}`}
      index={index}
      key={item.name}
    >
      {(provided, snapshot) => (
        <div className="group__card drag_card_container"
             ref={provided.innerRef}
             {...provided.draggableProps}
             {...provided.dragHandleProps}
             style={getItemStyle(
                 snapshot.isDragging,
                 provided.draggableProps.style
             )}>
          <h2 className="card__header">
              {item.name}
              <img src={DragDropSelect} className="card__header-right" alt="Drag Drop Select" />
          </h2>
          <div className="card__body">
              {
                  item.childs.length > 0 && (
                      <div className="card__body_header">
                          <span>Running { item.childs[0].type === 'stream' ? 'Streams' : item.childs[0].type === 'simulation' ? 'Simulations' : 'Stream Processors'}</span>
                          <div className="right">{item.childs.length} <img src={GroupChildsSVG} className="green" alt="Child Count" /></div>
                      </div>
                  )
              }
              <Droppable droppableId={`group-drop-${index}`} isDropDisabled={false} style={{ zIndex: 100 }}>
                  {provided => (
                      <div className="group__card_content" {...provided.droppableProps} ref={provided.innerRef}>
                          {
                              item.childs && item.childs.map((child, index) => (
                                  <Item key={child.name} name={child.name} index={index} />
                              ))
                          }
                          {
                              (item.childs && item.childs.length === 0) && (
                                  <div className="content-empty">
                                      <img src={DragDropGroup} alt="Drag Drop Select Empty" />
                                      <p>Drag items here to  add <br />them to the group.</p>
                                  </div>
                              )
                          }
                          {provided.placeholder}
                      </div>
                  )}
              </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  );
}

