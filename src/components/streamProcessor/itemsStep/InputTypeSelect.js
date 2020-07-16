import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setSchemasId } from "../../../store/streamProcessor/action";
import _ from "lodash";
import { choiceNameHelper } from "../../../helper/choicesName";
import { setChoicesAndInitialValueHelper } from "../../../helper/setChoicesAndInitialValueHelper";
import { NameHelper } from "../../../helper/NameHelper";

const InputTypeSelect = (props) => {
  const { elem, streams, isRelated, isRender, stepIndex } = props;
  const [typeChoices, setTypeChoice] = useState([]);
  const errorData = (
    <div
      style={{
        width: "100%",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      sorry data error...
    </div>
  );
  let kpiKeyTypeLength = 0;
  _.find(
    props.itemsStepTypes["stepData"]["step_types_data"]["key"]["fields"],
    (kpi) => {
      if (kpi.name === "key_type") {
        kpiKeyTypeLength = kpi.choices.length;
      }
    }
  );
  const elName = !!elem.name ? elem.name : "";
  useEffect(() => {
    const choicesName = choiceNameHelper(elem);
    setChoicesAndInitialValueHelper(
      elem,
      choicesName,
      elName,
      props,
      errorData,
      setTypeChoice,
      props.setFieldValue,
      kpiKeyTypeLength,
      stepIndex
    );
  }, [elem.is_need_fetch, props.values]);

  useEffect(() => {
    if (kpiKeyTypeLength !== 0 && props.values["steptype"] === "key") {
      const checkMetricName = !!props.values.category_name
        ? props.values.category_name
        : props.itemsStepTypes["kpiData"][0].category;

      const selectArray = props.itemsStepTypes["kpiData"].filter(
        (kpi) => kpi.category === checkMetricName
      );
      const selectIndicatorType = selectArray[0].indicator_type;
      let metricKeyType = [];
      if (selectIndicatorType === "kpi_type_measurement") {
        setTypeChoice(props.itemsStepTypes["stepData"].update_key_types);
        metricKeyType = props.itemsStepTypes["stepData"].update_key_types;
      } else {
        setTypeChoice(props.itemsStepTypes["stepData"].increment_key_types);
        metricKeyType = props.itemsStepTypes["stepData"].increment_key_types;
      }
      const setValue = metricKeyType[0].value;
      props.setFieldValue(elName, setValue);
      props.SetValueSelect({ ...props.valueSelect, [elName]: setValue });
    }
  }, [elem.is_need_fetch, props.values, props.valueSelect]);
  if (!streams) {
    return false;
  }
  const setSchema = (e) => {
    props.changeFunctionEndpoints(e, elem);

    const element = {
      name: elName,
      value: e.target.value,
    };
    props.setFieldValue(elName, e.target.value);
    props.SetValueSelect({ ...props.valueSelect, [elem.name]: e.target.value });
    props.onChange(element);
    if (elName === "topic") {
      props.setSchemasId({
        value: e.target.value,
        stepIndex: stepIndex,
        typeSelect: elName,
      });
    }
    if (elName === "record_type") {
      props.setSchemasId({
        value: e.target.value,
        stepIndex: stepIndex,
        typeSelect: elName,
      });
    }
    if (elName === "event_type") {
      props.setSchemasId({
        value: e.target.value,
        stepIndex: stepIndex,
        typeSelect: elName,
      });
    }
  };
  return (
    <>
      {!isRelated ? (
        <>
          {elem.is_need_fetch !== "function_endpoints" ? (
            <div className="styled-select">
              <select
                name={elName}
                onChange={(e) => setSchema(e, elem)}
                className="step"
              >
                {typeChoices.map((sel, i) => {
                  const isDisplayName =
                    sel.display_name === undefined
                      ? sel.name
                      : sel.display_name;

                  const val0 = NameHelper(
                    props,
                    elName,
                    sel,
                    isDisplayName,
                    kpiKeyTypeLength
                  ).value;
                  let val1 = NameHelper(
                    props,
                    elName,
                    sel,
                    isDisplayName,
                    kpiKeyTypeLength
                  ).name;
                  if (
                    elName === "field_to_process" &&
                    props.values["steptype"] === "key" &&
                    val0 !== "null"
                  ) {
                    val1 = `Slice by ${val1}`;
                  }
                  let isSelected = false;
                  if (elName === "recipient") {
                    isSelected = +props.values[elName] === +val0;
                  } else {
                    isSelected = props.values[elName] === val0;
                  }
                  return (
                    <option id={sel.id} value={val0} selected={isSelected}>
                      {val1}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : (
            <div className="styled-select">
              <select
                name={elName}
                onChange={(e) => setSchema(e, elem)}
                className="step"
              >
                {props.typeChoicesEndpoint.map((sel, i) => {
                  const isDisplayName =
                    sel.display_name === undefined
                      ? sel.name
                      : sel.display_name;

                  const val0 = NameHelper(
                    props,
                    elName,
                    sel,
                    isDisplayName,
                    kpiKeyTypeLength
                  ).value;
                  const val1 = NameHelper(
                    props,
                    elName,
                    sel,
                    isDisplayName,
                    kpiKeyTypeLength
                  ).name;
                  return (
                    <option
                      id={sel.id}
                      value={val0}
                      selected={props.values[elName] === val0}
                    >
                      {val1}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </>
      ) : (
        <>
          {isRender && (
            <div className="styled-select">
              <select
                name={elName}
                onChange={(e) => setSchema(e, elem)}
                className="step"
              >
                {typeChoices.map((sel, i) => {
                  const isDisplayName =
                    sel.display_name === undefined
                      ? sel.name
                      : sel.display_name;

                  const val0 = NameHelper(
                    props,
                    elName,
                    sel,
                    isDisplayName,
                    kpiKeyTypeLength
                  ).value;
                  const val1 = NameHelper(
                    props,
                    elName,
                    sel,
                    isDisplayName,
                    kpiKeyTypeLength
                  ).name;
                  return (
                    <option
                      id={sel.id}
                      value={val0}
                      selected={props.values[elName] === val0}
                    >
                      {val1}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default connect(
  (state) => {
    return {
      itemsStepTypes: state.StreamProcessorReducer,
    };
  },
  { setSchemasId }
)(InputTypeSelect);
