import React from "react";

import MenuAvatarSVG from "../../assets/design/submenu/menu_avatar.svg";
import MenuLogOutSVG from "../../assets/design/submenu/menu_icon_logout.svg";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

export default function BottomHeader() {
  const currentUser = useSelector((state) => state.currentUser);
  const config = useSelector((state) => state.config);
  const history = useHistory();
  const currentPath = history.location.pathname;
  const projectId = currentPath.match("[0-9]+")?.[0];

  return (
    <div className="header__bottom">
      <div className="user">
        <img className="user__avatar" src={MenuAvatarSVG} alt="avatar" />
        <a className="user__email" href="#">
          {" "}
          {currentUser && `${currentUser.first_name} ${currentUser.last_name}`}
        </a>
      </div>
      <nav className="second-nav">
        <ul>
          <li className="second-nav__item">
            <a
              className="second-nav__link"
              href={`/projects/${projectId}/streamprocessors/all-logs/`}
            >
              All Logs
            </a>
          </li>
          <li className="second-nav__item">
            <a
              className="second-nav__link"
              href={`http://${config.pivot_url}`}
              target="_blank"
            >
              Pivot Reporting
            </a>
          </li>
          <li className="second-nav__item">
            <a
              className="second-nav__link"
              href={`http://${config.superset_url}`}
              target="_blank"
            >
              Superset Reporting
            </a>
          </li>

          <nav className="main-nav">
            <li className="main-nav__item">
              <a
                className="second-nav__link"
                href={`http://${config.druid_url}`}
                target="_blank"
              >
                Druid Console
              </a>
            </li>
          </nav>

          <nav className="main-nav">
            <li className="main-nav__item">
              <a
                className="second-nav__link"
                href={`http://${config.jupyter_url}`}
                target="_blank"
              >
                Jupyter Notebook
              </a>
            </li>
          </nav>
        </ul>
      </nav>
      <div className="logout-wrapper">
        <a href="#" onClick="logout()">
          <button className="logout-btn" type="button">
            <img src={MenuLogOutSVG} alt="exit icon" width="15" height="15" />
            Logout
          </button>
        </a>
      </div>
    </div>
  );
}
