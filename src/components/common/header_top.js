import React from 'react';

import MenuIconProjectSVG from "../../assets/design/main-nav/menu_icon_project.svg";
import MenuIconDataSVG from "../../assets/design/main-nav/menu_icon_data.svg";
import MenuIconManageSVG from "../../assets/design/main-nav/menu_icon_manage.svg";
import LogoSVG from "../../assets/design/logo.svg";
import MenuIconReportingSVG from "../../assets/design/main-nav/menu_icon_reporting.svg";
import MenuIconWorkflowSVG from "../../assets/design/main-nav/menu_icon_workflow.svg";
import MenuIconHelpSVG from "../../assets/design/main-nav/menu_icon_help.svg";

export default function TopHeader() {
  return (
      <div className="header__top">
        <nav className="main-nav">
          <ul>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                  <span>
                      <img src={MenuIconProjectSVG} alt="Project" />
                  </span>Project
              </a>
              <div className="submenu__wrapper">
                <ul className="submenu">
                  <li className="submenu__item">
                    <a className="submenu__link" href="/projects/XXXX/details">Details</a>
                    <a className="submenu__link" href="/projects/XXXX/collaboration">Collaborators</a>
                  </li>
                </ul>
              </div>
            </li>

            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                                <span>
                                    <img src={MenuIconDataSVG} alt="Data" />
                                </span>Data</a>
              <div className="submenu__wrapper">
                <ul className="submenu">
                  <li className="submenu__item">
                    <a className="submenu__link" href="/projects/XXXX/searches/search">Search</a>
                    <a className="submenu__link" href="/projects/XXXX/integration/import">Import</a>
                    <a className="submenu__link" href="/projects/2/searches/extract">Extract</a>
                    <a className="submenu__link" href="/projects/XXXX/simulate">Simulate</a>
                    <a className="submenu__link" href="/projects/XXXX/api_endpoints">API Connection Details</a>
                    <a className="submenu__link" href="/projects/XXXX/integration">Timeflow Connector</a>
                  </li>
                </ul>
              </div>
            </li>

            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                                <span>
                                    <img src={MenuIconManageSVG} alt="Manage" />
                                </span>Manage</a>
              <div className="submenu__wrapper">
                <ul className="submenu">
                  <li className="submenu__item">
                    <a className="submenu__link" href="#">Event Definitions</a>
                  </li>
                  <li className="submenu__item">
                    <a className="submenu__link" href="#">Event Streams</a>
                    <li className="submenu__item">
                      <a className="submenu__link" href="#">Stream Processors</a>
                    </li>
                    <li className="submenu__item">
                      <a className="submenu__link" href="#">Saved Searches</a>
                    </li>
                    <li className="submenu__item">
                      <a className="submenu__link" href="#">Metrics & KPIs</a>
                    </li>
                    <li className="submenu__item">
                      <a className="submenu__link" href="#">Functions</a>
                    </li>
                    <li className="submenu__item">
                      <a className="submenu__link" href="#">Reports</a>
                    </li>

                    <li className="submenu__item">
                      <a className="submenu__link" href="#">Timelines</a>
                    </li>
                    <li className="submenu__item">
                      <a className="submenu__link" href="#">Data Dictionaries</a>
                    </li>
                  </li>

                </ul>
              </div>
            </li>

            <li className="main-nav__item">
              <a href="#">
                <img className="logo-image" src={LogoSVG} width="120" height="56" alt="Timeflow" />
              </a>
            </li>

            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                                <span>
                                    <img src={MenuIconReportingSVG} alt="Reporting" />
                                </span>Reporting</a>
              <div className="submenu__wrapper">
                <ul className="submenu">
                  <li className="submenu__item">
                    <a className="submenu__link" href="#">Reports</a>
                    <a className="submenu__link" href="#">Metrics & KPIs</a>
                    <a className="submenu__link" href="#">Searches</a>
                  </li>
                </ul>
              </div>
            </li>

            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                                 <span>
                                    <img src={MenuIconWorkflowSVG} alt="Workflow" />
                                </span>Workflow</a>
              <div className="submenu__wrapper">
                <ul className="submenu">
                  <li className="submenu__item">
                    <a className="submenu__link"
                       href="#">Inbox</a>
                  </li>
                </ul>
              </div>
            </li>

            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                                <span>
                                    <img src={MenuIconHelpSVG} alt="Help" />
                                </span>Help</a>
              <div className="submenu__wrapper">
                <ul className="submenu">
                  <li className="submenu__item">
                    <a className="submenu__link" href="#">Guides</a>
                    <a className="submenu__link"
                       href="http://timeflow.systems/timeflow-labs-new" target="_blank">Timeflow
                      Labs</a>
                    <a className="submenu__link" href="http://timeflow.systems/"
                       target="_blank">Timeflow Homepage</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
  );
}
