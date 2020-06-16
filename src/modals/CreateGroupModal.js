import React, {useState} from 'react'
import {Modal} from "react-bootstrap";

export default function CreateGroupModal(props) {
    return (
        <Modal
            dialogClassName="create_group_modal"
            backdropClassName="create_group_backdrop"
            show={props.show}
            onHide={props.closeModal}
            backdrop="static"
            keyboard={false}>
            <Modal.Header closeButton />
            <Modal.Body>
                <h2>Create a New Group</h2>
                <input type="text" className="create_group_input" placeholder="Name" />
                <button className="btn"><span>Create Group</span></button>
            </Modal.Body>
        </Modal>
    )
}
