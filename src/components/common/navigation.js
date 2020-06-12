import React, { Component } from 'react';

import LogoSVG from '../../assets/design/logo.svg';
import MenuIconProjectSVG from '../../assets/design/main-nav/menu_icon_project.svg';
import MenuIconDataSVG from '../../assets/design/main-nav/menu_icon_data.svg';
import MenuIconManageSVG from '../../assets/design/main-nav/menu_icon_manage.svg';
import MenuIconReportingSVG from '../../assets/design/main-nav/menu_icon_reporting.svg';
import MenuIconWorkflowSVG from '../../assets/design/main-nav/menu_icon_workflow.svg';
import MenuIconHelpSVG from '../../assets/design/main-nav/menu_icon_help.svg';
import MenuAvatarSVG from '../../assets/design/submenu/menu_avatar.svg';
import MenuLogOutSVG from '../../assets/design/submenu/menu_icon_logout.svg';

class NavigationBar extends Component {
    render() {
        return (
            <header>
                <div className="header__top">
                    <nav className="main-nav">
                        <ul>
                            <li className="main-nav__item">
                                <a className="main-nav__link" href="#">
                                <span>
                                    <img src={MenuIconProjectSVG} alt="Project" />
                                </span>Project</a>
                                <div className="submenu__wrapper">
                                    <ul className="submenu">
                                        <li className="submenu__item">
                                            <a className="submenu__link" href="#">Details</a>
                                            <a className="submenu__link" href="#">Collaborators</a>
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
                                            <div className="submenu__disabled grayout">
                                                Search
                                            </div>
                                            <div className="submenu__disabled grayout">
                                                Import
                                            </div>
                                            <div className="submenu__disabled grayout">
                                                Extract
                                            </div>
                                            <div className="submenu__disabled grayout">
                                                Simulate
                                            </div>
                                            <div className="submenu__disabled grayout">
                                                API Connection Details
                                            </div>
                                            <div className="submenu__disabled grayout">
                                                Timeflow Connector
                                            </div>
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
                                            <div className="submenu__disabled grayout">
                                                Event Streams
                                            </div>
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
                                        <li className="submenu__item submenu__disabled grayout">
                                            <div className="submenu__disabled grayout">
                                                Reports
                                            </div>
                                            <div className="submenu__disabled grayout">
                                                Metrics & KPIs
                                            </div>
                                            <div className="submenu__disabled grayout">
                                                Searches
                                            </div>
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
                <div className="header__bottom">
                    <div className="user">
                        <img className="user__avatar" src={MenuAvatarSVG} alt="avatar" />
                        <a className="user__email" href="#"> First Name Last Name</a>
                    </div>
                    <nav className="second-nav">
                        <ul>
                            <li className="second-nav__item">
                                <a className="second-nav__link"
                                   href="#">All Logs</a>
                            </li>
                            <li className="second-nav__item">
                                <a className="second-nav__link" href="PIVOT_URL_PLACEHOLDER" target="_blank">Pivot
                                    Reporting</a>
                            </li>
                            <li className="second-nav__item">
                                <a className="second-nav__link" href="SUPERSET_URL_PLACEHOLDER" target="_blank">Superset
                                    Reporting</a>
                            </li>

                            <nav className="main-nav">
                                <li className="main-nav__item">
                                    <a className="second-nav__link" href="DRUID_URL_PLACEHOLDER">Druid Console</a>
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
            </header>
        );
    }
}

export default NavigationBar;
