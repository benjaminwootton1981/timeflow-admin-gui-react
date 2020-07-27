import React, { useState } from "react";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { sliceValueHelper } from "../../helper/sliceVaueHelper";

const SchemaBlock = (props) => {
  const { step, schemas, actualSchema } = props;
  const [polio, setPolio] = useState(false);
  const togglePolio = () => {
    setPolio(!polio);
  };
  if (!props.schemas || props.schemas.length <= 0) {
    return false;
  }
  let schema = [];
  let typeTopic = "topic";
  if (props.allValues[props.indexInheritsSchema].steptype === "lookup") {
    typeTopic = "record_type";
  }
  if (props.allValues[props.indexInheritsSchema].steptype === "map_event") {
    typeTopic = "event_type";
  }
  let topicValue = props.allValues[props.indexInheritsSchema][typeTopic];

  let checkValue;
  if (step.steptype === "lookup") {
    topicValue = props.allValues[props.indexInheritsSchema]["record_type"];
    if (topicValue === "" || !topicValue) {
      return false;
    }
    checkValue =
      topicValue.indexOf("_") === -1
        ? topicValue
        : topicValue?.split("_").slice(2).join("_");
  } else if (step.steptype === "event") {
    topicValue = props.allValues[props.indexInheritsSchema]["event_type"];
    if (topicValue === "" || !topicValue) {
      return false;
    }
    topicValue = props.allValues[props.indexInheritsSchema]["event_type"];
    checkValue =
      topicValue.indexOf("_") === -1
        ? topicValue
        : topicValue?.split("_").slice(0).join("_");
  } else if (step.steptype === "map_event") {
    topicValue = props.allValues[props.indexInheritsSchema]["event_type"];
    if (!topicValue) {
      return false;
    }
    checkValue =
      topicValue.indexOf("_") === -1
        ? topicValue
        : topicValue?.split("_").slice(0).join("_");
  } else {
    if (!topicValue) {
      return false;
    }

    checkValue =
      topicValue.indexOf("_") === -1
        ? topicValue
        : topicValue?.split("_").slice(2).join("_");
  }
  if (schema) {
    schema = schemas.filter((el) => {
      if (el.name?.indexOf(" ") === -1) {
        return el.name === checkValue;
      } else {
        return (
          el.name?.split(" ").slice(0).join("_") ===
          checkValue.split(" ").slice(0).join("_")
        );
      }
    });
    schema = schema[0];
  } else {
    schema = schemas[0];
  }
  if (!schema || schema.length === 0) {
    schema = schemas[0];
  }
  if (!schema) {
    return (
      <div
        style={{
          width: "100%",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <CircularProgress color="#803c8a" />
      </div>
    );
  }
  return (
    <div className="schema-additional-info">
      <button
        type={"button"}
        className="schema-btn"
        onClick={() => togglePolio()}
      >
        {schema?.name}
      </button>

      <div
        className="schema-popup"
        style={{ display: polio ? "block" : "none" }}
      >
        <div className="schema-popup-wrapper">
          <div className="schema-popup-content">
            <table className="schema-table">
              <thead>
                <tr>
                  <th>Field Name</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {schema?.schemafield_set.map((el) => {
                  return (
                    <tr style={{ width: 400 }}>
                      <td> {el.name} </td>
                      <td> value</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect((state) => {
  return {
    actualSchema: state.StreamProcessorReducer.actualSchema,
    schemas: state.StreamProcessorReducer.schemas,
  };
}, {})(SchemaBlock);
