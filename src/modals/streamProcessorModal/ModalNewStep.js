import React, {useState} from 'react'
import {Modal} from "react-bootstrap";
import {NewStepCard} from "../../components";
import {connect} from "react-redux";
import {addStep} from "../../store/streamProcessor/action";
import {Button} from "../../components/buttons/Buttons";


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
    const [selectedStepType, setSelectedStepType] = useState('');
    const addStep = (type) => {
        props.addStep(type);
        props.hideModal()
    };
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
                        <div onClick={() => setSelectedStepType('testType')}>
                            <NewStepCard/>
                        </div>
                    )
                })}
            </Modal.Body>
            <Modal.Footer>
                <div onClick={() => addStep(selectedStepType)}
                     style={{width: '100%'}}
                     className="horizontalCenter"
                >
                    <Button text={'Add'}
                            color={'dark'}
                    />
                </div>
            </Modal.Footer>
        </Modal>
    )
};
export default connect((state) => {
    return {}

}, {addStep})(ModalNewStep)
