import React, { useState } from "react";

import DragDropGroup from '../../assets/group_drag_drop.svg';
import DragDropSelect from '../../assets/group_drag_select.svg';

export default function GroupCard(props) {
  return (
      <div className="group__card">
        <h2 className="card__header">
          Customer Operations Group
          <img src={DragDropSelect} className="card__header-right" alt="Drag Drop Select" />
        </h2>
        <div className="card__body">
            <div className="content-empty">
                <img src={DragDropGroup} alt="Drag Drop Select Empty" />
                <p>Drag items here to add <br />them to the group</p>
            </div>
        </div>
      </div>
  );
}

