import React, { Component } from "react";
import './style.scss';
import StepConnectorSVG from '../../../assets/step_connector.svg';

class MonitorStreamProcessor extends Component {

  render() {
    return (
      <div className="wrapper">
          <h2 className="dashboard__header">Monitor Stream Processor</h2>
          <div className="monitor">
              <div className="monitor__tabs">
                  <div id="tabSet" className="monitor__tabs_scroll">
                      <span className="tab_selected" rel="overall">Overall</span>
                      <span rel="rep-1">Replica 1</span>
                      <span rel="rep-2">Replica 2</span>
                      <span rel="rep-3">Replica 3</span>
                      <span rel="rep-4">Replica 4</span>
                      <span rel="rep-5">Replica 5</span>
                      <span rel="rep-6">Replica 6</span>
                      <span rel="rep-7">Replica 7</span>
                      <span rel="rep-8">Replica 8</span>
                      <span rel="rep-9">Replica 9</span>
                      <span rel="rep-10">Replica 10</span>
                  </div>
              </div>
              <div className="monitor__body">
                  <div className="monitor__body_tab" id="overall">
                      <div className="monitor__body_tab_child">
                          <span className="monitor__body_tab_child_header">Inbound Event</span>
                          <div className="monitor__body_tab_child_content">
                              <div className="row">
                                  <div className="col-md-6 content_status">
                                      <div className="content_status_col border_right">
                                          <div className="inboud_event_chart_total">
                                              <div className="pie-wrapper progress-90">
                                                  <span className="label">23</span>
                                                  <div className="pie">
                                                      <div className="left-side half-circle"></div>
                                                      <div className="right-side half-circle"></div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="content_status_desc">Total Events <br/> Per Second</div>
                                      </div>
                                      <div className="content_status_col">
                                          <div className="inboud_event_chart_total">
                                              <div className="pie-wrapper progress-90">
                                                  <span className="label">54</span>
                                                  <div className="pie">
                                                      <div className="left-side half-circle"></div>
                                                      <div className="right-side half-circle"></div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="content_status_desc">Current Events <br/> Per Second</div>
                                      </div>
                                      <div className="content_status_col">
                                          <div className="content_status_amount text-left">4325</div>
                                          <div className="content_status_desc text-left"
                                               style={{marginBottom: 13}}>Events Processed
                                          </div>
                                          <div className="content_status_amount text-left">7865 <span>kb</span></div>
                                          <div className="content_status_desc text-left">Data Processed</div>
                                      </div>
                                  </div>
                                  <div className="col-md-6 content_charts">
                                      <ul className="nav content_charts_nav">
                                          <li className="active">
                                              <a href="#inbound-events-chart" data-toggle="tab" className="active">Events
                                                  Processed</a>
                                          </li>
                                          <li>
                                              <a href="#inbound-data-chart" data-toggle="tab">Data Processed</a>
                                          </li>
                                      </ul>
                                      <div className="tab-content">
                                          <div className="tab-pane active" id="inbound-events-chart">
                                              <div className="content_chart">
                                                  <canvas id="inboundEventsByChart" width="400" height="200"></canvas>
                                              </div>
                                          </div>
                                          <div className="tab-pane" id="inbound-data-chart">
                                              <div className="content_chart">
                                                  <canvas id="inboundDataByChart" width="400" height="200"></canvas>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="monitor__body_child_linter">
                          <img src={StepConnectorSVG} />
                      </div>

                      <div className="monitor__body_tab_child">
                          <span className="monitor__body_tab_child_header">Simple Filter</span>
                          <div className="monitor__body_tab_child_content">
                              <div className="row">
                                  <div className="col-md-6 content_status">
                                      <div className="content_status_col border_right">
                                          <div className="inboud_event_chart_total">
                                              <div className="pie-wrapper progress-90">
                                                  <span className="label">23</span>
                                                  <div className="pie">
                                                      <div className="left-side half-circle"></div>
                                                      <div className="right-side half-circle"></div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="content_status_desc">Total Events <br/> Per Second</div>
                                      </div>
                                      <div className="content_status_col">
                                          <div className="inboud_event_chart_total">
                                              <div className="pie-wrapper progress-90">
                                                  <span className="label">54</span>
                                                  <div className="pie">
                                                      <div className="left-side half-circle"></div>
                                                      <div className="right-side half-circle"></div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="content_status_desc">Current Events <br/> Per Second</div>
                                      </div>
                                      <div className="content_status_col">
                                          <div className="content_status_amount text-left">4325</div>
                                          <div className="content_status_desc text-left"
                                               style={{marginBottom: 13}}>Events Processed
                                          </div>
                                          <div className="content_status_amount text-left">7865 <span>kb</span></div>
                                          <div className="content_status_desc text-left">Data Processed</div>
                                      </div>
                                  </div>
                                  <div className="col-md-6 content_charts">
                                      <ul className="nav content_charts_nav">
                                          <li className="active">
                                              <a href="#filter-events-chart" data-toggle="tab" className="active">Events
                                                  Processed</a>
                                          </li>
                                          <li>
                                              <a href="#filter-data-chart" data-toggle="tab">Data Processed</a>
                                          </li>
                                      </ul>
                                      <div className="tab-content">
                                          <div className="tab-pane active" id="filter-events-chart">
                                              <div className="content_chart">
                                                  <canvas id="filterEventsByChart" width="400" height="200"></canvas>
                                              </div>
                                          </div>
                                          <div className="tab-pane" id="filter-data-chart">
                                              <div className="content_chart">
                                                  <canvas id="filterDataByChart" width="400" height="200"></canvas>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="monitor__body_child_linter">
                          <img src={StepConnectorSVG} />
                      </div>

                      <div className="monitor__body_tab_child">
                          <span className="monitor__body_tab_child_header">Stream Lookup</span>
                          <div className="monitor__body_tab_child_content">
                              <div className="row">
                                  <div className="col-md-6 content_status">
                                      <div className="content_status_col border_right">
                                          <div className="inboud_event_chart_total">
                                              <div className="pie-wrapper progress-90">
                                                  <span className="label">23</span>
                                                  <div className="pie">
                                                      <div className="left-side half-circle"></div>
                                                      <div className="right-side half-circle"></div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="content_status_desc">Total Events <br/> Per Second</div>
                                      </div>
                                      <div className="content_status_col">
                                          <div className="inboud_event_chart_total">
                                              <div className="pie-wrapper progress-90">
                                                  <span className="label">54</span>
                                                  <div className="pie">
                                                      <div className="left-side half-circle"></div>
                                                      <div className="right-side half-circle"></div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="content_status_desc">Current Events <br/> Per Second</div>
                                      </div>
                                      <div className="content_status_col">
                                          <div className="content_status_amount text-left">4325</div>
                                          <div className="content_status_desc text-left"
                                               style={{marginBottom: 13}}>Events Processed
                                          </div>
                                          <div className="content_status_amount text-left">7865 <span>kb</span></div>
                                          <div className="content_status_desc text-left">Data Processed</div>
                                      </div>
                                  </div>
                                  <div className="col-md-6 content_charts">
                                      <ul className="nav content_charts_nav">
                                          <li className="active">
                                              <a href="#stream-events-chart" data-toggle="tab" className="active">Events
                                                  Processed</a>
                                          </li>
                                          <li>
                                              <a href="#stream-data-chart" data-toggle="tab">Data Processed</a>
                                          </li>
                                      </ul>
                                      <div className="tab-content">
                                          <div className="tab-pane active" id="stream-events-chart">
                                              <div className="content_chart">
                                                  <canvas id="streamEventsByChart" width="400" height="200"></canvas>
                                              </div>
                                          </div>
                                          <div className="tab-pane" id="stream-data-chart">
                                              <div className="content_chart">
                                                  <canvas id="streamDataByChart" width="400" height="200"></canvas>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="monitor__body_child_linter">
                          <img src={StepConnectorSVG} />
                      </div>

                      <div className="monitor__body_tab_child">
                          <span className="monitor__body_tab_child_header">Map To Event Type</span>
                          <div className="monitor__body_tab_child_content">
                              <div className="row">
                                  <div className="col-md-6 content_status">
                                      <div className="content_status_col border_right">
                                          <div className="inboud_event_chart_total">
                                              <div className="pie-wrapper progress-90">
                                                  <span className="label">23</span>
                                                  <div className="pie">
                                                      <div className="left-side half-circle"></div>
                                                      <div className="right-side half-circle"></div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="content_status_desc">Total Events <br/> Per Second</div>
                                      </div>
                                      <div className="content_status_col">
                                          <div className="inboud_event_chart_total">
                                              <div className="pie-wrapper progress-90">
                                                  <span className="label">54</span>
                                                  <div className="pie">
                                                      <div className="left-side half-circle"></div>
                                                      <div className="right-side half-circle"></div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="content_status_desc">Current Events <br/> Per Second</div>
                                      </div>
                                      <div className="content_status_col">
                                          <div className="content_status_amount text-left">4325</div>
                                          <div className="content_status_desc text-left"
                                               style={{marginBottom: 13}}>Events Processed
                                          </div>
                                          <div className="content_status_amount text-left">7865 <span>kb</span></div>
                                          <div className="content_status_desc text-left">Data Processed</div>
                                      </div>
                                  </div>
                                  <div className="col-md-6 content_charts">
                                      <ul className="nav content_charts_nav">
                                          <li className="active">
                                              <a href="#map-events-chart" data-toggle="tab" className="active">Events
                                                  Processed</a>
                                          </li>
                                          <li>
                                              <a href="#map-data-chart" data-toggle="tab">Data Processed</a>
                                          </li>
                                      </ul>
                                      <div className="tab-content">
                                          <div className="tab-pane active" id="map-events-chart">
                                              <div className="content_chart">
                                                  <canvas id="mapEventsByChart" width="400" height="200"></canvas>
                                              </div>
                                          </div>
                                          <div className="tab-pane" id="map-data-chart">
                                              <div className="content_chart">
                                                  <canvas id="mapDataByChart" width="400" height="200"></canvas>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="monitor__body_child_linter">
                          <img src={StepConnectorSVG} />
                      </div>

                      <div className="monitor__body_tab_child">
                          <span className="monitor__body_tab_child_header">Outbound Step</span>
                          <div className="monitor__body_tab_child_content">
                              <div className="row">
                                  <div className="col-md-6 content_status">
                                      <div className="content_status_col border_right">
                                          <div className="inboud_event_chart_total">
                                              <div className="pie-wrapper progress-90">
                                                  <span className="label">23</span>
                                                  <div className="pie">
                                                      <div className="left-side half-circle"></div>
                                                      <div className="right-side half-circle"></div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="content_status_desc">Total Events <br/> Per Second</div>
                                      </div>
                                      <div className="content_status_col">
                                          <div className="inboud_event_chart_total">
                                              <div className="pie-wrapper progress-90">
                                                  <span className="label">54</span>
                                                  <div className="pie">
                                                      <div className="left-side half-circle"></div>
                                                      <div className="right-side half-circle"></div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="content_status_desc">Current Events <br/> Per Second</div>
                                      </div>
                                      <div className="content_status_col">
                                          <div className="content_status_amount text-left">4325</div>
                                          <div className="content_status_desc text-left"
                                               style={{marginBottom: 13}}>Events Processed
                                          </div>
                                          <div className="content_status_amount text-left">7865 <span>kb</span></div>
                                          <div className="content_status_desc text-left">Data Processed</div>
                                      </div>
                                  </div>
                                  <div className="col-md-6 content_charts">
                                      <ul className="nav content_charts_nav">
                                          <li className="active">
                                              <a href="#outbound-events-chart" data-toggle="tab" className="active">Events
                                                  Processed</a>
                                          </li>
                                          <li>
                                              <a href="#outbound-data-chart" data-toggle="tab">Data Processed</a>
                                          </li>
                                      </ul>
                                      <div className="tab-content">
                                          <div className="tab-pane active" id="outbound-events-chart">
                                              <div className="content_chart">
                                                  <canvas id="outboundEventsByChart" width="400" height="200"></canvas>
                                              </div>
                                          </div>
                                          <div className="tab-pane" id="outbound-data-chart">
                                              <div className="content_chart">
                                                  <canvas id="outboundDataByChart" width="400" height="200"></canvas>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="monitor__body_tab" id="rep-1">rep-1</div>
                  <div className="monitor__body_tab" id="rep-2">rep-2</div>
                  <div className="monitor__body_tab" id="rep-3">rep-3</div>
                  <div className="monitor__body_tab" id="rep-4">rep-4</div>
                  <div className="monitor__body_tab" id="rep-5">rep-5</div>
                  <div className="monitor__body_tab" id="rep-6">rep-6</div>
                  <div className="monitor__body_tab" id="rep-7">rep-7</div>
                  <div className="monitor__body_tab" id="rep-8">rep-8</div>
                  <div className="monitor__body_tab" id="rep-9">rep-9</div>
                  <div className="monitor__body_tab" id="rep-10">rep-10</div>
              </div>
          </div>
      </div>
    );
  }
}

export default MonitorStreamProcessor;
