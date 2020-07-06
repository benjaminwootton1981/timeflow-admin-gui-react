import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setSchemasId } from "../../../store/streamProcessor/action";
import { NameHelper } from "../../../helper/NameHelper";

const InputTypeSelect = (props) => {
  const { elem, streams, isRelated, isRender } = props;
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
        let schema = props.itemsStepTypes.actualSchema[0];
        if (props.itemsStepTypes.actualSchema.length <= 0) {
          schema = props.itemsStepTypes[choicesName][0].schemafield_set;
          setTypeChoice(schema);
        } else {
          setTypeChoice(props.itemsStepTypes.actualSchema[0].schemafield_set);
        }
      } else {
        setTypeChoice(props.itemsStepTypes[choicesName]);
      }
    } else {
      setTypeChoice(elem.choices);
    }
  }, [elem.is_need_fetch, props.itemsStepTypes.actualSchema]);
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
    if (elem.name === "topic" || "record_type") {
      props.setSchemasId(e.target.value);
    }
  };

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
                  const val0 =
                    isDisplayName === undefined ? sel[0] : isDisplayName;
                  const val1 =
                    isDisplayName === undefined ? sel[1] : isDisplayName;
                  return (
                    <option id={sel.id} value={val0}>
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
              >
                {props.typeChoicesEndpoint.map((sel, i) => {
                  const isDisplayName =
                    sel.display_name === undefined
                      ? sel.name
                      : sel.display_name;

                  const val0 =
                    isDisplayName === undefined ? sel[0] : isDisplayName;
                  const val1 =
                    isDisplayName === undefined ? sel[1] : isDisplayName;
                  return (
                    <option id={sel.id} value={val0}>
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
              >
                {typeChoices.map((sel, i) => {
                  const isDisplayName =
                    sel.display_name === undefined
                      ? sel.name
                      : sel.display_name;
                  const val0 =
                    isDisplayName === undefined ? sel[0] : isDisplayName;
                  const val1 =
                    isDisplayName === undefined ? sel[1] : isDisplayName;
                  return <option value={val0}>{val1}</option>;
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
