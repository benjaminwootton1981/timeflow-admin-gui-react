import React, { useEffect, useState } from "react";
import "./style.scss";
import ModalNewStep from "../../../modals/streamProcessorModal/ModalNewStep";
import { Button } from "../../../components/buttons/Buttons";
import Step from "../../../components/streamProcessor/Step";
import SchemaBlock from "../../../components/streamProcessor/SchemsBlock";
import { connect } from "react-redux";
import {
  getSchemas,
  getStepType,
  getStreams,
  newStreamProcessor,
  setSteps,
} from "../../../store/streamProcessor/action";
import { useFormik } from "formik";
import { setValueStep } from "../../../store/streamProcessor/setValueStep";

const StreamProcessor = (props) => {
  const [isNew, setIsNew] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputValues, setInputValues] = useState({
    processorName: "Customer Value Examination",
    processorNum: 1,
    processorDesc: "",
  });

  const { schemas } = props.itemsStepTypes;
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // const setStreamsSteps = (arr) => {
  //     props.setSteps(arr)
  // };
  // const handleChange = event => {
  //     const {name, value} = event.target;
  //     setInputValues({...inputValues, [name]: value});
  // };

  const hideModal = () => {
    setModalVisible(false);
  };

  const { stepsStreamProcessor } = props.itemsStepTypes;
  useEffect(() => {
    if (stepsStreamProcessor.length <= 0) {
      return false;
    }
  }, []);

  useEffect(() => {
    props.getStepType();
    props.getSchemas(2);
    props.getStreams(2);

    if (isNew) {
      props.newStreamProcessor();
      setIsNew(false);
    }
  }, []);

  let { values, setFieldValue, handleSubmit, handleChange } = useFormik({
    enableReinitialize: true,
    initialValues: {
      processorName: "",
      processorNum: "1",
      processorDesc: "",
      items: stepsStreamProcessor.map((el, i) => {
        const includesKey = Object.keys(el);
        let abc = {};
        includesKey.forEach((elem) => {
          const obj = { name: "name" };

          return (abc = setValueStep(obj));
        });
        return { name: el.name };
      }),
    },
    onSubmit: (values) => {
      alert("Pisa");
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="wrapper">
        <h2 className="dashboard__header">New Stream Processor</h2>
        <div className="row">
          <div style={{ width: "50%" }}>
            <input
              type="text"
              name="processorName"
              placeholder="Stream Processor Name"
              value={values.processorName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="processorNum"
              style={{ marginTop: "1%" }}
              value={values.processorNum}
              onChange={handleChange}
            />
          </div>
          <textarea
            type="text"
            name="processorDesc"
            placeholder="Stream Processor Description"
            className="step"
            style={{ width: "48%", marginLeft: "1%" }}
            value={values.processorDesc}
            onChange={handleChange}
          />
        </div>
        <div className="marginTop-20 streamProcessorCardContainer">
          <div className="new-item__body">
            {stepsStreamProcessor.map((el, i, arr) => {
              // console.log('EL', el)
              const isSchemaBlock = arr.length - 1 === i;
              const items = {
                stepIndex: i,
                lastStep: arr.length - 1,
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
            <Button type={"submit"} text={"submit"} color={"dark"} />
          </div>
        </div>
        {isModalVisible && (
          <ModalNewStep hideModal={hideModal} isModalVisible={isModalVisible} />
        )}
      </div>
    </form>
  );
};
export default connect(
  (state) => {
    return {
      itemsStepTypes: state.StreamProcessorReducer,
    };
  },
  { getStepType, newStreamProcessor, getSchemas, getStreams, setSteps }
)(StreamProcessor);
