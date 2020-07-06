import React, { useEffect, useState } from "react";
import "./style.scss";
import ModalNewStep from "../../../modals/streamProcessorModal/ModalNewStep";
import { Button } from "../../../components/buttons/Buttons";
import Step from "../../../components/streamProcessor/Step";
import SchemaBlock from "../../../components/streamProcessor/SchemsBlock";
import { connect } from "react-redux";
import {
  createStreamProcessor,
  geFunctionEndpoint,
  getDataDictionary,
  getFunctionData,
  getKpi,
  getRecipientList,
  getSchemas,
  getStepType,
  getStreamProcessor,
  getStreamProcessorsList,
  getStreams,
  newStreamProcessor,
  saveStreamProcessor,
  updateDataInfo,
  updateDataStreamProcessor,
} from "../../../store/streamProcessor/action";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

const StreamProcessor = (props) => {
  let history = useHistory();

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const processorId = props.match.params.processor_id;
  const projectId = props.match.params.id;

  const isNew = !processorId;
  const { stepsStreamProcessor, newStreamprocessors } = props.itemsStepTypes;

  let defaultInfoProject = {
    name: "",
    description: "",
    replicas: 1,
    project: projectId,
  };
  useEffect(() => {
    props.getStreamProcessorsList(projectId);
    props.getStepType();
    props.getSchemas(projectId);
    props.getStreams(projectId);
    props.getRecipientList();
    props.getDataDictionary(projectId);
    props.getFunctionData(projectId);
    props.getKpi(projectId);
    props.geFunctionEndpoint();

    if (isNew) {
      props.newStreamProcessor();
    } else {
      props.getStreamProcessor(processorId);
    }
  }, []);
  if (!isNew && props.streams.streamprocessors !== null) {
    defaultInfoProject = props.streams.streamprocessors.filter(
      (item) => item.id === +processorId
    );
    defaultInfoProject = defaultInfoProject[0];
  } else {
    defaultInfoProject = newStreamprocessors;
  }
  let { values, setFieldValue, handleSubmit, handleChange } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: defaultInfoProject.name,
      description: defaultInfoProject.description,
      replicas: defaultInfoProject.replicas,
      project: defaultInfoProject.project,
      items: stepsStreamProcessor.map((el, i) => {
        return { ...el };
      }),
    },
    onSubmit: (values) => {
      if (isNew) {
        props.createStreamProcessor(values, projectId);
        history.push(`/projects/${projectId}/streamprocessors`);
      } else {
        props.saveStreamProcessor(values, processorId, projectId);
        history.push(`/projects/${projectId}/streamprocessors`);
      }
    },
  });
  useEffect(() => {
    if (JSON.stringify(stepsStreamProcessor) !== JSON.stringify(values.items)) {
      props.updateDataStreamProcessor(values.items);
      props.updateDataInfo(values, processorId);
    }
  }, [values]);
  const hideModal = () => {
    setModalVisible(false);
  };
  const updateDataStep = () => {
    props.updateDataStreamProcessor(values.items);
    props.updateDataInfo(values, processorId);
  };
  if (!defaultInfoProject) {
    return false;
  }
  const title = isNew ? (
    <h2 className="dashboard__header">New Stream Processor</h2>
  ) : (
    <h2 className="dashboard__header">Edit Stream Processor</h2>
  );
  return (
    <form onSubmit={handleSubmit}>
      <div className="wrapper">
        {title}
        <div className="row">
          <div style={{ width: "50%" }}>
            <input
              type="text"
              name="name"
              placeholder="Stream Processor Name"
              value={values.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="replicas"
              style={{ marginTop: "1%" }}
              value={values.replicas}
              onChange={handleChange}
            />
          </div>
          <textarea
            type="text"
            name="description"
            placeholder="Stream Processor Description"
            className="step"
            style={{ width: "48%", marginLeft: "1%" }}
            value={values.description}
            onChange={handleChange}
          />
        </div>
        <div className="marginTop-20 streamProcessorCardContainer">
          <div className="new-item__body">
            {values.items.map((el, i, arr) => {
              const isSchemaBlock = arr.length - 1 === i;
              const items = {
                stepIndex: i,
                lastStep: arr.length - 1,
                isLastStep: arr.length - 1 === i,
                stepEl: el,
              };
              const schemas = props.itemsStepTypes.schemas;
              return (
                <div className="newStep">
                  <Step
                    setFieldValue={(name, e) =>
                      setFieldValue(`items.${i}.${name}`, e)
                    }
                    values={values.items[i]}
                    items={items}
                  />
                  {!isSchemaBlock && <SchemaBlock schemas={schemas} />}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ width: 300 }} onClick={() => toggleModal()}>
              <Button type={"button"} text={"+ Add New Step"} color={"white"} />
            </div>
          </div>
          <div style={{ border: "solid 0.3px #333333" }} />
          <div>
            <Button
              disabled={false}
              type={"submit"}
              text={"submit"}
              color={"dark"}
            />
          </div>
        </div>
        {isModalVisible && (
          <ModalNewStep
            hideModal={hideModal}
            isModalVisible={isModalVisible}
            updateDataStep={updateDataStep}
          />
        )}
      </div>
    </form>
  );
};
export default connect(
  (state) => {
    return {
      itemsStepTypes: state.StreamProcessorReducer,
      streams: state.ServiceReducer,
    };
  },
  {
    getStepType,
    newStreamProcessor,
    getSchemas,
    getStreams,
    createStreamProcessor,
    getStreamProcessor,
    saveStreamProcessor,
    getStreamProcessorsList,
    updateDataStreamProcessor,
    updateDataInfo,
    getRecipientList,
    getDataDictionary,
    getFunctionData,
    getKpi,
    geFunctionEndpoint,
  }
)(StreamProcessor);
