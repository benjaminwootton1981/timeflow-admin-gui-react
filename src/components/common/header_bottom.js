import React from "react";

import MenuAvatarSVG from "../../assets/design/submenu/menu_avatar.svg";
import MenuLogOutSVG from "../../assets/design/submenu/menu_icon_logout.svg";
import { useSelector } from "react-redux";

export default function BottomHeader() {
  const currentUser = useSelector((state) => state.currentUser) || {};
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
            <a className="second-nav__link" href="#">
              All Logs
            </a>
          </li>
          <li className="second-nav__item">
            <a
              className="second-nav__link"
              href="PIVOT_URL_PLACEHOLDER"
              target="_blank"
            >
              Pivot Reporting
            </a>
          </li>
          <li className="second-nav__item">
            <a
              className="second-nav__link"
              href="SUPERSET_URL_PLACEHOLDER"
              target="_blank"
            >
              Superset Reporting
            </a>
          </li>

          <nav className="main-nav">
            <li className="main-nav__item">
              <a className="second-nav__link" href="DRUID_URL_PLACEHOLDER">
                Druid Console
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
