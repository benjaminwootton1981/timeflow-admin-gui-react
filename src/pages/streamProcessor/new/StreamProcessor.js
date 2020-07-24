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
  getSearches,
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
import * as yup from "yup";

const StreamProcessor = (props) => {
  const { loading, isRedirect } = props.loaderData;
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
    props.getSearches(projectId);
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
  let {
    values,
    setFieldValue,
    handleSubmit,
    handleChange,
    isSubmiting,
    touched,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: defaultInfoProject?.name ? defaultInfoProject?.name : "",
      description: defaultInfoProject?.description
        ? defaultInfoProject?.description
        : "",
      replicas: defaultInfoProject?.replicas ? defaultInfoProject.replicas : 1,
      project: defaultInfoProject?.project,
      items: stepsStreamProcessor.map((el) => {
        return { ...el };
      }),
    },
    // validationSchema: yup.object().shape({
    //     name: yup.string().required("is empty"),
    //     description: yup.string().required("is empty"),
    //     replicas: yup.string().required("is empty"),
    //
    // }),
    onSubmit: (values) => {
      if (isNew) {
        props.createStreamProcessor(values, projectId);

        // if (isRedirect) {
        history.push(`/projects/${projectId}/streamprocessors`);
        // } else {
        //     alert('ERROR')
        // }
      } else {
        props.saveStreamProcessor(values, processorId, projectId);
        // if (isRedirect) {
        history.push(`/projects/${projectId}/streamprocessors`);
        // } else {
        //     alert('ERROR')
        // }
      }
    },
  });

  useEffect(() => {
    if (JSON.stringify(stepsStreamProcessor) !== JSON.stringify(values.items)) {
      setTimeout(() => {
        props.updateDataStreamProcessor(values.items);
        props.updateDataInfo(values, processorId);
      }, 0);
    }
  }, []);
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
    <>
      <h2 className="project-name">{values.name}</h2>
      <h2 className="dashboard__header">Edit Stream Processor</h2>
    </>
  );

  let isEmptyStepName = true;
  const foundElem = values.items.filter((step, i) => {
    return step.name === "";
  });
  isEmptyStepName = foundElem.length > 0;

  const calculationisInheritsSchemaIndex = (i, items) => {
    debugger;
    let isInherits_schema;
    const steptype = items[i].steptype;
    if (props.itemsStepTypes.stepData.step_types_data) {
      isInherits_schema =
        props.itemsStepTypes.stepData.step_types_data[steptype].inherits_schema;
    }

    if (steptype === "lookup") {
      isInherits_schema = 0;
    }
    if (
      steptype === "execute_search" &&
      items[i]["search_result_placement"] === "publish_another_stream"
    ) {
      isInherits_schema = 0;
    }
    if (steptype === "map_event") {
      isInherits_schema = 0;
    }
    if (steptype === "transcribe") {
      isInherits_schema = 1;
    }
    let result = i;
    if (isInherits_schema > 0) {
      result = i - 1;
      return calculationisInheritsSchemaIndex(result, items);
    } else {
      return result;
    }
  };

  const isDisabled = !isEmptyStepName && values.name !== "" ? 0 : 1;
  return (
    <form onSubmit={handleSubmit}>
      <div className="wrapper">
        {title}
        <div className="new-item__title">
          <input
            type="text"
            name="name"
            className="new-item__name required"
            placeholder="Stream Processor Name"
            value={values.name}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Stream Processor Description"
            className="new-item__description"
            // style={{width: "48%", marginLeft: "1%"}}
            value={values.description}
            onChange={handleChange}
            maxlength={200}
            id="id_description"
          />
          <input
            type="number"
            name="replicas"
            className="new-item__replicas required"
            style={{ marginTop: "1%" }}
            value={values.replicas}
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
              const indexInheritsSchema = calculationisInheritsSchemaIndex(
                i,
                values.items
              );
              debugger;
              const schemas = props.itemsStepTypes.schemas;
              return (
                <div className="newStep">
                  <Step
                    setFieldValue={(name, e) =>
                      setFieldValue(`items.${i}.${name}`, e)
                    }
                    values={values.items[i]}
                    allValues={values.items}
                    items={items}
                    indexInheritsSchema={indexInheritsSchema}
                    updateDataStep={updateDataStep}
                  />
                  {!isSchemaBlock && (
                    <SchemaBlock
                      allValues={values.items}
                      schemas={schemas}
                      step={values.items[i]}
                      indexInheritsSchema={indexInheritsSchema}
                    />
                  )}
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
              disabled={isDisabled}
              type={"submit"}
              text={"Submit"}
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
      loaderData: state.loader,
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
    getSearches,
  }
)(StreamProcessor);
