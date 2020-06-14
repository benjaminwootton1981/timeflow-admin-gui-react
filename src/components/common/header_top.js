import React, {useEffect, useState} from 'react';

import { withRouter } from 'react-router-dom';

import MenuIconProjectSVG from "../../assets/design/main-nav/menu_icon_project.svg";
import MenuIconDataSVG from "../../assets/design/main-nav/menu_icon_data.svg";
import MenuIconManageSVG from "../../assets/design/main-nav/menu_icon_manage.svg";
import LogoSVG from "../../assets/design/logo.svg";
import MenuIconReportingSVG from "../../assets/design/main-nav/menu_icon_reporting.svg";
import MenuIconWorkflowSVG from "../../assets/design/main-nav/menu_icon_workflow.svg";
import MenuIconHelpSVG from "../../assets/design/main-nav/menu_icon_help.svg";

function TopHeader(props) {
  const [id, setId] = useState(0);

  useEffect(() => {
    let id = props.location.pathname.split('/')[2];
    setId(id);
  }, []);

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
                    <a className="submenu__link" href={`/projects/${id}/details`}>Details</a>
                    <a className="submenu__link" href={`/projects/${id}/collaboration`}>Collaborators</a>
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
                    <a className="submenu__link" href={`/projects/${id}/searches/search`}>Search</a>
                    <a className="submenu__link" href={`/projects/${id}/integration/import`}>Import</a>
                    <a className="submenu__link" href={`/projects/${id}/searches/extract`}>Extract</a>
                    <a className="submenu__link" href={`/projects/${id}/simulate`}>Simulate</a>
                    <a className="submenu__link" href={`/projects/${id}/api_endpoints`}>API Connection Details</a>
                    <a className="submenu__link" href={`/projects/${id}/integration`}>Timeflow Connector</a>
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
                    <a className="submenu__link" href={`/projects/${id}/schemas`}>Event Definitions</a>
                  </li>
                  <li className="submenu__item">
                    <a className="submenu__link" href={`/projects/${id}/streams`}>Event Streams</a>
                    <li className="submenu__item">
                      <a className="submenu__link" href={`/projects/${id}/streamprocessors`}>Stream Processors</a>
                    </li>
                    <li className="submenu__item">
                      <a className="submenu__link" href={`/projects/${id}/searches`}>Saved Searches</a>
                    </li>
                    <li className="submenu__item">
                      <a className="submenu__link" href={`/projects/${id}/kpis`}>Metrics & KPIs</a>
                    </li>
                    <li className="submenu__item">
                      <a className="submenu__link" href={`/projects/${id}/functions`}>Functions</a>
                    </li>
                    <li className="submenu__item">
                      <a className="submenu__link" href={`/projects/${id}/analysis`}>Reports</a>
                    </li>

                    <li className="submenu__item">
                      <a className="submenu__link" href={`/projects/${id}/timelines`}>Timelines</a>
                    </li>
                    <li className="submenu__item">
                      <a className="submenu__link" href={`/projects/${id}/datadictionaries`}>Data Dictionaries</a>
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
                    <a className="submenu__link" href={`/projects/${id}/analysis/list`}>Reports</a>
                    <a className="submenu__link" href={`/projects/${id}/streamprocessors/kpis/current`}>Metrics & KPIs</a>
                    <a className="submenu__link" href={`/projects/${id}/searches/list`}>Searches</a>
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
                    <a className="submenu__link" href="/account/XXXXXX/workflow">Inbox</a>
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
                    <a className="submenu__link" href="/help">Guides</a>
                    <a className="submenu__link"
                       href="http://timeflow.systems/timeflow-labs-new" target="http://timeflow.systes/timeflow-labs-new">Timeflow Labs</a>
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

export default withRouter(TopHeader)
