import React, {useEffect, useState} from "react";
import "./style.scss";
import ModalNewStep from "../../../modals/streamProcessorModal/ModalNewStep";
import {Button} from "../../../components/buttons/Buttons";
import Step from "../../../components/streamProcessor/Step";
import SchemaBlock from "../../../components/streamProcessor/SchemsBlock";
import {connect} from "react-redux";
import {getStepType, getStreamsAbc} from "../../../store/streamProcessor/action";


function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        "aria-controls": `scrollable-auto-tabpanel-${index}`
    };
}

const StreamProcessor = (props) => {
    const [tab, setTab] = useState(0);
    const [polio, setPolio] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [inputValues, setInputValues] = useState({
        processorName: "Customer Value Examination",
        processorNum: 1,
        processorDesc: ""
    });

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const togglePolio = () => {
        setPolio(!polio);
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const addNewStep = () => {
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const handleChange = event => {
        const {name, value} = event.target;
        setInputValues({...inputValues, [name]: value});
    };

    // useEffect(() => {
    //     props.getStepType();
    // }, []);

    const {addedSteps, stepTypes} = props.itemStreamProcessor;
    console.log('PROPS', stepTypes);
    const isAddedSteps = addedSteps && addedSteps.length !== 0;

    console.log('addedSteps', addedSteps)
    return (
        <div className="wrapper">
            <h2 className="dashboard__header">New Stream Processor</h2>
            <div className="row">
                <div style={{width: "50%"}}>
                    <input
                        type="text"
                        name="processorName"
                        placeholder="Stream Processor Name"
                        value={inputValues.processorName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="processorNum"
                        style={{marginTop: "1%"}}
                        value={inputValues.processorNum}
                        onChange={handleChange}
                    />
                </div>
                <textarea
                    type="text"
                    name="processorDesc"
                    placeholder="Stream Processor Description"
                    className="step"
                    style={{width: "48%", marginLeft: "1%"}}
                    value={inputValues.processorDesc}
                    onChange={handleChange}
                />
            </div>
            <div className="marginTop-20 streamProcessorCardContainer">
                <div className="new-item__body">
                    <Step isInbound={true}/>
                    <SchemaBlock togglePolio={togglePolio}
                                 polio={polio}
                    />
                    {
                        isAddedSteps && addedSteps.map((item, i) => {
                            return (
                                <div className="newStep">
                                    <Step isInbound={false}
                                          item={item}
                                    />
                                    <SchemaBlock togglePolio={togglePolio}
                                                 polio={polio}
                                    />
                                </div>
                            )
                        })
                    }
                    <Step isInbound={false}/>
                </div>
            </div>
            <div onClick={() => toggleModal()}>
                <Button text={'+ Add New Step'}
                        color={'white'}
                />
            </div>

            <ModalNewStep hideModal={hideModal}
                          isModalVisible={isModalVisible}
            />
        </div>
    );
};
export default connect((state) => {
        return {
            itemStreamProcessor: state.StreamProcessorReducer,
        }

    },
    {getStreamsAbc, getStepType})(StreamProcessor)
