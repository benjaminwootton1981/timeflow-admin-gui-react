import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import DragIcon from "../../assets/drag-icon.svg";

const StreamValueCard = ({ post: item, isDragging }) => {
  const [events, setEvents] = useState(0);

  useEffect(() => {
    if (item) {
      axios
        .get(`${API_URL}stream_events`, { params: { stream: item.id } })
        .then((response) => {
          setEvents(response.data.eventCount);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [item]);

  if (!item) {
    return null;
  }

  return (
    <div className="Valuecard">
      <h2 className="valueHeader handle">{item.display_name}</h2>
      <div className="cardBody">
        {isDragging && (
          <div className="stream__dragging">
            <img src={DragIcon} alt="" />
          </div>
        )}
        <div className="grid">
          <div className="cardItem smallItem">
            <span className="cardInput" data-header="Number Of Events">
              {events}
            </span>
          </div>
          <div className="cardItem smallItem">
            <span className="cardInput" data-header="Number Of Errors">
              0
            </span>
          </div>
        </div>
        <span className="cardInput greenOutline" data-header="Status">
          Healthy
        </span>
      </div>
      <div className="cardFooter">
        <a
          href={`/projects/${item.project && item.project.id}/streams/${
            item.id
          }/edit/`}
          className="edit"
        >
          <span className="helper">Edit</span>
        </a>
        <a
          href={`/projects/${item.project && item.project.id}/streams/${
            item.id
          }/analyse`}
          className="export"
        >
          <span className="helper">Analyse</span>
        </a>
        <a
          href={`/projects/${item.project && item.project.id}/streams/${
            item.id
          }/reset`}
          className="reset"
        >
          <span className="helper">Reset</span>
        </a>
        <a
          href={`/projects/${item.project && item.project.id}/streams/${
            item.id
          }/delete/`}
          className="delete"
        >
          <span className="helper">Delete</span>
        </a>
      </div>
    </div>
  );
};

export default StreamValueCard;
