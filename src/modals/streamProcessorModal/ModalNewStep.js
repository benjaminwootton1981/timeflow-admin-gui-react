import React, {useState} from 'react'
import "./style.scss";
import {Modal} from "react-bootstrap";
import {NewStepCard} from "../../components";
import {connect} from "react-redux";
import {addStep} from "../../store/streamProcessor/action";
import {Button} from "../../components/buttons/Buttons";


const ModalNewStep = (props) => {
    const [selectedStepType, setSelectedStepType] = useState('');
    const [selectedStep, setSelectedStep] = useState(false);
    const {stepTypes} = props.itemStreamProcessor;

    const addStep = (type) => {
        if (selectedStepType !== '') {
            props.addStep(type);
            props.hideModal();
            setSelectedStepType('')
        } else {
            alert('please select a step type ')
        }
    };
    const selectStep = (id, index) => {
        setSelectedStepType(id);
        setSelectedStep(index)
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
            <div className="bodyStepType">
                {stepTypes.step_types.map((step, index) => {
                    const id = {'id': step.value, 'key': step.value, 'name': step.name};
                    const selected = selectedStep === index ? 'selected' : '';
                    return (
                        <div className={`step_type`} onClick={() => selectStep(id, index)}>
                            <NewStepCard step={step}
                                         selected={selected}
                            />
                        </div>
                    )
                })}
            </div>
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
    return {
        itemStreamProcessor: state.StreamProcessorReducer,
    }

}, {addStep})(ModalNewStep)
