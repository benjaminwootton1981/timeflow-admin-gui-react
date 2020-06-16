import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {StreamValueCard, GroupCard} from "../../../components";
import {getStreams} from "../../../store/actions/serviceAction";

import EmptyStreamsSVG from '../../../assets/empty-streams.svg';
import './style.scss';

function ManageStream(props) {

    const [streams, setStreams] = useState([
        {display_name: "Test User1"},
        {display_name: "Test User2"},
        {display_name: "Test User3"},
    ]);

    useEffect(() => {
        props.onGetStreams(props.match.params.id);
    }, [])

    useEffect(() => {
        setStreams(props.streams)
    }, [props.streams])

    return (streams &&
        <div className="wrapper">
            <h2 className="project-name">{streams.length > 0 && streams[0].project && streams[0].project.name}</h2>
            <h2 className="dashboard__header">Manage Streams</h2>
            <div className="rowContent">
                <GroupCard />
                {streams &&
                streams.length > 0 &&
                streams.map(item => (
                    <StreamValueCard post={item} itemIdx={item.id} key={item.id}/>
                ))}
            </div>
            {
                streams.length === 0 && (
                    <div className="empty">
                        <span className="empty__text">No streams are available.</span>
                        <img src={EmptyStreamsSVG} width="155" height="134" alt="no data"
                             className="empty__image"/>
                    </div>
                )
            }
            <div className="dashboard__footer">
                <a className="btn" href={`/projects/${props.match.params.id}/streams/new`}>
                    Add Stream
                </a>
                {
                    streams.length !== 0 && (
                        <a className="btn create__group" href="#create-groupd-modal" id="create_ground"
                           rel="modal:open">
                            <span>+ Create a Group</span>
                        </a>
                    )
                }
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        streams: state.ServiceReducer.streams
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetStreams: (id) => {
            dispatch(getStreams(id));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageStream);
