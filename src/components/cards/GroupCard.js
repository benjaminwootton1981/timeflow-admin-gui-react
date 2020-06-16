import React, { useState } from "react";

import DragDropGroup from '../../assets/group_drag_drop.svg';
import DragDropSelect from '../../assets/group_drag_select.svg';

export default function GroupCard(props) {
  return (
      <div className="group__card">
        <h2 className="card__header">
            {props.item.name}
            <img src={DragDropSelect} className="card__header-right" alt="Drag Drop Select" />
        </h2>
        <div className="card__body">
            <div className="content-empty">
                <img src={DragDropGroup} alt="Drag Drop Select Empty" />
                <p>No items in Group, <br />click on + add in new items.</p>
                <button className="btn create__group"><span>+ Add Items</span></button>
            </div>
        </div>
      </div>
  );
}

