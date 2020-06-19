import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";

const StreamValueCard = ({ post: item }) => {
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

  if (!item){
    return null
  }

  return (
    <div className="Valuecard">
      <h2 className="valueHeader">{item.display_name}</h2>
      <div className="cardBody">
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
          }/monitor`}
          className="monitor"
        >
          <span className="helper">Monitor</span>
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
