import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setSchemasId } from "../../../store/streamProcessor/action";

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
      setTypeChoice(props.itemsStepTypes[choicesName]);
    } else {
      setTypeChoice(elem.choices);
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
    if (elem.name === "topic" || "record_type") {
      props.setSchemasId(e.target.value);
    }
  };
  console.log("DATA", typeChoices);
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
                  let val0 = sel.name === undefined ? sel[0] : sel.name;
                  let val1 = sel.name === undefined ? sel[1] : sel.name;

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
                  let val0 = sel.name === undefined ? sel[0] : sel.name;
                  let val1 = sel.name === undefined ? sel[1] : sel.name;

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
                  const val0 =
                    sel.name === undefined ? sel[0] : sel.display_name;
                  const val1 =
                    sel.name === undefined ? sel[1] : sel.display_name;
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
