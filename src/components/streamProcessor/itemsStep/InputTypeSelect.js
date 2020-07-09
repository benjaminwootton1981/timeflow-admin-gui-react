import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setSchemasId } from "../../../store/streamProcessor/action";
import { NameHelper } from "../../../helper/NameHelper";

const InputTypeSelect = (props) => {
  const { elem, streams, isRelated, isRender, stepIndex } = props;
  const [typeChoices, setTypeChoice] = useState([]);

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
              schema = schema[0].schemafield_set;
              props.setFieldValue(elem.name, schema[0].name);
              setTypeChoice(schema);
            } else {
              schema = props.itemsStepTypes[choicesName][0].schemafield_set;
              props.setFieldValue(elem.name, schema[0].name);
              setTypeChoice(schema);
            }
          });
        } else if (props.itemsStepTypes.actualSchema.length === 0) {
          schema = props.itemsStepTypes[choicesName][0].schemafield_set;
          setTypeChoice(schema);
          props.setFieldValue(elem.name, schema[0].name);
        }
      } else if (elem.name === "topic") {
        setTypeChoice(props.itemsStepTypes[choicesName]);
        if (!elem.name) {
          return <div>sorry error, please reload page...</div>;
        }
        props.setFieldValue(
          elem.name,
          props.itemsStepTypes[choicesName][0].name
        );
        props.setSchemasId({
          value: props.itemsStepTypes[choicesName][0].name,
          stepIndex: stepIndex,
        });
      } else if (elem.name === "record_type") {
        setTypeChoice(props.itemsStepTypes[choicesName]);
        props.setFieldValue(
          elem.name,
          props.itemsStepTypes[choicesName][0].name
        );
      }
    } else {
      setTypeChoice(elem.choices);
      const checkName =
        elem.choices[0].name === undefined
          ? elem.choices[0][0]
          : elem.choices[0].name;
      props.setFieldValue(elem.name, checkName);
    }
  }, [elem.is_need_fetch]);
  if (!streams) {
    return false;
  }
  const setSchema = (e) => {
    props.changeFunctionEndpoints(e, elem);

    const element = {
      name: elem.name,
      value: e.target.value,
    };
    props.setFieldValue(elem.name, e.target.value);
    props.onChange(element);
    if (elem.name === "topic") {
      props.setSchemasId({ value: e.target.value, stepIndex: stepIndex });
    }
    if (elem.name === "record_type") {
      props.setSchemasId({ value: e.target.value, stepIndex: stepIndex });
    }
    if (elem.name === "event_type") {
      props.setSchemasId({ value: e.target.value, stepIndex: stepIndex });
    }
  };
  let initialName;
  if (props.values[elem.name].indexOf("_") !== -1) {
    initialName = props.values[elem.name].split("_").slice(2).join("_");
  } else {
    initialName = props.values[elem.name];
  }
  return (
    <>
      {!isRelated ? (
        <>
          {elem.is_need_fetch !== "function_endpoints" ? (
            <div className="styled-select">
              <select
                name={elem.name}
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
                name={elem.name}
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
                name={elem.name}
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
