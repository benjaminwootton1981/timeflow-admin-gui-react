import React from 'react'
import {Modal} from "react-bootstrap";
import {NewStepCard} from "../../components";


const ModalNewStep = (props) => {
    const fakeTypeStep = [
        {name: '', type: ''},
        {name: '', type: ''},
        {name: '', type: ''},
        {name: '', type: ''},
        {name: '', type: ''},
        {name: '', type: ''},
        {name: '', type: ''},
        {name: '', type: ''},
        {name: '', type: ''},
        {name: '', type: ''},
        {name: '', type: ''},
        {name: '', type: ''}
    ];
    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size="lg"
            show={props.isModalVisible}
            onHide={props.hideModal}
        >
            <Modal.Header closeButton>
                <Modal.Title className="modal-title">Add A New Step</Modal.Title>
            </Modal.Header>
            <Modal.Body className="row add-modal-body stepType">
                {fakeTypeStep.map(() => {
                    return (
                        <div  onClick={() => alert('Hello')}>
                            <NewStepCard/>
                        </div>
                    )
                })}
            </Modal.Body>
            <Modal.Footer>
                <a
                    className="btn"
                    href="#create-groupd-modal"
                    id="new_step"
                    rel="modal:open"
                >
                    <span>Add</span>
                </a>
            </Modal.Footer>
        </Modal>
    )
};
export default ModalNewStep
