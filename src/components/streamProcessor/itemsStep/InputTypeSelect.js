import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setSchemasId } from "../../../store/streamProcessor/action";
import _ from "lodash";

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
  const elName = elem.name ? elem.name : "";
  useEffect(() => {
    if (elem.choices.length === 0) {
      let choicesName = "";
      if (elem.is_need_fetch === "function_endpoints") {
        choicesName = "function_endpoints";
      } else if (elem.is_need_fetch === "schema_fields") {
        choicesName = "schemas";
      } else if (
        elem.is_need_fetch === "kpi_category" ||
        elem.is_need_fetch === "kpi_metric"
      ) {
        choicesName = "kpiData";
      } else if (elem.is_need_fetch === "users") {
        choicesName = "recipientList";
      } else {
        choicesName = elem.is_need_fetch;
      }
      if (elem.is_need_fetch === "schema_fields") {
        let schema = [];
        if (props.itemsStepTypes.actualSchema.length > 0) {
          props.itemsStepTypes.actualSchema.forEach((el) => {
            if (!elName) {
              return errorData;
            }

            schema = el[props.indexInheritsSchema];
            if (schema) {
              if (!schema[0]) {
                return errorData;
              }
              schema = schema[0].schemafield_set;
              const setValue = !!props.values[elName]
                ? props.values[elName]
                : schema[0].name;
              props.setFieldValue(elName, setValue);
              setTypeChoice(schema);
            } else {
              if (!props.itemsStepTypes[choicesName][0]) {
                return errorData;
              }
              schema = props.itemsStepTypes[choicesName][0].schemafield_set;
              const setValue = !!props.values[elName]
                ? props.values[elName]
                : schema[0].name;
              props.setFieldValue(elName, setValue);
              setTypeChoice(schema);
            }
          });
        } else if (props.itemsStepTypes.actualSchema.length === 0) {
          if (!elem.choices || !props.itemsStepTypes[choicesName][0]) {
            return errorData;
          }
          if (!elName || elName === "") {
            return errorData;
          }
          schema = props.itemsStepTypes[choicesName][0].schemafield_set;
          setTypeChoice(schema);
          if (schema[0]) {
            const setValue = !!props.values[elName]
              ? props.values[elName]
              : schema[0].name;
            props.setFieldValue(elName, setValue);
          }
        }
      } else if (elName === "topic") {
        setTypeChoice(props.itemsStepTypes[choicesName]);
        if (!elName) {
          return errorData;
        }
        const setValue = !!props.values.topic
          ? props.values.topic
          : props.itemsStepTypes[choicesName][0].name;
        props.setFieldValue(elName, setValue);
        props.setSchemasId({
          value: props.itemsStepTypes[choicesName][0].name,
          stepIndex: stepIndex,
        });
      } else if (elName === "task_recipient_id") {
        setTypeChoice(props.itemsStepTypes["recipientList"]);
        if (!elName) {
          return errorData;
        }
        const setValue = !!props.values.recipientList
          ? props.values.recipientList
          : props.itemsStepTypes["recipientList"][0].name;
        props.setFieldValue(elName, setValue);
      } else if (elName === "data_dictionary_name") {
        setTypeChoice(props.itemsStepTypes["data_dictionaries"]);
        if (!elName) {
          return errorData;
        }
        const setValue = !!props.values.data_dictionary_name
          ? props.values.data_dictionary_name
          : props.itemsStepTypes["data_dictionaries"].length > 0 &&
            props.itemsStepTypes["data_dictionaries"][0].name;
        props.setFieldValue(elName, setValue);
      } else if (elName === "search_name") {
        setTypeChoice(props.itemsStepTypes["searches"]);
        if (!elName) {
          return errorData;
        }
        if (props.itemsStepTypes["searches"].length > 0) {
          const setValue = !!props.values.search_name
            ? props.values.search_name
            : props.itemsStepTypes["searches"][0].name;
          props.setFieldValue(elName, setValue);
        }
      } else if (elName === "category_name") {
        setTypeChoice(props.itemsStepTypes["kpiData"]);
        if (!elName) {
          return errorData;
        }
        if (props.itemsStepTypes["kpiData"].length > 0) {
          const setValue = !!props.values.category_name
            ? props.values.category_name
            : props.itemsStepTypes["kpiData"][0].category;
          props.setFieldValue(elName, setValue);
        }
      } else if (elName === "metric") {
        const checkMetricName = !!props.values.category_name
          ? props.values.category_name
          : props.itemsStepTypes["kpiData"][0].category;
        const selectArray = props.itemsStepTypes["kpiData"].filter(
          (kpi) => kpi.category === checkMetricName
        );
        setTypeChoice(selectArray);
        if (!elName) {
          return errorData;
        }
        if (props.itemsStepTypes["kpiData"].length > 0) {
          const setValue = !!props.values.metric
            ? props.values.metric
            : props.itemsStepTypes["kpiData"][0].metric;
          props.setFieldValue(elName, setValue);
        }
      } else if (kpiKeyTypeLength === 0 && props.values["steptype"] === "key") {
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
        const setValue = !!props.values.key_type
          ? props.values.key_type
          : metricKeyType[0].value;
        props.setFieldValue(elName, setValue);
        props.SetValueSelect({ ...props.valueSelect, [elName]: setValue });
      } else if (elName === "record_type") {
        if (!elName) {
          return errorData;
        }
        const setValue = !!props.values.record_type
          ? props.values.record_type
          : props.itemsStepTypes[choicesName][0].name;
        setTypeChoice(props.itemsStepTypes[choicesName]);
        props.setFieldValue(elName, setValue);
      }
    } else {
      if (!elem.choices) {
        return errorData;
      }
      setTypeChoice(elem.choices);
      const checkName =
        elem.choices[0].name === undefined
          ? elem.choices[0][0]
          : elem.choices[0].name;

      const setValue = !!props.values[elName]
        ? props.values[elName]
        : checkName;
      props.setFieldValue(elName, setValue);
    }
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
      props.setSchemasId({ value: e.target.value, stepIndex: stepIndex });
    }
    if (elName === "record_type") {
      props.setSchemasId({ value: e.target.value, stepIndex: stepIndex });
    }
    if (elName === "event_type") {
      props.setSchemasId({ value: e.target.value, stepIndex: stepIndex });
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

                  let val0 = "";
                  let val1 = "";
                  if (elName === "category_name") {
                    val0 = sel.category === undefined ? sel[0] : sel.category;
                    val1 = sel.category === undefined ? sel[1] : sel.category;
                  } else if (elName === "metric") {
                    val0 = sel.metric === undefined ? sel[0] : sel.metric;
                    val1 = sel.metric === undefined ? sel[1] : sel.metric;
                  } else if (
                    kpiKeyTypeLength === 0 &&
                    elName === "key_type" &&
                    props.values["steptype"] === "key"
                  ) {
                    val0 = sel.value === undefined ? sel[0] : sel.value;
                    val1 = sel.name === undefined ? sel[1] : isDisplayName;
                  } else {
                    val0 = isDisplayName === undefined ? sel[0] : sel.name;
                    val1 = isDisplayName === undefined ? sel[1] : isDisplayName;
                  }
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

                  let val0 = "";
                  let val1 = "";
                  if (elName === "category_name") {
                    val0 = sel.category === undefined ? sel[0] : sel.category;
                    val1 = sel.category === undefined ? sel[1] : sel.category;
                  } else if (elName === "metric") {
                    val0 = sel.metric === undefined ? sel[0] : sel.metric;
                    val1 = sel.metric === undefined ? sel[1] : sel.metric;
                  } else if (
                    kpiKeyTypeLength === 0 &&
                    elName === "key_type" &&
                    props.values["steptype"] === "key"
                  ) {
                    val0 = sel.value === undefined ? sel[0] : sel.value;
                    val1 = sel.name === undefined ? sel[1] : isDisplayName;
                  } else {
                    val0 = isDisplayName === undefined ? sel[0] : sel.name;
                    val1 = isDisplayName === undefined ? sel[1] : isDisplayName;
                  }
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

                  let val0 = "";
                  let val1 = "";
                  if (elName === "category_name") {
                    val0 = sel.category === undefined ? sel[0] : sel.category;
                    val1 = sel.category === undefined ? sel[1] : sel.category;
                  } else if (elName === "metric") {
                    val0 = sel.metric === undefined ? sel[0] : sel.metric;
                    val1 = sel.metric === undefined ? sel[1] : sel.metric;
                  } else if (
                    kpiKeyTypeLength === 0 &&
                    elName === "key_type" &&
                    props.values["steptype"] === "key"
                  ) {
                    val0 = sel.value === undefined ? sel[0] : sel.value;
                    val1 = sel.name === undefined ? sel[1] : isDisplayName;
                  } else {
                    val0 = isDisplayName === undefined ? sel[0] : sel.name;
                    val1 = isDisplayName === undefined ? sel[1] : isDisplayName;
                  }
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
