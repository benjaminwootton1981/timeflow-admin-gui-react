import React from 'react';

export default function MonitorChildCard() {
    return (
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
                            <div className="content_status_desc text-left" style={{marginBottom: 13}}>Events
                                Processed
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
    )
}
