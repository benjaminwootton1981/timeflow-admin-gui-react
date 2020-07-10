import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setSchemasId } from "../../../store/streamProcessor/action";
import { NameHelper } from "../../../helper/NameHelper";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  const elName = elem.name ? elem.name : "";
  useEffect(() => {
    if (elem.choices.length === 0) {
      let choicesName = "";
      if (elem.is_need_fetch === "function_endpoints") {
        choicesName = "function_endpoints";
      } else if (elem.is_need_fetch === "schema_fields") {
        choicesName = "schemas";
      } else {
        choicesName = elem.is_need_fetch;
      }
      //

      if (elem.is_need_fetch === "schema_fields") {
        let schema = [];
        if (props.itemsStepTypes.actualSchema.length > 0) {
          props.itemsStepTypes.actualSchema.forEach((el) => {
            schema = el[props.indexInheritsSchema];
            if (schema) {
              if (!schema[0]) {
                return errorData;
              }
              schema = schema[0].schemafield_set;
              props.setFieldValue(elName, schema[0].name);
              setTypeChoice(schema);
            } else {
              if (!props.itemsStepTypes[choicesName][0]) {
                return errorData;
              }
              schema = props.itemsStepTypes[choicesName][0].schemafield_set;
              props.setFieldValue(elName, schema[0].name);
              setTypeChoice(schema);
            }
          });
        } else if (props.itemsStepTypes.actualSchema.length === 0) {
          if (!elem.choices || props.itemsStepTypes[choicesName][0]) {
            return errorData;
          }
          if (!elName || elName === "") {
            return errorData;
          }
          schema = props.itemsStepTypes[choicesName][0].schemafield_set;
          setTypeChoice(schema);
          if (schema[0]) {
            props.setFieldValue(elName, schema[0].name);
          }
        }
      } else if (elName === "topic") {
        setTypeChoice(props.itemsStepTypes[choicesName]);
        if (!elName) {
          return errorData;
        }
        props.setFieldValue(elName, props.itemsStepTypes[choicesName][0].name);
        props.setSchemasId({
          value: props.itemsStepTypes[choicesName][0].name,
          stepIndex: stepIndex,
        });
      } else if (elName === "record_type") {
        if (!elName) {
          return errorData;
        }
        setTypeChoice(props.itemsStepTypes[choicesName]);
        props.setFieldValue(elName, props.itemsStepTypes[choicesName][0].name);
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
      props.setFieldValue(elName, checkName);
    }
  }, [elem.is_need_fetch]);
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
  let initialName = props.values[elName];

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
                  const val0 = isDisplayName === undefined ? sel[0] : sel.name;
                  const val1 =
                    isDisplayName === undefined ? sel[1] : isDisplayName;
                  return (
                    <option id={sel.id} value={val0} selected={initialName}>
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
                // value={initialName}
              >
                {props.typeChoicesEndpoint.map((sel, i) => {
                  const isDisplayName =
                    sel.display_name === undefined
                      ? sel.name
                      : sel.display_name;

                  const val0 = isDisplayName === undefined ? sel[0] : sel.name;
                  const val1 =
                    isDisplayName === undefined ? sel[1] : isDisplayName;
                  return (
                    <option id={sel.id} value={val0} selected={initialName}>
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
                value={initialName}
              >
                {typeChoices.map((sel, i) => {
                  const isDisplayName =
                    sel.display_name === undefined
                      ? sel.name
                      : sel.display_name;
                  const val0 = isDisplayName === undefined ? sel[0] : sel.name;
                  const val1 =
                    isDisplayName === undefined ? sel[1] : isDisplayName;
                  return (
                    <option selected={initialName} value={val0}>
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
